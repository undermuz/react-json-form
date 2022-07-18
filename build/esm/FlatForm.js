import { __assign } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
/*SYSTEM IMPORTS*/
import { useEffect } from "react";
/* HELPERS */
import { EnumSchemeItemType } from "./types";
import { getDefValueForItem, useSchemeToForm } from "./utils";
import Input from "./input";
import { useJsonFormUi } from "./UiContext";
import useForm, { ConnectToForm, FormContext, } from "@undermuz/use-form";
var FlatForm = function (props) {
    var scheme = props.scheme, value = props.value, _a = props.primary, primary = _a === void 0 ? false : _a, onChange = props.onChange;
    var Ui = useJsonFormUi();
    var form = useForm(useSchemeToForm(scheme, value, onChange));
    useEffect(function () {
        var new_value = {};
        scheme.forEach(function (scheme_item) {
            var name = scheme_item.name, _a = scheme_item.type, type = _a === void 0 ? EnumSchemeItemType.Text : _a;
            var def_value = getDefValueForItem(scheme_item);
            if (!value[name]) {
                if (type === EnumSchemeItemType.Widget) {
                    new_value[name] = def_value;
                }
                else if (type !== EnumSchemeItemType.Checkbox) {
                    new_value[name] = def_value;
                }
            }
        });
        console.log("[FlatForm][Set default values]", __assign(__assign({}, value), new_value));
        onChange(__assign(__assign({}, value), new_value));
    }, []);
    return (_jsx(FormContext.Provider, __assign({ value: form }, { children: _jsx(Ui.FlatForm, __assign({ primary: primary }, { children: scheme.map(function (scheme_item, index) {
                var title = scheme_item.title, name = scheme_item.name, _a = scheme_item.type, type = _a === void 0 ? EnumSchemeItemType.Widget : _a, _b = scheme_item.settings, settings = _b === void 0 ? {} : _b;
                var field_settings = {};
                if (type == EnumSchemeItemType.Widget) {
                    var scheme_1 = scheme_item.scheme, _c = scheme_item.multiple, multiple = _c === void 0 ? false : _c;
                    field_settings = { scheme: scheme_1, multiple: multiple };
                }
                else if (type == EnumSchemeItemType.Select) {
                    field_settings = settings;
                }
                else if (type == EnumSchemeItemType.Files) {
                    field_settings = { settings: settings };
                }
                return (_jsx(Ui.Field, __assign({ isLast: index === scheme.length - 1, type: type, name: name, primary: primary, title: title, errors: form.errors[name] }, { children: _jsx(ConnectToForm, __assign({ name: name }, { children: _jsx(Input, { type: type, title: title, settings: field_settings }) })) }), index));
            }) })) })));
};
export default FlatForm;
