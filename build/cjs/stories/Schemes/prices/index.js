"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheme = void 0;
var tslib_1 = require("tslib");
// import { isNumber } from "underscore"
var types_1 = require("../../../types");
var defaults_1 = tslib_1.__importDefault(require("./defaults"));
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
            type: types_1.EnumSchemeItemType.Text,
            def_value: defaults_1.default.title,
            rules: [[[Boolean], "Поле обязательное"]],
        },
        {
            name: "subtitle",
            title: "Подзаголовок",
            type: types_1.EnumSchemeItemType.TextBlock,
            def_value: defaults_1.default.subtitle,
        },
        {
            name: "prices",
            title: "Цены",
            type: types_1.EnumSchemeItemType.Widget,
            multiple: true,
            def_value: defaults_1.default.prices,
            scheme: [
                {
                    name: "title",
                    title: "Заголовок",
                    type: types_1.EnumSchemeItemType.Text,
                    def_value: "",
                    rules: [[[Boolean], "Поле обязательное"]],
                },
                {
                    name: "price",
                    title: "Значение",
                    type: types_1.EnumSchemeItemType.Text,
                    def_value: 0,
                    rules: [
                        [[Boolean], "Поле обязательное"],
                        [[isNumberic], "Должно быть числом"],
                    ],
                },
                {
                    name: "is_active",
                    title: "Активная?",
                    type: types_1.EnumSchemeItemType.Checkbox,
                    def_value: false,
                },
                {
                    name: "list",
                    title: "Пункты",
                    type: types_1.EnumSchemeItemType.Widget,
                    multiple: true,
                    def_value: [],
                    scheme: [
                        {
                            name: "title",
                            title: "Заголовок",
                            type: types_1.EnumSchemeItemType.Text,
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
exports.scheme = scheme;
var setting = {
    id: WidgetName,
    title: WidgetTitle,
    description: "\u041F\u0440\u0430\u0439\u0441\u044B 2",
    image: "/pic/5aec67ad9e3e1ee17dc8717d1e23e8c5zXnwX.png",
    value: defaults_1.default,
    scheme: scheme,
};
exports.default = setting;
/*SCHEME END*/
