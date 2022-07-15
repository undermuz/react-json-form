import React from "react";
import { Button } from "grommet";
var GeoSelect = function (props) {
    var value = props.value, onChange = props.onChange, onTest = props.onTest;
    var handleChangeAddress = function (e) {
        var _a = value.lat, lat = _a === void 0 ? 0 : _a, _b = value.lng, lng = _b === void 0 ? 0 : _b;
        onChange({
            address: e.currentTarget.value,
            lat: lat,
            lng: lng,
        });
    };
    var handleChangeLat = function (e) {
        var _a = value.address, address = _a === void 0 ? "" : _a, _b = value.lng, lng = _b === void 0 ? 0 : _b;
        onChange({
            address: address,
            lat: e.currentTarget.value,
            lng: lng,
        });
    };
    var handleChangeLng = function (e) {
        var _a = value.lat, lat = _a === void 0 ? 0 : _a, _b = value.address, address = _b === void 0 ? "" : _b;
        onChange({
            address: address,
            lat: lat,
            lng: e.currentTarget.value,
        });
    };
    var handleTestAddress = function (e) {
        var _a = props.value, _b = _a.lat, lat = _b === void 0 ? 0 : _b, _c = _a.lng, lng = _c === void 0 ? 0 : _c;
        onTest({
            address: e.currentTarget.value,
            lat: lat,
            lng: lng,
        });
    };
    var handleTestLat = function (e) {
        var _a = value.address, address = _a === void 0 ? "" : _a, _b = value.lng, lng = _b === void 0 ? 0 : _b;
        onTest({
            address: address,
            lat: e.currentTarget.value,
            lng: lng,
        });
    };
    var handleTestLng = function (e) {
        var _a = value.lat, lat = _a === void 0 ? 0 : _a, _b = value.address, address = _b === void 0 ? "" : _b;
        onTest({
            address: address,
            lat: lat,
            lng: e.currentTarget.value,
        });
    };
    var handleSelectOnMap = function () {
        // const { address = "", lat = 0, lng = 0 } = props.value
        // window.common_widgets.GeoSelect({
        //     address,
        //     lat,
        //     lng,
        //     onSelect: (props) => {
        //         console.log("handleSelectOnMap: ", props)
        //         props.onChange(props)
        //     },
        // })
    };
    var _a = props.value, _b = _a.address, address = _b === void 0 ? "" : _b, _c = _a.lat, lat = _c === void 0 ? 0 : _c, _d = _a.lng, lng = _d === void 0 ? 0 : _d;
    return (React.createElement("div", { className: "geo-select-inline" },
        React.createElement("input", { placeholder: "\u0410\u0434\u0440\u0435\u0441", name: "address", type: "text", value: address, className: "form-control", onChange: handleChangeAddress, onBlur: handleTestAddress }),
        React.createElement("input", { name: "lat", type: "text", value: lat, className: "form-control", onChange: handleChangeLat, onBlur: handleTestLat }),
        React.createElement("input", { name: "lng", type: "text", value: lng, className: "form-control", onChange: handleChangeLng, onBlur: handleTestLng }),
        React.createElement(Button, { onClick: handleSelectOnMap }, "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043D\u0430 \u043A\u0430\u0440\u0442\u0435")));
};
export default GeoSelect;
