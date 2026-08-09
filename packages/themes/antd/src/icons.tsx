import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    DeleteOutlined,
    PlusOutlined,
} from "@ant-design/icons"
import type { JsonFormIcons } from "@undermuz/react-json-form"

const Icons: JsonFormIcons = {
    Tabs: {
        Remove: DeleteOutlined,
        Add: PlusOutlined,
        MoveUp: ArrowUpOutlined,
        MoveDown: ArrowDownOutlined,
    },
}

export default Icons
