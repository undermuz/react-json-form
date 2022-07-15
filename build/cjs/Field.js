"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/*SYSTEM IMPORTS*/
var react_1 = tslib_1.__importStar(require("react"));
var input_1 = tslib_1.__importDefault(require("./input"));
var grommet_1 = require("grommet");
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
    var showLabel = (0, react_1.useMemo)(function () {
        if (props.type == "checkbox") {
            return false;
        }
        else if (props.type == "widget") {
            return false;
        }
        return true;
    }, []);
    if (!showLabel) {
        return (react_1.default.createElement(grommet_1.Box, { pad: "xsmall" },
            react_1.default.createElement(input_1.default, tslib_1.__assign({}, def_input_params))));
    }
    return (react_1.default.createElement(grommet_1.FormField, { label: title },
        react_1.default.createElement(input_1.default, tslib_1.__assign({}, def_input_params))));
};
exports.default = Field;
