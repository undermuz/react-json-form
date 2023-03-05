import type { FC } from "react"
import type { ISchemeItem } from "./types"
import { useFormContext, ConnectToForm } from "@undermuz/use-form"

import Input from "./input"
import { EnumSchemeItemType } from "./types"
import { useJsonFormUi } from "./UiContext"

export type IFormFieldProps = ISchemeItem & {
    isLast?: boolean
    isFormPrimary: boolean
    level: number
    as?: any
}

const getFieldSettings = (props: IFormFieldProps) => {
    const { type = EnumSchemeItemType.Widget, settings = {}, level } = props

    if (type == EnumSchemeItemType.Widget) {
        const { scheme, multiple = false } = props

        return { ...settings, scheme, multiple, level: level + 1 }
    }

    if (type == EnumSchemeItemType.Files) {
        return { settings }
    }

    return settings
}

const FormField: FC<IFormFieldProps> = (props) => {
    const Ui = useJsonFormUi()
    const form = useFormContext()

    const errors = form.errors[props.name]

    const {
        as: Cmp = Ui.Field,
        isLast = false,
        isFormPrimary,
        title,
        description,
        placeholder,
        name,
        type = EnumSchemeItemType.Widget,
    } = props

    return (
        <Cmp
            isLast={isLast}
            type={type}
            name={name}
            primary={isFormPrimary}
            title={title}
            description={description}
            errors={errors}
        >
            <ConnectToForm name={name}>
                <Input
                    type={type}
                    placeholder={placeholder}
                    title={title}
                    settings={getFieldSettings(props)}
                />
            </ConnectToForm>
        </Cmp>
    )
}

export default FormField