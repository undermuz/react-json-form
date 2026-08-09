import type { ApiValue } from "@undermuz/react-json-form"
import { ASYNC_SELECT_OPTIONS } from "./schemes/async-select"

const SIZE_OPTIONS = [
    { label: "S", value: "s" },
    { label: "M", value: "m" },
    { label: "L", value: "l" },
    { label: "XL", value: "xl" },
]

function filterOptions<T extends { label: string; value: unknown }>(
    list: T[],
    searchOrIds?: string | { ids: unknown[] }
): T[] {
    if (searchOrIds && typeof searchOrIds === "string") {
        return list.filter((v) =>
            v.label.toLowerCase().includes(searchOrIds.toLowerCase())
        )
    }

    if (
        searchOrIds &&
        typeof searchOrIds !== "string" &&
        Array.isArray(searchOrIds.ids)
    ) {
        return list.filter((v) => searchOrIds.ids.includes(v.value))
    }

    return list
}

export const demoApi: ApiValue = {
    "api::async-select.list": async (searchOrIds?: string | { ids: unknown[] }) =>
        filterOptions(ASYNC_SELECT_OPTIONS, searchOrIds),
    "api::size.list": async (searchOrIds?: string | { ids: unknown[] }) =>
        filterOptions(SIZE_OPTIONS, searchOrIds),
}
