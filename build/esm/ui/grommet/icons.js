import { jsx as _jsx } from "react/jsx-runtime";
import { Add, Trash } from "grommet-icons";
var Icons = {
    Tabs: {
        Remove: function () { return _jsx(Trash, { color: "status-critical" }); },
        Add: Add,
    },
};
export default Icons;
