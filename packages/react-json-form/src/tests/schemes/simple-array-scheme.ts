import { EnumSchemeItemType, type IScheme } from "../../types"

const simpleArrayScheme: IScheme = {
    id: "simple",
    scheme: [
        {
            name: "prices",
            title: "Prices",
            type: EnumSchemeItemType.Widget,
            multiple: true,
            settings: {
                fillArrayDefault: false
            },
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
                    def_value: "",
                    rules: [
                        [["Boolean"], "Required"],
                        [["isNumeric"], "Должно быть числом"],
                    ],
                },
                {
                    name: "is_active",
                    title: "Is active?",
                    type: EnumSchemeItemType.Checkbox,
                    def_value: false,
                },
            ],
        },
    ],
    title: "Simple",
}

export default simpleArrayScheme
