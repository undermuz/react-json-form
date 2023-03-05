import type { FC, PropsWithChildren } from "react"
import { useEffect, useMemo, useState } from "react"

import JsonForm from "../../JsonForm"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus as style } from "react-syntax-highlighter/dist/esm/styles/prism"

import UiContext from "../../UiContext"

import ChakraUi from "../../themes/chakra"

import {
    Box as ChakraBox,
    ChakraProvider,
    useColorMode,
    HStack,
} from "@chakra-ui/react"

import { useDarkMode } from "storybook-dark-mode"
import ApiContext from "../../ApiContext"
import type { ApiValue } from "../../ApiContext"
import {
    EnumSchemeItemType,
    type FunctionOnChange,
    type JsonFormErrors,
    type TypeValue,
    type IScheme,
} from "../../types"

const JFChakraUi: FC<
    PropsWithChildren & {
        scheme: IScheme
        value: TypeValue
        setValue: FunctionOnChange
        setErrors: (e: JsonFormErrors) => void
    }
> = ({ scheme, value, setValue, setErrors, children }) => {
    const dark = useDarkMode()

    const { setColorMode } = useColorMode()

    useEffect(() => {
        setColorMode(dark ? "dark" : "light")
    }, [dark])

    return (
        <UiContext.Provider value={ChakraUi}>
            <JsonForm
                {...scheme}
                value={value}
                onChange={setValue}
                onError={setErrors}
            >
                {children}
            </JsonForm>
        </UiContext.Provider>
    )
}

export const Box = ({ children }) => {
    return (
        <ChakraBox borderWidth="3px" p={2} w={"100%"} borderColor={"green.500"}>
            {children}
        </ChakraBox>
    )
}

export const scheme: IScheme = {
    id: "simple",
    scheme: [
        {
            name: "field1",
            title: "Field 1",
            placeholder: "ex: youremail@mail.com",
            type: EnumSchemeItemType.Input,
            settings: {
                inputType: "email",
                variant: "filled",
            },
            def_value: "",
            rules: [
                [["Boolean"], "Required"],
                [["isEmail"], "Incorrect e-mail"],
            ],
        },
        {
            name: "field2",
            title: "Field 2",
            type: EnumSchemeItemType.Input,
            settings: {
                inputType: "password",
                variant: "filled",
            },
            def_value: "",
            rules: [
                [["Boolean"], "Required"],
                [
                    ["isStringMinMaxLength:[6,18]"],
                    "Min length: 6; Max length: 18",
                ],
            ],
        },
        {
            name: "remember",
            title: "Remember?",
            type: EnumSchemeItemType.Checkbox,
            def_value: true,
        },
    ],
    single: true,
    multiple: false,
    title: "Simple",
    name: "simple",
}

type IJsonFormStory = PropsWithChildren & {
    scheme: IScheme
    code: string
    title: string
}

const JsonFormStory: FC<IJsonFormStory> = ({
    scheme,
    code,
    title,
    children,
}) => {
    const [value, setValue] = useState({})
    const [, setErrors] = useState({})

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
            <ChakraProvider>
                <HStack alignItems={"flex-start"}>
                    <ChakraBox w="40%" p={"md"}>
                        <SyntaxHighlighter language="jsx" style={style}>
                            {code}
                        </SyntaxHighlighter>

                        <SyntaxHighlighter language="javascript" style={style}>
                            {`const scheme = ${JSON.stringify(
                                scheme,
                                null,
                                2
                            )}`}
                        </SyntaxHighlighter>
                    </ChakraBox>

                    <ChakraBox w="60%">
                        <JFChakraUi
                            value={value}
                            setValue={setValue}
                            setErrors={setErrors}
                            scheme={{
                                ...scheme,
                                title,
                            }}
                        >
                            {children}
                        </JFChakraUi>
                    </ChakraBox>
                </HStack>
            </ChakraProvider>
        </ApiContext.Provider>
    )
}

export default JsonFormStory
