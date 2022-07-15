"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSafeValue = exports.useDefSchemeValue = exports.getDefValueForScheme = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var underscore_1 = require("underscore");
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
