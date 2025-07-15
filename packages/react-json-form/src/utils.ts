import type {
    IUseFormFieldRule,
    IValues,
    IUseFormSettings,
    UseFormFieldRuleFunction,
    IErrors,
} from "@undermuz/use-form"
import { useMemo } from "react"
import { isArray } from "underscore"
import type {
    FieldRuleGenericFunction,
    FieldRuleSingleFunction,
    FieldTests,
    ISchemeItem,
    JsonFormFieldRule,
    TypeValue,
    TypeValueItem,
} from "./types"
import { EnumSchemeItemType } from "./types"

export const nonFieldTypes: Array<EnumSchemeItemType | string> = [
    EnumSchemeItemType.Submit,
]

export const isNumeric = (v: any) => !isNaN(parseInt(v as string))
export const isEmail = (value?: string) =>
    !value || value + "" == "" || value.indexOf("@") > -1
export const isPhone = (value?: string) => {
    if (!value) return true

    const phoneFilterExp = /[^\+\d]/gim
    const phoneValidateExp = /^\+\d{7,}/gim

    value = value.replace(phoneFilterExp, "")

    if (value[0] == "8" || value[0] == "7") {
        value = `+7${value.substring(1)}`
    }

    return phoneValidateExp.test(value)
}

export const isEmailOrPhone = (value?: string) => {
    if (isEmail(value)) {
        return true
    }

    if (isPhone(value)) {
        return true
    }

    return false
}

export const isRegexp: FieldRuleGenericFunction<[RegExp]> =
    (regexp: RegExp) => (value: unknown) =>
        regexp.test(`${value}`)

export const isNotRegexp: FieldRuleGenericFunction<[RegExp]> =
    (regexp: RegExp) => (value: unknown) =>
        !regexp.test(`${value}`)

export const isString = (value: unknown) => typeof value === "string"

export const isStringMaxLength: FieldRuleGenericFunction<[number]> =
    (length: number) => (value: unknown) =>
        isString(value) && (value as string).length <= length

export const isStringMinLength: FieldRuleGenericFunction<[number]> =
    (length: number) => (value: unknown) =>
        isString(value) && (value as string).length >= length

export const isStringMinMaxLength: FieldRuleGenericFunction<[number, number]> =
    (min_length: number, max_length: number) => (value: unknown) =>
        isString(value) &&
        (value as string).length >= min_length &&
        (value as string).length <= max_length

export const defaultFieldTests: FieldTests = {
    isNumeric,
    isEmail,
    isPhone,
    isEmailOrPhone,
    Boolean,
    isRegexp,
    isNotRegexp,
    isString,
    isStringMaxLength,
    isStringMinLength,
    isStringMinMaxLength,
}

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

    if (type == "files" && settings?.multiple) return []
    if (type == "files" && !settings?.multiple) return null

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

export const getFieldsScheme = (scheme: ISchemeItem[]) => {
    return scheme.filter(
        (item) => item.type && !nonFieldTypes.includes(item.type)
    )
}

export const useFieldsScheme = (scheme: ISchemeItem[]) => {
    return useMemo(() => {
        return getFieldsScheme(scheme)
    }, [scheme])
}

export const getDefValueForScheme = (scheme: ISchemeItem[]): TypeValueItem => {
    return getFieldsScheme(scheme).reduce(
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
    multiple: boolean = false,
    fillArrayDefault: boolean = true
) => {
    return useMemo(() => {
        if (
            unsafeValue === undefined ||
            (!multiple && Object.keys(unsafeValue).length === 0) ||
            (multiple && (!isArray(unsafeValue) || unsafeValue.length == 0))
        ) {
            if (multiple) {
                if (!fillArrayDefault) {
                    return []
                }

                return [{ ...defValue, id: 1 }]
            }

            return { ...defValue }
        }

        return unsafeValue
    }, [unsafeValue, multiple, defValue])
}

const getRules = (
    rules?: JsonFormFieldRule[],
    tests: FieldTests = defaultFieldTests
): IUseFormFieldRule[] => {
    if (!rules) return [] as IUseFormFieldRule[]

    const newRules: IUseFormFieldRule[] = []

    for (const rule of rules) {
        const [funcs, text] = rule

        const newFuncs: UseFormFieldRuleFunction[] = []

        for (let index = 0; index < funcs.length; index++) {
            const func = funcs[index]

            if (typeof func !== "string") {
                newFuncs.push(func as FieldRuleSingleFunction)

                continue
            }

            const [funcName, funcArgs] = func.split(":")

            if (!tests[funcName]) {
                throw new Error(`Cannot find test by name: ${funcName}`)
            }

            if (funcArgs) {
                const fn = tests[funcName] as FieldRuleGenericFunction

                newFuncs.push(fn(...JSON.parse(funcArgs)))
            } else {
                const fn = tests[funcName] as FieldRuleSingleFunction

                newFuncs.push(fn)
            }
        }

        newRules.push([newFuncs, text] as IUseFormFieldRule)
    }

    return newRules
}

export interface IUseSchemeToFormProps {
    scheme: ISchemeItem[]
    value: TypeValueItem
    tests?: FieldTests
    onChange: (v: IValues) => void
    onError: (v: IErrors) => void
}

export const useSchemeToForm = (
    props: IUseSchemeToFormProps
): IUseFormSettings => {
    const { scheme, value, tests, onChange, onError } = props

    return useMemo<IUseFormSettings>(() => {
        const config: IUseFormSettings = {
            fields: {},
            // options: {
            //     debug: true,
            // },
            value,
            onChange,
            onError,
        }

        for (const item of scheme) {
            const rules = getRules(item.rules, tests)

            config.fields[item.name] = {
                label: item.title || item.name,
                rules,
                initialValue: item.def_value,
            }
        }

        return config
    }, [scheme, value, onChange, onError])
}
