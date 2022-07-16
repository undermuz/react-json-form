import { ComponentStory, ComponentMeta } from "@storybook/react"
import { Box } from "grommet"
import { useState } from "react"

import JsonForm from "../JsonForm"
import { scheme } from "./Schemes/prices"

import ReactJson from "react-json-view"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Example/JsonForm",
    component: JsonForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof JsonForm>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JsonForm> = (args) => {
    const [value, setValue] = useState({})

    return (
        <>
            <Box direction="row">
                <Box width={"33.3333%"}>
                    <ReactJson src={scheme} displayObjectSize={false} />
                </Box>
                <Box width={"33.3333%"}>
                    <JsonForm
                        {...args}
                        {...scheme}
                        value={value}
                        onChange={setValue}
                    />
                </Box>
                <Box width={"33.3333%"}>
                    <ReactJson src={value} displayObjectSize={false} />
                </Box>
            </Box>
        </>
    )
}

export const Example = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Example.args = {}
