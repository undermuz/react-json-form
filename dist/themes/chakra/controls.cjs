"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var controls_exports = {};
__export(controls_exports, {
  default: () => controls_default
});
module.exports = __toCommonJS(controls_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react_select = __toESM(require("react-select"), 1);
var import_chakra_datepicker = require("@orange_digital/chakra-datepicker");
var import_react2 = require("@chakra-ui/react");
var import_underscore = require("underscore");
const ControlSelect = (props) => {
  const { name, value, settings = {} } = props;
  const { onChange, onBlur } = props;
  const list = (0, import_underscore.isArray)(value) ? value : [];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react_select.default,
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
          const _list = (0, import_underscore.isArray)(_value) ? _value : [];
          onChange == null ? void 0 : onChange(_list.map((_val) => _val.value));
        } else {
          onChange == null ? void 0 : onChange(_value);
        }
      }
    }
  );
};
const ControlDate = (props) => {
  const { value } = props;
  const { onChange } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_chakra_datepicker.DatePicker,
    {
      initialValue: value ? value : void 0,
      onDateChange: (value2) => onChange == null ? void 0 : onChange(value2)
    }
  );
};
const ControlCheckBox = (props) => {
  const { name, value, title } = props;
  const { onChange, onBlur } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react2.Checkbox,
    {
      checked: Boolean(value),
      name,
      onChange: (event) => onChange == null ? void 0 : onChange(event.target.checked),
      onMouseLeave: (e) => onBlur == null ? void 0 : onBlur(e.currentTarget.checked),
      children: title
    }
  );
};
const ControlTextBlock = (props) => {
  const { name, value, settings = {} } = props;
  const { onChange, onBlur } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react2.Textarea,
    {
      value,
      name,
      ...settings,
      onBlur: (e) => onBlur == null ? void 0 : onBlur(e.currentTarget.value),
      onChange: (event) => onChange == null ? void 0 : onChange(event.currentTarget.value)
    }
  );
};
const ControlInput = (props) => {
  const { name, value, type } = props;
  const { onChange, onBlur } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react2.Input,
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
const Controls = {
  Input: ControlInput,
  TextBlock: ControlTextBlock,
  CheckBox: ControlCheckBox,
  Date: ControlDate,
  Select: ControlSelect
};
var controls_default = Controls;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
