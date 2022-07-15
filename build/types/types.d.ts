import { FunctionComponent } from "react";
export declare enum EnumSchemeItemType {
    Text = "text",
    TextBlock = "text-block",
    TextEditor = "text-editor",
    Checkbox = "checkbox",
    Files = "files",
    Widget = "widget",
    Select = "select",
    GeoCoordinates = "geo",
    Date = "date"
}
export declare type TypeSchemeItemSettings = Record<string, any>;
export interface ISchemeItem {
    name: string;
    title: string;
    type?: EnumSchemeItemType;
    def_value?: any;
    single?: boolean;
    multiple?: boolean;
    is_require?: boolean;
    settings?: TypeSchemeItemSettings;
    scheme?: ISchemeItem[];
}
export interface IScheme {
    id: string;
    title: string;
    name: string;
    scheme: ISchemeItem[];
    single: boolean;
    multiple: boolean;
}
export declare type TypeValueItem = Record<string, any>;
export declare type TypeValue = TypeValueItem | TypeValueItem[];
export declare type FunctionOnChange = (value: TypeValue) => void;
export interface IWidgetSettings {
    id: string;
    title: string;
    description: string;
    image: string;
    value: TypeValue;
    scheme: IScheme;
    view: FunctionComponent<{
        id: number;
        value: any;
    }>;
}
