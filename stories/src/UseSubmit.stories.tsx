import type { ComponentMeta } from "@storybook/react"
import BaseExampleForm from "./useSubmit/base"
import Login from "./useSubmit/login"
import ComplexForm from "./useSubmit/complexForm"

export { Login, ComplexForm }

export default {
    title: "useSubmit",
    component: BaseExampleForm,
    argTypes: { onSubmit: { action: "submit" } },
} as ComponentMeta<typeof BaseExampleForm>
