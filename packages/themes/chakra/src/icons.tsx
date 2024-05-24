import { AddIcon, DeleteIcon } from "@chakra-ui/icons"
import type { JsonFormIcons } from "@undermuz/react-json-form"

const Icons: JsonFormIcons = {
    Tabs: {
        Remove: (props) => <DeleteIcon color={"red.400"} {...props} />,
        Add: AddIcon,
    },
}

export default Icons
