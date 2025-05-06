/*SYSTEM IMPORTS*/
import {
    useEffect,
    useState,
    useRef,
    forwardRef,
    type PropsWithChildren,
    type FC,
    type ReactElement,
} from "react"

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
import { useJsonFormComponents } from "./contexts/ui"
import ValueContext from "./contexts/value"
import type { IErrors } from "@undermuz/use-form"
import Form from "./Form"
import ContextId from "./contexts/id"

const ContextIdForward: FC<{ level?: number } & PropsWithChildren> = ({
    level = 1,
    children,
}): ReactElement<any, any> | null => {
    const contextId = useRef({ lastId: 0 })

    if (level > 1) {
        return (children as ReactElement) || null
    }

    return (
        <ContextId.Provider value={contextId.current}>
            {children || null}
        </ContextId.Provider>
    )
}

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
        if (!isMount.current) {
            return
        }

        onErrorRef.current?.(errors)
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
            <ContextIdForward level={level}>
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
            </ContextIdForward>
        </ErrorBoundary>
    )
})

JsonForm.displayName = "JsonForm"

export default JsonForm
