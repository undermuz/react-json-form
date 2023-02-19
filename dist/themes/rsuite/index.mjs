// src/themes/rsuite/index.tsx
import Controls from "./controls.mjs";
import * as Components from "./components.mjs";
import Ui from "./ui.mjs";
import Icons from "./icons.mjs";
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
