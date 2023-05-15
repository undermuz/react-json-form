import { Button } from "@chakra-ui/react"
import type { ComponentStory } from "@storybook/react"
import { type PropsWithChildren, type FC } from "react"
import CustomComponentsContext from "../../CustomComponentsContext"
import { type IInput } from "../../input"
import { EnumSchemeItemType, type IScheme } from "../../types"

import BaseExampleForm from "./base"

const ToggleButton: FC<PropsWithChildren & IInput> = (props) => {
    return (
        <Button type="button" onClick={() => props.onChange?.(!props.value)}>
            {props.value ? "✅ Allowed" : "❌ Disallowed"}
        </Button>
    )
}

const customComponents = {
    ToggleButton,
}

const WidgetName = "Login"
const WidgetTitle = "Login"

const LoginScheme: IScheme = {
    id: WidgetName,
    scheme: [
        {
            name: "email",
            title: "E-mail",
            placeholder: "ex: youremail@mail.com",
            type: EnumSchemeItemType.Input,
            settings: {
                inputType: "email",
            },
            def_value: "",
            rules: [
                [["Boolean"], "Required"],
                [["isEmail"], "Incorrect e-mail"],
            ],
        },
        {
            name: "password",
            title: "Password",
            type: EnumSchemeItemType.Input,
            settings: {
                inputType: "password",
            },
            def_value: "",
            rules: [
                [["Boolean"], "Required"],
                [
                    ["isStringMinMaxLength:[6,18]"],
                    "Min length: 6; Max length: 18",
                ],
            ],
        },
        {
            name: "allowed_send_news",
            title: "Allow send news?",
            type: "ToggleButton",
            def_value: true,
        },
    ],
    title: WidgetTitle,
}

const Template: ComponentStory<typeof BaseExampleForm> = (args) => {
    return (
        <CustomComponentsContext.Provider value={customComponents}>
            <BaseExampleForm {...args} scheme={LoginScheme} />
        </CustomComponentsContext.Provider>
    )
}

const LoginForm = Template.bind({})

export default LoginForm
