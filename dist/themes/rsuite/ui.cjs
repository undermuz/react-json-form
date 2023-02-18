"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ui_exports = {};
__export(ui_exports, {
  default: () => ui_default
});
module.exports = __toCommonJS(ui_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react = require("react");
var import_styled_components = __toESM(require("styled-components"), 1);
var import_types = require("../../types");
var import_rsuite = require("rsuite");
var import_grommet = require("grommet");
const UiContainer = ({ children }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_grommet.Box, { direction: "column", children });
};
const UiBody = (props) => {
  const { primary, children } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_grommet.Box,
    {
      pad: primary ? {
        top: "small",
        right: "small",
        bottom: "small"
      } : void 0,
      children
    }
  );
};
const UiHeader = (props) => {
  const { id, title, primary, children } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_grommet.Box,
    {
      width: "100%",
      direction: "row",
      pad: primary ? "small" : "xxsmall",
      justify: "between",
      background: primary ? "brand" : "light-2",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_grommet.Box, { direction: "row", justify: "start", gap: "small", children: [
          Boolean(title) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_grommet.Heading, { level: primary ? 3 : 4, margin: "none", children: title }),
          Boolean(id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_grommet.Tag, { value: `#${id}` })
        ] }),
        children
      ]
    }
  );
};
const UiFlatFormContainer = ({
  primary = false,
  children
}) => {
  if (primary) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_rsuite.Form, { children });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rs-form rs-form-vertical rs-form-fixed-width", children });
};
const UiField = (props) => {
  const { title, name, type, errors, children } = props;
  const showLabel = (0, import_react.useMemo)(() => {
    if (type === import_types.EnumSchemeItemType.Checkbox) {
      return false;
    }
    if (type === import_types.EnumSchemeItemType.Widget) {
      return false;
    }
    return true;
  }, [type]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_rsuite.Form.Group, { controlId: name, children: [
    showLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_rsuite.Form.ControlLabel, { children: title }),
    children,
    errors && errors.length > 0 && errors.map((error, index) => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { color: "red" }, children: error }, index);
    })
  ] });
};
const UiTab = (0, import_react.forwardRef)(
  (props, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_rsuite.Nav.Item, { ...props, ref, children: [
      Boolean(props.label) && props.label,
      props.children
    ] });
  }
);
const UiArrayFormContainer = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_grommet.Box, { direction: "column", style: props.style, children: props.children });
};
const UiArrayFormHeader = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_grommet.Box, { direction: "row", justify: "between", children: props.children });
};
const TrashContainer = (0, import_styled_components.default)(import_grommet.Box)`
    position: absolute;
    z-index: 2;
    top: -30px;
    left: 0px;
    width: 100%;
`;
const UiArrayFormTrashContainer = (0, import_react.forwardRef)((props, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    TrashContainer,
    {
      ref,
      animation: { type: "fadeIn", duration: 300 },
      border: {
        color: "status-critical",
        size: "small",
        style: "dashed"
      },
      background: {
        color: props.isOver ? "status-critical" : "light-2"
      },
      pad: "xsmall",
      children: [
        Boolean(props == null ? void 0 : props.label) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_grommet.Text, { children: props == null ? void 0 : props.label }),
        props.children
      ]
    }
  );
});
const UiArrayFormTabs = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_rsuite.Nav, { appearance: !props.actions ? "tabs" : void 0, children: props.children });
};
const UiArrayFormBody = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_grommet.Box, { children: props.children });
};
const RsuiteUi = {
  Container: UiContainer,
  Header: UiHeader,
  Body: UiBody,
  FlatForm: UiFlatFormContainer,
  Field: UiField,
  ArrayForm: Object.assign(UiArrayFormContainer, {
    Header: UiArrayFormHeader,
    Tabs: UiArrayFormTabs,
    Body: UiArrayFormBody,
    TrashContainer: UiArrayFormTrashContainer
  }),
  Tab: UiTab
};
var ui_default = RsuiteUi;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
