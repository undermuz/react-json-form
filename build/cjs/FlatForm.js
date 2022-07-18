"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
/*SYSTEM IMPORTS*/
var react_1 = require("react");
/* HELPERS */
var types_1 = require("./types");
var utils_1 = require("./utils");
var input_1 = tslib_1.__importDefault(require("./input"));
var UiContext_1 = require("./UiContext");
var use_form_1 = tslib_1.__importStar(require("@undermuz/use-form"));
var FlatForm = function (props) {
    var scheme = props.scheme, value = props.value, _a = props.primary, primary = _a === void 0 ? false : _a, onChange = props.onChange;
    var Ui = (0, UiContext_1.useJsonFormUi)();
    var form = (0, use_form_1.default)((0, utils_1.useSchemeToForm)(scheme, value, onChange));
    (0, react_1.useEffect)(function () {
        var new_value = {};
        scheme.forEach(function (scheme_item) {
            var name = scheme_item.name, _a = scheme_item.type, type = _a === void 0 ? types_1.EnumSchemeItemType.Text : _a;
            var def_value = (0, utils_1.getDefValueForItem)(scheme_item);
            if (!value[name]) {
                if (type === types_1.EnumSchemeItemType.Widget) {
                    new_value[name] = def_value;
                }
                else if (type !== types_1.EnumSchemeItemType.Checkbox) {
                    new_value[name] = def_value;
                }
            }
        });
        console.log("[FlatForm][Set default values]", tslib_1.__assign(tslib_1.__assign({}, value), new_value));
        onChange(tslib_1.__assign(tslib_1.__assign({}, value), new_value));
    }, []);
    return ((0, jsx_runtime_1.jsx)(use_form_1.FormContext.Provider, tslib_1.__assign({ value: form }, { children: (0, jsx_runtime_1.jsx)(Ui.FlatForm, tslib_1.__assign({ primary: primary }, { children: scheme.map(function (scheme_item, index) {
                var title = scheme_item.title, name = scheme_item.name, _a = scheme_item.type, type = _a === void 0 ? types_1.EnumSchemeItemType.Widget : _a, _b = scheme_item.settings, settings = _b === void 0 ? {} : _b;
                var field_settings = {};
                if (type == types_1.EnumSchemeItemType.Widget) {
                    var scheme_1 = scheme_item.scheme, _c = scheme_item.multiple, multiple = _c === void 0 ? false : _c;
                    field_settings = { scheme: scheme_1, multiple: multiple };
                }
                else if (type == types_1.EnumSchemeItemType.Select) {
                    field_settings = settings;
                }
                else if (type == types_1.EnumSchemeItemType.Files) {
                    field_settings = { settings: settings };
                }
                return ((0, jsx_runtime_1.jsx)(Ui.Field, tslib_1.__assign({ isLast: index === scheme.length - 1, type: type, name: name, primary: primary, title: title, errors: form.errors[name] }, { children: (0, jsx_runtime_1.jsx)(use_form_1.ConnectToForm, tslib_1.__assign({ name: name }, { children: (0, jsx_runtime_1.jsx)(input_1.default, { type: type, title: title, settings: field_settings }) })) }), index));
            }) })) })));
};
exports.default = FlatForm;
