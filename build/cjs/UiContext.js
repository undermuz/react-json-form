"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useJsonFormComponents = exports.useJsonFormUi = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var JsonFormComponents_1 = require("./components/JsonFormComponents");
var UiContext = (0, react_1.createContext)(null);
var useJsonFormUi = function () {
    var Ui = (0, react_1.useContext)(UiContext);
    if (!Ui) {
        throw new Error("JsonForm must be wrapped by UiContext.Provider with selected UI");
    }
    return Ui;
};
exports.useJsonFormUi = useJsonFormUi;
var useJsonFormComponents = function () {
    var Ui = (0, react_1.useContext)(UiContext);
    var rawComponents = {};
    if (Ui === null || Ui === void 0 ? void 0 : Ui.Components) {
        rawComponents = Ui === null || Ui === void 0 ? void 0 : Ui.Components;
    }
    return tslib_1.__assign({ JsonForm: JsonFormComponents_1.JsonFormComponent }, rawComponents);
};
exports.useJsonFormComponents = useJsonFormComponents;
exports.default = UiContext;
