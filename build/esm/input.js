import { __assign } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
// import Editor from "react-quill"
import { EnumSchemeItemType, } from "./types";
import JsonForm from "./JsonForm";
import { useJsonFormUi } from "./UiContext";
import { noop } from "underscore";
var Input = function (props) {
    var _a = props.value, value = _a === void 0 ? "" : _a, type = props.type, title = props.title, _b = props.settings, settings = _b === void 0 ? {} : _b;
    var _c = props.onChange, onChange = _c === void 0 ? noop : _c;
    var Ui = useJsonFormUi();
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
        if (type == EnumSchemeItemType.Widget) {
            var _settings = settings;
            return (_jsx(JsonForm, __assign({ value: value, title: title, primary: false }, _settings, { onChange: onChange })));
        }
        if (type == EnumSchemeItemType.Select) {
            return _jsx(Ui.Controls.Select, __assign({}, props));
        }
        if (type === EnumSchemeItemType.Date) {
            return _jsx(Ui.Controls.Date, __assign({}, props));
        }
        if (type === EnumSchemeItemType.Checkbox) {
            return _jsx(Ui.Controls.CheckBox, __assign({}, props));
        }
        if (type == EnumSchemeItemType.TextBlock) {
            return _jsx(Ui.Controls.TextBlock, __assign({}, props));
        }
        return _jsx(Ui.Controls.Input, __assign({}, props));
    }
    catch (e) {
        console.error("Error <Input {...".concat(JSON.stringify(props), " }>:"));
        console.error(e);
        return _jsx("div", __assign({ className: "alert alert-danger" }, { children: e.message }));
    }
};
export default Input;
