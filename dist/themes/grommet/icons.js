import { jsx } from "react/jsx-runtime";
import { Add, Trash } from "grommet-icons";
const Icons = {
  Tabs: {
    Remove: () => /* @__PURE__ */ jsx(Trash, { color: "status-critical" }),
    Add
  }
};
var icons_default = Icons;
export {
  icons_default as default
};
