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

// src/themes/chakra/ui.tsx
var ui_exports = {};
__export(ui_exports, {
  default: () => ui_default
});
module.exports = __toCommonJS(ui_exports);
var import_react = require("react");
var import_react2 = require("@chakra-ui/react");
var import_types = require("../../types.js");
var import_styled = __toESM(require("@emotion/styled"));
var import_jsx_runtime = require("react/jsx-runtime");
var styled = import_styled.default.default ?? import_styled.default;
var UiContainer = ({ children }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Flex, { direction: "column", children });
};
var UiPrimaryBody = (props) => {
  const { children } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Flex, { direction: "column", p: 4, children });
};
var UiSecondaryBody = (props) => {
  const { children } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Flex, { direction: "column", borderWidth: "1px", shadow: "md", p: 3, children });
};
var UiBody = (props) => {
  const { primary } = props;
  if (primary)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiPrimaryBody, { ...props });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UiSecondaryBody, { ...props });
};
var UiHeader = (props) => {
  const { id, title, primary, children } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_react2.Flex,
    {
      width: "100%",
      direction: "column",
      p: primary ? 3 : 2,
      justify: "between",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react2.Flex, { direction: "row", justify: "space-between", gap: "small", children: [
          Boolean(title) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_react2.Heading,
            {
              as: primary ? `h3` : `h4`,
              size: primary ? `lg` : `md`,
              margin: "none",
              children: title
            }
          ),
          Boolean(id) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react2.Tag, { children: [
            "#",
            id
          ] })
        ] }),
        children
      ]
    }
  );
};
var UiFlatFormContainer = ({ children }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Flex, { direction: "column", children });
};
var UiField = (props) => {
  const { title, isLast, type, errors, children } = props;
  const showLabel = (0, import_react.useMemo)(() => {
    if (type === import_types.EnumSchemeItemType.Checkbox) {
      return false;
    }
    if (type === import_types.EnumSchemeItemType.Widget) {
      return false;
    }
    return true;
  }, [type]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Flex, { direction: "row", pb: !isLast ? 3 : void 0, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react2.Flex,
    {
      width: "100%",
      pt: showLabel ? 0 : 2,
      pb: showLabel ? 0 : 2,
      direction: "column",
      justify: "center",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react2.FormControl, { isInvalid: errors?.length > 0, children: [
        showLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.FormLabel, { htmlFor: "email", children: title }),
        children
      ] })
    }
  ) });
};
var Tab = styled(import_react2.Button)`
    user-select: none;
`;
var UiTab = (0, import_react.forwardRef)(
  (props, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      Tab,
      {
        ...props,
        variant: props.active ? void 0 : "ghost",
        colorScheme: "gray",
        onClick: props.onSelect,
        ref,
        children: [
          Boolean(props.label) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: props.label }),
          props.children
        ]
      }
    );
  }
);
UiTab.displayName = "UiTab";
var UiArrayFormContainer = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Flex, { direction: "column", style: props.style, p: 3, children: props.children });
};
var UiArrayFormHeader = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Flex, { direction: "row", justify: "space-between", mb: 3, children: props.children });
};
var TrashContainer = styled(import_react2.Box)`
    position: absolute;
    z-index: 2;
    top: -30px;
    left: 0px;
    width: 100%;
`;
var UiArrayFormTrashContainer = (0, import_react.forwardRef)((props, ref) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    TrashContainer,
    {
      ref,
      animation: { type: "fadeIn", duration: 300 },
      border: "2px",
      borderColor: "red.200",
      borderStyle: "dashed",
      backgroundColor: props.isOver ? "red.200" : "gray.100",
      p: 1,
      children: [
        Boolean(props?.label) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Text, { children: props?.label }),
        props.children
      ]
    }
  );
});
UiArrayFormTrashContainer.displayName = "UiArrayFormTrashContainer";
var UiArrayFormTabs = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Stack, { direction: "row", spacing: 2, align: "center", children: props.children });
};
var UiArrayFormBody = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Flex, { direction: "column", children: props.children });
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
    TrashContainer: UiArrayFormTrashContainer
  }),
  Tab: UiTab
};
var ui_default = ChakraUi;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
