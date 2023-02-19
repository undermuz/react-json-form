// src/JsonForm.tsx
import { useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback.mjs";
import FlatForm from "./FlatForm.mjs";
import ArrayForm from "./ArrayForm.mjs";
import { useDefSchemeValue, useSafeValue } from "./utils.mjs";
import { useJsonFormComponents } from "./UiContext.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
var JsonForm = (props) => {
  const { multiple = false, primary = true, scheme = [], onChange } = props;
  const defValue = useDefSchemeValue(scheme);
  const value = useSafeValue(props.value, defValue, multiple);
  const handleChange = useCallback(
    (newValue) => {
      onChange({ ...value, ...newValue });
    },
    [value, onChange]
  );
  const Components = useJsonFormComponents();
  return /* @__PURE__ */ jsx(
    ErrorBoundary,
    {
      FallbackComponent: ErrorFallback,
      onReset: () => {
      },
      children: /* @__PURE__ */ jsxs(Components.JsonForm, { ...props, children: [
        multiple && /* @__PURE__ */ jsx(
          ArrayForm,
          {
            primary,
            scheme,
            defValue,
            value,
            onChange
          }
        ),
        !multiple && /* @__PURE__ */ jsx(
          FlatForm,
          {
            primary,
            scheme,
            value,
            onChange: handleChange
          }
        )
      ] })
    }
  );
};
var JsonForm_default = JsonForm;
export {
  JsonForm_default as default
};
