// src/themes/chakra/ui.tsx
import { forwardRef, useMemo } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Tag,
  Text
} from "@chakra-ui/react";
import { EnumSchemeItemType } from "../../types.mjs";
import _styled from "@emotion/styled";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var styled = _styled.default ?? _styled;
var UiContainer = ({ children }) => {
  return /* @__PURE__ */ jsx(Flex, { direction: "column", children });
};
var UiPrimaryBody = (props) => {
  const { children } = props;
  return /* @__PURE__ */ jsx(Flex, { direction: "column", p: 4, children });
};
var UiSecondaryBody = (props) => {
  const { children } = props;
  return /* @__PURE__ */ jsx(Flex, { direction: "column", borderWidth: "1px", shadow: "md", p: 3, children });
};
var UiBody = (props) => {
  const { primary } = props;
  if (primary)
    return /* @__PURE__ */ jsx(UiPrimaryBody, { ...props });
  return /* @__PURE__ */ jsx(UiSecondaryBody, { ...props });
};
var UiHeader = (props) => {
  const { id, title, primary, children } = props;
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      width: "100%",
      direction: "column",
      p: primary ? 3 : 2,
      justify: "between",
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
var UiField = (props) => {
  const { title, isLast, type, errors, children } = props;
  const showLabel = useMemo(() => {
    if (type === EnumSchemeItemType.Checkbox) {
      return false;
    }
    if (type === EnumSchemeItemType.Widget) {
      return false;
    }
    return true;
  }, [type]);
  return /* @__PURE__ */ jsx(Flex, { direction: "row", pb: !isLast ? 3 : void 0, children: /* @__PURE__ */ jsx(
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
  ) });
};
var Tab = styled(Button)`
    user-select: none;
`;
var UiTab = forwardRef(
  (props, ref) => {
    return /* @__PURE__ */ jsxs(
      Tab,
      {
        ...props,
        variant: props.active ? void 0 : "ghost",
        colorScheme: "gray",
        onClick: props.onSelect,
        ref,
        children: [
          Boolean(props.label) && /* @__PURE__ */ jsx(Fragment, { children: props.label }),
          props.children
        ]
      }
    );
  }
);
UiTab.displayName = "UiTab";
var UiArrayFormContainer = (props) => {
  return /* @__PURE__ */ jsx(Flex, { direction: "column", style: props.style, p: 3, children: props.children });
};
var UiArrayFormHeader = (props) => {
  return /* @__PURE__ */ jsx(Flex, { direction: "row", justify: "space-between", mb: 3, children: props.children });
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
  return /* @__PURE__ */ jsx(Stack, { direction: "row", spacing: 2, align: "center", children: props.children });
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
