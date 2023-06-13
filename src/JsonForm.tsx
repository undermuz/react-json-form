/*SYSTEM IMPORTS*/
import { useEffect, useState, useRef, forwardRef } from "react"
import { ErrorBoundary } from "react-error-boundary"

/* TYPES */
import type {
    IJsonFormProps,
    IJsonFormRef,
    JsonFormErrors,
    TypeErrorItem,
} from "./types"

/* COMPONENTS */
import ErrorFallback from "./components/ErrorFallback"

/* HELPERS */
import { useDefSchemeValue, useSafeValue } from "./utils"
import { useJsonFormComponents } from "./UiContext"
import ValueContext from "./ValueContext"
import type { IErrors } from "@undermuz/use-form"
import Form from "./Form"

const JsonForm = forwardRef<IJsonFormRef, IJsonFormProps>((props, ref) => {
    const {
        multiple = false,
        scheme,
        level = 1,
        fillArrayDefault = true,
        onError,
    } = props

    const isMount = useRef(false)

    const [errors, setErrors] = useState<JsonFormErrors>(
        multiple ? ([] as TypeErrorItem[]) : ({} as IErrors)
    )

    const Components = useJsonFormComponents()

    const defValue = useDefSchemeValue(scheme)

    const value = useSafeValue(
        props.value,
        defValue,
        multiple,
        fillArrayDefault
    )

    const onErrorRef = useRef(onError)
    onErrorRef.current = onError

    useEffect(() => {
        if (isMount.current) {
            // console.log("[JsonForm][on: Errors]", errors)

            onErrorRef.current?.(errors)
        }
    }, [errors])

    useEffect(() => {
        isMount.current = true

        return () => {
            isMount.current = false
        }
    }, [])

    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
                // reset the state of your app so the error doesn't happen again
            }}
        >
            <ValueContext.Provider value={value}>
                <Components.JsonForm {...props}>
                    <Form
                        {...props}
                        ref={ref}
                        level={level}
                        errors={errors}
                        value={value}
                        def={defValue}
                        onError={setErrors}
                    />
                </Components.JsonForm>
            </ValueContext.Provider>
        </ErrorBoundary>
    )
})

JsonForm.displayName = "JsonForm"

export default JsonForm
