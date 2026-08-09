import { EnumSchemeItemType, type IScheme } from "@undermuz/react-json-form"

const LayoutScheme: IScheme = {
    id: "simple",
    title: "Layout demo",
    scheme: [
        {
            name: "field1",
            title: "Field 1",
            placeholder: "ex: youremail@mail.com",
            type: EnumSchemeItemType.Input,
            settings: { inputType: "email" },
            def_value: "",
            rules: [
                [["Boolean"], "Required"],
                [["isEmail"], "Incorrect e-mail"],
            ],
        },
        {
            name: "field2",
            title: "Field 2",
            type: EnumSchemeItemType.Input,
            settings: { inputType: "password" },
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
        {
            name: "prices",
            title: "Prices",
            type: EnumSchemeItemType.Widget,
            multiple: true,
            def_value: [],
            scheme: [
                {
                    name: "title",
                    title: "Title",
                    type: EnumSchemeItemType.Text,
                    def_value: "",
                    rules: [[["Boolean"], "Required"]],
                },
                {
                    name: "price",
                    title: "Price",
                    type: EnumSchemeItemType.Text,
                    def_value: 0,
                    rules: [
                        [["Boolean"], "Required"],
                        [["isNumeric"], "Must be a number"],
                    ],
                },
            ],
        },
    ],
}

export default LayoutScheme
