import React, { ReactNode } from "react";
import { FunctionOnChange, IScheme, TypeValue } from "./types";
interface IWidgetBuilderParams {
    value: TypeValue;
    primary?: boolean;
    header?: ReactNode;
    onChange: FunctionOnChange;
}
declare type IWidgetBuilder = IWidgetBuilderParams & Partial<Pick<IScheme, "id" | "title">> & Pick<IScheme, "multiple" | "scheme">;
declare const WidgetBuilder: React.FC<IWidgetBuilder>;
export default WidgetBuilder;
