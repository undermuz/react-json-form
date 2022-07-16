import { __assign } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
// import Editor from "react-quill"
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import GeoSelect from "./Inputs/GeoSelect";
// import DateSelect from "./Inputs/DateSelect"
import { isArray } from "underscore";
import { EnumSchemeItemType, } from "./types";
import { CheckBox, DateInput, TextArea, TextInput } from "grommet";
import WidgetBuilder from "./WidgetBuilder";
var Input = function (props) {
    var name = props.name, value = props.value, type = props.type, title = props.title, _a = props.settings, settings = _a === void 0 ? {} : _a;
    var onChange = props.onChange, onTest = props.onTest;
    try {
        if (type == EnumSchemeItemType.Widget) {
            var _settings = settings;
            return (_jsx(WidgetBuilder, __assign({ value: value, title: title }, _settings, { onChange: onChange })));
        }
        // if (type == "text-editor") {
        //     return (
        //         <TextEditor
        //             value={value}
        //             settings={settings}
        //             onChange={onChange}
        //             onTest={onTest}
        //         />
        //     )
        // }
        if (type == EnumSchemeItemType.Files) {
            return null;
            // return (
            //     <FilesWidget
            //         value={value}
            //         {...settings}
            //         onChange={(value) => {
            //             onChange(value)
            //             onTest(value)
            //         }}
            //     />
            // )
        }
        if (type == EnumSchemeItemType.Select) {
            var list = isArray(value) ? value : [];
            return (_jsx(Select, { isMulti: settings.multiple ? true : false, name: name, value: settings.multiple
                    ? list.map(function (_val) {
                        var _a;
                        return ({
                            label: ((_a = settings.options.find(function (_i) {
                                return _i.value == _val;
                            })) === null || _a === void 0 ? void 0 : _a.label) || "(Not found)",
                            value: _val,
                        });
                    })
                    : value, options: settings.options, onBlur: function () { return onTest; }, onChange: function (_value) {
                    if (settings.multiple) {
                        var _list = isArray(_value)
                            ? _value
                            : [];
                        onChange(_list.map(function (_val) { return _val.value; }));
                    }
                    else {
                        onChange(_value);
                    }
                } }));
        }
        if (type === EnumSchemeItemType.Checkbox) {
            return (_jsx(CheckBox, { checked: Boolean(value), name: name, label: title, onChange: function (event) { return onChange(event.target.checked); }, onMouseLeave: function (e) { return onTest(e.currentTarget.checked); } }));
        }
        if (type === EnumSchemeItemType.Date) {
            return (_jsx(DateInput, { format: "dd.mm.yyyy", value: value ? value : undefined, onChange: function (_a) {
                    var value = _a.value;
                    return onChange(value);
                } }));
        }
        if (type == "geo") {
            return (_jsx(GeoSelect, { name: name, value: value, onChange: onChange, onTest: onTest }));
        }
        if (type == EnumSchemeItemType.TextBlock) {
            return (_jsx(TextArea, __assign({ value: value, className: "form-control" }, settings, { onBlur: function (e) { return onTest(e.currentTarget.value); }, onChange: function (event) { return onChange(event.currentTarget.value); } })));
        }
        return (_jsx(TextInput, { placeholder: name, name: name, type: type || "text", value: value, onChange: function (e) { return onChange(e.currentTarget.value); }, onBlur: function (e) { return onTest(e.currentTarget.value); } }));
    }
    catch (e) {
        console.error("Error <Input {...".concat(JSON.stringify(props), " }>:"));
        console.error(e);
        return _jsx("div", __assign({ className: "alert alert-danger" }, { children: e.message }));
    }
};
export default Input;
