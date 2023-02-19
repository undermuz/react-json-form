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

// src/components/JsonFormComponents.tsx
var JsonFormComponents_exports = {};
__export(JsonFormComponents_exports, {
  JsonFormComponent: () => JsonFormComponent
});
module.exports = __toCommonJS(JsonFormComponents_exports);
var import_UiContext = require("../UiContext.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var JsonFormComponent = (props) => {
  const {
    id,
    title,
    header = null,
    multiple = false,
    primary = true,
    children
  } = props;
  const Ui = (0, import_UiContext.useJsonFormUi)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Ui.Container, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ui.Header, { id, primary, title, children: header }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ui.Body, { primary, multiple, children })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JsonFormComponent
});
