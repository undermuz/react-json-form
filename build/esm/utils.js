import { __assign } from "tslib";
import { useMemo } from "react";
import { isArray } from "underscore";
import { EnumSchemeItemType, } from "./types";
export var getDefValueForItem = function (item) {
    var _a = item.def_value, def_value = _a === void 0 ? "" : _a, _b = item.type, type = _b === void 0 ? EnumSchemeItemType.Text : _b, _c = item.settings, settings = _c === void 0 ? {} : _c, _d = item.multiple, multiple = _d === void 0 ? false : _d;
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
            lng: 0,
        };
    if (type == "select") {
        if (settings.multiple) {
            return [];
        }
        if (settings.options && settings.options.length) {
            // def_value = settings.options[0]
        }
        else {
            return 0;
        }
    }
    return def_value;
};
export var getDefValueForScheme = function (scheme) {
    return scheme.reduce(function (new_value, current) {
        var _a;
        return (__assign(__assign({}, new_value), (_a = {}, _a[current.name] = current.def_value, _a)));
    }, {});
};
export var useDefSchemeValue = function (scheme) {
    return useMemo(function () {
        return getDefValueForScheme(scheme);
    }, [scheme]);
};
export var useSafeValue = function (unsafeValue, defValue, multiple) {
    if (multiple === void 0) { multiple = false; }
    return useMemo(function () {
        if (unsafeValue === undefined ||
            (!multiple && Object.keys(unsafeValue).length === 0) ||
            (multiple && (!isArray(unsafeValue) || unsafeValue.length == 0))) {
            if (multiple) {
                return [__assign(__assign({}, defValue), { id: 1 })];
            }
            return __assign({}, defValue);
        }
        return unsafeValue;
    }, [unsafeValue, multiple, defValue]);
};
export var useSchemeToForm = function (scheme, value, onChange) {
    return useMemo(function () {
        var config = {
            fields: {},
            options: {
                debug: true,
            },
            value: value,
            onChange: onChange,
        };
        scheme.forEach(function (item) {
            config.fields[item.name] = {
                label: item.title,
                rules: item.rules,
                initialValue: item.def_value,
            };
        });
        return config;
    }, [scheme, value, onChange]);
};
