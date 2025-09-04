import type { JsonFormUi } from "@undermuz/react-json-form"

import Controls from "./controls"
import Ui from "./ui/ui"
import Icons from "./icons"

const HeroUiTheme: JsonFormUi = {
    ...Ui,
    Controls,
    Icons,
}

export default HeroUiTheme
