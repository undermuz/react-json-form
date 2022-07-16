/*SYSTEM IMPORTS*/
import React, { ReactNode, useCallback } from "react"
import { ErrorBoundary } from "react-error-boundary"

/* TYPES */
import { FunctionOnChange, IScheme, TypeValue, TypeValueItem } from "./types"

/* COMPONENTS */
import ErrorFallback from "./components/ErrorFallback"

import FlatForm from "./FlatForm"
import ArrayForm from "./ArrayForm"

/* HELPERS */
import { useDefSchemeValue, useSafeValue } from "./utils"
import { useJsonFormUi } from "./UiContext"

interface IJsonFormParams {
    value: TypeValue
    primary?: boolean
    header?: ReactNode
    onChange: FunctionOnChange
}

type IJsonForm = IJsonFormParams &
    Partial<Pick<IScheme, "id" | "title">> &
    Pick<IScheme, "multiple" | "scheme">

const JsonForm: React.FC<IJsonForm> = (props) => {
    const {
        id,
        title,
        header = null,
        multiple = false,
        primary = true,
        scheme = [],
        onChange,
    } = props

    const defValue = useDefSchemeValue(scheme)

    const value = useSafeValue(props.value, defValue, multiple)

    const handleChange = useCallback(
        (newValue: Record<string, any>) => {
            onChange({ ...value, ...newValue })
        },
        [value, onChange]
    )

    const Ui = useJsonFormUi()

    return (
        <Ui.Container>
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => {
                    // reset the state of your app so the error doesn't happen again
                }}
            >
                <Ui.Header id={id} primary={primary} title={title}>
                    {header}
                </Ui.Header>

                <Ui.Body>
                    {multiple && (
                        <ArrayForm
                            scheme={scheme}
                            defValue={defValue}
                            value={value as TypeValueItem[]}
                            onChange={onChange}
                        />
                    )}

                    {!multiple && (
                        <FlatForm
                            scheme={scheme}
                            value={value as TypeValueItem}
                            onChange={handleChange}
                        />
                    )}
                </Ui.Body>
            </ErrorBoundary>
        </Ui.Container>
    )
}

export default JsonForm
