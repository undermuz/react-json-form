import { jsx as _jsx } from "react/jsx-runtime";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
var Icons = {
    Tabs: {
        Remove: function () { return _jsx(DeleteIcon, { color: "red.400" }); },
        Add: AddIcon,
    },
};
export default Icons;
