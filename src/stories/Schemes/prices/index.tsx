import { MouseEventHandler } from "react"
import { EnumSchemeItemType, IScheme, IWidgetSettings } from "../../../types"

import DEF_VALUE from "./defaults"
import view from "./view"

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

const WidgetName = "Price2"
const WidgetTitle = "Прайсы 2"

const scheme: IScheme = {
    id: WidgetName,
    scheme: [
        {
            name: "title",
            title: "Заголовок",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.title,
        },
        {
            name: "subtitle",
            title: "Подзаголовок",
            type: EnumSchemeItemType.TextBlock,
            def_value: DEF_VALUE.subtitle,
        },
        {
            name: "prices",
            title: "Цены",
            type: EnumSchemeItemType.Widget,
            multiple: true,
            def_value: DEF_VALUE.prices,
            scheme: [
                {
                    name: "title",
                    title: "Заголовок",
                    type: EnumSchemeItemType.Text,
                    def_value: "",
                },
                {
                    name: "price",
                    title: "Значение",
                    type: EnumSchemeItemType.Text,
                    def_value: "",
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

const setting: IWidgetSettings = {
    id: WidgetName,
    title: WidgetTitle,
    description: `Прайсы 2`,
    image: `/pic/5aec67ad9e3e1ee17dc8717d1e23e8c5zXnwX.png`,
    value: DEF_VALUE,
    scheme,
    view,
}

export { scheme }

export default setting

/*SCHEME END*/
