import type { ComponentMeta } from "@storybook/react"

import JsonFormStory from "./CustomLayout/base"

import WrappForm from "./CustomLayout/WrappForm"
import WrappFieldBlock from "./CustomLayout/WrappFieldBlock"
import WrappEachField from "./CustomLayout/WrappEachField"
import VerticalStack from "./CustomLayout/VerticalStack"
import HorizontalStack from "./CustomLayout/HorizontalStack"
import GridLayout from "./CustomLayout/GridLayout"

export {
    WrappForm,
    WrappFieldBlock,
    WrappEachField,
    VerticalStack,
    HorizontalStack,
    GridLayout,
}

export default {
    title: "CustomLayout",
    component: JsonFormStory,
    argTypes: {},
} as ComponentMeta<typeof JsonFormStory>
