import { __assign, __makeTemplateObject } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useMemo } from "react";
import styled from "styled-components";
import { EnumSchemeItemType, } from "../../types";
import { Form, Nav } from "rsuite";
import { Box, Heading, Tag, Text } from "grommet";
var UiContainer = function (_a) {
    var children = _a.children;
    return _jsx(Box, __assign({ direction: "column" }, { children: children }));
};
var UiBody = function (props) {
    var primary = props.primary, children = props.children;
    return (_jsx(Box, __assign({ pad: primary
            ? {
                top: "small",
                right: "small",
                bottom: "small",
            }
            : undefined }, { children: children })));
};
var UiHeader = function (props) {
    var id = props.id, title = props.title, primary = props.primary, children = props.children;
    return (_jsxs(Box, __assign({ width: "100%", direction: "row", pad: primary ? "small" : "xxsmall", justify: "between", background: primary ? "brand" : "light-2" }, { children: [_jsxs(Box, __assign({ direction: "row", justify: "start", gap: "small" }, { children: [Boolean(title) && (_jsx(Heading, __assign({ level: primary ? 3 : 4, margin: "none" }, { children: title }))), Boolean(id) && _jsx(Tag, { value: "#".concat(id) })] })), children] })));
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
    return (_jsx(Box, __assign({ direction: "column", style: props.style }, { children: props.children })));
};
var UiArrayFormHeader = function (props) {
    return (_jsx(Box, __assign({ direction: "row", justify: "between" }, { children: props.children })));
};
var TrashContainer = styled(Box)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    position: absolute;\n    z-index: 2;\n    top: -30px;\n    left: 0px;\n    width: 100%;\n"], ["\n    position: absolute;\n    z-index: 2;\n    top: -30px;\n    left: 0px;\n    width: 100%;\n"])));
var UiArrayFormTrashContainer = forwardRef(function (props, ref) {
    return (_jsxs(TrashContainer, __assign({ ref: ref, animation: { type: "fadeIn", duration: 300 }, border: {
            color: "status-critical",
            size: "small",
            style: "dashed",
        }, background: {
            color: props.isOver ? "status-critical" : "light-2",
        }, pad: "xsmall" }, { children: [Boolean(props === null || props === void 0 ? void 0 : props.label) && _jsx(Text, { children: props === null || props === void 0 ? void 0 : props.label }), props.children] })));
});
var UiArrayFormTabs = function (props) {
    return (_jsx(Nav, __assign({ appearance: !props.actions ? "tabs" : undefined }, { children: props.children })));
};
var UiArrayFormBody = function (props) {
    return _jsx(Box, { children: props.children });
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
