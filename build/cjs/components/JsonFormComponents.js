"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFormComponent = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var UiContext_1 = require("../UiContext");
var JsonFormComponent = function (props) {
    var id = props.id, title = props.title, _a = props.header, header = _a === void 0 ? null : _a, _b = props.multiple, multiple = _b === void 0 ? false : _b, _c = props.primary, primary = _c === void 0 ? true : _c, children = props.children;
    var Ui = (0, UiContext_1.useJsonFormUi)();
    return ((0, jsx_runtime_1.jsxs)(Ui.Container, { children: [(0, jsx_runtime_1.jsx)(Ui.Header, tslib_1.__assign({ id: id, primary: primary, title: title }, { children: header })), (0, jsx_runtime_1.jsx)(Ui.Body, tslib_1.__assign({ primary: primary, multiple: multiple }, { children: children }))] }));
};
exports.JsonFormComponent = JsonFormComponent;
