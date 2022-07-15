import { __assign } from "tslib";
/*SYSTEM IMPORTS*/
import React, { useCallback } from "react";
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
    return (React.createElement(ErrorBoundary, { FallbackComponent: ErrorFallback, onReset: function () {
            // reset the state of your app so the error doesn't happen again
        } },
        Boolean(title) && (React.createElement(Box, { width: "100%", direction: "row", pad: "small", justify: "between", background: primary ? "brand" : "light-6" },
            React.createElement(Box, { direction: "row", justify: "start", gap: "small" },
                React.createElement(Heading, { level: 3, margin: "none" }, title),
                Boolean(id) && React.createElement(Tag, { value: "#".concat(id) })),
            header)),
        React.createElement(Box, { pad: "small" },
            multiple && (React.createElement(MultipleWidget, { scheme: scheme, defValue: defValue, value: value, onChange: onChange })),
            !multiple && (React.createElement(Widget, { scheme: scheme, value: value, onChange: handleChange })))));
};
export default WidgetBuilder;
