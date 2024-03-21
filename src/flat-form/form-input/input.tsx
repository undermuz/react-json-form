/*SYSTEM IMPORTS*/
import { type PropsWithChildren } from "react"
import type { FC } from "react"
import { noop } from "underscore"

import type {
    FunctionOnChange,
    IFieldWidgetSettings,
    TypeSchemeItemSettings,
} from "../../types"

import { EnumSchemeItemType } from "../../types"

import { useJsonFormUi } from "../../contexts/ui"
import InputWidget from "../../inputs/inputWIdget"
import type { IChildFormsSetRef } from "../useFlatRef"
import { useJsonFormCustomComponents } from "../../custom-components/context"
import { InputSelect } from "./input-select"

export interface IInput {
    id?: string
    name?: string
    placeholder?: string
    value?: any
    isDisabled?: boolean
    type: EnumSchemeItemType | string
    hasError?: boolean
    title: string
    settings: TypeSchemeItemSettings
    onFormsRef?: IChildFormsSetRef
    onError?: CallableFunction
    onChange?: CallableFunction
    onFocus?: CallableFunction
    onBlur?: CallableFunction
}

const Input: FC<PropsWithChildren & IInput> = (props) => {
    const {
        name,
        value = "",
        type,
        title,
        settings = {},
        children,
        onFormsRef,
    } = props

    const { onChange = noop, onError = noop } = props

    const Ui = useJsonFormUi()
    const customComponents = useJsonFormCustomComponents()

    try {
        if (type == EnumSchemeItemType.Files) {
            return <Ui.Controls.FileInput {...props} />
        }

        if (type == EnumSchemeItemType.Widget) {
            return (
                <InputWidget
                    name={name}
                    value={value}
                    title={title}
                    settings={settings as IFieldWidgetSettings}
                    onRef={onFormsRef}
                    onChange={onChange as FunctionOnChange}
                    onError={onError}
                >
                    {children}
                </InputWidget>
            )
        }

        if (type == EnumSchemeItemType.Select) {
            return <InputSelect {...props} />
        }

        if (type === EnumSchemeItemType.Date) {
            return <Ui.Controls.Date {...props} />
        }

        if (type === EnumSchemeItemType.Checkbox) {
            return <Ui.Controls.CheckBox {...props} />
        }

        if (type == EnumSchemeItemType.TextBlock) {
            return <Ui.Controls.TextBlock {...props} />
        }

        if (customComponents && customComponents[type]) {
            const CustomCmp = customComponents[type]

            if (CustomCmp) return <CustomCmp {...props} />
        }

        return <Ui.Controls.Input {...props} />
    } catch (e) {
        console.error(`Error <Input {...${JSON.stringify(props)} }>:`)
        console.error(e)

        return <div className="alert alert-danger">{(e as Error).message}</div>
    }
}

export default Input
