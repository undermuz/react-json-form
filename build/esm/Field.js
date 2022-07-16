import { __assign } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
/*SYSTEM IMPORTS*/
import { useMemo } from "react";
import Input from "./input";
import { Box, FormField } from "grommet";
var Field = function (props) {
    var title = props.title, value = props.value /*, error*/, onTest = props.onTest;
    // const handleTestField = () => {
    //     onTest(value)
    // }
    var def_input_params = {
        title: title,
        name: props.name,
        value: value,
        type: props.type,
        settings: props.settings,
        onChange: props.onChange,
        onTest: onTest,
    };
    var showLabel = useMemo(function () {
        if (props.type == "checkbox") {
            return false;
        }
        else if (props.type == "widget") {
            return false;
        }
        return true;
    }, []);
    if (!showLabel) {
        return (_jsx(Box, __assign({ pad: "xsmall" }, { children: _jsx(Input, __assign({}, def_input_params)) })));
    }
    return (_jsx(FormField, __assign({ label: title }, { children: _jsx(Input, __assign({}, def_input_params)) })));
};
export default Field;
