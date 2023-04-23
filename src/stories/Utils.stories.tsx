import type { ComponentMeta } from "@storybook/react"
import BaseExampleForm from "./utils/base"
import UseSubmit from "./utils/useSubmit"

export { UseSubmit }

export default {
    title: "Utils",
    component: BaseExampleForm,
    argTypes: { onSubmit: { action: "submit" } },
} as ComponentMeta<typeof BaseExampleForm>
