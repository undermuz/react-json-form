/*SYSTEM IMPORTS*/
import type React from "react"
import { useCallback } from "react"
import { ErrorBoundary } from "react-error-boundary"

/* TYPES */
import type { IJsonFormProps, TypeValueItem } from "./types"

/* COMPONENTS */
import ErrorFallback from "./components/ErrorFallback"

import FlatForm from "./FlatForm"
import ArrayForm from "./ArrayForm"

/* HELPERS */
import { useDefSchemeValue, useSafeValue } from "./utils"
import { useJsonFormComponents } from "./UiContext"

const JsonForm: React.FC<IJsonFormProps> = (props) => {
    const { multiple = false, primary = true, scheme = [], onChange } = props

    const defValue = useDefSchemeValue(scheme)

    const value = useSafeValue(props.value, defValue, multiple)

    const handleChange = useCallback(
        (newValue: Record<string, any>) => {
            onChange({ ...value, ...newValue })
        },
        [value, onChange]
    )

    const Components = useJsonFormComponents()

    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
                // reset the state of your app so the error doesn't happen again
            }}
        >
            <Components.JsonForm {...props}>
                {multiple && (
                    <ArrayForm
                        primary={primary}
                        scheme={scheme}
                        defValue={defValue}
                        value={value as TypeValueItem[]}
                        onChange={onChange}
                    />
                )}

                {!multiple && (
                    <FlatForm
                        primary={primary}
                        scheme={scheme}
                        value={value as TypeValueItem}
                        onChange={handleChange}
                    />
                )}
            </Components.JsonForm>
        </ErrorBoundary>
    )
}

export default JsonForm
