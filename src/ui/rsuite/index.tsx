import type { JsonFormUi } from "../../types"

import Controls from "./controls"
import * as Components from "./components"
import Ui from "./ui"
import Icons from "./icons"

const GrommetUi: JsonFormUi = {
    ...Ui,
    Controls,
    Icons,
    Components: {
        JsonForm: Components.JsonFormComponent,
    },
}

export default GrommetUi
