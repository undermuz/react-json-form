"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var controls_1 = tslib_1.__importDefault(require("./controls"));
var Components = tslib_1.__importStar(require("./components"));
var ui_1 = tslib_1.__importDefault(require("./ui"));
var icons_1 = tslib_1.__importDefault(require("./icons"));
var RsuiteUi = tslib_1.__assign(tslib_1.__assign({}, ui_1.default), { Controls: controls_1.default, Icons: icons_1.default, Components: {
        JsonForm: Components.JsonFormComponent,
    } });
exports.default = RsuiteUi;
