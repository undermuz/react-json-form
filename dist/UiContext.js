"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/UiContext.ts
var UiContext_exports = {};
__export(UiContext_exports, {
  default: () => UiContext_default,
  useJsonFormComponents: () => useJsonFormComponents,
  useJsonFormUi: () => useJsonFormUi
});
module.exports = __toCommonJS(UiContext_exports);
var import_react = require("react");
var import_JsonFormComponents = require("./components/JsonFormComponents.js");
var UiContext = (0, import_react.createContext)(null);
var useJsonFormUi = () => {
  const Ui = (0, import_react.useContext)(UiContext);
  if (!Ui) {
    throw new Error(
      "JsonForm must be wrapped by UiContext.Provider with selected UI"
    );
  }
  return Ui;
};
var useJsonFormComponents = () => {
  const Ui = (0, import_react.useContext)(UiContext);
  let rawComponents = {};
  if (Ui?.Components) {
    rawComponents = Ui?.Components;
  }
  return {
    JsonForm: import_JsonFormComponents.JsonFormComponent,
    ...rawComponents
  };
};
var UiContext_default = UiContext;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useJsonFormComponents,
  useJsonFormUi
});
