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
var icons_exports = {};
__export(icons_exports, {
  default: () => icons_default
});
module.exports = __toCommonJS(icons_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_grommet_icons = require("grommet-icons");
const Icons = {
  Tabs: {
    Remove: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_grommet_icons.Trash, { color: "status-critical" }),
    Add: import_grommet_icons.Add
  }
};
var icons_default = Icons;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
