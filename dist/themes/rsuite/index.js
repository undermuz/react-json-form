import Controls from "./controls";
import * as Components from "./components";
import Ui from "./ui";
import Icons from "./icons";
const RsuiteUi = {
  ...Ui,
  Controls,
  Icons,
  Components: {
    JsonForm: Components.JsonFormComponent
  }
};
var rsuite_default = RsuiteUi;
export {
  rsuite_default as default
};
