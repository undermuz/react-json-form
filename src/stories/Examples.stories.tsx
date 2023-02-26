import type { ComponentStory, ComponentMeta } from "@storybook/react"
import { Box } from "grommet"
import type { FC } from "react"
import { useEffect, useMemo, useState } from "react"

import JsonForm from "../JsonForm"
import scheme from "./Schemes/forms/login"

// import ReactJson from "react-json-view"
import { Light as SyntaxHighlighter } from "react-syntax-highlighter"
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json"
import docco from "react-syntax-highlighter/dist/esm/styles/hljs/atelier-cave-dark"

SyntaxHighlighter.registerLanguage("json", json)

import UiContext from "../UiContext"

import ChakraUi from "../themes/chakra"

import { ChakraProvider, useColorMode } from "@chakra-ui/react"

import "rsuite/styles/index.less"

import { useDarkMode } from "storybook-dark-mode"
import ApiContext from "../ApiContext"
import type { ApiValue } from "../ApiContext"

enum JsonFormThemes {
    Grommet,
    ChakraUi,
    Rsuite,
}

interface IJsonFormStory {
    theme: JsonFormThemes
    showScheme: true
    showValue: true
}

const JsonFormStoryChakraUi = ({ scheme, value, setValue }) => {
    const dark = useDarkMode()

    const { setColorMode } = useColorMode()

    useEffect(() => {
        setColorMode(dark ? "dark" : "light")
    }, [dark])

    return (
        <UiContext.Provider value={ChakraUi}>
            <JsonForm {...scheme} value={value} onChange={setValue} />
        </UiContext.Provider>
    )
}

const JsonFormStory: FC<IJsonFormStory> = ({
    showScheme = true,
    showValue = true,
}) => {
    const [value, setValue] = useState({})

    const boxWidth = useMemo(() => {
        if (showScheme && showValue) {
            return "33.3333%"
        }

        if (showScheme || showValue) {
            return "50%"
        }

        return "100%"
    }, [showScheme, showValue])

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
            <Box direction="row">
                {showScheme && (
                    <Box width={boxWidth} background="white" pad={"middle"}>
                        {/* <ReactJson src={scheme} displayObjectSize={false} /> */}
                        <SyntaxHighlighter language="json" style={docco}>
                            {JSON.stringify(scheme, null, 2)}
                        </SyntaxHighlighter>
                    </Box>
                )}

                <Box width={boxWidth}>
                    <ChakraProvider>
                        <JsonFormStoryChakraUi
                            value={value}
                            setValue={setValue}
                            scheme={scheme}
                        />
                    </ChakraProvider>
                </Box>

                {showValue && (
                    <Box width={boxWidth} background="white" pad={"middle"}>
                        {/* <ReactJson src={value} displayObjectSize={false} /> */}
                        <SyntaxHighlighter language="json" style={docco}>
                            {JSON.stringify(value, null, 2)}
                        </SyntaxHighlighter>
                    </Box>
                )}
            </Box>
        </ApiContext.Provider>
    )
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JsonFormStory> = (args) => {
    return <JsonFormStory {...args} />
}

export const UiChakra = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
UiChakra.args = { theme: JsonFormThemes.ChakraUi }
// JsonFormStoryChakraUi.name = "Chakra UI"

export const UiGrommet = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
UiGrommet.args = { theme: JsonFormThemes.Grommet }
// JsonFormStoryGrommet.name = "Grommet UI"

export const UiRsuite = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
UiRsuite.args = { theme: JsonFormThemes.Rsuite }
// JsonFormStoryChakraUi.name = "Rsuite UI"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Examples",
    component: JsonFormStory,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        showScheme: {
            name: "Show form's scheme JSON",
            control: {
                type: "boolean",
            },
        },
        showValue: {
            name: "Show form's value JSON",
            control: {
                type: "boolean",
            },
        },
    },
} as ComponentMeta<typeof JsonFormStory>
