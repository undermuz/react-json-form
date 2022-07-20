import { MouseEventHandler } from "react"
// import { isNumber } from "underscore"
import { EnumSchemeItemType, IScheme } from "../../../types"

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

const WidgetName = "Price2"
const WidgetTitle = "Прайсы 2"

const isNumberic = (v: any) => !isNaN(parseInt(v as string))

const scheme: IScheme = {
    id: WidgetName,
    scheme: [
        {
            name: "title",
            title: "Заголовок",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.title,
            rules: [[[Boolean], "Поле обязательное"]],
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
                    rules: [[[Boolean], "Поле обязательное"]],
                },
                {
                    name: "price",
                    title: "Значение",
                    type: EnumSchemeItemType.Text,
                    def_value: 0,
                    rules: [
                        [[Boolean], "Поле обязательное"],
                        [[isNumberic], "Должно быть числом"],
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
