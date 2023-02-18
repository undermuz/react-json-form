// src/themes/grommet/icons.tsx
import { Add, Trash } from "grommet-icons";
import { jsx } from "react/jsx-runtime";
var Icons = {
  Tabs: {
    Remove: () => /* @__PURE__ */ jsx(Trash, { color: "status-critical" }),
    Add
  }
};
var icons_default = Icons;
export {
  icons_default as default
};
