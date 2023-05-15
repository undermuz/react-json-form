import { AddIcon, DeleteIcon } from "@chakra-ui/icons"
import type { JsonFormIcons } from "../../types"

const Icons: JsonFormIcons = {
    Tabs: {
        Remove: (props) => <DeleteIcon color={"red.400"} {...props} />,
        Add: AddIcon,
    },
}

export default Icons
