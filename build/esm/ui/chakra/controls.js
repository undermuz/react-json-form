import { __assign } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import Select from "react-select";
import { DateInput } from "grommet";
import { Checkbox, Input, Textarea } from "@chakra-ui/react";
import { isArray } from "underscore";
var ControlSelect = function (props) {
    var name = props.name, value = props.value, _a = props.settings, settings = _a === void 0 ? {} : _a;
    var onChange = props.onChange, onBlur = props.onBlur;
    var list = isArray(value) ? value : [];
    return (_jsx(Select, { isMulti: settings.multiple ? true : false, name: name, value: settings.multiple
            ? list.map(function (_val) {
                var _a;
                return ({
                    label: ((_a = settings.options.find(function (_i) { return _i.value == _val; })) === null || _a === void 0 ? void 0 : _a.label) || "(Not found)",
                    value: _val,
                });
            })
            : value, options: settings.options, onBlur: function () { return onBlur; }, onChange: function (_value) {
            if (settings.multiple) {
                var _list = isArray(_value)
                    ? _value
                    : [];
                onChange === null || onChange === void 0 ? void 0 : onChange(_list.map(function (_val) { return _val.value; }));
            }
            else {
                onChange === null || onChange === void 0 ? void 0 : onChange(_value);
            }
        } }));
};
var ControlDate = function (props) {
    var value = props.value;
    var onChange = props.onChange;
    return (_jsx(DateInput, { format: "dd.mm.yyyy", value: value ? value : undefined, onChange: function (_a) {
            var value = _a.value;
            return onChange === null || onChange === void 0 ? void 0 : onChange(value);
        } }));
};
var ControlCheckBox = function (props) {
    var name = props.name, value = props.value, title = props.title;
    var onChange = props.onChange, onBlur = props.onBlur;
    return (_jsx(Checkbox, __assign({ checked: Boolean(value), name: name, onChange: function (event) { return onChange === null || onChange === void 0 ? void 0 : onChange(event.target.checked); }, onMouseLeave: function (e) {
            return onBlur === null || onBlur === void 0 ? void 0 : onBlur(e.currentTarget.checked);
        } }, { children: title })));
};
var ControlTextBlock = function (props) {
    var name = props.name, value = props.value, _a = props.settings, settings = _a === void 0 ? {} : _a;
    var onChange = props.onChange, onBlur = props.onBlur;
    return (_jsx(Textarea, __assign({ value: value, name: name }, settings, { onBlur: function (e) { return onBlur === null || onBlur === void 0 ? void 0 : onBlur(e.currentTarget.value); }, onChange: function (event) { return onChange === null || onChange === void 0 ? void 0 : onChange(event.currentTarget.value); } })));
};
var ControlInput = function (props) {
    var name = props.name, value = props.value, type = props.type;
    var onChange = props.onChange, onBlur = props.onBlur;
    return (_jsx(Input, { placeholder: name, name: name, type: type || "text", value: value, onChange: function (e) { return onChange === null || onChange === void 0 ? void 0 : onChange(e.currentTarget.value); }, onBlur: function (e) { return onBlur === null || onBlur === void 0 ? void 0 : onBlur(e.currentTarget.value); } }));
};
var Controls = {
    Input: ControlInput,
    TextBlock: ControlTextBlock,
    CheckBox: ControlCheckBox,
    Date: ControlDate,
    Select: ControlSelect,
};
export default Controls;
