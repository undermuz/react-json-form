import { useMemo } from "react";
import { isArray } from "underscore";
import {
  EnumSchemeItemType
} from "./types";
const getDefValueForItem = (item) => {
  const {
    def_value = "",
    type = EnumSchemeItemType.Text,
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
  if (type == EnumSchemeItemType.GeoCoordinates)
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
const getDefValueForScheme = (scheme) => {
  return scheme.reduce(
    (new_value, current) => ({
      ...new_value,
      [current.name]: current.def_value
    }),
    {}
  );
};
const useDefSchemeValue = (scheme) => {
  return useMemo(() => {
    return getDefValueForScheme(scheme);
  }, [scheme]);
};
const useSafeValue = (unsafeValue, defValue, multiple = false) => {
  return useMemo(() => {
    if (unsafeValue === void 0 || !multiple && Object.keys(unsafeValue).length === 0 || multiple && (!isArray(unsafeValue) || unsafeValue.length == 0)) {
      if (multiple) {
        return [{ ...defValue, id: 1 }];
      }
      return { ...defValue };
    }
    return unsafeValue;
  }, [unsafeValue, multiple, defValue]);
};
const useSchemeToForm = (scheme, value, onChange) => {
  return useMemo(() => {
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
export {
  getDefValueForItem,
  getDefValueForScheme,
  useDefSchemeValue,
  useSafeValue,
  useSchemeToForm
};
