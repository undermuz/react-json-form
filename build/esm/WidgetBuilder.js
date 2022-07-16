import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*SYSTEM IMPORTS*/
import { useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
/* UI */
import { Box, Heading, Tag } from "grommet";
/* COMPONENTS */
import ErrorFallback from "./components/ErrorFallback";
import Widget from "./Widget";
import MultipleWidget from "./MultipleWidget";
/* HELPERS */
import { useDefSchemeValue, useSafeValue } from "./utils";
var WidgetBuilder = function (props) {
    var id = props.id, _a = props.title, title = _a === void 0 ? false : _a, _b = props.header, header = _b === void 0 ? null : _b, _c = props.multiple, multiple = _c === void 0 ? false : _c, _d = props.primary, primary = _d === void 0 ? false : _d, _e = props.scheme, scheme = _e === void 0 ? [] : _e, onChange = props.onChange;
    var defValue = useDefSchemeValue(scheme);
    var value = useSafeValue(props.value, defValue, multiple);
    var handleChange = useCallback(function (newValue) {
        onChange(__assign(__assign({}, value), newValue));
    }, [value, onChange]);
    return (_jsxs(ErrorBoundary, __assign({ FallbackComponent: ErrorFallback, onReset: function () {
            // reset the state of your app so the error doesn't happen again
        } }, { children: [Boolean(title) && (_jsxs(Box, __assign({ width: "100%", direction: "row", pad: "small", justify: "between", background: primary ? "brand" : "light-6" }, { children: [_jsxs(Box, __assign({ direction: "row", justify: "start", gap: "small" }, { children: [_jsx(Heading, __assign({ level: 3, margin: "none" }, { children: title })), Boolean(id) && _jsx(Tag, { value: "#".concat(id) })] })), header] }))), _jsxs(Box, __assign({ pad: "small" }, { children: [multiple && (_jsx(MultipleWidget, { scheme: scheme, defValue: defValue, value: value, onChange: onChange })), !multiple && (_jsx(Widget, { scheme: scheme, value: value, onChange: handleChange }))] }))] })));
};
export default WidgetBuilder;
