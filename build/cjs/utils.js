"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSchemeToForm = exports.useSafeValue = exports.useDefSchemeValue = exports.getDefValueForScheme = exports.getDefValueForItem = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var underscore_1 = require("underscore");
var types_1 = require("./types");
var getDefValueForItem = function (item) {
    var _a = item.def_value, def_value = _a === void 0 ? "" : _a, _b = item.type, type = _b === void 0 ? types_1.EnumSchemeItemType.Text : _b, _c = item.settings, settings = _c === void 0 ? {} : _c, _d = item.multiple, multiple = _d === void 0 ? false : _d;
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
    if (type == types_1.EnumSchemeItemType.GeoCoordinates)
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
exports.getDefValueForItem = getDefValueForItem;
var getDefValueForScheme = function (scheme) {
    return scheme.reduce(function (new_value, current) {
        var _a;
        return (tslib_1.__assign(tslib_1.__assign({}, new_value), (_a = {}, _a[current.name] = current.def_value, _a)));
    }, {});
};
exports.getDefValueForScheme = getDefValueForScheme;
var useDefSchemeValue = function (scheme) {
    return (0, react_1.useMemo)(function () {
        return (0, exports.getDefValueForScheme)(scheme);
    }, [scheme]);
};
exports.useDefSchemeValue = useDefSchemeValue;
var useSafeValue = function (unsafeValue, defValue, multiple) {
    if (multiple === void 0) { multiple = false; }
    return (0, react_1.useMemo)(function () {
        if (unsafeValue === undefined ||
            (!multiple && Object.keys(unsafeValue).length === 0) ||
            (multiple && (!(0, underscore_1.isArray)(unsafeValue) || unsafeValue.length == 0))) {
            if (multiple) {
                return [tslib_1.__assign(tslib_1.__assign({}, defValue), { id: 1 })];
            }
            return tslib_1.__assign({}, defValue);
        }
        return unsafeValue;
    }, [unsafeValue, multiple, defValue]);
};
exports.useSafeValue = useSafeValue;
var useSchemeToForm = function (scheme, value, onChange) {
    return (0, react_1.useMemo)(function () {
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
exports.useSchemeToForm = useSchemeToForm;
