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

// src/themes/chakra/icons.tsx
var icons_exports = {};
__export(icons_exports, {
  default: () => icons_default
});
module.exports = __toCommonJS(icons_exports);
var import_icons = require("@chakra-ui/icons");
var import_jsx_runtime = require("react/jsx-runtime");
var Icons = {
  Tabs: {
    Remove: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.DeleteIcon, { color: "red.400" }),
    Add: import_icons.AddIcon
  }
};
var icons_default = Icons;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
