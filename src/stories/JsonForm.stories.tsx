import { ComponentStory, ComponentMeta } from "@storybook/react"
import { Box } from "grommet"
import { FC, useState } from "react"

import JsonForm from "../JsonForm"
import { scheme } from "./Schemes/prices"

import ReactJson from "react-json-view"
import UiContext from "../UiContext"

import GrommetUi from "../ui/grommet"
import ChakraUi from "../ui/chakra"
import { ChakraProvider } from "@chakra-ui/react"

enum JsonFormThemes {
    Grommet,
    ChakraUi,
}

interface IJsonFormStory {
    theme: JsonFormThemes
}

const JsonFormStory: FC<IJsonFormStory> = ({ theme }) => {
    const [value, setValue] = useState({})

    return (
        <>
            <Box direction="row">
                <Box width={"33.3333%"}>
                    <ReactJson src={scheme} displayObjectSize={false} />
                </Box>
                <Box width={"33.3333%"}>
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
                        <ChakraProvider>
                            <UiContext.Provider value={ChakraUi}>
                                <JsonForm
                                    {...scheme}
                                    value={value}
                                    onChange={setValue}
                                />
                            </UiContext.Provider>
                        </ChakraProvider>
                    )}
                </Box>
                <Box width={"33.3333%"}>
                    <ReactJson src={value} displayObjectSize={false} />
                </Box>
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

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Example/JsonForm",
    component: JsonFormStory,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    // argTypes: {
    //     backgroundColor: { control: "color" },
    // },
} as ComponentMeta<typeof JsonFormStory>
