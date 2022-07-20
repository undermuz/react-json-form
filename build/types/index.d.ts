import JsonForm from "./JsonForm";
import { EnumSchemeItemType } from "./types";
import UiContext from "./UiContext";
declare const JsonFormThemes: {
    GrommetUi: import("./types").JsonFormUi;
    ChakraUi: import("./types").JsonFormUi;
    RsuiteUi: import("./types").JsonFormUi;
};
export default JsonForm;
export { JsonForm, EnumSchemeItemType, UiContext, JsonFormThemes };
