import React from "react";
import { ISchemeItem, TypeValueItem } from "./types";
import { IValues } from "@undermuz/use-form";
interface IFlatForm {
    primary?: boolean;
    scheme: ISchemeItem[];
    value: TypeValueItem;
    onChange: (v: IValues) => void;
}
declare const FlatForm: React.FC<IFlatForm>;
export default FlatForm;
