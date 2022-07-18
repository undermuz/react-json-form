"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var styled_components_1 = tslib_1.__importStar(require("styled-components"));
var grommet_1 = require("grommet");
var types_1 = require("../../types");
var UiContainer = (0, styled_components_1.default)(grommet_1.Box)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n    @import url(\"https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap\");\n\n    * {\n        font-family: \"Roboto\", sans-serif;\n    }\n"], ["\n    @import url(\"https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap\");\n\n    * {\n        font-family: \"Roboto\", sans-serif;\n    }\n"])));
var UiBody = function (_a) {
    var primary = _a.primary, children = _a.children;
    return ((0, jsx_runtime_1.jsx)(grommet_1.Box, tslib_1.__assign({ pad: primary
            ? {
                top: "small",
                right: "small",
                bottom: "small",
            }
            : undefined }, { children: children })));
};
var UiHeader = function (props) {
    var id = props.id, title = props.title, primary = props.primary, children = props.children;
    return ((0, jsx_runtime_1.jsxs)(grommet_1.Box, tslib_1.__assign({ width: "100%", direction: "row", pad: primary ? "small" : "xxsmall", justify: "between", background: primary ? "brand" : "light-2" }, { children: [(0, jsx_runtime_1.jsxs)(grommet_1.Box, tslib_1.__assign({ direction: "row", justify: "start", gap: "small" }, { children: [Boolean(title) && ((0, jsx_runtime_1.jsx)(grommet_1.Heading, tslib_1.__assign({ level: primary ? 3 : 4, margin: "none" }, { children: title }))), Boolean(id) && (0, jsx_runtime_1.jsx)(grommet_1.Tag, { value: "#".concat(id) })] })), children] })));
};
var UiFlatFormContainer = function (_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(grommet_1.Box, { children: children });
};
var Branch = (0, styled_components_1.default)(grommet_1.Box)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n    ", "\n"], ["\n    ", "\n"])), function (_a) {
    var theme = _a.theme;
    return (0, styled_components_1.css)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n        width: 10px;\n        ::before {\n            content: \"\";\n            box-sizing: content-box;\n            display: block;\n            width: 12px;\n            height: var(--branch-height, 18px);\n            padding-bottom: 18px;\n            border: solid ", ";\n            border-width: 0 0 1px 1px;\n            border-bottom-left-radius: 8px;\n            margin-left: -1px;\n        }\n    "], ["\n        width: 10px;\n        ::before {\n            content: \"\";\n            box-sizing: content-box;\n            display: block;\n            width: 12px;\n            height: var(--branch-height, 18px);\n            padding-bottom: 18px;\n            border: solid ", ";\n            border-width: 0 0 1px 1px;\n            border-bottom-left-radius: 8px;\n            margin-left: -1px;\n        }\n    "])), theme.global.colors["dark-3"]);
});
var UiField = function (props) {
    var title = props.title, _a = props.isLast, isLast = _a === void 0 ? false : _a, _b = props.primary, primary = _b === void 0 ? false : _b, type = props.type, children = props.children;
    var showLabel = (0, react_1.useMemo)(function () {
        if (type === types_1.EnumSchemeItemType.Checkbox) {
            return false;
        }
        if (type === types_1.EnumSchemeItemType.Widget) {
            return false;
        }
        return true;
    }, [type]);
    return ((0, jsx_runtime_1.jsxs)(grommet_1.Box, tslib_1.__assign({ direction: "row", border: [
            {
                side: "left",
                size: !primary && !isLast ? "xsmall" : "none",
                color: "dark-3",
            },
        ], pad: {
            bottom: !isLast ? "small" : undefined,
        } }, { children: [!primary && ((0, jsx_runtime_1.jsx)(Branch, { style: {
                    "--branch-height": type === types_1.EnumSchemeItemType.Checkbox
                        ? "1px"
                        : "34px",
                }, direction: "column" })), (0, jsx_runtime_1.jsxs)(grommet_1.Box, tslib_1.__assign({ width: "100%", pad: {
                    top: !showLabel ? "small" : undefined,
                    bottom: !showLabel ? "small" : undefined,
                }, direction: "column", justify: "center" }, { children: [showLabel && (0, jsx_runtime_1.jsx)(grommet_1.Text, tslib_1.__assign({ as: "label" }, { children: title })), children] }))] })));
};
var Tab = (0, styled_components_1.default)(grommet_1.Box)(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n    user-select: none;\n"], ["\n    user-select: none;\n"])));
var UiTab = (0, react_1.forwardRef)(function (props, ref) {
    return ((0, jsx_runtime_1.jsx)(Tab, tslib_1.__assign({}, props, { onClick: props.onSelect, background: {
            color: props.active ? "brand" : "light-3",
            opacity: props.active ? "medium" : undefined,
        }, ref: ref, hoverIndicator: true }, { children: (0, jsx_runtime_1.jsxs)(grommet_1.Box, tslib_1.__assign({ pad: "xsmall" }, { children: [Boolean(props === null || props === void 0 ? void 0 : props.label) && (0, jsx_runtime_1.jsx)(grommet_1.Text, { children: props === null || props === void 0 ? void 0 : props.label }), props.children] })) })));
});
var UiArrayFormContainer = function (props) {
    return ((0, jsx_runtime_1.jsx)(grommet_1.Box, tslib_1.__assign({ direction: "column", style: props.style }, { children: props.children })));
};
var UiArrayFormHeader = function (props) {
    return ((0, jsx_runtime_1.jsx)(grommet_1.Box, tslib_1.__assign({ direction: "row", justify: "between", background: { color: "light-2" } }, { children: props.children })));
};
var TrashContainer = (0, styled_components_1.default)(grommet_1.Box)(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n    position: absolute;\n    z-index: 2;\n    top: -56px;\n    left: 0px;\n    width: 100%;\n"], ["\n    position: absolute;\n    z-index: 2;\n    top: -56px;\n    left: 0px;\n    width: 100%;\n"])));
var UiArrayFormTrashContainer = (0, react_1.forwardRef)(function (props, ref) {
    return ((0, jsx_runtime_1.jsxs)(TrashContainer, tslib_1.__assign({ ref: ref, animation: { type: "fadeIn", duration: 300 }, border: {
            color: "status-critical",
            size: "small",
            style: "dashed",
        }, background: {
            color: props.isOver ? "status-critical" : "light-2",
        }, pad: "xsmall" }, { children: [Boolean(props === null || props === void 0 ? void 0 : props.label) && (0, jsx_runtime_1.jsx)(grommet_1.Text, { children: props === null || props === void 0 ? void 0 : props.label }), props.children] })));
});
var UiArrayFormTabs = function (props) {
    return (0, jsx_runtime_1.jsx)(grommet_1.Box, tslib_1.__assign({ direction: "row" }, { children: props.children }));
};
var UiArrayFormBody = function (props) {
    return (0, jsx_runtime_1.jsx)(grommet_1.Box, { children: props.children });
};
var GrommetUi = {
    Container: UiContainer,
    Header: UiHeader,
    Body: UiBody,
    FlatForm: UiFlatFormContainer,
    Field: UiField,
    ArrayForm: Object.assign(UiArrayFormContainer, {
        Header: UiArrayFormHeader,
        Tabs: UiArrayFormTabs,
        Body: UiArrayFormBody,
        TrashContainer: UiArrayFormTrashContainer,
    }),
    Tab: UiTab,
};
exports.default = GrommetUi;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
