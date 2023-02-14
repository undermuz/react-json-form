import { __assign, __makeTemplateObject } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useMemo, } from "react";
import { Box, Flex, FormControl, FormLabel, Heading, Tag, Text, } from "@chakra-ui/react";
import { EnumSchemeItemType, } from "../../types";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
var UiContainer = function (_a) {
    var children = _a.children;
    return _jsx(Flex, __assign({ direction: "column" }, { children: children }));
};
var UiBody = function (props) {
    var primary = props.primary, children = props.children;
    return (_jsx(Flex, __assign({ direction: "column", p: primary ? 4 : 0, pl: 0 }, { children: children })));
};
var UiHeader = function (props) {
    var id = props.id, title = props.title, primary = props.primary, children = props.children;
    return (_jsxs(Flex, __assign({ width: "100%", direction: "column", p: primary ? 3 : 1, justify: "between", background: primary ? "teal.300" : "gray.100" }, { children: [_jsxs(Flex, __assign({ direction: "row", justify: "space-between", gap: "small" }, { children: [Boolean(title) && (_jsx(Heading, __assign({ as: primary ? "h3" : "h4", size: primary ? "lg" : "md", margin: "none" }, { children: title }))), Boolean(id) && _jsxs(Tag, { children: ["#", id] })] })), children] })));
};
var UiFlatFormContainer = function (_a) {
    var children = _a.children;
    return _jsx(Flex, __assign({ direction: "column" }, { children: children }));
};
var Branch = styled(Flex)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    width: var(--chakra-space-3);\n    ::before {\n        content: \"\";\n        box-sizing: content-box;\n        display: block;\n        width: 12px;\n        height: var(--branch-height, 18px);\n        padding-bottom: 18px;\n        border: solid var(--chakra-colors-gray-300);\n        border-width: 0 0 1px 1px;\n        border-bottom-left-radius: 8px;\n        margin-left: -1px;\n    }\n"], ["\n    width: var(--chakra-space-3);\n    ::before {\n        content: \"\";\n        box-sizing: content-box;\n        display: block;\n        width: 12px;\n        height: var(--branch-height, 18px);\n        padding-bottom: 18px;\n        border: solid var(--chakra-colors-gray-300);\n        border-width: 0 0 1px 1px;\n        border-bottom-left-radius: 8px;\n        margin-left: -1px;\n    }\n"])));
var UiField = function (props) {
    var title = props.title, isLast = props.isLast, _a = props.primary, primary = _a === void 0 ? false : _a, type = props.type, errors = props.errors, children = props.children;
    var showLabel = useMemo(function () {
        if (type === EnumSchemeItemType.Checkbox) {
            return false;
        }
        if (type === EnumSchemeItemType.Widget) {
            return false;
        }
        return true;
    }, [type]);
    return (_jsxs(Flex, __assign({ direction: "row", borderLeft: !primary && !isLast ? "1px solid" : undefined, borderLeftColor: "gray.300", pb: !isLast ? 3 : undefined }, { children: [!primary && (_jsx(Branch, { style: {
                    "--branch-height": type === EnumSchemeItemType.Checkbox
                        ? "1px"
                        : "34px",
                }, direction: "column" })), _jsx(Flex, __assign({ width: "100%", pt: showLabel ? 0 : 2, pb: showLabel ? 0 : 2, direction: "column", justify: "center" }, { children: _jsxs(FormControl, __assign({ isInvalid: (errors === null || errors === void 0 ? void 0 : errors.length) > 0 }, { children: [showLabel && (_jsx(FormLabel, __assign({ htmlFor: "email" }, { children: title }))), children] })) }))] })));
};
var Tab = styled(Box)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    ", "\n"], ["\n    ", "\n"])), function (_a) {
    var active = _a.active;
    return css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        background-color: var(--chakra-colors-gray-50);\n\n        ", "\n\n        user-select: none;\n\n        cursor: pointer;\n    "], ["\n        background-color: var(--chakra-colors-gray-50);\n\n        ", "\n\n        user-select: none;\n\n        cursor: pointer;\n    "])), active && "background-color: var(--chakra-colors-teal-50);");
});
var UiTab = forwardRef(function (props, ref) {
    return (_jsx(Tab, __assign({}, props, { onClick: props.onSelect, ref: ref }, { children: _jsxs(Box, __assign({ p: 1 }, { children: [Boolean(props.label) && _jsx(Text, { children: props.label }), props.children] })) })));
});
var UiArrayFormContainer = function (props) {
    return (_jsx(Flex, __assign({ direction: "column", style: props.style }, { children: props.children })));
};
var UiArrayFormHeader = function (props) {
    return (_jsx(Flex, __assign({ direction: "row", backgroundColor: "gray.100", justify: "space-between", mb: 3 }, { children: props.children })));
};
var TrashContainer = styled(Box)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    position: absolute;\n    z-index: 2;\n    top: -30px;\n    left: 0px;\n    width: 100%;\n"], ["\n    position: absolute;\n    z-index: 2;\n    top: -30px;\n    left: 0px;\n    width: 100%;\n"])));
var UiArrayFormTrashContainer = forwardRef(function (props, ref) {
    return (_jsxs(TrashContainer, __assign({ ref: ref, animation: { type: "fadeIn", duration: 300 }, border: "2px", borderColor: "red.200", borderStyle: "dashed", backgroundColor: props.isOver ? "red.200" : "gray.100", p: 1 }, { children: [Boolean(props === null || props === void 0 ? void 0 : props.label) && _jsx(Text, { children: props === null || props === void 0 ? void 0 : props.label }), props.children] })));
});
var UiArrayFormTabs = function (props) {
    return _jsx(Flex, __assign({ direction: "row" }, { children: props.children }));
};
var UiArrayFormBody = function (props) {
    return _jsx(Flex, __assign({ direction: "column" }, { children: props.children }));
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
export default ChakraUi;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
