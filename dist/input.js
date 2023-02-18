// src/input.tsx
import {
  EnumSchemeItemType
} from "./types.js";
import JsonForm from "./JsonForm.js";
import { useJsonFormUi } from "./UiContext.js";
import { noop } from "underscore";
import { jsx } from "react/jsx-runtime";
var Input = (props) => {
  const { value = "", type, title, settings = {} } = props;
  const { onChange = noop } = props;
  const Ui = useJsonFormUi();
  try {
    if (type == EnumSchemeItemType.Files) {
      return null;
    }
    if (type == EnumSchemeItemType.Widget) {
      const _settings = settings;
      return /* @__PURE__ */ jsx(
        JsonForm,
        {
          value,
          title,
          primary: false,
          ..._settings,
          onChange
        }
      );
    }
    if (type == EnumSchemeItemType.Select) {
      return /* @__PURE__ */ jsx(Ui.Controls.Select, { ...props });
    }
    if (type === EnumSchemeItemType.Date) {
      return /* @__PURE__ */ jsx(Ui.Controls.Date, { ...props });
    }
    if (type === EnumSchemeItemType.Checkbox) {
      return /* @__PURE__ */ jsx(Ui.Controls.CheckBox, { ...props });
    }
    if (type == EnumSchemeItemType.TextBlock) {
      return /* @__PURE__ */ jsx(Ui.Controls.TextBlock, { ...props });
    }
    return /* @__PURE__ */ jsx(Ui.Controls.Input, { ...props });
  } catch (e) {
    console.error(`Error <Input {...${JSON.stringify(props)} }>:`);
    console.error(e);
    return /* @__PURE__ */ jsx("div", { className: "alert alert-danger", children: e.message });
  }
};
var input_default = Input;
export {
  input_default as default
};
