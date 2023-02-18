// src/themes/chakra/icons.tsx
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { jsx } from "react/jsx-runtime";
var Icons = {
  Tabs: {
    Remove: () => /* @__PURE__ */ jsx(DeleteIcon, { color: "red.400" }),
    Add: AddIcon
  }
};
var icons_default = Icons;
export {
  icons_default as default
};
