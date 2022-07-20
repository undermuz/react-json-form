import { Add, Trash } from "grommet-icons"
import { JsonFormIcons } from "../../types"

const Icons: JsonFormIcons = {
    Tabs: {
        Remove: () => <Trash color="status-critical" />,
        Add,
    },
}

export default Icons
