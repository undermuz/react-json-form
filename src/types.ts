import {
    ComponentClass,
    CSSProperties,
    FC,
    FunctionComponent,
    PropsWithChildren,
    ReactNode,
    Ref,
} from "react"
import { IInput } from "./input"

export enum EnumSchemeItemType {
    Text = "text",
    TextBlock = "text-block",
    TextEditor = "text-editor",
    Checkbox = "checkbox",
    Files = "files",
    Widget = "widget",
    Select = "select",
    GeoCoordinates = "geo",
    Date = "date",
}

export type TypeSchemeItemSettings = Record<string, any>

export interface ISchemeItem {
    name: string
    title: string
    type?: EnumSchemeItemType
    def_value?: any
    single?: boolean
    multiple?: boolean
    is_require?: boolean
    settings?: TypeSchemeItemSettings
    scheme?: ISchemeItem[]
}

export interface IScheme {
    id: string
    title: string
    name: string
    scheme: ISchemeItem[]
    single: boolean
    multiple: boolean
}

export type TypeValueItem = Record<string, any>
export type TypeValue = TypeValueItem | TypeValueItem[]

export type FunctionOnChange = (value: TypeValue) => void

export interface IWidgetSettings {
    id: string
    title: string
    description: string
    image: string
    value: TypeValue
    scheme: IScheme
    view: FunctionComponent<{ id: number; value: any }>
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
}

export type IUiBodyProps = Partial<Pick<IScheme, "id" | "title">> & {
    primary?: boolean
    multiple?: boolean
}

export interface IUiTabProps {
    label?: string
    active?: boolean
    style?: CSSProperties | undefined
    ref?: Ref<HTMLElement> | undefined
    onSelect?: (...args: any[]) => any
}

export interface IField {
    title: string
    name: string
    isLast: boolean
    primary?: boolean
    type: EnumSchemeItemType
    hasError: boolean
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

export interface IJsonFormParams {
    value: TypeValue
    primary?: boolean
    header?: ReactNode
    onChange: FunctionOnChange
}

export type IJsonFormProps = IJsonFormParams &
    Partial<Pick<IScheme, "id" | "title">> &
    Pick<IScheme, "multiple" | "scheme">

export interface JsonFormComponents {
    JsonForm: FC<PropsWithChildren<IJsonFormProps>>
}

export interface JsonFormUi {
    Container: FC<PropsWithChildren<{}>>
    Header: FC<PropsWithChildren<IUiHeaderProps>>
    Body: FC<PropsWithChildren<IUiBodyProps>>
    FlatForm: FC<PropsWithChildren<{}>>
    Field: FC<PropsWithChildren<IField>>
    ArrayForm: FC<PropsWithChildren<IUiArrayFormProps>> & {
        Header: FC<PropsWithChildren<{}>>
        Tabs: FC<PropsWithChildren<{}>>
        Body: FC<PropsWithChildren<{}>>
        TrashContainer: FC<PropsWithChildren<IUiArrayFormTrashContainerProps>>
    }
    Tab: FC<PropsWithChildren<IUiTabProps>>
    Components?: Partial<JsonFormComponents>
    Controls: JsonFormControls
    Icons: JsonFormIcons
}
