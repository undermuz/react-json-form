import type { FC } from "react"
import { useEffect, useMemo, useState } from "react"

import JsonForm from "../../src/JsonForm"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus as style } from "react-syntax-highlighter/dist/esm/styles/prism"

import UiContext from "../../src/contexts/ui"

import ChakraUi from "../themes/chakra"

import { useColorMode } from "@chakra-ui/react"

import { useDarkMode } from "storybook-dark-mode"
import ApiContext from "../../src/contexts/api"
import type { ApiValue } from "../../src/contexts/api"
import { type IScheme } from "../../src/types"
import BaseStoryLayout from "../base"

export interface BaseExampleFormProps {
    scheme: IScheme
    showScheme: true
    showValue: true
}

const asyncSelectList = [
    { label: "Big", value: 1 },
    { label: "Small", value: 2 },
    { label: "Medium", value: 3 },
    { label: "Xs", value: 4 },
    { label: "Xxs", value: 5 },
    { label: "Xl", value: 6 },
    { label: "Xxl", value: 7 },
    { label: "2xl", value: 8 },
    { label: "3xl", value: 9 },
]

const JsonFormStoryChakraUi = ({ scheme, value, setValue, setErrors }) => {
    const dark = useDarkMode()

    const { setColorMode } = useColorMode()

    useEffect(() => {
        setColorMode(dark ? "dark" : "light")
    }, [dark])

    const api: ApiValue = useMemo(() => {
        return {
            "api::async-select.list": async (
                searchOrIds?: string | { ids: any[] }
            ) => {
                console.log("[api::async-select.list]", searchOrIds)

                if (searchOrIds && typeof searchOrIds === "string") {
                    return Promise.resolve(
                        asyncSelectList.filter((v) =>
                            v.label.includes(searchOrIds)
                        )
                    )
                }

                if (
                    searchOrIds &&
                    typeof searchOrIds !== "string" &&
                    searchOrIds?.ids
                ) {
                    return Promise.resolve(
                        asyncSelectList.filter((v) =>
                            searchOrIds.ids.includes(v.value)
                        )
                    )
                }

                return Promise.resolve(asyncSelectList)
            },
        }
    }, [])

    return (
        <UiContext.Provider value={ChakraUi}>
            <ApiContext.Provider value={api}>
                <JsonForm
                    {...(scheme as IScheme)}
                    value={value}
                    onChange={setValue}
                    onError={setErrors}
                />
            </ApiContext.Provider>
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
