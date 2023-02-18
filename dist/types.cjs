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

// src/types.ts
var types_exports = {};
__export(types_exports, {
  EnumSchemeItemType: () => EnumSchemeItemType
});
module.exports = __toCommonJS(types_exports);
var EnumSchemeItemType = /* @__PURE__ */ ((EnumSchemeItemType2) => {
  EnumSchemeItemType2["Text"] = "text";
  EnumSchemeItemType2["TextBlock"] = "text-block";
  EnumSchemeItemType2["TextEditor"] = "text-editor";
  EnumSchemeItemType2["Checkbox"] = "checkbox";
  EnumSchemeItemType2["Files"] = "files";
  EnumSchemeItemType2["Widget"] = "widget";
  EnumSchemeItemType2["Select"] = "select";
  EnumSchemeItemType2["GeoCoordinates"] = "geo";
  EnumSchemeItemType2["Date"] = "date";
  return EnumSchemeItemType2;
})(EnumSchemeItemType || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EnumSchemeItemType
});
