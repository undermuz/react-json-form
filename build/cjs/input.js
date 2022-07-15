"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/*SYSTEM IMPORTS*/
var react_1 = tslib_1.__importDefault(require("react"));
// import Editor from "react-quill"
var react_select_1 = tslib_1.__importDefault(require("react-select"));
require("react-datepicker/dist/react-datepicker.css");
var GeoSelect_1 = tslib_1.__importDefault(require("./Inputs/GeoSelect"));
// import DateSelect from "./Inputs/DateSelect"
var underscore_1 = require("underscore");
var types_1 = require("./types");
var grommet_1 = require("grommet");
var WidgetBuilder_1 = tslib_1.__importDefault(require("./WidgetBuilder"));
var Input = function (props) {
    var name = props.name, value = props.value, type = props.type, title = props.title, _a = props.settings, settings = _a === void 0 ? {} : _a;
    var onChange = props.onChange, onTest = props.onTest;
    try {
        if (type == types_1.EnumSchemeItemType.Widget) {
            var _settings = settings;
            return (react_1.default.createElement(WidgetBuilder_1.default, tslib_1.__assign({ value: value, title: title }, _settings, { onChange: onChange })));
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
        if (type == types_1.EnumSchemeItemType.Files) {
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
        if (type == types_1.EnumSchemeItemType.Select) {
            var list = (0, underscore_1.isArray)(value) ? value : [];
            return (react_1.default.createElement(react_select_1.default, { isMulti: settings.multiple ? true : false, name: name, value: settings.multiple
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
                        var _list = (0, underscore_1.isArray)(_value)
                            ? _value
                            : [];
                        onChange(_list.map(function (_val) { return _val.value; }));
                    }
                    else {
                        onChange(_value);
                    }
                } }));
        }
        if (type === types_1.EnumSchemeItemType.Checkbox) {
            return (react_1.default.createElement(grommet_1.CheckBox, { checked: Boolean(value), name: name, label: title, onChange: function (event) { return onChange(event.target.checked); }, onMouseLeave: function (e) { return onTest(e.currentTarget.checked); } }));
        }
        if (type === types_1.EnumSchemeItemType.Date) {
            return (react_1.default.createElement(grommet_1.DateInput, { format: "dd.mm.yyyy", value: value ? value : undefined, onChange: function (_a) {
                    var value = _a.value;
                    return onChange(value);
                } }));
        }
        if (type == "geo") {
            return (react_1.default.createElement(GeoSelect_1.default, { name: name, value: value, onChange: onChange, onTest: onTest }));
        }
        if (type == types_1.EnumSchemeItemType.TextBlock) {
            return (react_1.default.createElement(grommet_1.TextArea, tslib_1.__assign({ value: value, className: "form-control" }, settings, { onBlur: function (e) { return onTest(e.currentTarget.value); }, onChange: function (event) { return onChange(event.currentTarget.value); } })));
        }
        return (react_1.default.createElement(grommet_1.TextInput, { placeholder: name, name: name, type: type || "text", value: value, onChange: function (e) { return onChange(e.currentTarget.value); }, onBlur: function (e) { return onTest(e.currentTarget.value); } }));
    }
    catch (e) {
        console.error("Error <Input {...".concat(JSON.stringify(props), " }>:"));
        console.error(e);
        return react_1.default.createElement("div", { className: "alert alert-danger" }, e.message);
    }
};
exports.default = Input;
