"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            name: "date",
            title: "Дата",
            type: types_1.EnumSchemeItemType.Date,
            def_value: new Date(),
            rules: [[[Boolean], "Поле обязательное"]],
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
exports.default = scheme;
/*SCHEME END*/
