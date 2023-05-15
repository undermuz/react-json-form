import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import JsonForm from "../JsonForm"

import type { FC } from "react"
import React, { useState } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import ChakraUi from "../themes/chakra"
import UiContext from "../UiContext"
import type { JsonFormErrors } from "../types"
import simpleArrayScheme from "./schemes/simple-array-scheme"

const clickTo = async (name: string) => {
    await act(async () => {
        await userEvent.click(screen.getByLabelText(name))
    })
}
const clickByTitle = async (text: string) => {
    await act(async () => {
        await userEvent.click(screen.getByTitle(text))
    })
}

const typeTo = async (name: string, text: string) => {
    await act(async () => {
        await userEvent.type(screen.getByLabelText(name), text)
    })
}

const clearText = async (name: string) => {
    await act(async () => {
        await userEvent.clear(screen.getByLabelText(name))
    })
}

const TestJsonForm: FC<{ onError?: (e: JsonFormErrors) => void }> = ({
    onError,
}) => {
    const [value, setValue] = useState({})

    return (
        <React.StrictMode>
            <UiContext.Provider value={ChakraUi}>
                <ChakraProvider>
                    <JsonForm
                        {...simpleArrayScheme}
                        value={value}
                        onChange={setValue}
                        onError={onError}
                    />
                </ChakraProvider>
            </UiContext.Provider>
        </React.StrictMode>
    )
}

describe("Array form errors", () => {
    describe("Errors appearance", () => {
        beforeEach(() => {
            render(<TestJsonForm />)
        })

        test("Errors will show when no data", async () => {
            await clickByTitle("add-tab")

            await clickTo("Title")
            await clickTo("Price")

            await waitFor(() => {
                expect(screen.getByText("Required")).toBeInTheDocument()
            })
        })

        test("Errors will show when invalid data", async () => {
            await clickByTitle("add-tab")

            await clickTo("Price")
            await typeTo("Price", "invalid-price")
            await clickTo("Title")

            await waitFor(() => {
                expect(
                    screen.getByText("Должно быть числом")
                ).toBeInTheDocument()
            })

            await clickTo("Price")

            await waitFor(() => {
                expect(screen.getByText("Required")).toBeInTheDocument()
            })

            await clickTo("Title")
            await typeTo("Title", "12345")
            await clickTo("Price")

            await waitFor(() => {
                expect(
                    screen.getByText("Должно быть числом")
                ).toBeInTheDocument()
            })

            expect(screen.queryByText("Required")).toBeNull()

            await clearText("Price")
            await typeTo("Price", "9123")
            await clickTo("Title")

            await waitFor(() => {
                expect(screen.queryByText("Должно быть числом")).toBeNull()
            })
        })

        test("No errors when re-add", async () => {
            await clickByTitle("add-tab")

            await clickTo("Price")
            await typeTo("Price", "invalid-price")
            await clickTo("Title")

            await waitFor(() => {
                expect(
                    screen.getByText("Должно быть числом")
                ).toBeInTheDocument()
            })

            await clickTo("Price")

            await waitFor(() => {
                expect(screen.getByText("Required")).toBeInTheDocument()
            })

            window.confirm = jest.fn(() => true)

            await clickByTitle("remove-tab")

            expect(window.confirm).toHaveBeenCalled()

            await clickByTitle("add-tab")

            await waitFor(() => {
                expect(screen.queryByText("Required")).toBeNull()
            })

            await waitFor(() => {
                expect(screen.queryByText("Должно быть числом")).toBeNull()
            })
        })
    })
})
