"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var types_1 = require("../../types");
var rsuite_1 = require("rsuite");
var grommet_1 = require("grommet");
var UiContainer = function (_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(grommet_1.Box, tslib_1.__assign({ direction: "column" }, { children: children }));
};
var UiBody = function (props) {
    var primary = props.primary, children = props.children;
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
    var _b = _a.primary, primary = _b === void 0 ? false : _b, children = _a.children;
    if (primary) {
        return (0, jsx_runtime_1.jsx)(rsuite_1.Form, { children: children });
    }
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "rs-form rs-form-vertical rs-form-fixed-width" }, { children: children })));
};
var UiField = function (props) {
    var title = props.title, name = props.name, type = props.type, errors = props.errors, children = props.children;
    var showLabel = (0, react_1.useMemo)(function () {
        if (type === types_1.EnumSchemeItemType.Checkbox) {
            return false;
        }
        if (type === types_1.EnumSchemeItemType.Widget) {
            return false;
        }
        return true;
    }, [type]);
    return ((0, jsx_runtime_1.jsxs)(rsuite_1.Form.Group, tslib_1.__assign({ controlId: name }, { children: [showLabel && (0, jsx_runtime_1.jsx)(rsuite_1.Form.ControlLabel, { children: title }), children, errors &&
                errors.length > 0 &&
                errors.map(function (error, index) {
                    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { color: "red" } }, { children: error }), index));
                })] })));
};
var UiTab = (0, react_1.forwardRef)(function (props, ref) {
    return ((0, jsx_runtime_1.jsxs)(rsuite_1.Nav.Item, tslib_1.__assign({}, props, { ref: ref }, { children: [Boolean(props.label) && props.label, props.children] })));
});
var UiArrayFormContainer = function (props) {
    return ((0, jsx_runtime_1.jsx)(grommet_1.Box, tslib_1.__assign({ direction: "column", style: props.style }, { children: props.children })));
};
var UiArrayFormHeader = function (props) {
    return ((0, jsx_runtime_1.jsx)(grommet_1.Box, tslib_1.__assign({ direction: "row", justify: "between" }, { children: props.children })));
};
var TrashContainer = (0, styled_components_1.default)(grommet_1.Box)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n    position: absolute;\n    z-index: 2;\n    top: -30px;\n    left: 0px;\n    width: 100%;\n"], ["\n    position: absolute;\n    z-index: 2;\n    top: -30px;\n    left: 0px;\n    width: 100%;\n"])));
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
    return ((0, jsx_runtime_1.jsx)(rsuite_1.Nav, tslib_1.__assign({ appearance: !props.actions ? "tabs" : undefined }, { children: props.children })));
};
var UiArrayFormBody = function (props) {
    return (0, jsx_runtime_1.jsx)(grommet_1.Box, { children: props.children });
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
exports.default = RsuiteUi;
var templateObject_1;
