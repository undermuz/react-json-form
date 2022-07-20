"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFormComponent = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var rsuite_1 = require("rsuite");
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var UiContext_1 = require("../../UiContext");
var UiHeader = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n"], ["\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n"])));
var JsonFormComponent = function (props) {
    var title = props.title, _a = props.header, header = _a === void 0 ? null : _a, _b = props.primary, primary = _b === void 0 ? true : _b, children = props.children;
    var Ui = (0, UiContext_1.useJsonFormUi)();
    return ((0, jsx_runtime_1.jsx)(Ui.Container, { children: (0, jsx_runtime_1.jsx)(rsuite_1.Panel, tslib_1.__assign({ header: (0, jsx_runtime_1.jsxs)(UiHeader, { children: [title, header] }), shaded: !primary }, { children: children })) }));
};
exports.JsonFormComponent = JsonFormComponent;
var templateObject_1;
