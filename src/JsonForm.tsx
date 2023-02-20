/*SYSTEM IMPORTS*/
import type { FC } from "react"
import { useCallback } from "react"
import { ErrorBoundary } from "react-error-boundary"

/* TYPES */
import type { IJsonFormProps, TypeValue, TypeValueItem } from "./types"

/* COMPONENTS */
import ErrorFallback from "./components/ErrorFallback"

import FlatForm from "./FlatForm"
import ArrayForm from "./ArrayForm"

/* HELPERS */
import { useDefSchemeValue, useSafeValue } from "./utils"
import { useJsonFormComponents } from "./UiContext"
import ValueContext from "./ValueContext"

const Form: FC<IJsonFormProps & { def: TypeValueItem; value: TypeValue }> = (
    props
) => {
    const {
        multiple = false,
        primary = true,
        scheme = [],
        def,
        value,
        onChange,
    } = props

    const changeFlat = useCallback(
        (newValue: Record<string, any>) => {
            onChange({ ...value, ...newValue })
        },
        [value, onChange]
    )

    const rest = {
        primary,
        scheme,
    }

    if (!multiple)
        return (
            <FlatForm
                {...rest}
                value={value as TypeValueItem}
                onChange={changeFlat}
            />
        )

    return (
        <ArrayForm
            {...rest}
            defValue={def}
            value={value as TypeValueItem[]}
            onChange={onChange}
        />
    )
}

const JsonForm: FC<IJsonFormProps> = (props) => {
    const { multiple = false, scheme } = props

    const Components = useJsonFormComponents()

    const defValue = useDefSchemeValue(scheme)

    const value = useSafeValue(props.value, defValue, multiple)

    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
                // reset the state of your app so the error doesn't happen again
            }}
        >
            <ValueContext.Provider value={value}>
                <Components.JsonForm {...props}>
                    <Form {...props} value={value} def={defValue} />
                </Components.JsonForm>
            </ValueContext.Provider>
        </ErrorBoundary>
    )
}

export default JsonForm
