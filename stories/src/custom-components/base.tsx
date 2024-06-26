import type { FC, PropsWithChildren } from "react"
import { useEffect, useMemo, useState, useRef } from "react"

import { JsonForm } from "@undermuz/react-json-form"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus as style } from "react-syntax-highlighter/dist/esm/styles/prism"

import { UiContext } from "@undermuz/react-json-form"

import ChakraUi from "@undermuz/react-json-form-theme-chakra"

import { Button, useColorMode } from "@chakra-ui/react"

import { useDarkMode } from "storybook-dark-mode"
import { ApiContext } from "@undermuz/react-json-form"
import type { ApiValue } from "@undermuz/react-json-form"
import type {
    TypeValue,
    IJsonFormRefObject,
    IScheme,
    TypeErrorItem,
} from "@undermuz/react-json-form"
import BaseStoryLayout from "../base"
import { JFL as JsonFormLayout } from "@undermuz/react-json-form"
import { useSubmit } from "@undermuz/react-json-form"
import type { IErrors } from "@undermuz/use-form"

export interface BaseExampleFormProps {
    scheme: IScheme
    code: string
    code2?: string
    onSubmit: (
        values: TypeValue,
        errors: null | IErrors | TypeErrorItem[],
        isValid: boolean
    ) => void
}

const JsonFormStoryChakraUi = ({
    scheme,
    value,
    setValue,
    setErrors,
    children,
    onSubmit,
}) => {
    const dark = useDarkMode()

    const { setColorMode } = useColorMode()

    useEffect(() => {
        setColorMode(dark ? "dark" : "light")
    }, [dark])

    const jsonFormRef = useRef<IJsonFormRefObject>(null)

    const submit = useSubmit(jsonFormRef, onSubmit)

    return (
        <form onSubmit={submit}>
            <UiContext.Provider value={ChakraUi}>
                <JsonForm
                    {...(scheme as IScheme)}
                    ref={jsonFormRef}
                    value={value}
                    onChange={setValue}
                    onError={setErrors}
                >
                    <JsonFormLayout.Form>
                        {children || <JsonFormLayout.Fields />}
                        <Button variant={"solid"} type="submit">
                            Submit
                        </Button>
                    </JsonFormLayout.Form>
                </JsonForm>
            </UiContext.Provider>
        </form>
    )
}

const Code1 = `
const [value, setValue] = useState({})
const [errors, setErrors] = useState({})
`

const Code2 = `
const jsonFormRef = useRef<IJsonFormRefObject>(null)

const submit = useSubmit(jsonFormRef, onSubmit)

return (
    <form onSubmit={submit}>
        <UiContext.Provider value={ChakraUi}>
            <CustomComponentsContext.Provider value={customComponents}>
                <JsonForm
                    {...(scheme as IScheme)}
                    ref={jsonFormRef}
                    value={value}
                    onChange={setValue}
                    onError={setErrors}
                >
                    <JsonFormLayout.Form>
                        <JsonFormLayout.Fields />
                        <Button variant={"solid"} type="submit">
                            Submit
                        </Button>
                    </JsonFormLayout.Form>
                </JsonForm>
            </CustomComponentsContext.Provider>
        </UiContext.Provider>
    </form>
)
`

const BaseExampleForm: FC<PropsWithChildren & BaseExampleFormProps> = ({
    scheme,
    code,
    code2,
    children,
    onSubmit,
}) => {
    const [value, setValue] = useState({})
    const [errors, setErrors] = useState({})

    const api: ApiValue = useMemo(() => {
        return {
            "api::size.list": async () => {
                console.log("[api::size.list]")

                return Promise.resolve([{ label: "fff", value: 2222 }])
            },
        }
    }, [])

    return (
        <ApiContext.Provider value={api}>
            <BaseStoryLayout
                left={
                    <>
                        <SyntaxHighlighter language="jsx" style={style}>
                            {code}
                        </SyntaxHighlighter>
                        <SyntaxHighlighter language="jsx" style={style}>
                            {Code1}
                        </SyntaxHighlighter>
                        <SyntaxHighlighter language="jsx" style={style}>
                            {`//console.log(value)\n${JSON.stringify(
                                value,
                                null,
                                2
                            )}`}
                        </SyntaxHighlighter>
                        <SyntaxHighlighter language="jsx" style={style}>
                            {`//console.log(errors)\n${JSON.stringify(
                                errors,
                                null,
                                2
                            )}`}
                        </SyntaxHighlighter>
                        <SyntaxHighlighter language="jsx" style={style}>
                            {`const scheme = ${JSON.stringify(
                                scheme,
                                null,
                                2
                            )}`}
                        </SyntaxHighlighter>
                        <SyntaxHighlighter language="jsx" style={style}>
                            {code2 || Code2}
                        </SyntaxHighlighter>
                    </>
                }
            >
                <JsonFormStoryChakraUi
                    value={value}
                    onSubmit={onSubmit}
                    setValue={setValue}
                    setErrors={setErrors}
                    scheme={scheme}
                >
                    {children}
                </JsonFormStoryChakraUi>
            </BaseStoryLayout>
        </ApiContext.Provider>
    )
}

export default BaseExampleForm
