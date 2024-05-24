import type { ComponentMeta } from "@storybook/react"

import JsonFormStory from "./custom-components/base"

import Example1 from "./custom-components/example_1"

export { Example1 }

export default {
    title: "Custom components",
    component: JsonFormStory,
    argTypes: {},
} as ComponentMeta<typeof JsonFormStory>
