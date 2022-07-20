import { __assign } from "tslib";
import { Fragment as _Fragment, jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Panel } from "rsuite";
import { useJsonFormUi } from "../../UiContext";
var JsonFormComponent = function (props) {
    var title = props.title, _a = props.header, header = _a === void 0 ? null : _a, _b = props.primary, primary = _b === void 0 ? true : _b, children = props.children;
    var Ui = useJsonFormUi();
    return (_jsx(Ui.Container, { children: _jsx(Panel, __assign({ header: _jsxs(_Fragment, { children: [title, header] }), shaded: !primary }, { children: children })) }));
};
export { JsonFormComponent };
