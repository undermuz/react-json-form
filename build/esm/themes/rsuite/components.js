import { __assign, __makeTemplateObject } from "tslib";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Panel } from "rsuite";
import styled from "styled-components";
import { useJsonFormUi } from "../../UiContext";
var UiHeader = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n"], ["\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n"])));
var JsonFormComponent = function (props) {
    var title = props.title, _a = props.header, header = _a === void 0 ? null : _a, _b = props.primary, primary = _b === void 0 ? true : _b, children = props.children;
    var Ui = useJsonFormUi();
    return (_jsx(Ui.Container, { children: _jsx(Panel, __assign({ header: _jsxs(UiHeader, { children: [title, header] }), shaded: !primary }, { children: children })) }));
};
export { JsonFormComponent };
var templateObject_1;
