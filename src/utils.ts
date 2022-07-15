import { useMemo } from "react"
import { isArray } from "underscore"
import { ISchemeItem, TypeValue, TypeValueItem } from "./types"

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
