import { __assign } from "tslib";
import Controls from "./controls";
import * as Components from "./components";
import Ui from "./ui";
import Icons from "./icons";
var RsuiteUi = __assign(__assign({}, Ui), { Controls: Controls, Icons: Icons, Components: {
        JsonForm: Components.JsonFormComponent,
    } });
export default RsuiteUi;
