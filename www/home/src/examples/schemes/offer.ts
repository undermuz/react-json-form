import { EnumSchemeItemType, type IScheme } from "@undermuz/react-json-form"
import DEF_VALUE from "./offer-defaults"

const OfferScheme: IScheme = {
    id: "offer",
    title: "Offer",
    scheme: [
        {
            name: "title",
            title: "Title",
            settings: { showToggle: true },
            placeholder: "Type a fun title...",
            description: "The main title of a page",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.title,
            rules: [[["Boolean"], "Required"]],
        },
        {
            name: "size",
            title: "Offer Size",
            type: EnumSchemeItemType.Select,
            settings: {
                useApi: "api::size.list",
                showToggle: true,
            },
            def_value: null,
            rules: [[["Boolean"], "Required"]],
        },
        {
            name: "subtitle",
            title: "Subtitle",
            type: EnumSchemeItemType.TextBlock,
            def_value: DEF_VALUE.subtitle,
        },
        {
            name: "date",
            title: "Date",
            type: EnumSchemeItemType.Date,
            settings: { showToggle: true },
            def_value: new Date(),
            rules: [[["Boolean"], "Required"]],
        },
        {
            name: "prices",
            title: "Prices",
            type: EnumSchemeItemType.Widget,
            multiple: true,
            def_value: DEF_VALUE.prices,
            settings: {
                viewType: "tabs",
                showToggle: true,
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
                    title: "Price value",
                    type: EnumSchemeItemType.Text,
                    def_value: 0,
                    rules: [
                        [["Boolean"], "Required"],
                        [["isNumeric"], "Must be a number"],
                    ],
                },
                {
                    name: "is_active",
                    title: "Is active?",
                    type: EnumSchemeItemType.Checkbox,
                    def_value: false,
                },
                {
                    name: "list",
                    title: "Advantages",
                    type: EnumSchemeItemType.Widget,
                    multiple: true,
                    def_value: [],
                    scheme: [
                        {
                            name: "title",
                            title: "Title",
                            type: EnumSchemeItemType.Text,
                            def_value: "",
                        },
                    ],
                },
            ],
        },
    ],
}

export default OfferScheme
