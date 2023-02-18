// src/themes/grommet/controls.tsx
import { CheckBox, DateInput, TextArea, TextInput } from "grommet";
import Select from "react-select";
import { isArray } from "underscore";
import { jsx } from "react/jsx-runtime";
var ControlSelect = (props) => {
  const { name, value, settings = {} } = props;
  const { onChange, onBlur } = props;
  const list = isArray(value) ? value : [];
  return /* @__PURE__ */ jsx(
    Select,
    {
      isMulti: settings.multiple ? true : false,
      name,
      value: settings.multiple ? list.map((_val) => {
        var _a;
        return {
          label: ((_a = settings.options.find(
            (_i) => _i.value == _val
          )) == null ? void 0 : _a.label) || "(Not found)",
          value: _val
        };
      }) : value,
      options: settings.options,
      onBlur: () => onBlur,
      onChange: (_value) => {
        if (settings.multiple) {
          const _list = isArray(_value) ? _value : [];
          onChange == null ? void 0 : onChange(_list.map((_val) => _val.value));
        } else {
          onChange == null ? void 0 : onChange(_value);
        }
      }
    }
  );
};
var ControlDate = (props) => {
  const { value } = props;
  const { onChange } = props;
  return /* @__PURE__ */ jsx(
    DateInput,
    {
      format: "dd.mm.yyyy",
      value: value ? value : void 0,
      onChange: ({ value: value2 }) => onChange == null ? void 0 : onChange(value2)
    }
  );
};
var ControlCheckBox = (props) => {
  const { name, value, title } = props;
  const { onChange, onBlur } = props;
  return /* @__PURE__ */ jsx(
    CheckBox,
    {
      checked: Boolean(value),
      name,
      label: title,
      onChange: (event) => onChange == null ? void 0 : onChange(event.target.checked),
      onMouseLeave: (e) => onBlur == null ? void 0 : onBlur(e.currentTarget.checked)
    }
  );
};
var ControlTextBlock = (props) => {
  const { name, value, settings = {} } = props;
  const { onChange, onBlur } = props;
  return /* @__PURE__ */ jsx(
    TextArea,
    {
      value,
      name,
      ...settings,
      onBlur: (e) => onBlur == null ? void 0 : onBlur(e.currentTarget.value),
      onChange: (event) => onChange == null ? void 0 : onChange(event.currentTarget.value)
    }
  );
};
var ControlInput = (props) => {
  const { name, value, type } = props;
  const { onChange, onBlur } = props;
  return /* @__PURE__ */ jsx(
    TextInput,
    {
      placeholder: name,
      name,
      type: type || "text",
      value,
      onChange: (e) => onChange == null ? void 0 : onChange(e.currentTarget.value),
      onBlur: (e) => onBlur == null ? void 0 : onBlur(e.currentTarget.value)
    }
  );
};
var Controls = {
  Input: ControlInput,
  TextBlock: ControlTextBlock,
  CheckBox: ControlCheckBox,
  Date: ControlDate,
  Select: ControlSelect
};
var controls_default = Controls;
export {
  controls_default as default
};
