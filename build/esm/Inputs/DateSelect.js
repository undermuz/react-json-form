import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import ReactDatePicker from "react-datepicker";
var DateSelect = function (props) {
    var value = props.value, onChange = props.onChange;
    var dateValue = useMemo(function () {
        if (!value) {
            return null;
        }
        return new Date(value);
    }, [value]);
    return (_jsx(ReactDatePicker, { selected: dateValue, onChange: function (date) { return onChange(JSON.stringify(date)); } }));
};
export default DateSelect;
