import type { ComponentStory } from "@storybook/react"

import { JFL } from "@undermuz/react-json-form"
import JsonFormStory, { scheme, Box } from "./base"

const Template: ComponentStory<typeof JsonFormStory> = (args) => {
    const predefineProps = {
        scheme,
        code: `
import { Box } from "your/custom/ui"

<UiContext.Provider value={ChakraUi}>
    <JsonForm
        {...scheme}
        value={value}
        onChange={setValue}
        onError={setErrors}
    >
        <JFL.Form as={Box} />
    </JsonForm>
</UiContext.Provider>
`,
        title: "Wrapp form",
    }

    return (
        <JsonFormStory {...predefineProps} {...args}>
            <JFL.Form as={Box} />
        </JsonFormStory>
    )
}

const WrappForm = Template.bind({})

export default WrappForm
