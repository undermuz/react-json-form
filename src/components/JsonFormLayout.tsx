import { Children, useContext, useMemo, type FC } from "react"
import { useJsonFormUi } from "../UiContext"
import {
    FieldsList,
    FlatFormContext,
    type IFormFieldsParams,
    type IFlatFormFieldsParams,
} from "../FlatForm"
import type { ISchemeItem, IUiFlatFormProps } from "../types"
import FormField from "../FormField"

export const JFL_FlatFormName = "__JFL__FlatForm"

const JFL_Form: FC<Record<string, any>> = (props) => {
    const Ui = useJsonFormUi()

    const { as: Cmp = Ui.FlatForm, children: _children } = props

    const value = useContext(FlatFormContext)

    const cmpProps = useMemo<IUiFlatFormProps>(() => {
        return {
            isShow: value.isShow || true,
            primary: value.isFormPrimary,
        }
    }, [value])

    const count = Children.count(_children)

    const children = count > 0 ? _children : <JFL_FormFields />

    return (
        <Cmp {...props} {...cmpProps}>
            {children}
        </Cmp>
    )
}

JFL_Form.displayName = JFL_FlatFormName

export const JFL_FormFieldsName = "__JFL__FlatFormFields"

const JFL_FormFields: FC<IFormFieldsParams> = (props) => {
    const value = useContext(FlatFormContext)

    const cmpProps = useMemo<IFlatFormFieldsParams>(() => {
        return {
            scheme: value.scheme,
            isFormPrimary: value.isFormPrimary,
            level: value.level,
        }
    }, [value])

    return <FieldsList {...props} {...cmpProps} />
}

JFL_FormFields.displayName = JFL_FormFieldsName

export const JFL_FormFieldName = "__JFL__FlatFormField"

const JFL_FormField: FC<{ name: string; as?: any }> = ({ name, as }) => {
    const value = useContext(FlatFormContext)

    const schemeItem = useMemo<ISchemeItem>(() => {
        return value.scheme.find((s) => s.name === name) as ISchemeItem
    }, [value.scheme, name])

    if (!schemeItem) {
        throw new Error(`Cannot find scheme item by name: ${name}`)
    }

    return (
        <FormField
            {...schemeItem}
            as={as}
            level={value.level}
            isFormPrimary={value.isFormPrimary}
        />
    )
}

JFL_FormField.displayName = JFL_FormFieldName

const JsonFormLayout = {
    Form: JFL_Form,
    Fields: JFL_FormFields,
    Field: JFL_FormField,
}

export default JsonFormLayout
