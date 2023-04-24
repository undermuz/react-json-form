import type { ComponentStory } from "@storybook/react"

import { Alert, Button, HStack, Text, VStack } from "@chakra-ui/react"

import JFL from "../../components/JsonFormLayout"
import JsonFormStory, { scheme, Box } from "./base"

const WrappArrayFieldsTemplate: ComponentStory<typeof JsonFormStory> = (
    args
) => {
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
                <Box>
                    <JFL.Field name="field2" />
                </Box>

                <Box>
                    <JFL.Field name="field1" />
                </Box>

                <Box>
                    <JFL.Field name="remember" />
                </Box>

                <Box>
                    <JFL.Field name="prices">
                        <JFL.ArrayList>
                            {({ value, addTab, removeTab }) => {
                                return (
                                    <VStack>
                                        <Text>Your custom button</Text>
                                        <Button
                                            w="full"
                                            onClick={() => addTab()}
                                        >
                                            Add an Item
                                        </Button>
                                        {value.map((item) => {
                                            return (
                                                <Box key={item.id}>
                                                    <VStack align={"stretch"}>
                                                        <Text>
                                                            Your custom
                                                            button
                                                        </Text>
                                                        <Button
                                                            w="full"
                                                            onClick={() =>
                                                                removeTab(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            Remove Item
                                                        </Button>

                                                        <JFL.ArrayItem
                                                            itemId={item.id}
                                                        >
                                                            <Box>
                                                                <HStack>
                                                                    <JFL.Fields />
                                                                </HStack>
                                                            </Box>
                                                        </JFL.ArrayItem>
                                                    </VStack>
                                                </Box>
                                            )
                                        })}
                                    </VStack>
                                )
                            }}
                        </JFL.ArrayList>
                    </JFL.Field>
                </Box>

                <Alert>After</Alert>
            </VStack>
        </JFL.Form>
    </JsonForm>
</UiContext.Provider>
`,
        title: "Wrapp array fields",
    }

    return (
        <JsonFormStory {...predefineProps} {...args}>
            <JFL.Form as={Box}>
                <VStack>
                    <Box>
                        <JFL.Field name="field2" />
                    </Box>

                    <Box>
                        <JFL.Field name="field1" />
                    </Box>

                    <Box>
                        <JFL.Field name="remember" />
                    </Box>

                    <Box>
                        <JFL.Field name="prices">
                            <JFL.ArrayList>
                                {({ value, addTab, removeTab }) => {
                                    return (
                                        <VStack>
                                            <Text>Your custom button</Text>
                                            <Button
                                                w="full"
                                                onClick={() => addTab()}
                                            >
                                                Add an Item
                                            </Button>
                                            {value.map((item) => {
                                                return (
                                                    <Box key={item.id}>
                                                        <VStack
                                                            align={"stretch"}
                                                        >
                                                            <Text>
                                                                Your custom
                                                                button
                                                            </Text>
                                                            <Button
                                                                w="full"
                                                                onClick={() =>
                                                                    removeTab(
                                                                        item.id
                                                                    )
                                                                }
                                                            >
                                                                Remove Item
                                                            </Button>

                                                            <JFL.ArrayItem
                                                                itemId={item.id}
                                                            >
                                                                <Box>
                                                                    <HStack>
                                                                        <JFL.Fields />
                                                                    </HStack>
                                                                </Box>
                                                            </JFL.ArrayItem>
                                                        </VStack>
                                                    </Box>
                                                )
                                            })}
                                        </VStack>
                                    )
                                }}
                            </JFL.ArrayList>
                        </JFL.Field>
                    </Box>

                    <Alert>After</Alert>
                </VStack>
            </JFL.Form>
        </JsonFormStory>
    )
}

const WrappArrayFields = WrappArrayFieldsTemplate.bind({})

export default WrappArrayFields
