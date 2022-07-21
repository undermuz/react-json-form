import { __assign, __makeTemplateObject } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useMemo } from "react";
import styled from "styled-components";
import { Box, Flex, Heading, Tag, Text } from "@chakra-ui/react";
import { EnumSchemeItemType, } from "../../types";
import { Form, Nav } from "rsuite";
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
    var _b = _a.primary, primary = _b === void 0 ? false : _b, children = _a.children;
    if (primary) {
        return _jsx(Form, { children: children });
    }
    return (_jsx("div", __assign({ className: "rs-form rs-form-vertical rs-form-fixed-width" }, { children: children })));
};
var UiField = function (props) {
    var title = props.title, name = props.name, type = props.type, errors = props.errors, children = props.children;
    var showLabel = useMemo(function () {
        if (type === EnumSchemeItemType.Checkbox) {
            return false;
        }
        if (type === EnumSchemeItemType.Widget) {
            return false;
        }
        return true;
    }, [type]);
    return (_jsxs(Form.Group, __assign({ controlId: name }, { children: [showLabel && _jsx(Form.ControlLabel, { children: title }), children, errors &&
                errors.length > 0 &&
                errors.map(function (error, index) {
                    return (_jsx("div", __assign({ style: { color: "red" } }, { children: error }), index));
                })] })));
};
var UiTab = forwardRef(function (props, ref) {
    return (_jsxs(Nav.Item, __assign({}, props, { ref: ref }, { children: [Boolean(props.label) && props.label, props.children] })));
});
var UiArrayFormContainer = function (props) {
    return (_jsx(Flex, __assign({ direction: "column", style: props.style }, { children: props.children })));
};
var UiArrayFormHeader = function (props) {
    return (_jsx(Flex, __assign({ direction: "row", backgroundColor: "gray.100", justify: "space-between", mb: 3 }, { children: props.children })));
};
var TrashContainer = styled(Box)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    position: absolute;\n    z-index: 2;\n    top: -30px;\n    left: 0px;\n    width: 100%;\n"], ["\n    position: absolute;\n    z-index: 2;\n    top: -30px;\n    left: 0px;\n    width: 100%;\n"])));
var UiArrayFormTrashContainer = forwardRef(function (props, ref) {
    return (_jsxs(TrashContainer, __assign({ ref: ref, animation: { type: "fadeIn", duration: 300 }, border: "2px", borderColor: "red.200", borderStyle: "dashed", backgroundColor: props.isOver ? "red.200" : "gray.100", p: 1 }, { children: [Boolean(props === null || props === void 0 ? void 0 : props.label) && _jsx(Text, { children: props === null || props === void 0 ? void 0 : props.label }), props.children] })));
});
var UiArrayFormTabs = function (props) {
    return (_jsx(Nav, __assign({ appearance: !props.actions ? "tabs" : undefined }, { children: props.children })));
};
var UiArrayFormBody = function (props) {
    return _jsx(Flex, __assign({ direction: "column" }, { children: props.children }));
};
var RsuiteUi = {
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
export default RsuiteUi;
var templateObject_1;
