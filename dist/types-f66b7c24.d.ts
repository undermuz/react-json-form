import { IUseFormFieldRule } from '@undermuz/use-form/build/types/useForm';
import { IError } from '@undermuz/use-form/build/types/useForm/reducer';
import { FC, CSSProperties, Ref, ComponentClass, ReactNode, PropsWithChildren } from 'react';

interface IInput {
    name?: string;
    value?: any;
    type: EnumSchemeItemType;
    hasError?: boolean;
    title: string;
    settings: TypeSchemeItemSettings;
    onChange?: Function;
    onFocus?: Function;
    onBlur?: Function;
}
declare const Input: FC<IInput>;

declare enum EnumSchemeItemType {
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
interface IFieldWidgetSettings {
    scheme: ISchemeItem[];
    multiple: boolean;
}
declare type TypeSchemeItemSettings = Record<string, any>;
interface ISchemeItem {
    name: string;
    title: string;
    type?: EnumSchemeItemType;
    def_value?: any;
    single?: boolean;
    multiple?: boolean;
    rules?: IUseFormFieldRule[] | undefined;
    settings?: TypeSchemeItemSettings;
    scheme?: ISchemeItem[];
}
interface IScheme {
    id: string;
    title: string;
    name: string;
    scheme: ISchemeItem[];
    single: boolean;
    multiple: boolean;
}
declare type TypeValueItem = Record<string, any>;
declare type TypeValue = TypeValueItem | TypeValueItem[];
declare type FunctionOnChange = (value: TypeValue) => void;
interface JsonFormControls {
    [key: string]: FC<IInput>;
    Input: FC<IInput>;
    TextBlock: FC<IInput>;
    CheckBox: FC<IInput>;
    Date: FC<IInput>;
    Select: FC<IInput>;
}
declare type IUiHeaderProps = Partial<Pick<IScheme, "id" | "title">> & {
    primary?: boolean;
};
declare type IUiBodyProps = Partial<Pick<IScheme, "id" | "title">> & {
    primary?: boolean;
    multiple?: boolean;
};
interface IUiTabProps {
    label?: string;
    active?: boolean;
    style?: CSSProperties | undefined;
    ref?: Ref<HTMLElement> | undefined;
    onSelect?: (...args: any[]) => any;
}
interface IField {
    title: string;
    name: string;
    isLast: boolean;
    primary?: boolean;
    type: EnumSchemeItemType;
    errors: IError;
}
interface IUiArrayFormProps {
    style?: CSSProperties | undefined;
}
interface IUiArrayFormTrashContainerProps {
    isOver: boolean;
    label?: string;
    ref?: Ref<HTMLDivElement> | undefined;
}
interface JsonFormIcons {
    Tabs: {
        Remove: FC<any> | ComponentClass<any>;
        Add: FC<any> | ComponentClass<any>;
    };
}
interface IJsonFormParams {
    value: TypeValue;
    primary?: boolean;
    header?: ReactNode;
    onChange: FunctionOnChange;
}
declare type IJsonFormProps = IJsonFormParams & Partial<Pick<IScheme, "id" | "title">> & Pick<IScheme, "multiple" | "scheme">;
interface JsonFormComponents {
    JsonForm: FC<PropsWithChildren<IJsonFormProps>>;
}
interface IUiArrayFormTabsProps {
    actions?: boolean;
}
interface IUiFlatFormProps {
    primary?: boolean;
}
interface JsonFormUi {
    Container: FC<PropsWithChildren<{}>>;
    Header: FC<PropsWithChildren<IUiHeaderProps>>;
    Body: FC<PropsWithChildren<IUiBodyProps>>;
    FlatForm: FC<PropsWithChildren<IUiFlatFormProps>>;
    Field: FC<PropsWithChildren<IField>>;
    ArrayForm: FC<PropsWithChildren<IUiArrayFormProps>> & {
        Header: FC<PropsWithChildren<{}>>;
        Tabs: FC<PropsWithChildren<IUiArrayFormTabsProps>>;
        Body: FC<PropsWithChildren<{}>>;
        TrashContainer: FC<PropsWithChildren<IUiArrayFormTrashContainerProps>>;
    };
    Tab: FC<PropsWithChildren<IUiTabProps>>;
    Components?: Partial<JsonFormComponents>;
    Controls: JsonFormControls;
    Icons: JsonFormIcons;
}

export { EnumSchemeItemType as E, FunctionOnChange as F, ISchemeItem as I, JsonFormControls as J, TypeValueItem as T, IFieldWidgetSettings as a, TypeSchemeItemSettings as b, IScheme as c, TypeValue as d, IUiHeaderProps as e, IUiBodyProps as f, IUiTabProps as g, IField as h, IUiArrayFormProps as i, IUiArrayFormTrashContainerProps as j, JsonFormIcons as k, IJsonFormParams as l, IJsonFormProps as m, JsonFormComponents as n, IUiArrayFormTabsProps as o, IUiFlatFormProps as p, JsonFormUi as q, Input as r, IInput as s };
