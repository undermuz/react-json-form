import { Add, Trash } from "grommet-icons"
import type { JsonFormIcons } from "../../../src/types"

const Icons: JsonFormIcons = {
    Tabs: {
        Remove: () => <Trash color="status-critical" />,
        Add,
    },
}

export default Icons
