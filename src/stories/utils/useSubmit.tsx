import type { ComponentStory } from "@storybook/react"

import LoginScheme from "../Schemes/forms/login"
import BaseExampleForm from "./base"

const Template: ComponentStory<typeof BaseExampleForm> = (args) => {
    return <BaseExampleForm {...args} scheme={LoginScheme} />
}

const LoginForm = Template.bind({})

export default LoginForm
