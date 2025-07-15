import {
    Children,
    type ReactNode,
    useContext,
    useMemo,
    type FC,
    type PropsWithChildren,
    type JSXElementConstructor,
} from "react"
import { useJsonFormUi } from "../contexts/ui"
import {
    FlatFormContext,
    type IFlatFormFieldsParams,
} from "../flat-form/FlatForm"
import { FieldsList, type IFormFieldsParams } from "../flat-form/FieldsBlock"
import type { ISchemeItem, IUiFlatFormProps } from "../types"
import FormField from "../flat-form/FormField"
import {
    ArrayFormContext,
    type IArrayFormParams,
} from "../array-form/ArrayForm"
import ArrayFormItem from "../array-form/ArrayFormItem"

export const JFL_FlatFormName = "__JFL__FlatForm"

export const JFL_Nothing: FC<PropsWithChildren> = ({ children }) => (
    <>{children}</>
)

const JFL_Form: FC<
    PropsWithChildren &
        Record<string, unknown> & {
            as?: JSXElementConstructor<Record<string, unknown>>
        }
> = (props) => {
    const Ui = useJsonFormUi()

    const FlatForm = Ui?.FlatForm ? Ui.FlatForm : JFL_Nothing

    const { as: Cmp = FlatForm, children: _children, ...rest } = props

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
        <Cmp {...rest} {...cmpProps}>
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
            key={name}
            {...schemeItem}
            level={value.level}
            isFormPrimary={value.isFormPrimary}
            onFormsRef={value.onFormsRef}
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
