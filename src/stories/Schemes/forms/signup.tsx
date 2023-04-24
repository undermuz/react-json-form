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
            name: "password_repeat",
            title: "Repeat password",
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
            name: "company",
            title: "Create company",
            type: EnumSchemeItemType.Widget,
            def_value: {},
            scheme: [
                {
                    name: "name",
                    title: "Company name",
                    type: EnumSchemeItemType.Text,
                    def_value: "",
                    rules: [[["Boolean"], "Required"]],
                },
                {
                    name: "size",
                    title: "Company size (abt)",
                    type: EnumSchemeItemType.Text,
                    def_value: 0,
                    rules: [
                        [["Boolean"], "Поле обязательное"],
                        [["isNumeric"], "Должно быть числом"],
                    ],
                },
                {
                    name: "open_source",
                    title: "Open source?",
                    type: EnumSchemeItemType.Checkbox,
                    def_value: false,
                },
                {
                    name: "projects",
                    title: "Main projects",
                    type: EnumSchemeItemType.Widget,
                    multiple: true,
                    def_value: [],
                    scheme: [
                        {
                            name: "title",
                            title: "Name",
                            rules: [[["Boolean"], "Required"]],
                            type: EnumSchemeItemType.Text,
                            def_value: "",
                        },
                        {
                            name: "description",
                            title: "Description",
                            rules: [[["Boolean"], "Required"]],
                            type: EnumSchemeItemType.TextBlock,
                            def_value: "",
                        },
                    ],
                },
                {
                    name: "employee",
                    title: "Employee",
                    type: EnumSchemeItemType.Widget,
                    multiple: true,
                    def_value: [],
                    settings: {
                        viewType: "tabs",
                    },
                    scheme: [
                        {
                            name: "name",
                            title: "Name",
                            type: EnumSchemeItemType.Text,
                        },

                        {
                            name: "email",
                            title: "E-mail",
                            placeholder: "ex: youremail@mail.com",
                            type: EnumSchemeItemType.Input,
                            settings: {
                                inputType: "email",
                            },
                            rules: [[["isEmail"], "Incorrect e-mail"]],
                        },
                    ],
                },
            ],
        },
    ],
    title: WidgetTitle
}

export default SignUpScheme

/*SCHEME END*/
