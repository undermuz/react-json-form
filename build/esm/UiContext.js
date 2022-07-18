import { __assign } from "tslib";
import { createContext, useContext } from "react";
import { JsonFormComponent } from "./components/JsonFormComponents";
var UiContext = createContext(null);
export var useJsonFormUi = function () {
    var Ui = useContext(UiContext);
    if (!Ui) {
        throw new Error("JsonForm must be wrapped by UiContext.Provider with selected UI");
    }
    return Ui;
};
export var useJsonFormComponents = function () {
    var Ui = useContext(UiContext);
    var rawComponents = {};
    if (Ui === null || Ui === void 0 ? void 0 : Ui.Components) {
        rawComponents = Ui === null || Ui === void 0 ? void 0 : Ui.Components;
    }
    return __assign({ JsonForm: JsonFormComponent }, rawComponents);
};
export default UiContext;
