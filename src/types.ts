import { FC, FunctionComponent, PropsWithChildren } from "react"
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

export interface IField {
    title: string
    type: EnumSchemeItemType
    hasError: boolean
}

export interface JsonFormUi {
    Container: FC<PropsWithChildren<{}>>
    Header: FC<PropsWithChildren<IUiHeaderProps>>
    Body: FC<PropsWithChildren<{}>>
    FlatFormContainer: FC<PropsWithChildren<{}>>
    Field: FC<PropsWithChildren<IField>>
    Controls: JsonFormControls
}
