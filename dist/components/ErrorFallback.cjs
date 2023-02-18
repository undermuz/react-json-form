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
var ErrorFallback_exports = {};
__export(ErrorFallback_exports, {
  default: () => ErrorFallback_default
});
module.exports = __toCommonJS(ErrorFallback_exports);
var import_jsx_runtime = require("react/jsx-runtime");
function ErrorFallback({ error, resetErrorBoundary }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { role: "alert", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Something went wrong:" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { children: error.message }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: resetErrorBoundary, children: "Try again" })
  ] });
}
var ErrorFallback_default = ErrorFallback;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
