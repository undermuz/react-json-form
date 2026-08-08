import type { JsonFormUi } from "@undermuz/react-json-form"

import Controls from "./controls"
import Icons from "./icons"
import Ui from "./ui"

const BaseTheme = {
    ...Ui,
    Controls,
    Icons,
} as JsonFormUi

export default BaseTheme
