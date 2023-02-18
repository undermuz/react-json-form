import { createContext, useContext } from "react";
import { JsonFormComponent } from "./components/JsonFormComponents";
const UiContext = createContext(null);
const useJsonFormUi = () => {
  const Ui = useContext(UiContext);
  if (!Ui) {
    throw new Error(
      "JsonForm must be wrapped by UiContext.Provider with selected UI"
    );
  }
  return Ui;
};
const useJsonFormComponents = () => {
  const Ui = useContext(UiContext);
  let rawComponents = {};
  if (Ui == null ? void 0 : Ui.Components) {
    rawComponents = Ui == null ? void 0 : Ui.Components;
  }
  return {
    JsonForm: JsonFormComponent,
    ...rawComponents
  };
};
var UiContext_default = UiContext;
export {
  UiContext_default as default,
  useJsonFormComponents,
  useJsonFormUi
};
