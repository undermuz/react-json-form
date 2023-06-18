import type { IError, IErrors } from "@undermuz/use-form"

import type {
    ComponentClass,
    CSSProperties,
    FC,
    PropsWithChildren,
    ReactNode,
    Ref,
} from "react"
import type { IInput } from "./input"

export enum EnumSchemeItemType {
    Input = "input",
    Text = "text",
    TextBlock = "text-block",
    TextEditor = "text-editor",
    Checkbox = "checkbox",
    Files = "files",
    Widget = "widget",
    Select = "select",
    GeoCoordinates = "geo",
    Date = "date",
    Submit = "submit",
}

export type TypeSchemeItemSettings = Record<string, any> & {
    showToggle?: boolean
    showLabel?: boolean
}

export type FieldRuleSingleFunction = (v: any) => boolean
export type FieldRuleGenericFunction<T extends Array<any> = any[]> = (
    ...args: T
) => FieldRuleSingleFunction

export type FieldRuleFunction =
    | FieldRuleSingleFunction
    | FieldRuleGenericFunction

export type JsonFormFieldRule = [Array<FieldRuleFunction | string>, string?]

export interface ISchemeItem {
    name: string
    title: string
    description?: string
    placeholder?: string
    type?: EnumSchemeItemType | string
    def_value?: any
    single?: boolean
    multiple?: boolean
    rules?: JsonFormFieldRule[] | undefined
    settings?: TypeSchemeItemSettings
    scheme?: ISchemeItem[]
}

export interface IFieldWidgetSettings {
    scheme: ISchemeItem[]
    multiple: boolean
}

export interface IScheme {
    id: string
    title: string
    scheme: ISchemeItem[]
    multiple?: boolean
}

export type TypeErrorItem = {
    id: number
    value: IErrors | TypeErrorItem[]
}

export type TypeValueItem = Record<string, any>
export type TypeValue = TypeValueItem | TypeValueItem[]

export type FunctionOnChange = (value: TypeValue) => void

export type FieldTests = {
    [p: string]: FieldRuleFunction
}
export interface JsonFormControls {
    [key: string]: FC<IInput>
    Input: FC<IInput>
    TextBlock: FC<IInput>
    CheckBox: FC<IInput>
    Date: FC<IInput>
    Select: FC<IInput>
}

export type IUiHeaderProps = Partial<Pick<IScheme, "id" | "title">> & {
    primary?: boolean
    level: number
}

export type IUiBodyProps = Partial<Pick<IScheme, "id" | "title">> & {
    primary?: boolean
    multiple?: boolean
    level: number
}

export interface IUiTabProps {
    label?: string
    active?: boolean
    alt?: string
    style?: CSSProperties | undefined
    ref?: Ref<HTMLElement> | undefined
    onSelect?: (...args: any[]) => any
}

export interface IField {
    id: string
    title: string
    description?: string
    name: string
    isLast: boolean
    showToggle?: boolean
    showLabel?: boolean
    primary?: boolean
    type: EnumSchemeItemType | string
    errors: IError
}

export interface IItem {
    [k: string]: any
    title: string
    isLast: boolean
    primary?: boolean
    type: EnumSchemeItemType | string
    isLoading?: boolean
}

export interface IUiArrayFormProps {
    style?: CSSProperties | undefined
}

export interface IUiArrayFormTrashContainerProps {
    isOver: boolean
    label?: string
    ref?: Ref<HTMLDivElement> | undefined
}

export interface JsonFormIcons {
    Tabs: {
        Remove: FC<any> | ComponentClass<any>
        Add: FC<any> | ComponentClass<any>
    }
}

export type JsonFormErrors = IErrors | TypeErrorItem[]

export interface IJsonFormParams {
    isLoading?: boolean
    value: TypeValue
    primary?: boolean
    header?: ReactNode
    onChange: FunctionOnChange
    onError?: (e: JsonFormErrors) => void
}

export interface IJsonFormRefObject {
    validate: (checkOnlyFilled?: boolean) => null | IErrors | TypeErrorItem[]
    values: () => TypeValue
    errors: () => IErrors | TypeErrorItem[]
}

export type IJsonFormRefArray = IJsonFormRefObject[]

export type IJsonFormRef = IJsonFormRefObject | IJsonFormRefArray

export type IJsonFormProps = PropsWithChildren &
    IJsonFormParams &
    Partial<Pick<IScheme, "id" | "title">> &
    Pick<IScheme, "multiple" | "scheme"> & {
        tests?: FieldTests
        viewType?: string
        level?: number
        fillArrayDefault?: boolean
    }

export interface JsonFormComponents {
    JsonForm: FC<PropsWithChildren<IJsonFormProps>>
}

export interface IUiArrayFormTabsProps {
    actions?: boolean
}

export interface IUiFlatFormProps {
    isShow: boolean
    primary?: boolean
}

export interface JsonFormUi {
    Container: FC<PropsWithChildren<{}>>
    Header: FC<PropsWithChildren<IUiHeaderProps>>
    Body: FC<PropsWithChildren<IUiBodyProps>>
    FlatForm: FC<PropsWithChildren<IUiFlatFormProps>>
    Field: FC<PropsWithChildren<IField>>
    Item: FC<PropsWithChildren<IItem>>
    ItemWrapper: FC<PropsWithChildren<IItem>>
    ArrayForm: FC<PropsWithChildren<IUiArrayFormProps>> & {
        Header: FC<PropsWithChildren<{}>>
        Tabs: FC<PropsWithChildren<IUiArrayFormTabsProps>>
        Body: FC<PropsWithChildren<{}>>
        TrashContainer: FC<PropsWithChildren<IUiArrayFormTrashContainerProps>>
    }
    Tab: FC<PropsWithChildren<IUiTabProps>>
    Components?: Partial<JsonFormComponents>
    Controls: JsonFormControls
    Icons: JsonFormIcons
}
