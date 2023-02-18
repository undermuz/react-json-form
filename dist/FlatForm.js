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

// src/FlatForm.tsx
var FlatForm_exports = {};
__export(FlatForm_exports, {
  default: () => FlatForm_default
});
module.exports = __toCommonJS(FlatForm_exports);
var import_react = require("react");
var import_types = require("./types.js");
var import_utils = require("./utils.js");
var import_input = __toESM(require("./input.js"));
var import_UiContext = require("./UiContext.js");
var import_use_form = __toESM(require("@undermuz/use-form"));
var import_jsx_runtime = require("react/jsx-runtime");
var FlatForm = (props) => {
  const { scheme, value, primary = false, onChange } = props;
  const Ui = (0, import_UiContext.useJsonFormUi)();
  const form = (0, import_use_form.default)((0, import_utils.useSchemeToForm)(scheme, value, onChange));
  (0, import_react.useEffect)(() => {
    const new_value = {};
    scheme.forEach((scheme_item) => {
      const { name, type = import_types.EnumSchemeItemType.Text } = scheme_item;
      const def_value = (0, import_utils.getDefValueForItem)(scheme_item);
      if (!value[name]) {
        if (type === import_types.EnumSchemeItemType.Widget) {
          new_value[name] = def_value;
        } else if (type !== import_types.EnumSchemeItemType.Checkbox) {
          new_value[name] = def_value;
        }
      }
    });
    console.log("[FlatForm][Set default values]", {
      ...value,
      ...new_value
    });
    onChange({ ...value, ...new_value });
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_use_form.FormContext.Provider, { value: form, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ui.FlatForm, { primary, children: scheme.map((scheme_item, index) => {
    const {
      title,
      name,
      type = import_types.EnumSchemeItemType.Widget,
      settings = {}
    } = scheme_item;
    let field_settings = {};
    if (type == import_types.EnumSchemeItemType.Widget) {
      const { scheme: scheme2, multiple = false } = scheme_item;
      field_settings = { scheme: scheme2, multiple };
    } else if (type == import_types.EnumSchemeItemType.Select) {
      field_settings = settings;
    } else if (type == import_types.EnumSchemeItemType.Files) {
      field_settings = { settings };
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Ui.Field,
      {
        isLast: index === scheme.length - 1,
        type,
        name,
        primary,
        title,
        errors: form.errors[name],
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_use_form.ConnectToForm, { name, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_input.default,
          {
            type,
            title,
            settings: field_settings
          }
        ) })
      },
      index
    );
  }) }) });
};
var FlatForm_default = FlatForm;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
