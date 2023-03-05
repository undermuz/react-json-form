import type { ComponentStory } from "@storybook/react"

import JFL from "../../components/JsonFormLayout"
import JsonFormStory, { scheme } from "./base"

import { Grid } from "@chakra-ui/react"

const Template: ComponentStory<typeof JsonFormStory> = (args) => {
    const predefineProps = {
        scheme,
        code: `
import { Grid } from "@chakra-ui/react"

<UiContext.Provider value={ChakraUi}>
    <JsonForm
        {...scheme}
        value={value}
        onChange={setValue}
        onError={setErrors}
    >
        <JFL.Form as={Grid} templateColumns="repeat(2, 1fr)" gap={6} />
    </JsonForm>
</UiContext.Provider>
`,
        title: "Grid layout",
    }

    return (
        <JsonFormStory {...predefineProps} {...args}>
            <JFL.Form as={Grid} templateColumns="repeat(2, 1fr)" gap={6} />
        </JsonFormStory>
    )
}

const GridLayout = Template.bind({})

export default GridLayout
