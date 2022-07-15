"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_datepicker_1 = tslib_1.__importDefault(require("react-datepicker"));
var DateSelect = function (props) {
    var value = props.value, onChange = props.onChange;
    var dateValue = (0, react_1.useMemo)(function () {
        if (!value) {
            return null;
        }
        return new Date(value);
    }, [value]);
    return (react_1.default.createElement(react_datepicker_1.default, { selected: dateValue, onChange: function (date) { return onChange(JSON.stringify(date)); } }));
};
exports.default = DateSelect;
