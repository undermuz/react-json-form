import { Add, Trash } from "grommet-icons"
import type { JsonFormIcons } from "@undermuz/react-json-form"

const Icons: JsonFormIcons = {
    Tabs: {
        Remove: () => <Trash color="status-critical" />,
        Add,
    },
}

export default Icons
