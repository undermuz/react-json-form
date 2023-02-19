"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/input.tsx
var input_exports = {};
__export(input_exports, {
  default: () => input_default
});
module.exports = __toCommonJS(input_exports);
var import_types = require("./types.js");
var import_JsonForm = __toESM(require("./JsonForm.js"));
var import_UiContext = require("./UiContext.js");
var import_underscore = require("underscore");
var import_jsx_runtime = require("react/jsx-runtime");
var Input = (props) => {
  const { value = "", type, title, settings = {} } = props;
  const { onChange = import_underscore.noop } = props;
  const Ui = (0, import_UiContext.useJsonFormUi)();
  try {
    if (type == import_types.EnumSchemeItemType.Files) {
      return null;
    }
    if (type == import_types.EnumSchemeItemType.Widget) {
      const _settings = settings;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_JsonForm.default,
        {
          value,
          title,
          primary: false,
          ..._settings,
          onChange
        }
      );
    }
    if (type == import_types.EnumSchemeItemType.Select) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ui.Controls.Select, { ...props });
    }
    if (type === import_types.EnumSchemeItemType.Date) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ui.Controls.Date, { ...props });
    }
    if (type === import_types.EnumSchemeItemType.Checkbox) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ui.Controls.CheckBox, { ...props });
    }
    if (type == import_types.EnumSchemeItemType.TextBlock) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ui.Controls.TextBlock, { ...props });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ui.Controls.Input, { ...props });
  } catch (e) {
    console.error(`Error <Input {...${JSON.stringify(props)} }>:`);
    console.error(e);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "alert alert-danger", children: e.message });
  }
};
var input_default = Input;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
