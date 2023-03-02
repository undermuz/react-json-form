import type { MouseEventHandler } from "react"
// import { isNumber } from "underscore"
import { EnumSchemeItemType } from "../../../types"
import type { IScheme } from "../../../types"

import DEF_VALUE from "./defaults"

export interface IPrice2ValuePricesItem {
    id: number
    title: string
}

export interface IPrice2ValuePrices {
    id: number
    title: string
    price: number
    is_active: boolean
    list: IPrice2ValuePricesItem[]
}

export interface IPrice2Value {
    title: string

    subtitle: string
    button_text: string
    prices: IPrice2ValuePrices[]
}

export interface IPrice2 {
    id: number
    value: IPrice2Value
    onButtonClick?: MouseEventHandler<HTMLAnchorElement> &
        MouseEventHandler<HTMLButtonElement>
}

/*SCHEME BEGIN*/

const WidgetName = "offer"
const WidgetTitle = "Offer"

const scheme: IScheme = {
    id: WidgetName,
    scheme: [
        {
            name: "title",
            title: "Title",
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
                        [["isNumeric"], "Должно быть числом"],
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
    single: true,
    multiple: false,
    title: WidgetTitle,
    name: WidgetName,
}

export default scheme

/*SCHEME END*/
