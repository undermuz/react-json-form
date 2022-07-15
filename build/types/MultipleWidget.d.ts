import React from "react";
import { ISchemeItem, TypeValueItem } from "./types";
interface IMultipleWidgetItem {
    value: TypeValueItem[];
    defValue: TypeValueItem;
    scheme: ISchemeItem[];
    onChange: Function;
}
declare const MultipleWidget: React.FC<IMultipleWidgetItem>;
export default MultipleWidget;
