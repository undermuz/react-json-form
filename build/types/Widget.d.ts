import React from "react";
import { ISchemeItem, TypeValueItem } from "./types";
export interface IFieldWidgetSettings {
    scheme: ISchemeItem[];
    multiple: boolean;
}
interface IWidget {
    scheme: ISchemeItem[];
    value: TypeValueItem;
    onChange: Function;
}
declare const Widget: React.FC<IWidget>;
export default Widget;
