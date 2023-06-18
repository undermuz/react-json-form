import type { FC, PropsWithChildren } from "react"
import { useMemo } from "react"
import type { ISchemeItem } from "./types"
import { useFormContext, ConnectToForm } from "@undermuz/use-form"

import Input from "./input"
import { EnumSchemeItemType } from "./types"
import { useJsonFormUi } from "./UiContext"
import type { IChildFormsSetRef } from "./FlatForm"
import { uniqueId } from "underscore"

export type IFormFieldProps = ISchemeItem & {
    isLast?: boolean
    isFormPrimary: boolean
    level: number
    as?: any
    onFormsRef?: IChildFormsSetRef
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

const FormField: FC<PropsWithChildren & IFormFieldProps> = ({
    children,
    ...props
}) => {
    const Ui = useJsonFormUi()
    const form = useFormContext()

    const id = useMemo(() => {
        return uniqueId("form-field-")
    }, [])

    const errors = form.errors[props.name]

    const isDisabled = form.values[`${props.name}__isDisabled`] || false

    const {
        as: Cmp = Ui.Field,
        isLast = false,
        isFormPrimary,
        title,
        description,
        placeholder,
        settings,
        name,
        type = EnumSchemeItemType.Widget,
        onFormsRef,
    } = props

    const { showLabel, showToggle } = settings || {}

    return (
        <Ui.ItemWrapper
            isLast={isLast}
            type={type}
            primary={isFormPrimary}
            title={title}
        >
            <Cmp
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
            >
                <ConnectToForm id={id} name={name} disabled={isDisabled}>
                    <Input
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
        </Ui.ItemWrapper>
    )
}

export default FormField
