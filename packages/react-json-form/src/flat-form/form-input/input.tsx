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
    onChange?: (value: unknown) => void
    onFocus?: () => void
    onBlur?: () => void
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
        if (type === EnumSchemeItemType.Files) {
            if (!Ui?.Controls?.FileInput) {
                console.error("No Ui.Controls.FileInput provided")

                return null
            }

            return <Ui.Controls.FileInput {...props} />
        }

        if (type === EnumSchemeItemType.Widget) {
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

        if (type === EnumSchemeItemType.Select) {
            return <InputSelect {...props} />
        }

        if (type === EnumSchemeItemType.Date) {
            if (!Ui?.Controls?.Date) {
                console.error("No Ui.Controls.Date provided")

                return null
            }

            return <Ui.Controls.Date {...props} />
        }

        if (type === EnumSchemeItemType.Checkbox) {
            if (!Ui?.Controls?.CheckBox) {
                console.error("No Ui.Controls.CheckBox provided")

                return null
            }

            return <Ui.Controls.CheckBox {...props} />
        }

        if (type === EnumSchemeItemType.TextBlock) {
            if (!Ui?.Controls?.TextBlock) {
                console.error("No Ui.Controls.TextBlock provided")

                return null
            }

            return <Ui.Controls.TextBlock {...props} />
        }

        if (customComponents && customComponents[type]) {
            const CustomCmp = customComponents[type]

            if (CustomCmp) return <CustomCmp {...props} />
        }

        if (!Ui?.Controls?.Input) {
            console.error("No Ui.Controls.Input provided")

            return null
        }

        return <Ui.Controls.Input {...props} />
    } catch (e) {
        console.error(`Error <Input {...${JSON.stringify(props)} }>:`)
        console.error(e)

        return <div className="alert alert-danger">{(e as Error).message}</div>
    }
}

export default Input
