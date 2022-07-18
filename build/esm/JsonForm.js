import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*SYSTEM IMPORTS*/
import { useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
/* COMPONENTS */
import ErrorFallback from "./components/ErrorFallback";
import FlatForm from "./FlatForm";
import ArrayForm from "./ArrayForm";
/* HELPERS */
import { useDefSchemeValue, useSafeValue } from "./utils";
import { useJsonFormComponents } from "./UiContext";
var JsonForm = function (props) {
    var _a = props.multiple, multiple = _a === void 0 ? false : _a, _b = props.primary, primary = _b === void 0 ? true : _b, _c = props.scheme, scheme = _c === void 0 ? [] : _c, onChange = props.onChange;
    var defValue = useDefSchemeValue(scheme);
    var value = useSafeValue(props.value, defValue, multiple);
    var handleChange = useCallback(function (newValue) {
        onChange(__assign(__assign({}, value), newValue));
    }, [value, onChange]);
    var Components = useJsonFormComponents();
    return (_jsx(ErrorBoundary, __assign({ FallbackComponent: ErrorFallback, onReset: function () {
            // reset the state of your app so the error doesn't happen again
        } }, { children: _jsxs(Components.JsonForm, __assign({}, props, { children: [multiple && (_jsx(ArrayForm, { primary: primary, scheme: scheme, defValue: defValue, value: value, onChange: onChange })), !multiple && (_jsx(FlatForm, { primary: primary, scheme: scheme, value: value, onChange: handleChange }))] })) })));
};
export default JsonForm;
