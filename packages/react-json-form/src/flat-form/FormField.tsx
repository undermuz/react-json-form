import type { FC, PropsWithChildren } from "react"
import type { ISchemeItem } from "../types"
import type { IChildFormsSetRef } from "./useFlatRef"

// import { useRef } from "react"
import { omit } from "underscore"
import { useFormContext, ConnectToForm } from "@undermuz/use-form"

import Input from "./form-input/input"
import { EnumSchemeItemType } from "../types"
import { useJsonFormUi } from "../contexts/ui"
import { useJsonFormUniqId } from "../contexts/id"
import { JFL_Nothing } from "../components/JsonFormLayout"

export type IFormFieldProps = ISchemeItem & {
    isLast?: boolean
    isFormPrimary: boolean
    level: number
    as?: any
    onFormsRef?: IChildFormsSetRef
}

export type IFormFieldCustomProps<T = unknown> = Record<string, T>

const getFieldSettings = (props: IFormFieldProps) => {
    const { type = EnumSchemeItemType.Widget, settings = {}, level } = props

    if (type == EnumSchemeItemType.Widget) {
        const { scheme, multiple = false } = props

        return { ...settings, scheme, multiple, level: level + 1 }
    }

    return settings
}

// const useUniqId = (): number => {
//     const ref = useRef<number | null>(null)

//     if (!globalThis["__current_id__"]) {
//         globalThis["__current_id__"] = 0
//     }

//     if (ref.current === null) {
//         const field_id = ++globalThis["__current_id__"]

//         ref.current = field_id
//     }

//     return ref.current
// }

const FormField: FC<
    PropsWithChildren & IFormFieldProps & IFormFieldCustomProps
> = ({ children, ...props }) => {
    const Ui = useJsonFormUi()

    const Field = Ui?.Field ? Ui.Field : JFL_Nothing

    const form = useFormContext()

    const fieldId = useJsonFormUniqId()

    const errors = form.errors[props.name]

    const isDisabled = form.values[`${props.name}__isDisabled`] || false

    const {
        as: Cmp = Field,
        isLast = false,
        isFormPrimary,
        title,
        description,
        placeholder,
        settings,
        name,
        type = EnumSchemeItemType.Widget,
        onFormsRef,
        ..._customProps
    } = props

    const id = `form-field-${fieldId}` + (name ? `--${name}` : "")

    // console.log(id)

    const customProps: Omit<IFormFieldProps, keyof IFormFieldProps> = omit(
        _customProps,
        ["def_value", "single", "multiple", "rules", "scheme", "level"]
    )

    const { showLabel, showToggle } = settings || {}

    const body = (
        <Cmp
            {...customProps}
            id={id}
            isLast={isLast}
            type={type}
            name={name}
            primary={isFormPrimary}
            showLabel={showLabel}
            showToggle={showToggle}
            title={title}
            description={description}
            errors={errors}
            settings={getFieldSettings(props)}
        >
            <ConnectToForm id={id} name={name} disabled={isDisabled}>
                <Input
                    {...customProps}
                    type={type}
                    placeholder={placeholder}
                    title={title}
                    settings={getFieldSettings(props)}
                    onFormsRef={onFormsRef}
                >
                    {children}
                </Input>
            </ConnectToForm>
        </Cmp>
    )

    if (!Ui?.ItemWrapper) {
        return body
    }

    return (
        <Ui.ItemWrapper
            isLast={isLast}
            type={type}
            primary={isFormPrimary}
            title={title}
        >
            {body}
        </Ui.ItemWrapper>
    )
}

export default FormField
