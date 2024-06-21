import type { ComponentStory } from "@storybook/react"

import { Alert, VStack, HStack } from "@chakra-ui/react"

import { JFL } from "@undermuz/react-json-form"
import JsonFormStory, { scheme, Box } from "./base"

const WrappFieldBlockTemplate: ComponentStory<typeof JsonFormStory> = (
    args
) => {
    const predefineProps = {
        scheme,
        code: `
import { Box } from "your/custom/ui"
import { Alert, VStack, HStack } from "@chakra-ui/react"

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
                    <HStack>
                        <JFL.Fields />
                    </HStack>
                </Box>

                <Alert>After</Alert>
            </VStack>
        </JFL.Form>
    </JsonForm>
</UiContext.Provider>
`,
        title: "Wrapp field block",
    }

    return (
        <JsonFormStory {...predefineProps} {...args}>
            <JFL.Form as={Box}>
                <VStack>
                    <Alert>Before</Alert>

                    <Box>
                        <HStack>
                            <JFL.Fields />
                        </HStack>
                    </Box>

                    <Alert>After</Alert>
                </VStack>
            </JFL.Form>
        </JsonFormStory>
    )
}

const WrappFieldBlock = WrappFieldBlockTemplate.bind({})

export default WrappFieldBlock
