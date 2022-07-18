import React from "react";
import { ISchemeItem, TypeValueItem } from "./types";
interface IArrayForm {
    value: TypeValueItem[];
    primary?: boolean;
    defValue: TypeValueItem;
    scheme: ISchemeItem[];
    onChange: Function;
}
declare const ArrayForm: React.FC<IArrayForm>;
export default ArrayForm;
