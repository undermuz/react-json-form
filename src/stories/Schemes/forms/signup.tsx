import { EnumSchemeItemType } from "../../../types"
import type { IScheme } from "../../../types"

/*SCHEME BEGIN*/

const WidgetName = "SignUp"
const WidgetTitle = "SignUp"

const SignUpScheme: IScheme = {
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
            name: "about",
            title: "About",
            type: EnumSchemeItemType.Widget,
            multiple: false,
            def_value: {},
            scheme: [
                {
                    name: "title",
                    title: "Заголовок",
                    type: EnumSchemeItemType.Text,
                    def_value: "",
                    rules: [[["Boolean"], "Поле обязательное"]],
                },
                {
                    name: "price",
                    title: "Значение",
                    type: EnumSchemeItemType.Text,
                    def_value: 0,
                    rules: [
                        [["Boolean"], "Поле обязательное"],
                        [["isNumeric"], "Должно быть числом"],
                    ],
                },
                {
                    name: "is_active",
                    title: "Активная?",
                    type: EnumSchemeItemType.Checkbox,
                    def_value: false,
                },
                {
                    name: "list",
                    title: "Пункты",
                    type: EnumSchemeItemType.Widget,
                    multiple: true,
                    def_value: [],
                    scheme: [
                        {
                            name: "title",
                            title: "Заголовок",
                            rules: [[["Boolean"], "Required"]],
                            type: EnumSchemeItemType.Text,
                            def_value: "",
                        },
                    ],
                },
            ],
        },
    ],
    single: true,
    multiple: false,
    title: WidgetTitle,
    name: WidgetName,
}

export default SignUpScheme

/*SCHEME END*/
