import type { ComponentStory } from "@storybook/react"

import JFL from "../../src/components/JsonFormLayout"
import JsonFormStory, { scheme } from "./base"

import { VStack } from "@chakra-ui/react"

const Template: ComponentStory<typeof JsonFormStory> = (args) => {
    const predefineProps = {
        scheme,
        code: `
import { VStack } from "@chakra-ui/react"

<UiContext.Provider value={ChakraUi}>
    <JsonForm
        {...scheme}
        value={value}
        onChange={setValue}
        onError={setErrors}
    >
        <JFL.Form as={VStack} />
    </JsonForm>
</UiContext.Provider>
`,
        title: "Vertical stack",
    }

    return (
        <JsonFormStory {...predefineProps} {...args}>
            <JFL.Form as={VStack} />
        </JsonFormStory>
    )
}

const VerticalStack = Template.bind({})

export default VerticalStack
