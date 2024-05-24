import type { JsonFormUi } from "../../../src/types"

import Controls from "./controls"
import Ui from "./ui"
import Icons from "./icons"

const TestThemeUi: JsonFormUi = {
    ...Ui,
    Controls,
    Icons,
}

export default TestThemeUi
