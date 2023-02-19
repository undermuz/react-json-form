// src/themes/chakra/controls.tsx
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { Checkbox, Input, Textarea } from "@chakra-ui/react";
import { isArray } from "underscore";
import _Select from "react-select";
import { jsx } from "react/jsx-runtime";
var Select = _Select.default ?? _Select;
var ControlSelect = (props) => {
  const { name, value, settings = {} } = props;
  const { onChange, onBlur } = props;
  const list = isArray(value) ? value : [];
  return /* @__PURE__ */ jsx(
    Select,
    {
      isMulti: settings.multiple ? true : false,
      name,
      value: settings.multiple ? list.map((_val) => ({
        label: settings.options.find(
          (_i) => _i.value == _val
        )?.label || "(Not found)",
        value: _val
      })) : value,
      options: settings.options,
      onBlur: () => onBlur,
      onChange: (_value) => {
        if (settings.multiple) {
          const _list = isArray(_value) ? _value : [];
          onChange?.(_list.map((_val) => _val.value));
        } else {
          onChange?.(_value);
        }
      }
    }
  );
};
var ControlDate = (props) => {
  const { value } = props;
  const { onChange } = props;
  return /* @__PURE__ */ jsx(
    SingleDatepicker,
    {
      date: value ? value : void 0,
      onDateChange: (value2) => onChange?.(value2)
    }
  );
};
var ControlCheckBox = (props) => {
  const { name, value, title } = props;
  const { onChange, onBlur } = props;
  return /* @__PURE__ */ jsx(
    Checkbox,
    {
      checked: Boolean(value),
      name,
      onChange: (event) => onChange?.(event.target.checked),
      onMouseLeave: (e) => onBlur?.(e.currentTarget.checked),
      children: title
    }
  );
};
var ControlTextBlock = (props) => {
  const { name, value, settings = {} } = props;
  const { onChange, onBlur } = props;
  return /* @__PURE__ */ jsx(
    Textarea,
    {
      value,
      name,
      ...settings,
      onBlur: (e) => onBlur?.(e.currentTarget.value),
      onChange: (event) => onChange?.(event.currentTarget.value)
    }
  );
};
var ControlInput = (props) => {
  const { name, value, type } = props;
  const { onChange, onBlur } = props;
  return /* @__PURE__ */ jsx(
    Input,
    {
      placeholder: name,
      name,
      type: type || "text",
      value,
      onChange: (e) => onChange?.(e.currentTarget.value),
      onBlur: (e) => onBlur?.(e.currentTarget.value)
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
