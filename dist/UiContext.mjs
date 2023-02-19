// src/UiContext.ts
import { createContext, useContext } from "react";
import { JsonFormComponent } from "./components/JsonFormComponents.mjs";
var UiContext = createContext(null);
var useJsonFormUi = () => {
  const Ui = useContext(UiContext);
  if (!Ui) {
    throw new Error(
      "JsonForm must be wrapped by UiContext.Provider with selected UI"
    );
  }
  return Ui;
};
var useJsonFormComponents = () => {
  const Ui = useContext(UiContext);
  let rawComponents = {};
  if (Ui?.Components) {
    rawComponents = Ui?.Components;
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
