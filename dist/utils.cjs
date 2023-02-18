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

// src/utils.ts
var utils_exports = {};
__export(utils_exports, {
  getDefValueForItem: () => getDefValueForItem,
  getDefValueForScheme: () => getDefValueForScheme,
  useDefSchemeValue: () => useDefSchemeValue,
  useSafeValue: () => useSafeValue,
  useSchemeToForm: () => useSchemeToForm
});
module.exports = __toCommonJS(utils_exports);
var import_react = require("react");
var import_underscore = require("underscore");
var import_types = require("./types.cjs");
var getDefValueForItem = (item) => {
  const {
    def_value = "",
    type = import_types.EnumSchemeItemType.Text,
    settings = {},
    multiple = false
  } = item;
  if (def_value) {
    return def_value;
  }
  if (type == "checkbox")
    return false;
  if (type == "files")
    return [];
  if (type == "widget") {
    if (multiple) {
      return [];
    }
    return {};
  }
  if (type == import_types.EnumSchemeItemType.GeoCoordinates)
    return {
      address: "",
      lat: 0,
      lng: 0
    };
  if (type == "select") {
    if (settings.multiple) {
      return [];
    }
    if (settings.options && settings.options.length) {
    } else {
      return 0;
    }
  }
  return def_value;
};
var getDefValueForScheme = (scheme) => {
  return scheme.reduce(
    (new_value, current) => ({
      ...new_value,
      [current.name]: current.def_value
    }),
    {}
  );
};
var useDefSchemeValue = (scheme) => {
  return (0, import_react.useMemo)(() => {
    return getDefValueForScheme(scheme);
  }, [scheme]);
};
var useSafeValue = (unsafeValue, defValue, multiple = false) => {
  return (0, import_react.useMemo)(() => {
    if (unsafeValue === void 0 || !multiple && Object.keys(unsafeValue).length === 0 || multiple && (!(0, import_underscore.isArray)(unsafeValue) || unsafeValue.length == 0)) {
      if (multiple) {
        return [{ ...defValue, id: 1 }];
      }
      return { ...defValue };
    }
    return unsafeValue;
  }, [unsafeValue, multiple, defValue]);
};
var useSchemeToForm = (scheme, value, onChange) => {
  return (0, import_react.useMemo)(() => {
    const config = {
      fields: {},
      options: {
        debug: true
      },
      value,
      onChange
    };
    scheme.forEach((item) => {
      config.fields[item.name] = {
        label: item.title,
        rules: item.rules,
        initialValue: item.def_value
      };
    });
    return config;
  }, [scheme, value, onChange]);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDefValueForItem,
  getDefValueForScheme,
  useDefSchemeValue,
  useSafeValue,
  useSchemeToForm
});
