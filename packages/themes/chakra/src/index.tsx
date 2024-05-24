import type { JsonFormUi } from "@undermuz/react-json-form"

import Controls from "./controls"
import Ui from "./ui"
import Icons from "./icons"

const ChakraUi: JsonFormUi = {
    ...Ui,
    Controls,
    Icons,
}

export default ChakraUi
