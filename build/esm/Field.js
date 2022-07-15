import { __assign } from "tslib";
/*SYSTEM IMPORTS*/
import React, { useMemo } from "react";
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
        return (React.createElement(Box, { pad: "xsmall" },
            React.createElement(Input, __assign({}, def_input_params))));
    }
    return (React.createElement(FormField, { label: title },
        React.createElement(Input, __assign({}, def_input_params))));
};
export default Field;
