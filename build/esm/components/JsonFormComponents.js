import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useJsonFormUi } from "../UiContext";
var JsonFormComponent = function (props) {
    var id = props.id, title = props.title, _a = props.header, header = _a === void 0 ? null : _a, _b = props.multiple, multiple = _b === void 0 ? false : _b, _c = props.primary, primary = _c === void 0 ? true : _c, children = props.children;
    var Ui = useJsonFormUi();
    return (_jsxs(Ui.Container, { children: [_jsx(Ui.Header, __assign({ id: id, primary: primary, title: title }, { children: header })), _jsx(Ui.Body, __assign({ primary: primary, multiple: multiple }, { children: children }))] }));
};
export { JsonFormComponent };
