import type { FC } from "react"
import type { ISchemeItem } from "./types"
import type { IError } from "@undermuz/use-form"

import Input from "./input"
import { EnumSchemeItemType } from "./types"
import { ConnectToForm } from "@undermuz/use-form"
import { useJsonFormUi } from "./UiContext"

type IFormFieldProps = ISchemeItem & {
    isLast: boolean
    errors: IError
    isFormPrimary: boolean
    level: number
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

    const {
        isLast,
        errors,
        isFormPrimary,
        title,
        description,
        placeholder,
        name,
        type = EnumSchemeItemType.Widget,
    } = props

    return (
        <Ui.Field
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
        </Ui.Field>
    )
}

export default FormField
