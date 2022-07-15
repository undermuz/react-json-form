import { __assign } from "tslib";
import { useMemo } from "react";
import { isArray } from "underscore";
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
            (multiple && (!isArray(unsafeValue) || unsafeValue.length == 0))) {
            if (multiple) {
                return [__assign(__assign({}, defValue), { id: 1 })];
            }
            return __assign({}, defValue);
        }
        return unsafeValue;
    }, [unsafeValue, multiple, defValue]);
};
