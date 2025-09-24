import {
    type IConnectedProps,
    type IError,
    type IErrors,
    type ITouched,
} from "@undermuz/use-form"

import type {
    ComponentClass,
    CSSProperties,
    FC,
    ForwardRefExoticComponent,
    PropsWithChildren,
    ReactNode,
    Ref,
    RefAttributes,
} from "react"
import type { IInput } from "./flat-form/form-input/input"

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
    title?: string
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
    title?: string
    scheme: ISchemeItem[]
    multiple?: boolean
}

export type TypeErrorItem = {
    id: number
    value: IErrors | TypeErrorItem[]
}

export type SubmitErrors = null | IErrors | TypeErrorItem[] | IErrors[]

export type DefType = Record<string, any>

export type TypeValueItem<T extends DefType = DefType> = T
export type TypeValue<T extends DefType = DefType> =
    | TypeValueItem<T>
    | TypeValueItem<T>[]

export type FunctionOnChange<T extends DefType = DefType> = (
    value: TypeValue<T>
) => void

export type FieldTests = {
    [p: string]: FieldRuleFunction
}
export interface JsonFormControls {
    [key: string]: FC<IInput & IConnectedProps>
    FileInput: FC<IInput & IConnectedProps>
    Input: FC<IInput & IConnectedProps>
    TextBlock: FC<IInput & IConnectedProps>
    CheckBox: FC<IInput & IConnectedProps>
    Date: FC<IInput & IConnectedProps>
    Select: FC<IInput & IConnectedProps>
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
    isDisabled: boolean
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
    title?: string
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

export interface IJsonFormRefObject<T extends DefType = DefType> {
    setTouched: (
        newTouched: ITouched | null,
        silent?: boolean,
        checkOnlyFilled?: boolean
    ) => void
    validate: (
        checkOnlyFilled?: boolean,
        level?: number
    ) => null | IErrors | TypeErrorItem[]
    values: () => TypeValue<T>
    errors: () => IErrors | TypeErrorItem[]
    reset: () => void
}

export type IJsonFormRefArray<T extends DefType = DefType> =
    IJsonFormRefObject<T>[]

export type IJsonFormRef<T extends DefType = DefType> =
    | IJsonFormRefObject<T>
    | IJsonFormRefArray<T>

export type IJsonFormProps = PropsWithChildren &
    IJsonFormParams &
    Partial<Pick<IScheme, "title">> &
    Pick<IScheme, "id" | "multiple" | "scheme"> & {
        tests?: FieldTests
        viewType?: string
        level?: number
        fillArrayDefault?: boolean
        showToggle?: boolean
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
    Container: FC<PropsWithChildren<object>>
    Header: FC<PropsWithChildren<IUiHeaderProps>>
    Body: FC<PropsWithChildren<IUiBodyProps>>
    FlatForm: FC<PropsWithChildren<IUiFlatFormProps>>
    Field: FC<PropsWithChildren<IField>>
    Item: FC<PropsWithChildren<IItem>>
    ItemWrapper: FC<PropsWithChildren<IItem>>
    ArrayForm: FC<PropsWithChildren<IUiArrayFormProps>> & {
        Header: FC<PropsWithChildren<object>>
        Tabs: FC<PropsWithChildren<IUiArrayFormTabsProps>>
        Body: FC<PropsWithChildren<object>>
        TrashContainer: ForwardRefExoticComponent<
            Omit<PropsWithChildren<IUiArrayFormTrashContainerProps>, "ref"> &
                RefAttributes<HTMLDivElement>
        >
    }
    Tab: ForwardRefExoticComponent<
        Omit<PropsWithChildren<IUiTabProps>, "ref"> &
            RefAttributes<HTMLButtonElement>
    >
    Components?: Partial<JsonFormComponents>
    Controls: JsonFormControls
    Icons: JsonFormIcons
}
