import type { ComponentStory } from "@storybook/react"

import { Alert, VStack } from "@chakra-ui/react"

import JFL from "../../src/components/JsonFormLayout"
import JsonFormStory, { scheme, Box } from "./base"

const WrappEachFieldTemplate: ComponentStory<typeof JsonFormStory> = (args) => {
    const predefineProps = {
        scheme,
        code: `
import { Box } from "your/custom/ui"
import { Alert, VStack } from "@chakra-ui/react"

<UiContext.Provider value={ChakraUi}>
    <JsonForm
        {...scheme}
        value={value}
        onChange={setValue}
        onError={setErrors}
    >
        <JFL.Form as={Box}>
            <VStack>
                <Alert>Before</Alert>

                <Box>
                    <JFL.Field name="field2" />
                </Box>

                <Alert>Between</Alert>

                <Box>
                    <JFL.Field name="field1" />
                </Box>

                <Alert>Other</Alert>

                <Box>
                    <JFL.Fields except={["field1", "field2"]} />
                </Box>

                <Alert>After</Alert>
            </VStack>
        </JFL.Form>
    </JsonForm>
</UiContext.Provider>
`,
        title: "Wrapp each field",
    }

    return (
        <JsonFormStory {...predefineProps} {...args}>
            <JFL.Form as={Box}>
                <VStack>
                    <Alert>Before</Alert>

                    <Box>
                        <JFL.Field name="field2" />
                    </Box>

                    <Alert>Between</Alert>

                    <Box>
                        <JFL.Field name="field1" />
                    </Box>

                    <Alert>Other</Alert>

                    <Box>
                        <JFL.Fields except={["field1", "field2"]} />
                    </Box>

                    <Alert>After</Alert>
                </VStack>
            </JFL.Form>
        </JsonFormStory>
    )
}

const WrappEachField = WrappEachFieldTemplate.bind({})

export default WrappEachField
