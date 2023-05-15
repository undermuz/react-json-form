import type { FC } from "react"
import { useEffect, useMemo, useState } from "react"

import JsonForm from "../../JsonForm"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus as style } from "react-syntax-highlighter/dist/esm/styles/prism"

import UiContext from "../../UiContext"

import ChakraUi from "../../themes/chakra"

import { useColorMode } from "@chakra-ui/react"

import { useDarkMode } from "storybook-dark-mode"
import ApiContext from "../../ApiContext"
import type { ApiValue } from "../../ApiContext"
import { type IScheme } from "../../types"
import BaseStoryLayout from "../base"

export interface BaseExampleFormProps {
    scheme: IScheme
    showScheme: true
    showValue: true
}

const JsonFormStoryChakraUi = ({ scheme, value, setValue, setErrors }) => {
    const dark = useDarkMode()

    const { setColorMode } = useColorMode()

    useEffect(() => {
        setColorMode(dark ? "dark" : "light")
    }, [dark])

    return (
        <UiContext.Provider value={ChakraUi}>
            <JsonForm
                {...(scheme as IScheme)}
                value={value}
                onChange={setValue}
                onError={setErrors}
            />
        </UiContext.Provider>
    )
}

const Code1 = `
const [value, setValue] = useState({})
const [errors, setErrors] = useState({})
`

const Code2 = `
<JsonForm
    {...scheme}
    value={value}
    onChange={setValue}
    onError={setErrors}
/>
`

const BaseExampleForm: FC<BaseExampleFormProps> = ({ scheme }) => {
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
                    setValue={setValue}
                    setErrors={setErrors}
                    scheme={scheme}
                />
            </BaseStoryLayout>
        </ApiContext.Provider>
    )
}

export default BaseExampleForm