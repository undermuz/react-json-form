"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/*SYSTEM IMPORTS*/
var react_1 = tslib_1.__importStar(require("react"));
var Field_1 = tslib_1.__importDefault(require("./Field"));
var types_1 = require("./types");
var underscore_1 = require("underscore");
var grommet_1 = require("grommet");
var Widget = function (props) {
    var scheme = props.scheme, value = props.value, onChange = props.onChange;
    var _a = (0, react_1.useState)([]), errors = _a[0], setErrors = _a[1];
    var setError = function (name, value, error) {
        if (error === void 0) { error = true; }
        if (error && errors.indexOf(name) === -1) {
            setErrors(tslib_1.__spreadArray(tslib_1.__spreadArray([], errors, true), [name], false));
        }
        if (!error && errors.indexOf(name) > -1) {
            setErrors(errors.filter(function (item) { return item != name; }));
        }
    };
    var handleTestField = function (name, value) {
        var last_error = errors.indexOf(name) > -1;
        var field = scheme.find(function (item) { return item.name == name; });
        if (!field) {
            console.error("Field not found: ".concat(name));
            return;
        }
        var _a = field.is_require, is_require = _a === void 0 ? false : _a, _b = field.type, type = _b === void 0 ? "text" : _b;
        var check_value = function (_v) { return Boolean(_v); };
        if (type == "files") {
            check_value = function (_val) {
                return Boolean(_val) && (0, underscore_1.isArray)(_val) && _val.length > 0;
            };
        }
        if (is_require &&
            type != "checkbox" &&
            !check_value(value) &&
            !last_error) {
            setError(name, value, true);
        }
        if (is_require &&
            type != "checkbox" &&
            check_value(value) &&
            last_error) {
            setError(name, value, false);
        }
    };
    var handleChange = function (name, fieldValue) {
        var _a;
        var old_value = value;
        if (!old_value)
            old_value = {};
        if (old_value[name] !== fieldValue) {
            console.log("Widget::handleChange", {
                name: name,
                value: value,
                fieldValue: fieldValue,
            });
            onChange(tslib_1.__assign(tslib_1.__assign({}, old_value), (_a = {}, _a[name] = fieldValue, _a)));
            handleTestField(name, fieldValue);
        }
    };
    (0, react_1.useEffect)(function () {
        var new_value = {};
        scheme.forEach(function (scheme_item) {
            var 
            // title,
            name = scheme_item.name, _a = scheme_item.type, type = _a === void 0 ? types_1.EnumSchemeItemType.Text : _a, _b = scheme_item.settings, settings = _b === void 0 ? {} : _b;
            var _c = scheme_item.def_value, def_value = _c === void 0 ? "" : _c;
            if (!def_value) {
                if (type == "checkbox")
                    def_value = false;
                if (type == "files")
                    def_value = [];
                if (type == "widget") {
                    var _d = scheme_item.multiple, multiple = _d === void 0 ? false : _d;
                    if (multiple) {
                        def_value = [];
                    }
                    else {
                        def_value = {};
                    }
                }
                if (type == types_1.EnumSchemeItemType.GeoCoordinates)
                    def_value = {
                        address: "",
                        lat: 0,
                        lng: 0,
                    };
                if (type == "select") {
                    if (settings.multiple) {
                        def_value = [];
                    }
                    else {
                        if (settings.options && settings.options.length) {
                            // def_value = settings.options[0]
                        }
                        else {
                            def_value = 0;
                        }
                    }
                }
            }
            if (type == types_1.EnumSchemeItemType.Widget) {
                if (!value[name])
                    new_value[name] = def_value;
            }
            else {
                if (!value[name] && type != "checkbox")
                    new_value[name] = def_value;
            }
        });
        onChange(tslib_1.__assign(tslib_1.__assign({}, value), new_value));
    }, []);
    return (react_1.default.createElement(grommet_1.Box, { pad: "xxsmall" }, scheme.map(function (scheme_item, index) {
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
        return (react_1.default.createElement(Field_1.default, { key: index, name: name, value: value[name], type: type, title: title, error: errors.indexOf(name) > -1, settings: field_settings, onChange: function (_v) { return handleChange(name, _v); }, onTest: function (_v) {
                if (_v === void 0) { _v = "NOT_SET"; }
                return handleTestField(name, _v === "NOT_SET" ? value[name] : _v);
            } }));
    })));
};
exports.default = Widget;
