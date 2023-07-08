import type { ComponentStory } from "@storybook/react"

import AsyncSelectScheme from "../Schemes/forms/async-select"
import BaseExampleForm from "./base"

const Template: ComponentStory<typeof BaseExampleForm> = (args) => {
    return <BaseExampleForm {...args} scheme={AsyncSelectScheme} />
}

const AsyncSelectForm = Template.bind({})

export default AsyncSelectForm
