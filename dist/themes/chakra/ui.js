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
var import_react3 = require("@emotion/react");
var import_styled = __toESM(require("@emotion/styled"));
var import_jsx_runtime = require("react/jsx-runtime");
var UiContainer = ({ children }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Flex, { direction: "column", children });
};
var UiBody = (props) => {
  const { primary, children } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Flex, { direction: "column", p: primary ? 4 : 0, pl: 0, children });
};
var UiHeader = (props) => {
  const { id, title, primary, children } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_react2.Flex,
    {
      width: "100%",
      direction: "column",
      p: primary ? 3 : 1,
      justify: "between",
      background: primary ? "teal.300" : "gray.100",
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
var Branch = (0, import_styled.default)(import_react2.Flex)`
    width: var(--chakra-space-3);
    ::before {
        content: "";
        box-sizing: content-box;
        display: block;
        width: 12px;
        height: var(--branch-height, 18px);
        padding-bottom: 18px;
        border: solid var(--chakra-colors-gray-300);
        border-width: 0 0 1px 1px;
        border-bottom-left-radius: 8px;
        margin-left: -1px;
    }
`;
var UiField = (props) => {
  const { title, isLast, primary = false, type, errors, children } = props;
  const showLabel = (0, import_react.useMemo)(() => {
    if (type === import_types.EnumSchemeItemType.Checkbox) {
      return false;
    }
    if (type === import_types.EnumSchemeItemType.Widget) {
      return false;
    }
    return true;
  }, [type]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_react2.Flex,
    {
      direction: "row",
      borderLeft: !primary && !isLast ? "1px solid" : void 0,
      borderLeftColor: "gray.300",
      pb: !isLast ? 3 : void 0,
      children: [
        !primary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          Branch,
          {
            style: {
              "--branch-height": type === import_types.EnumSchemeItemType.Checkbox ? "1px" : "34px"
            },
            direction: "column"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_react2.Flex,
          {
            width: "100%",
            pt: showLabel ? 0 : 2,
            pb: showLabel ? 0 : 2,
            direction: "column",
            justify: "center",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react2.FormControl, { isInvalid: (errors == null ? void 0 : errors.length) > 0, children: [
              showLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.FormLabel, { htmlFor: "email", children: title }),
              children
            ] })
          }
        )
      ]
    }
  );
};
var Tab = (0, import_styled.default)(import_react2.Box)`
    ${({ active }) => import_react3.css`
        background-color: var(--chakra-colors-gray-50);

        ${active && `background-color: var(--chakra-colors-teal-50);`}

        user-select: none;

        cursor: pointer;
    `}
`;
var UiTab = (0, import_react.forwardRef)(
  (props, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Tab,
      {
        ...props,
        onClick: props.onSelect,
        ref,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react2.Box, { p: 1, children: [
          Boolean(props.label) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Text, { children: props.label }),
          props.children
        ] })
      }
    );
  }
);
UiTab.displayName = "UiTab";
var UiArrayFormContainer = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Flex, { direction: "column", style: props.style, children: props.children });
};
var UiArrayFormHeader = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react2.Flex,
    {
      direction: "row",
      backgroundColor: "gray.100",
      justify: "space-between",
      mb: 3,
      children: props.children
    }
  );
};
var TrashContainer = (0, import_styled.default)(import_react2.Box)`
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
        Boolean(props == null ? void 0 : props.label) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Text, { children: props == null ? void 0 : props.label }),
        props.children
      ]
    }
  );
});
UiArrayFormTrashContainer.displayName = "UiArrayFormTrashContainer";
var UiArrayFormTabs = (props) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react2.Flex, { direction: "row", children: props.children });
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
