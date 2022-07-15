"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
function ErrorFallback(_a) {
    var error = _a.error, resetErrorBoundary = _a.resetErrorBoundary;
    return (react_1.default.createElement("div", { role: "alert" },
        react_1.default.createElement("p", null, "Something went wrong:"),
        react_1.default.createElement("pre", null, error.message),
        react_1.default.createElement("button", { onClick: resetErrorBoundary }, "Try again")));
}
exports.default = ErrorFallback;
