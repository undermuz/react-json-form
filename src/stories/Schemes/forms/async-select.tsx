import { EnumSchemeItemType } from "../../../types"
import type { IScheme } from "../../../types"

/*SCHEME BEGIN*/

const WidgetName = "Select"
const WidgetTitle = "Select"

const asyncSelectList = [
    { label: "Big", value: 1 },
    { label: "Small", value: 2 },
    { label: "Medium", value: 3 },
    { label: "Xs", value: 4 },
    { label: "Xxs", value: 5 },
    { label: "Xl", value: 6 },
    { label: "Xxl", value: 7 },
    { label: "2xl", value: 8 },
    { label: "3xl", value: 9 },
]

const SelectScheme: IScheme = {
    id: WidgetName,
    scheme: [
        {
            name: "multiple-async-list",
            title: "Multiple async list (API)",
            type: EnumSchemeItemType.Select,
            settings: {
                useApi: "api::async-select.list",
                multiple: true,
            },
            def_value: [4, 5, 6],
        },
        {
            name: "multiple-simple-list",
            title: "Multiple simple list",
            type: EnumSchemeItemType.Select,
            settings: {
                options: asyncSelectList,
                multiple: true,
            },
            def_value: [4, 5, 6],
        },
        {
            name: "single-async-list",
            title: "Single async list (API)",
            type: EnumSchemeItemType.Select,
            settings: {
                useApi: "api::async-select.list",
            },
            def_value: 5,
        },
        {
            name: "single-simple-list",
            title: "Single simple list",
            type: EnumSchemeItemType.Select,
            settings: {
                options: asyncSelectList,
            },
            def_value: 4,
        },
    ],
    title: WidgetTitle,
}

export default SelectScheme

/*SCHEME END*/
