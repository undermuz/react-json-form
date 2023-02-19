// src/themes/chakra/ui.tsx
import { forwardRef, useMemo } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Tag,
  Text
} from "@chakra-ui/react";
import { EnumSchemeItemType } from "../../types.js";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { jsx, jsxs } from "react/jsx-runtime";
var UiContainer = ({ children }) => {
  return /* @__PURE__ */ jsx(Flex, { direction: "column", children });
};
var UiBody = (props) => {
  const { primary, children } = props;
  return /* @__PURE__ */ jsx(Flex, { direction: "column", p: primary ? 4 : 0, pl: 0, children });
};
var UiHeader = (props) => {
  const { id, title, primary, children } = props;
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      width: "100%",
      direction: "column",
      p: primary ? 3 : 1,
      justify: "between",
      background: primary ? "teal.300" : "gray.100",
      children: [
        /* @__PURE__ */ jsxs(Flex, { direction: "row", justify: "space-between", gap: "small", children: [
          Boolean(title) && /* @__PURE__ */ jsx(
            Heading,
            {
              as: primary ? `h3` : `h4`,
              size: primary ? `lg` : `md`,
              margin: "none",
              children: title
            }
          ),
          Boolean(id) && /* @__PURE__ */ jsxs(Tag, { children: [
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
  return /* @__PURE__ */ jsx(Flex, { direction: "column", children });
};
var Branch = styled(Flex)`
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
    Flex,
    {
      direction: "row",
      borderLeft: !primary && !isLast ? "1px solid" : void 0,
      borderLeftColor: "gray.300",
      pb: !isLast ? 3 : void 0,
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
        /* @__PURE__ */ jsx(
          Flex,
          {
            width: "100%",
            pt: showLabel ? 0 : 2,
            pb: showLabel ? 0 : 2,
            direction: "column",
            justify: "center",
            children: /* @__PURE__ */ jsxs(FormControl, { isInvalid: errors?.length > 0, children: [
              showLabel && /* @__PURE__ */ jsx(FormLabel, { htmlFor: "email", children: title }),
              children
            ] })
          }
        )
      ]
    }
  );
};
var Tab = styled(Box)`
    ${({ active }) => css`
        background-color: var(--chakra-colors-gray-50);

        ${active && `background-color: var(--chakra-colors-teal-50);`}

        user-select: none;

        cursor: pointer;
    `}
`;
var UiTab = forwardRef(
  (props, ref) => {
    return /* @__PURE__ */ jsx(
      Tab,
      {
        ...props,
        onClick: props.onSelect,
        ref,
        children: /* @__PURE__ */ jsxs(Box, { p: 1, children: [
          Boolean(props.label) && /* @__PURE__ */ jsx(Text, { children: props.label }),
          props.children
        ] })
      }
    );
  }
);
UiTab.displayName = "UiTab";
var UiArrayFormContainer = (props) => {
  return /* @__PURE__ */ jsx(Flex, { direction: "column", style: props.style, children: props.children });
};
var UiArrayFormHeader = (props) => {
  return /* @__PURE__ */ jsx(
    Flex,
    {
      direction: "row",
      backgroundColor: "gray.100",
      justify: "space-between",
      mb: 3,
      children: props.children
    }
  );
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
      border: "2px",
      borderColor: "red.200",
      borderStyle: "dashed",
      backgroundColor: props.isOver ? "red.200" : "gray.100",
      p: 1,
      children: [
        Boolean(props?.label) && /* @__PURE__ */ jsx(Text, { children: props?.label }),
        props.children
      ]
    }
  );
});
UiArrayFormTrashContainer.displayName = "UiArrayFormTrashContainer";
var UiArrayFormTabs = (props) => {
  return /* @__PURE__ */ jsx(Flex, { direction: "row", children: props.children });
};
var UiArrayFormBody = (props) => {
  return /* @__PURE__ */ jsx(Flex, { direction: "column", children: props.children });
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
export {
  ui_default as default
};
