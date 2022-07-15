"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/*SYSTEM IMPORTS*/
var react_1 = tslib_1.__importStar(require("react"));
var react_error_boundary_1 = require("react-error-boundary");
/* UI */
var grommet_1 = require("grommet");
/* COMPONENTS */
var ErrorFallback_1 = tslib_1.__importDefault(require("./components/ErrorFallback"));
var Widget_1 = tslib_1.__importDefault(require("./Widget"));
var MultipleWidget_1 = tslib_1.__importDefault(require("./MultipleWidget"));
/* HELPERS */
var utils_1 = require("./utils");
var WidgetBuilder = function (props) {
    var id = props.id, _a = props.title, title = _a === void 0 ? false : _a, _b = props.header, header = _b === void 0 ? null : _b, _c = props.multiple, multiple = _c === void 0 ? false : _c, _d = props.primary, primary = _d === void 0 ? false : _d, _e = props.scheme, scheme = _e === void 0 ? [] : _e, onChange = props.onChange;
    var defValue = (0, utils_1.useDefSchemeValue)(scheme);
    var value = (0, utils_1.useSafeValue)(props.value, defValue, multiple);
    var handleChange = (0, react_1.useCallback)(function (newValue) {
        onChange(tslib_1.__assign(tslib_1.__assign({}, value), newValue));
    }, [value, onChange]);
    return (react_1.default.createElement(react_error_boundary_1.ErrorBoundary, { FallbackComponent: ErrorFallback_1.default, onReset: function () {
            // reset the state of your app so the error doesn't happen again
        } },
        Boolean(title) && (react_1.default.createElement(grommet_1.Box, { width: "100%", direction: "row", pad: "small", justify: "between", background: primary ? "brand" : "light-6" },
            react_1.default.createElement(grommet_1.Box, { direction: "row", justify: "start", gap: "small" },
                react_1.default.createElement(grommet_1.Heading, { level: 3, margin: "none" }, title),
                Boolean(id) && react_1.default.createElement(grommet_1.Tag, { value: "#".concat(id) })),
            header)),
        react_1.default.createElement(grommet_1.Box, { pad: "small" },
            multiple && (react_1.default.createElement(MultipleWidget_1.default, { scheme: scheme, defValue: defValue, value: value, onChange: onChange })),
            !multiple && (react_1.default.createElement(Widget_1.default, { scheme: scheme, value: value, onChange: handleChange })))));
};
exports.default = WidgetBuilder;
