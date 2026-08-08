import { Add, FormDown, FormUp, Trash } from "grommet-icons"
import type { JsonFormIcons } from "@undermuz/react-json-form"

const Icons: JsonFormIcons = {
    Tabs: {
        Remove: () => <Trash color="status-critical" />,
        Add,
        MoveUp: FormUp,
        MoveDown: FormDown,
    },
}

export default Icons
