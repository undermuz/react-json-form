import { EnumSchemeItemType } from "../../../types"
import type { IScheme } from "../../../types"

/*SCHEME BEGIN*/

const WidgetName = "AsyncSelect"
const WidgetTitle = "AsyncSelect"

const AsyncSelectScheme: IScheme = {
    id: WidgetName,
    scheme: [
        {
            name: "list",
            title: "Async list",
            type: EnumSchemeItemType.Select,
            settings: {
                useApi: "api::async-select.list",
                multiple: true,
            },
            def_value: [4, 5, 6],
        },
    ],
    title: WidgetTitle,
}

export default AsyncSelectScheme

/*SCHEME END*/
