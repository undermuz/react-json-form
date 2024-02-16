import {
    Children,
    type ReactNode,
    useContext,
    useMemo,
    type FC,
    type PropsWithChildren,
} from "react"
import { useJsonFormUi } from "../UiContext"
import {
    FieldsList,
    FlatFormContext,
    type IFormFieldsParams,
    type IFlatFormFieldsParams,
} from "../FlatForm"
import type { ISchemeItem, IUiFlatFormProps } from "../types"
import FormField from "../FormField"
import { ArrayFormContext, type IArrayFormParams } from "../ArrayForm"
import ArrayFormItem from "../ArrayFormItem"

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
            onFormsRef: value.onFormsRef,
        }
    }, [value])

    return <FieldsList {...props} {...cmpProps} />
}

JFL_FormFields.displayName = JFL_FormFieldsName

export const JFL_FormFieldName = "__JFL__FlatFormField"

const JFL_FormField: FC<
    PropsWithChildren & { name: string; as?: any } & Record<string, unknown>
> = ({ children, name, as, ...customProps }) => {
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
            level={value.level}
            isFormPrimary={value.isFormPrimary}
            {...customProps}
            as={as}
        >
            {children}
        </FormField>
    )
}

JFL_FormField.displayName = JFL_FormFieldName

export const JFL_ArrayFormItemName = "__JFL__ArrayFormItemName"

const JFL_ArrayFormItem: FC<
    PropsWithChildren & {
        itemId?: number
        itemIndex?: number
    }
> = ({ itemId, itemIndex, ...other }) => {
    const { value, changeTab, setTabErrors, ...rest } =
        useContext(ArrayFormContext)

    if (itemId === undefined && itemIndex === undefined)
        throw new Error(`itemId or itemIndex is required`)

    const itemValue = value.find(
        (item, index) => item.id === itemId || index === itemIndex
    )

    if (!itemValue)
        throw new Error(`itemValue has not found by itemId or itemIndex`)

    return (
        <ArrayFormItem
            {...rest}
            id={itemValue.id}
            value={itemValue}
            {...other}
            onChange={changeTab}
            onError={setTabErrors}
        />
    )
}

JFL_ArrayFormItem.displayName = JFL_ArrayFormItemName

export const JFL_ArrayFormListName = "__JFL__ArrayFormListName"

const JFL_ArrayFormList: FC<{
    children: (value: IArrayFormParams) => ReactNode
}> = ({ children }) => {
    return <ArrayFormContext.Consumer>{children}</ArrayFormContext.Consumer>
}

JFL_ArrayFormList.displayName = JFL_ArrayFormListName

const JsonFormLayout = {
    Form: JFL_Form,
    Fields: JFL_FormFields,
    Field: JFL_FormField,
    ArrayList: JFL_ArrayFormList,
    ArrayItem: JFL_ArrayFormItem,
}

export default JsonFormLayout
