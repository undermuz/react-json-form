// src/themes/rsuite/ui.tsx
import { forwardRef, useMemo } from "react";
import styled from "styled-components";
import { EnumSchemeItemType } from "../../types.mjs";
import { Form, Nav } from "rsuite";
import { Box, Heading, Tag, Text } from "grommet";
import { jsx, jsxs } from "react/jsx-runtime";
var UiContainer = ({ children }) => {
  return /* @__PURE__ */ jsx(Box, { direction: "column", children });
};
var UiBody = (props) => {
  const { primary, children } = props;
  return /* @__PURE__ */ jsx(
    Box,
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
var UiHeader = (props) => {
  const { id, title, primary, children } = props;
  return /* @__PURE__ */ jsxs(
    Box,
    {
      width: "100%",
      direction: "row",
      pad: primary ? "small" : "xxsmall",
      justify: "between",
      background: primary ? "brand" : "light-2",
      children: [
        /* @__PURE__ */ jsxs(Box, { direction: "row", justify: "start", gap: "small", children: [
          Boolean(title) && /* @__PURE__ */ jsx(Heading, { level: primary ? 3 : 4, margin: "none", children: title }),
          Boolean(id) && /* @__PURE__ */ jsx(Tag, { value: `#${id}` })
        ] }),
        children
      ]
    }
  );
};
var UiFlatFormContainer = ({
  primary = false,
  children
}) => {
  if (primary) {
    return /* @__PURE__ */ jsx(Form, { children });
  }
  return /* @__PURE__ */ jsx("div", { className: "rs-form rs-form-vertical rs-form-fixed-width", children });
};
var UiField = (props) => {
  const { title, name, type, errors, children } = props;
  const showLabel = useMemo(() => {
    if (type === EnumSchemeItemType.Checkbox) {
      return false;
    }
    if (type === EnumSchemeItemType.Widget) {
      return false;
    }
    return true;
  }, [type]);
  return /* @__PURE__ */ jsxs(Form.Group, { controlId: name, children: [
    showLabel && /* @__PURE__ */ jsx(Form.ControlLabel, { children: title }),
    children,
    errors && errors.length > 0 && errors.map((error, index) => {
      return /* @__PURE__ */ jsx("div", { style: { color: "red" }, children: error }, index);
    })
  ] });
};
var UiTab = forwardRef(
  (props, ref) => {
    return /* @__PURE__ */ jsxs(Nav.Item, { ...props, ref, children: [
      Boolean(props.label) && props.label,
      props.children
    ] });
  }
);
UiTab.displayName = "UiTab";
var UiArrayFormContainer = (props) => {
  return /* @__PURE__ */ jsx(Box, { direction: "column", style: props.style, children: props.children });
};
var UiArrayFormHeader = (props) => {
  return /* @__PURE__ */ jsx(Box, { direction: "row", justify: "between", children: props.children });
};
var TrashContainer = styled(Box)`
    position: absolute;
    z-index: 2;
    top: -30px;
    left: 0px;
    width: 100%;
`;
var UiArrayFormTrashContainer = forwardRef((props, ref) => {
  return /* @__PURE__ */ jsxs(
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
        Boolean(props == null ? void 0 : props.label) && /* @__PURE__ */ jsx(Text, { children: props == null ? void 0 : props.label }),
        props.children
      ]
    }
  );
});
UiArrayFormTrashContainer.displayName = "UiArrayFormTrashContainer";
var UiArrayFormTabs = (props) => {
  return /* @__PURE__ */ jsx(Nav, { appearance: !props.actions ? "tabs" : void 0, children: props.children });
};
var UiArrayFormBody = (props) => {
  return /* @__PURE__ */ jsx(Box, { children: props.children });
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
    TrashContainer: UiArrayFormTrashContainer
  }),
  Tab: UiTab
};
var ui_default = RsuiteUi;
export {
  ui_default as default
};
