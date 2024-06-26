import { act, render, screen, waitFor } from "@testing-library/react"

import "@testing-library/jest-dom"
import JsonForm from "../JsonForm"

import React, { type FC, type MutableRefObject, useRef, useState } from "react"

import UiContext from "../contexts/ui"
import type {
    IJsonFormRef,
    IJsonFormRefObject,
    TypeErrorItem,
    TypeValue,
} from "../types"
import JsonFormLayout from "../components/JsonFormLayout"
import { useSubmit } from "../useSubmit"
import userEvent from "@testing-library/user-event"
import { type IErrors } from "@undermuz/use-form"
import LoginScheme from "./schemes/login"
import TestThemeUi from "./theme"

const TestJsonForm: FC<{
    onRef: MutableRefObject<IJsonFormRef | null>
    def?: Record<string, any>
}> = ({ onRef, def = {} }) => {
    const [value, setValue] = useState(def)

    return (
        <React.StrictMode>
            <UiContext.Provider value={TestThemeUi}>
                <JsonForm
                    {...LoginScheme}
                    ref={onRef}
                    value={value}
                    onChange={setValue}
                />
            </UiContext.Provider>
        </React.StrictMode>
    )
}

const TestJsonFormWithSubmit: FC<{
    onRef: MutableRefObject<IJsonFormRef | null>
    def?: Record<string, any>
    onSubmit: (
        values: TypeValue,
        errors: IErrors[] | IErrors | TypeErrorItem[] | null,
        isValid: boolean
    ) => void
}> = ({ onRef, onSubmit, def = {} }) => {
    const [value, setValue] = useState(def)

    const ref = useRef<IJsonFormRef>(null)

    const submit = useSubmit(ref, onSubmit)

    return (
        <React.StrictMode>
            <form onSubmit={submit}>
                <UiContext.Provider value={TestThemeUi}>
                    <JsonForm
                        {...LoginScheme}
                        ref={(r) => {
                            onRef.current = r
                            //@ts-ignore
                            ref.current = r
                        }}
                        value={value}
                        onChange={setValue}
                    >
                        <JsonFormLayout.Form>
                            <JsonFormLayout.Fields />
                            <button type="submit">Submit</button>
                        </JsonFormLayout.Form>
                    </JsonForm>
                </UiContext.Provider>
            </form>
        </React.StrictMode>
    )
}

describe("Submit", () => {
    describe("validate", () => {
        test("Returns falsy isValidate when sent clear form", async () => {
            const _ref: MutableRefObject<IJsonFormRef | null> = {
                current: null,
            }

            act(() => {
                render(<TestJsonForm onRef={_ref} />)
            })

            expect(_ref.current).not.toBeNull()
            expect(typeof (_ref.current as IJsonFormRefObject)?.validate).toBe(
                "function"
            )

            const ref = _ref as MutableRefObject<IJsonFormRefObject>

            let errors: IErrors | TypeErrorItem[] | null = null

            act(() => {
                errors = ref.current.validate(false)
            })

            expect(errors).not.toBeNull()

            expect(errors).toEqual({
                email: ["Required"],
                password: ["Required", "Min length: 6; Max length: 18"],
            })
        })

        test("Returns null hasFormErrors when sent fill form", async () => {
            const _ref: MutableRefObject<IJsonFormRef | null> = {
                current: null,
            }

            act(() => {
                render(
                    <TestJsonForm
                        onRef={_ref}
                        def={{
                            email: "213@d",
                            password: "1234567",
                        }}
                    />
                )
            })

            expect(_ref.current).not.toBeNull()
            expect(typeof (_ref.current as IJsonFormRefObject)?.validate).toBe(
                "function"
            )

            const ref = _ref as MutableRefObject<IJsonFormRefObject>

            let errors: IErrors | TypeErrorItem[] | null = {}

            act(() => {
                errors = ref.current.validate(false)
            })

            const values = ref.current.values()

            expect(errors).toBeNull()
            expect(values).toEqual({
                email: "213@d",
                password: "1234567",
            })
        })
    })

    describe("useSubmit", () => {
        test("Returns falsy isValidate when sent clear form", async () => {
            const _ref: MutableRefObject<IJsonFormRef | null> = {
                current: null,
            }

            const onSubmit = jest.fn()

            act(() => {
                render(
                    <TestJsonFormWithSubmit onSubmit={onSubmit} onRef={_ref} />
                )
            })

            expect(_ref.current).not.toBeNull()
            expect(typeof (_ref.current as IJsonFormRefObject)?.validate).toBe(
                "function"
            )

            const ref = _ref as MutableRefObject<IJsonFormRefObject>

            await act(async () => {
                await userEvent.click(screen.getByText("Submit"))
            })

            await waitFor(() => {
                return expect(onSubmit).toHaveBeenCalledWith(
                    {
                        email: "",
                        password: "",
                        remember: true,
                    },
                    {
                        email: ["Required"],
                        password: ["Required", "Min length: 6; Max length: 18"],
                    },
                    false
                )
            })

            const errors = ref.current.errors()

            expect(errors).toEqual({
                email: ["Required"],
                password: ["Required", "Min length: 6; Max length: 18"],
            })
        })

        test("Returns truthy isValidate when sent fill form", async () => {
            const _ref: MutableRefObject<IJsonFormRef | null> = {
                current: null,
            }

            const onSubmit = jest.fn()

            act(() => {
                render(
                    <TestJsonFormWithSubmit
                        onSubmit={onSubmit}
                        onRef={_ref}
                        def={{
                            email: "test-email@er.er",
                            password: "1234567",
                        }}
                    />
                )
            })

            expect(_ref.current).not.toBeNull()
            expect(typeof (_ref.current as IJsonFormRefObject)?.validate).toBe(
                "function"
            )

            const ref = _ref as MutableRefObject<IJsonFormRefObject>

            await act(async () => {
                await userEvent.click(screen.getByText("Submit"))
            })

            await waitFor(() => {
                return expect(onSubmit).toHaveBeenCalledWith(
                    {
                        email: "test-email@er.er",
                        password: "1234567",
                    },
                    null,
                    true
                )
            })

            const errors = ref.current.errors()

            expect(errors).toEqual({})
        })
    })
})
