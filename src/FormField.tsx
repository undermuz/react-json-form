import type { FC } from "react"
import type { ISchemeItem } from "./types"
import type { IError } from "@undermuz/use-form"

import Input from "./input"
import { EnumSchemeItemType } from "./types"
import { ConnectToForm } from "@undermuz/use-form"
import { useJsonFormUi } from "./UiContext"

const getFieldSettings = (schemeItem: ISchemeItem) => {
    const { type = EnumSchemeItemType.Widget, settings = {} } = schemeItem

    if (type == EnumSchemeItemType.Widget) {
        const { scheme, multiple = false } = schemeItem

        return { scheme, multiple }
    }

    if (type == EnumSchemeItemType.Select) {
        return settings
    }

    if (type == EnumSchemeItemType.Files) {
        return { settings }
    }

    return settings
}

const FormField: FC<
    ISchemeItem & { isLast: boolean; errors: IError; isFormPrimary: boolean }
> = (props) => {
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
