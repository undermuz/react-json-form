import React from "react";
import { EnumSchemeItemType, TypeSchemeItemSettings } from "./types";
interface IField {
    title: string;
    name: string;
    value: any;
    error: boolean;
    type: EnumSchemeItemType;
    settings: TypeSchemeItemSettings;
    onChange: Function;
    onTest: Function;
}
declare const Field: React.FC<IField>;
export default Field;
