// src/FlatForm.tsx
import { useEffect } from "react";
import { EnumSchemeItemType } from "./types.js";
import { getDefValueForItem, useSchemeToForm } from "./utils.js";
import Input from "./input.js";
import { useJsonFormUi } from "./UiContext.js";
import useForm, {
  ConnectToForm,
  FormContext
} from "@undermuz/use-form";
import { jsx } from "react/jsx-runtime";
var FlatForm = (props) => {
  const { scheme, value, primary = false, onChange } = props;
  const Ui = useJsonFormUi();
  const form = useForm(useSchemeToForm(scheme, value, onChange));
  useEffect(() => {
    const new_value = {};
    scheme.forEach((scheme_item) => {
      const { name, type = EnumSchemeItemType.Text } = scheme_item;
      const def_value = getDefValueForItem(scheme_item);
      if (!value[name]) {
        if (type === EnumSchemeItemType.Widget) {
          new_value[name] = def_value;
        } else if (type !== EnumSchemeItemType.Checkbox) {
          new_value[name] = def_value;
        }
      }
    });
    console.log("[FlatForm][Set default values]", {
      ...value,
      ...new_value
    });
    onChange({ ...value, ...new_value });
  }, []);
  return /* @__PURE__ */ jsx(FormContext.Provider, { value: form, children: /* @__PURE__ */ jsx(Ui.FlatForm, { primary, children: scheme.map((scheme_item, index) => {
    const {
      title,
      name,
      type = EnumSchemeItemType.Widget,
      settings = {}
    } = scheme_item;
    let field_settings = {};
    if (type == EnumSchemeItemType.Widget) {
      const { scheme: scheme2, multiple = false } = scheme_item;
      field_settings = { scheme: scheme2, multiple };
    } else if (type == EnumSchemeItemType.Select) {
      field_settings = settings;
    } else if (type == EnumSchemeItemType.Files) {
      field_settings = { settings };
    }
    return /* @__PURE__ */ jsx(
      Ui.Field,
      {
        isLast: index === scheme.length - 1,
        type,
        name,
        primary,
        title,
        errors: form.errors[name],
        children: /* @__PURE__ */ jsx(ConnectToForm, { name, children: /* @__PURE__ */ jsx(
          Input,
          {
            type,
            title,
            settings: field_settings
          }
        ) })
      },
      index
    );
  }) }) });
};
var FlatForm_default = FlatForm;
export {
  FlatForm_default as default
};
