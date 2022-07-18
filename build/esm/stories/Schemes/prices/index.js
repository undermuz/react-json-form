// import { isNumber } from "underscore"
import { EnumSchemeItemType } from "../../../types";
import DEF_VALUE from "./defaults";
/*SCHEME BEGIN*/
var WidgetName = "Price2";
var WidgetTitle = "Прайсы 2";
var isNumberic = function (v) { return !isNaN(parseInt(v)); };
var scheme = {
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
};
var setting = {
    id: WidgetName,
    title: WidgetTitle,
    description: "\u041F\u0440\u0430\u0439\u0441\u044B 2",
    image: "/pic/5aec67ad9e3e1ee17dc8717d1e23e8c5zXnwX.png",
    value: DEF_VALUE,
    scheme: scheme,
};
export { scheme };
export default setting;
/*SCHEME END*/
