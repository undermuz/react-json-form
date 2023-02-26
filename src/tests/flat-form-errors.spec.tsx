import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import JsonForm from "../JsonForm"

import React, { FC, useState } from "react"
import LoginScheme from "../stories/Schemes/forms/login"
import { ChakraProvider } from "@chakra-ui/react"
import ChakraUi from "../themes/chakra"
import UiContext from "../UiContext"
import type { JsonFormErrors } from "../types"

const clickTo = async (name: string) => {
    await act(async () => {
        await userEvent.click(screen.getByLabelText(name))
    })
}

const typeTo = async (name: string, text: string) => {
    await act(async () => {
        await userEvent.type(screen.getByLabelText(name), text)
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
                        {...LoginScheme}
                        value={value}
                        onChange={setValue}
                        onError={onError}
                    />
                </ChakraProvider>
            </UiContext.Provider>
        </React.StrictMode>
    )
}
describe("Flat form errors", () => {
    describe("Errors appearance", () => {
        beforeEach(() => {
            render(<TestJsonForm />)
        })

        test("Errors will show when no data", async () => {
            await clickTo("E-mail")
            await clickTo("Password")
            await screen.findByText("Required")

            await clickTo("E-mail")
            await screen.findByText("Min length: 6; Max length: 18")
        })

        test("Errors will show when invalid data", async () => {
            // await clickTo("E-mail")
            await typeTo("E-mail", "invalid-email")
            await clickTo("Password")

            await screen.findByText("Incorrect e-mail")

            await typeTo("Password", "12345")
            await clickTo("E-mail")

            await screen.findByText("Incorrect e-mail")
            await screen.findByText("Min length: 6; Max length: 18")

            // await clickTo("Password")
            await typeTo("Password", "6789012345678")

            expect(
                screen.queryByText("Min length: 6; Max length: 18")
            ).toBeNull()

            await screen.findByText("Incorrect e-mail")

            await typeTo("Password", "9")

            await screen.findByText("Incorrect e-mail")
            await screen.findByText("Min length: 6; Max length: 18")
        })

        test("No errors will show with valid data", async () => {
            await clickTo("E-mail")
            await typeTo("E-mail", "valid-email@mail.com")

            await clickTo("Password")
            await typeTo("Password", "valid-password")

            expect(screen.queryByText("Required")).toBeNull()
            expect(screen.queryByText("Incorrect e-mail")).toBeNull()
            expect(
                screen.queryByText("Min length: 6; Max length: 18")
            ).toBeNull()
        })
    })

    describe("Error callback triggers", () => {
        const onErrorMock = jest.fn()

        beforeEach(() => {
            onErrorMock.mockReset()
            render(<TestJsonForm onError={onErrorMock} />)
        })

        test("Error callback triggered when no data", async () => {
            await clickTo("E-mail")
            await clickTo("Password")

            expect(onErrorMock.mock.calls.length).toBe(1)

            expect(onErrorMock.mock.calls[0][0]).toEqual({
                email: ["Required"],
            })

            await clickTo("E-mail")

            expect(onErrorMock.mock.calls.length).toBe(2)

            expect(onErrorMock.mock.calls[1][0]).toEqual({
                email: ["Required"],
                password: ["Required", "Min length: 6; Max length: 18"],
            })
        })

        test("Error callback triggered when invalid data", async () => {
            // await clickTo("E-mail")
            await typeTo("E-mail", "invalid-email")
            await clickTo("Password")

            expect(onErrorMock.mock.calls.length).toBe(1)

            expect(onErrorMock.mock.calls[0][0]).toEqual({
                email: ["Incorrect e-mail"],
            })

            await typeTo("Password", "12345")
            await clickTo("E-mail")

            expect(onErrorMock.mock.calls.length).toBe(2)

            expect(onErrorMock.mock.calls[1][0]).toEqual({
                email: ["Incorrect e-mail"],
                password: ["Min length: 6; Max length: 18"],
            })

            // await clickTo("Password")
            await typeTo("Password", "6789012345678")

            expect(onErrorMock.mock.calls.length).toBe(3)

            expect(onErrorMock.mock.calls[2][0]).toEqual({
                email: ["Incorrect e-mail"],
            })

            await typeTo("Password", "9")

            expect(onErrorMock.mock.calls.length).toBe(4)

            expect(onErrorMock.mock.calls[3][0]).toEqual({
                email: ["Incorrect e-mail"],
                password: ["Min length: 6; Max length: 18"],
            })
        })

        test("No error callback triggered with valid data", async () => {
            await clickTo("E-mail")
            await typeTo("E-mail", "valid-email@mail.com")

            await clickTo("Password")
            await typeTo("Password", "valid-password")

            expect(onErrorMock.mock.calls.length).toBe(0)
        })
    })
})
