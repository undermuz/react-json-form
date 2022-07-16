import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function ErrorFallback(_a) {
    var error = _a.error, resetErrorBoundary = _a.resetErrorBoundary;
    return (_jsxs("div", __assign({ role: "alert" }, { children: [_jsx("p", { children: "Something went wrong:" }), _jsx("pre", { children: error.message }), _jsx("button", __assign({ onClick: resetErrorBoundary }, { children: "Try again" }))] })));
}
export default ErrorFallback;
