import type { JsonFormIcons } from "@undermuz/react-json-form"
import { IoIosAddCircle, IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

import { MdDeleteForever } from "react-icons/md"

const Icons: JsonFormIcons = {
    Tabs: {
        Remove: MdDeleteForever,
        Add: IoIosAddCircle,
        MoveUp: IoIosArrowUp,
        MoveDown: IoIosArrowDown,
    },
}

export default Icons
