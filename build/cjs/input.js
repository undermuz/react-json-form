"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
// import Editor from "react-quill"
require("react-datepicker/dist/react-datepicker.css");
var GeoSelect_1 = tslib_1.__importDefault(require("./Inputs/GeoSelect"));
// import DateSelect from "./Inputs/DateSelect"
var types_1 = require("./types");
var JsonForm_1 = tslib_1.__importDefault(require("./JsonForm"));
var UiContext_1 = require("./UiContext");
var underscore_1 = require("underscore");
var Input = function (props) {
    var _a = props.name, name = _a === void 0 ? "" : _a, _b = props.value, value = _b === void 0 ? "" : _b, type = props.type, title = props.title, _c = props.settings, settings = _c === void 0 ? {} : _c;
    var _d = props.onChange, onChange = _d === void 0 ? underscore_1.noop : _d, _e = props.onBlur, onBlur = _e === void 0 ? underscore_1.noop : _e;
    var Ui = (0, UiContext_1.useJsonFormUi)();
    try {
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
        if (type == "geo") {
            return ((0, jsx_runtime_1.jsx)(GeoSelect_1.default, { name: name, value: value, onChange: onChange, onTest: onBlur }));
        }
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
        if (type == types_1.EnumSchemeItemType.Widget) {
            var _settings = settings;
            return ((0, jsx_runtime_1.jsx)(JsonForm_1.default, tslib_1.__assign({ value: value, title: title, primary: false }, _settings, { onChange: onChange })));
        }
        if (type == types_1.EnumSchemeItemType.Select) {
            return (0, jsx_runtime_1.jsx)(Ui.Controls.Select, tslib_1.__assign({}, props));
        }
        if (type === types_1.EnumSchemeItemType.Date) {
            return (0, jsx_runtime_1.jsx)(Ui.Controls.Date, tslib_1.__assign({}, props));
        }
        if (type === types_1.EnumSchemeItemType.Checkbox) {
            return (0, jsx_runtime_1.jsx)(Ui.Controls.CheckBox, tslib_1.__assign({}, props));
        }
        if (type == types_1.EnumSchemeItemType.TextBlock) {
            return (0, jsx_runtime_1.jsx)(Ui.Controls.TextBlock, tslib_1.__assign({}, props));
        }
        return (0, jsx_runtime_1.jsx)(Ui.Controls.Input, tslib_1.__assign({}, props));
    }
    catch (e) {
        console.error("Error <Input {...".concat(JSON.stringify(props), " }>:"));
        console.error(e);
        return (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "alert alert-danger" }, { children: e.message }));
    }
};
exports.default = Input;
