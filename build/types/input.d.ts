import { FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { EnumSchemeItemType, TypeSchemeItemSettings } from "./types";
interface IInput {
    name: string;
    value: any;
    type: EnumSchemeItemType;
    title: string;
    settings: TypeSchemeItemSettings;
    onChange: Function;
    onTest: Function;
}
declare const Input: FC<IInput>;
export default Input;
