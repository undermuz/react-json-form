/// <reference types="react" />
import { JsonFormComponents, JsonFormUi } from "./types";
declare const UiContext: import("react").Context<JsonFormUi | null>;
export declare const useJsonFormUi: () => JsonFormUi;
export declare const useJsonFormComponents: () => JsonFormComponents;
export default UiContext;
