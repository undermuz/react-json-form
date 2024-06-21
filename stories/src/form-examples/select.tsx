import type { ComponentStory } from "@storybook/react"

import SelectScheme from "../Schemes/forms/async-select"
import BaseExampleForm from "./base"

const Template: ComponentStory<typeof BaseExampleForm> = (args) => {
    return <BaseExampleForm {...args} scheme={SelectScheme} />
}

const SelectForm = Template.bind({})

export default SelectForm
