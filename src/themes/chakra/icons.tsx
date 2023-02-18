import { AddIcon, DeleteIcon } from "@chakra-ui/icons"
import type { JsonFormIcons } from "../../types"

const Icons: JsonFormIcons = {
    Tabs: {
        Remove: () => <DeleteIcon color={"red.400"} />,
        Add: AddIcon,
    },
}

export default Icons
