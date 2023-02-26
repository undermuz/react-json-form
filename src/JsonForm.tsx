/*SYSTEM IMPORTS*/
import type { FC } from "react"
import { useCallback, useEffect, useState, useRef } from "react"
import { ErrorBoundary } from "react-error-boundary"

/* TYPES */
import type {
    IJsonFormProps,
    JsonFormErrors,
    TypeErrorItem,
    TypeValue,
    TypeValueItem,
} from "./types"

/* COMPONENTS */
import ErrorFallback from "./components/ErrorFallback"

import FlatForm from "./FlatForm"
import ArrayForm from "./ArrayForm"

/* HELPERS */
import { useDefSchemeValue, useSafeValue } from "./utils"
import { useJsonFormComponents } from "./UiContext"
import ValueContext from "./ValueContext"
import type { IErrors } from "@undermuz/use-form"

const Form: FC<
    IJsonFormProps & {
        def: TypeValueItem
        value: TypeValue
        errors: IErrors | TypeErrorItem[]
        onError: (e: IErrors | TypeErrorItem[]) => void
    }
> = (props) => {
    const {
        multiple = false,
        primary = true,
        scheme = [],
        errors,
        def,
        value,
        onChange,
        onError,
    } = props

    const changeFlat = useCallback(
        (newValue: TypeValueItem) => {
            onChange({ ...value, ...newValue })
        },
        [value, onChange]
    )

    const setErrorsFlat = useCallback(
        (newErrors: IErrors) => {
            onError(newErrors)
        },
        [errors, onError]
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
                onError={setErrorsFlat}
            />
        )

    return (
        <ArrayForm
            {...rest}
            errors={errors as TypeErrorItem[]}
            defValue={def}
            value={value as TypeValueItem[]}
            onChange={onChange}
            onError={onError}
        />
    )
}

const JsonForm: FC<IJsonFormProps> = (props) => {
    const { multiple = false, scheme, onError } = props

    const [errors, setErrors] = useState<JsonFormErrors>(
        multiple ? ([] as TypeErrorItem[]) : ({} as IErrors)
    )

    const Components = useJsonFormComponents()

    const defValue = useDefSchemeValue(scheme)

    const value = useSafeValue(props.value, defValue, multiple)

    const isMount = useRef(false)
    const onErrorRef = useRef(onError)
    onErrorRef.current = onError

    useEffect(() => {
        if (isMount.current) {
            console.log("[JsonForm][on: Errors]", errors)

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
                        errors={errors}
                        value={value}
                        def={defValue}
                        onError={setErrors}
                    />
                </Components.JsonForm>
            </ValueContext.Provider>
        </ErrorBoundary>
    )
}

export default JsonForm
