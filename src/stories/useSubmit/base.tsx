import type { FC } from "react"
import { useEffect, useMemo, useState, useRef } from "react"

import JsonForm from "../../JsonForm"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus as style } from "react-syntax-highlighter/dist/esm/styles/prism"

import UiContext from "../../UiContext"

import ChakraUi from "../../themes/chakra"

import { useColorMode } from "@chakra-ui/react"

import { useDarkMode } from "storybook-dark-mode"
import ApiContext from "../../ApiContext"
import type { ApiValue } from "../../ApiContext"
import {
    type TypeValue,
    type IJsonFormRefObject,
    type IScheme,
    type TypeErrorItem,
    EnumSchemeItemType,
} from "../../types"
import BaseStoryLayout from "../base"
import { useSubmit } from "../../useSubmit"
import type { IErrors } from "@undermuz/use-form"

export interface BaseExampleFormProps {
    scheme: IScheme
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
                />
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
            <JsonForm
                {...(scheme as IScheme)}
                ref={jsonFormRef}
                value={value}
                onChange={setValue}
                onError={setErrors}
            />
        </UiContext.Provider>
    </form>
)
`

const BaseExampleForm: FC<BaseExampleFormProps> = ({
    scheme: _scheme,
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

    const scheme = useMemo(() => {
        return {
            ..._scheme,
            scheme: [
                ..._scheme.scheme,
                {
                    name: "submit",
                    title: "Submit",
                    type: EnumSchemeItemType.Submit,
                },
            ],
        }
    }, [_scheme])

    return (
        <ApiContext.Provider value={api}>
            <BaseStoryLayout
                left={
                    <>
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
                            {Code2}
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
                />
            </BaseStoryLayout>
        </ApiContext.Provider>
    )
}

export default BaseExampleForm
