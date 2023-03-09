import type { ComponentMeta } from "@storybook/react"

import JsonFormStory from "./custom-layout/base"

import WrappForm from "./custom-layout/WrappForm"
import WrappFieldBlock from "./custom-layout/WrappFieldBlock"
import WrappEachField from "./custom-layout/WrappEachField"
import VerticalStack from "./custom-layout/VerticalStack"
import HorizontalStack from "./custom-layout/HorizontalStack"
import GridLayout from "./custom-layout/GridLayout"

export {
    WrappForm,
    WrappFieldBlock,
    WrappEachField,
    VerticalStack,
    HorizontalStack,
    GridLayout,
}

export default {
    title: "Custom layout",
    component: JsonFormStory,
    argTypes: {},
} as ComponentMeta<typeof JsonFormStory>
