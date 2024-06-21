import type { JsonFormUi } from "@undermuz/react-json-form"

import Controls from "./controls"
import * as Components from "./components"
import Ui from "./ui"
import Icons from "./icons"

const RsuiteUi: JsonFormUi = {
    ...Ui,
    Controls,
    Icons,
    Components: {
        JsonForm: Components.JsonFormComponent,
    },
}

export default RsuiteUi
