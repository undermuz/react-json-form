import { FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { EnumSchemeItemType, TypeSchemeItemSettings } from "./types";
export interface IInput {
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
export default Input;
