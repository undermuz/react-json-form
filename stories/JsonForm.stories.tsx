import { ComponentStory, ComponentMeta } from "@storybook/react"
import { Box } from "grommet"
import React, { FC, useEffect, useMemo, useState } from "react"

import JsonForm from "../src/JsonForm"
import scheme from "./Schemes/prices"

import ReactJson from "react-json-view"
import UiContext from "../src/UiContext"

import GrommetUi from "../src/themes/grommet"
import ChakraUi from "../src/themes/chakra"
import RsuiteUi from "../src/themes/rsuite"

import { Button, ChakraProvider, Stack, useColorMode, Wrap, WrapItem } from "@chakra-ui/react"

import "rsuite/styles/index.less"

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
import { useDarkMode } from 'storybook-dark-mode'
// 3. extend the theme
const chakraTheme = extendTheme({ config })


enum JsonFormThemes {
    Grommet,
    ChakraUi,
    Rsuite,
}

interface IJsonFormStory {
    theme: JsonFormThemes
    showScheme: true,
    showValue: true
}

const JsonFormStoryChakraUi = ({scheme, value, setValue}) => {
    const dark = useDarkMode()

    const {setColorMode} = useColorMode()

    useEffect(() => {
        setColorMode(dark ? "dark" : "light")
    }, [dark])

    return (
        <UiContext.Provider value={ChakraUi}>
            <JsonForm
                {...scheme}
                value={value}
                onChange={setValue}
            />
        </UiContext.Provider>
    )
}

const JsonFormStory: FC<IJsonFormStory> = ({ theme, showScheme = true, showValue = true }) => {
    const [value, setValue] = useState({})

    const boxWidth = useMemo(() => {
        if (showScheme && showValue) {
            return "33.3333%"
        }

        if (showScheme || showValue) {
            return "50%"
        }

        return "100%"
    },[showScheme, showValue])

    return (
        <>
            <Box direction="row">
                {showScheme && <Box width={boxWidth} background="white" pad={"middle"}>
                    <ReactJson src={scheme} displayObjectSize={false} />
                </Box>}

                <Box width={boxWidth}>
                    {theme === JsonFormThemes.Grommet && (
                        <UiContext.Provider value={GrommetUi}>
                            <JsonForm
                                {...scheme}
                                value={value}
                                onChange={setValue}
                            />
                        </UiContext.Provider>
                    )}

                    {theme === JsonFormThemes.ChakraUi && (
                        <ChakraProvider >
                            <JsonFormStoryChakraUi value={value} setValue={setValue} scheme={scheme}/>
                        </ChakraProvider>
                    )}

                    {theme === JsonFormThemes.Rsuite && (
                        <UiContext.Provider value={RsuiteUi}>
                            <JsonForm
                                {...scheme}
                                value={value}
                                onChange={setValue}
                            />
                        </UiContext.Provider>
                    )}


                </Box>

                {showValue && <Box width={boxWidth} background="white" pad={"middle"}>
                    <ReactJson src={value} displayObjectSize={false} />
                </Box>}
            </Box>
        </>
    )
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JsonFormStory> = (args) => {
    return <JsonFormStory {...args} />
}

export const UiGrommet = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
UiGrommet.args = { theme: JsonFormThemes.Grommet }
// JsonFormStoryGrommet.name = "Grommet UI"

export const UiChakra = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
UiChakra.args = { theme: JsonFormThemes.ChakraUi }
// JsonFormStoryChakraUi.name = "Chakra UI"

export const UiRsuite = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
UiRsuite.args = { theme: JsonFormThemes.Rsuite }
// JsonFormStoryChakraUi.name = "Rsuite UI"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Example/JsonForm",
    component: JsonFormStory,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        showScheme: {
            name: "Show form's scheme JSON",
            control: {
                type: 'boolean'
            }
        },
        showValue: {
            name: "Show form's value JSON",
            control: {
                type: 'boolean'
            }
        },
    },
} as ComponentMeta<typeof JsonFormStory>
