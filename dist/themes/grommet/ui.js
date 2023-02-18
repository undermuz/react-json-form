// src/themes/grommet/ui.tsx
import {
  forwardRef,
  useMemo
} from "react";
import styled, { css } from "styled-components";
import { Box, Heading, Tag, Text } from "grommet";
import {
  EnumSchemeItemType
} from "../../types.js";
import { jsx, jsxs } from "react/jsx-runtime";
var UiContainer = styled(Box)`
    @import url("https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap");

    * {
        font-family: "Roboto", sans-serif;
    }
`;
var UiBody = ({ primary, children }) => {
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
var UiFlatFormContainer = ({ children }) => {
  return /* @__PURE__ */ jsx(Box, { children });
};
var Branch = styled(Box)`
    ${({ theme }) => css`
        width: 10px;
        ::before {
            content: "";
            box-sizing: content-box;
            display: block;
            width: 12px;
            height: var(--branch-height, 18px);
            padding-bottom: 18px;
            border: solid ${theme.global.colors["dark-3"]};
            border-width: 0 0 1px 1px;
            border-bottom-left-radius: 8px;
            margin-left: -1px;
        }
    `}
`;
var UiField = (props) => {
  const { title, isLast = false, primary = false, type, children } = props;
  const showLabel = useMemo(() => {
    if (type === EnumSchemeItemType.Checkbox) {
      return false;
    }
    if (type === EnumSchemeItemType.Widget) {
      return false;
    }
    return true;
  }, [type]);
  return /* @__PURE__ */ jsxs(
    Box,
    {
      direction: "row",
      border: [
        {
          side: "left",
          size: !primary && !isLast ? "xsmall" : "none",
          color: "dark-3"
        }
      ],
      pad: {
        bottom: !isLast ? "small" : void 0
      },
      children: [
        !primary && /* @__PURE__ */ jsx(
          Branch,
          {
            style: {
              "--branch-height": type === EnumSchemeItemType.Checkbox ? "1px" : "34px"
            },
            direction: "column"
          }
        ),
        /* @__PURE__ */ jsxs(
          Box,
          {
            width: "100%",
            pad: {
              top: !showLabel ? "small" : void 0,
              bottom: !showLabel ? "small" : void 0
            },
            direction: "column",
            justify: "center",
            children: [
              showLabel && /* @__PURE__ */ jsx(Text, { as: "label", children: title }),
              children
            ]
          }
        )
      ]
    }
  );
};
var Tab = styled(Box)`
    user-select: none;
`;
var UiTab = forwardRef(
  (props, ref) => {
    return /* @__PURE__ */ jsx(
      Tab,
      {
        ...props,
        onClick: props.onSelect,
        background: {
          color: props.active ? "brand" : "light-3",
          opacity: props.active ? "medium" : void 0
        },
        ref,
        hoverIndicator: true,
        children: /* @__PURE__ */ jsxs(Box, { pad: "xsmall", children: [
          Boolean(props == null ? void 0 : props.label) && /* @__PURE__ */ jsx(Text, { children: props == null ? void 0 : props.label }),
          props.children
        ] })
      }
    );
  }
);
var UiArrayFormContainer = (props) => {
  return /* @__PURE__ */ jsx(Box, { direction: "column", style: props.style, children: props.children });
};
var UiArrayFormHeader = (props) => {
  return /* @__PURE__ */ jsx(
    Box,
    {
      direction: "row",
      justify: "between",
      background: { color: "light-2" },
      children: props.children
    }
  );
};
var TrashContainer = styled(Box)`
    position: absolute;
    z-index: 2;
    top: -56px;
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
var UiArrayFormTabs = (props) => {
  return /* @__PURE__ */ jsx(Box, { direction: "row", children: props.children });
};
var UiArrayFormBody = (props) => {
  return /* @__PURE__ */ jsx(Box, { children: props.children });
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
    TrashContainer: UiArrayFormTrashContainer
  }),
  Tab: UiTab
};
var ui_default = GrommetUi;
export {
  ui_default as default
};
