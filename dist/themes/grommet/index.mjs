// src/themes/grommet/index.tsx
import Controls from "./controls.mjs";
import Ui from "./ui.mjs";
import Icons from "./icons.mjs";
var GrommetUi = {
  ...Ui,
  Controls,
  Icons
};
var grommet_default = GrommetUi;
export {
  grommet_default as default
};
