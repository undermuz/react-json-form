import type { ComponentStory } from "@storybook/react"

import SignUpScheme from "../Schemes/forms/signup"
import BaseExampleForm from "./base"

const Template: ComponentStory<typeof BaseExampleForm> = (args) => {
    return <BaseExampleForm {...args} scheme={SignUpScheme} />
}

const LoginForm = Template.bind({})

export default LoginForm
