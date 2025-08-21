import { useCallback } from "react"
import type { FC, PropsWithChildren } from "react"
import type {
    FunctionOnChange,
    IFieldWidgetSettings,
    IJsonFormRef,
    JsonFormErrors,
} from "../../types"
import JsonForm from "../../JsonForm"
import type { IChildFormsSetRef } from "../useFlatRef"

interface IInputWidgetProps {
    name?: string
    title?: string
    value?: any
    settings?: IFieldWidgetSettings
    onRef?: IChildFormsSetRef
    onError?: CallableFunction
    onChange?: CallableFunction
}

const DEF_SETTINGS: IFieldWidgetSettings = {
    scheme: [],
    multiple: false,
}

const InputWidget: FC<PropsWithChildren & IInputWidgetProps> = (props) => {
    const {
        name = "unknown",
        value,
        title,
        settings = DEF_SETTINGS,
        children,
        onRef,
        onChange,
        onError,
    } = props

    const _onError = useCallback(
        (e: JsonFormErrors) => {
            onError?.([e])
        },
        [onError]
    )

    const ref = useCallback(
        (ref: IJsonFormRef | null) => {
            // console.log(`[InputWidget: #${name}][ref]`, ref, onRef)

            onRef?.({ id: name, ref })
        },
        [onRef]
    )

    return (
        <JsonForm
            id={name}
            value={value}
            title={title}
            primary={false}
            {...settings}
            ref={ref}
            onChange={onChange as FunctionOnChange}
            onError={_onError}
        >
            {children}
        </JsonForm>
    )
}

export default InputWidget
