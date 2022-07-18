"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
/*SYSTEM IMPORTS*/
var react_1 = require("react");
var react_error_boundary_1 = require("react-error-boundary");
/* COMPONENTS */
var ErrorFallback_1 = tslib_1.__importDefault(require("./components/ErrorFallback"));
var FlatForm_1 = tslib_1.__importDefault(require("./FlatForm"));
var ArrayForm_1 = tslib_1.__importDefault(require("./ArrayForm"));
/* HELPERS */
var utils_1 = require("./utils");
var UiContext_1 = require("./UiContext");
var JsonForm = function (props) {
    var _a = props.multiple, multiple = _a === void 0 ? false : _a, _b = props.primary, primary = _b === void 0 ? true : _b, _c = props.scheme, scheme = _c === void 0 ? [] : _c, onChange = props.onChange;
    var defValue = (0, utils_1.useDefSchemeValue)(scheme);
    var value = (0, utils_1.useSafeValue)(props.value, defValue, multiple);
    var handleChange = (0, react_1.useCallback)(function (newValue) {
        onChange(tslib_1.__assign(tslib_1.__assign({}, value), newValue));
    }, [value, onChange]);
    var Components = (0, UiContext_1.useJsonFormComponents)();
    return ((0, jsx_runtime_1.jsx)(react_error_boundary_1.ErrorBoundary, tslib_1.__assign({ FallbackComponent: ErrorFallback_1.default, onReset: function () {
            // reset the state of your app so the error doesn't happen again
        } }, { children: (0, jsx_runtime_1.jsxs)(Components.JsonForm, tslib_1.__assign({}, props, { children: [multiple && ((0, jsx_runtime_1.jsx)(ArrayForm_1.default, { primary: primary, scheme: scheme, defValue: defValue, value: value, onChange: onChange })), !multiple && ((0, jsx_runtime_1.jsx)(FlatForm_1.default, { primary: primary, scheme: scheme, value: value, onChange: handleChange }))] })) })));
};
exports.default = JsonForm;
