import type { ComponentMeta } from "@storybook/react"
import SelectForm from "./form-examples/select"
import BaseExampleForm from "./form-examples/base"
import LoginForm from "./form-examples/login-form"
import SignupForm from "./form-examples/signup-form"

export { LoginForm, SignupForm, SelectForm }

export default {
    title: "Form examples",
    component: BaseExampleForm,
} as ComponentMeta<typeof BaseExampleForm>
