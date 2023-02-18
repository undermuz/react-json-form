// src/themes/rsuite/index.tsx
import Controls from "./controls.js";
import * as Components from "./components.js";
import Ui from "./ui.js";
import Icons from "./icons.js";
var RsuiteUi = {
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
