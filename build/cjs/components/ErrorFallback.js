"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
function ErrorFallback(_a) {
    var error = _a.error, resetErrorBoundary = _a.resetErrorBoundary;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ role: "alert" }, { children: [(0, jsx_runtime_1.jsx)("p", { children: "Something went wrong:" }), (0, jsx_runtime_1.jsx)("pre", { children: error.message }), (0, jsx_runtime_1.jsx)("button", tslib_1.__assign({ onClick: resetErrorBoundary }, { children: "Try again" }))] })));
}
exports.default = ErrorFallback;
