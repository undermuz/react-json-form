import { useMemo } from "react"
import { isArray } from "underscore"
import {
    EnumSchemeItemType,
    ISchemeItem,
    TypeValue,
    TypeValueItem,
} from "./types"

export const getDefValueForItem = (item: ISchemeItem) => {
    const {
        def_value = "",
        type = EnumSchemeItemType.Text,
        settings = {},
        multiple = false,
    } = item

    if (def_value) {
        return def_value
    }

    if (type == "checkbox") return false

    if (type == "files") return []

    if (type == "widget") {
        if (multiple) {
            return []
        }

        return {}
    }

    if (type == EnumSchemeItemType.GeoCoordinates)
        return {
            address: "",
            lat: 0,
            lng: 0,
        }

    if (type == "select") {
        if (settings.multiple) {
            return []
        }

        if (settings.options && settings.options.length) {
            // def_value = settings.options[0]
        } else {
            return 0
        }
    }

    return def_value
}

export const getDefValueForScheme = (scheme: ISchemeItem[]): TypeValueItem => {
    return scheme.reduce(
        (new_value, current) => ({
            ...new_value,
            [current.name]: current.def_value,
        }),
        {}
    )
}

export const useDefSchemeValue = (scheme: ISchemeItem[]) => {
    return useMemo(() => {
        return getDefValueForScheme(scheme)
    }, [scheme])
}

export const useSafeValue = (
    unsafeValue: TypeValue,
    defValue: TypeValueItem,
    multiple: boolean = false
) => {
    return useMemo(() => {
        if (
            unsafeValue === undefined ||
            (multiple && (!isArray(unsafeValue) || unsafeValue.length == 0))
        ) {
            if (multiple) {
                return [{ ...defValue, id: 1 }]
            }

            return { ...defValue }
        }

        return unsafeValue
    }, [unsafeValue, multiple, defValue])
}
