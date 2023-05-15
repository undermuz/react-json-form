import { EnumSchemeItemType } from "../../types"
import type { IScheme } from "../../types"

/*SCHEME BEGIN*/

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
            name: "remember",
            title: "Remember?",
            type: EnumSchemeItemType.Checkbox,
            def_value: true,
        },
    ],
    title: WidgetTitle,
}

export default LoginScheme

/*SCHEME END*/
