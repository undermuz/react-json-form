"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
var types_1 = require("../../types");
var react_3 = require("@emotion/react");
var styled_1 = tslib_1.__importDefault(require("@emotion/styled"));
var UiContainer = function (_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(react_2.Flex, tslib_1.__assign({ direction: "column" }, { children: children }));
};
var UiBody = function (props) {
    var primary = props.primary, children = props.children;
    return ((0, jsx_runtime_1.jsx)(react_2.Flex, tslib_1.__assign({ direction: "column", p: primary ? 4 : 0, pl: 0 }, { children: children })));
};
var UiHeader = function (props) {
    var id = props.id, title = props.title, primary = props.primary, children = props.children;
    return ((0, jsx_runtime_1.jsxs)(react_2.Flex, tslib_1.__assign({ width: "100%", direction: "column", p: primary ? 3 : 1, justify: "between", background: primary ? "teal.300" : "gray.100" }, { children: [(0, jsx_runtime_1.jsxs)(react_2.Flex, tslib_1.__assign({ direction: "row", justify: "space-between", gap: "small" }, { children: [Boolean(title) && ((0, jsx_runtime_1.jsx)(react_2.Heading, tslib_1.__assign({ as: primary ? "h3" : "h4", size: primary ? "lg" : "md", margin: "none" }, { children: title }))), Boolean(id) && (0, jsx_runtime_1.jsxs)(react_2.Tag, { children: ["#", id] })] })), children] })));
};
var UiFlatFormContainer = function (_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(react_2.Flex, tslib_1.__assign({ direction: "column" }, { children: children }));
};
var Branch = (0, styled_1.default)(react_2.Flex)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n    width: var(--chakra-space-3);\n    ::before {\n        content: \"\";\n        box-sizing: content-box;\n        display: block;\n        width: 12px;\n        height: var(--branch-height, 18px);\n        padding-bottom: 18px;\n        border: solid var(--chakra-colors-gray-300);\n        border-width: 0 0 1px 1px;\n        border-bottom-left-radius: 8px;\n        margin-left: -1px;\n    }\n"], ["\n    width: var(--chakra-space-3);\n    ::before {\n        content: \"\";\n        box-sizing: content-box;\n        display: block;\n        width: 12px;\n        height: var(--branch-height, 18px);\n        padding-bottom: 18px;\n        border: solid var(--chakra-colors-gray-300);\n        border-width: 0 0 1px 1px;\n        border-bottom-left-radius: 8px;\n        margin-left: -1px;\n    }\n"])));
var UiField = function (props) {
    var title = props.title, isLast = props.isLast, _a = props.primary, primary = _a === void 0 ? false : _a, type = props.type, errors = props.errors, children = props.children;
    var showLabel = (0, react_1.useMemo)(function () {
        if (type === types_1.EnumSchemeItemType.Checkbox) {
            return false;
        }
        if (type === types_1.EnumSchemeItemType.Widget) {
            return false;
        }
        return true;
    }, [type]);
    return ((0, jsx_runtime_1.jsxs)(react_2.Flex, tslib_1.__assign({ direction: "row", borderLeft: !primary && !isLast ? "1px solid" : undefined, borderLeftColor: "gray.300", pb: !isLast ? 3 : undefined }, { children: [!primary && ((0, jsx_runtime_1.jsx)(Branch, { style: {
                    "--branch-height": type === types_1.EnumSchemeItemType.Checkbox
                        ? "1px"
                        : "34px",
                }, direction: "column" })), (0, jsx_runtime_1.jsx)(react_2.Flex, tslib_1.__assign({ width: "100%", pt: showLabel ? 0 : 2, pb: showLabel ? 0 : 2, direction: "column", justify: "center" }, { children: (0, jsx_runtime_1.jsxs)(react_2.FormControl, tslib_1.__assign({ isInvalid: (errors === null || errors === void 0 ? void 0 : errors.length) > 0 }, { children: [showLabel && ((0, jsx_runtime_1.jsx)(react_2.FormLabel, tslib_1.__assign({ htmlFor: "email" }, { children: title }))), children] })) }))] })));
};
var Tab = (0, styled_1.default)(react_2.Box)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n    ", "\n"], ["\n    ", "\n"])), function (_a) {
    var active = _a.active;
    return (0, react_3.css)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n        background-color: var(--chakra-colors-gray-50);\n\n        ", "\n\n        user-select: none;\n\n        cursor: pointer;\n    "], ["\n        background-color: var(--chakra-colors-gray-50);\n\n        ", "\n\n        user-select: none;\n\n        cursor: pointer;\n    "])), active && "background-color: var(--chakra-colors-teal-50);");
});
var UiTab = (0, react_1.forwardRef)(function (props, ref) {
    return ((0, jsx_runtime_1.jsx)(Tab, tslib_1.__assign({}, props, { onClick: props.onSelect, ref: ref }, { children: (0, jsx_runtime_1.jsxs)(react_2.Box, tslib_1.__assign({ p: 1 }, { children: [Boolean(props.label) && (0, jsx_runtime_1.jsx)(react_2.Text, { children: props.label }), props.children] })) })));
});
var UiArrayFormContainer = function (props) {
    return ((0, jsx_runtime_1.jsx)(react_2.Flex, tslib_1.__assign({ direction: "column", style: props.style }, { children: props.children })));
};
var UiArrayFormHeader = function (props) {
    return ((0, jsx_runtime_1.jsx)(react_2.Flex, tslib_1.__assign({ direction: "row", backgroundColor: "gray.100", justify: "space-between", mb: 3 }, { children: props.children })));
};
var TrashContainer = (0, styled_1.default)(react_2.Box)(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n    position: absolute;\n    z-index: 2;\n    top: -30px;\n    left: 0px;\n    width: 100%;\n"], ["\n    position: absolute;\n    z-index: 2;\n    top: -30px;\n    left: 0px;\n    width: 100%;\n"])));
var UiArrayFormTrashContainer = (0, react_1.forwardRef)(function (props, ref) {
    return ((0, jsx_runtime_1.jsxs)(TrashContainer, tslib_1.__assign({ ref: ref, animation: { type: "fadeIn", duration: 300 }, border: "2px", borderColor: "red.200", borderStyle: "dashed", backgroundColor: props.isOver ? "red.200" : "gray.100", p: 1 }, { children: [Boolean(props === null || props === void 0 ? void 0 : props.label) && (0, jsx_runtime_1.jsx)(react_2.Text, { children: props === null || props === void 0 ? void 0 : props.label }), props.children] })));
});
var UiArrayFormTabs = function (props) {
    return (0, jsx_runtime_1.jsx)(react_2.Flex, tslib_1.__assign({ direction: "row" }, { children: props.children }));
};
var UiArrayFormBody = function (props) {
    return (0, jsx_runtime_1.jsx)(react_2.Flex, tslib_1.__assign({ direction: "column" }, { children: props.children }));
};
var ChakraUi = {
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
exports.default = ChakraUi;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
