import type { JsonFormUi } from "@undermuz/react-json-form"

import Controls from "./controls"
import * as Components from "./components"
import Ui from "./ui"
import Icons from "./icons"

// See ui.tsx — React 19 theme types vs React 18 core JsonFormUi.
const MantineUi = {
    ...Ui,
    Controls,
    Icons,
    Components: {
        JsonForm: Components.JsonFormComponent,
    },
} as unknown as JsonFormUi

export default MantineUi

