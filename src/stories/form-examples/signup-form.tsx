import type { ComponentStory } from "@storybook/react"

import SignupScheme from "../Schemes/forms/signup"
import BaseExampleForm from "./base"

const Template: ComponentStory<typeof BaseExampleForm> = (args) => {
    return <BaseExampleForm {...args} scheme={SignupScheme} />
}

const SignupForm = Template.bind({})

export default SignupForm
