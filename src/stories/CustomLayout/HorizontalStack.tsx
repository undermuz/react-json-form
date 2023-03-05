import type { ComponentStory } from "@storybook/react"

import JFL from "../../components/JsonFormLayout"
import JsonFormStory, { scheme } from "./base"

import { HStack } from "@chakra-ui/react"

const Template: ComponentStory<typeof JsonFormStory> = (args) => {
    const predefineProps = {
        scheme,
        code: `
import { HStack } from "@chakra-ui/react"

<UiContext.Provider value={ChakraUi}>
    <JsonForm
        {...scheme}
        value={value}
        onChange={setValue}
        onError={setErrors}
    >
        <JFL.Form as={HStack} justify="center" />
    </JsonForm>
</UiContext.Provider>
`,
        title: "Horizontal stack",
    }

    return (
        <JsonFormStory {...predefineProps} {...args}>
            <JFL.Form as={HStack} justify="center" />
        </JsonFormStory>
    )
}

const HorizontalStack = Template.bind({})

export default HorizontalStack
