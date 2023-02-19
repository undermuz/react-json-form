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

// src/JsonForm.tsx
var JsonForm_exports = {};
__export(JsonForm_exports, {
  default: () => JsonForm_default
});
module.exports = __toCommonJS(JsonForm_exports);
var import_react = require("react");
var import_react_error_boundary = require("react-error-boundary");
var import_ErrorFallback = __toESM(require("./components/ErrorFallback.cjs"), 1);
var import_FlatForm = __toESM(require("./FlatForm.cjs"), 1);
var import_ArrayForm = __toESM(require("./ArrayForm.cjs"), 1);
var import_utils = require("./utils.cjs");
var import_UiContext = require("./UiContext.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var JsonForm = (props) => {
  const { multiple = false, primary = true, scheme = [], onChange } = props;
  const defValue = (0, import_utils.useDefSchemeValue)(scheme);
  const value = (0, import_utils.useSafeValue)(props.value, defValue, multiple);
  const handleChange = (0, import_react.useCallback)(
    (newValue) => {
      onChange({ ...value, ...newValue });
    },
    [value, onChange]
  );
  const Components = (0, import_UiContext.useJsonFormComponents)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react_error_boundary.ErrorBoundary,
    {
      FallbackComponent: import_ErrorFallback.default,
      onReset: () => {
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Components.JsonForm, { ...props, children: [
        multiple && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_ArrayForm.default,
          {
            primary,
            scheme,
            defValue,
            value,
            onChange
          }
        ),
        !multiple && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_FlatForm.default,
          {
            primary,
            scheme,
            value,
            onChange: handleChange
          }
        )
      ] })
    }
  );
};
var JsonForm_default = JsonForm;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
