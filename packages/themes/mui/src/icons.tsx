import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import type { JsonFormIcons } from "@undermuz/react-json-form"

const Icons: JsonFormIcons = {
    Tabs: {
        Remove: DeleteIcon,
        Add: AddIcon,
        MoveUp: ArrowUpwardIcon,
        MoveDown: ArrowDownwardIcon,
    },
}

export default Icons
