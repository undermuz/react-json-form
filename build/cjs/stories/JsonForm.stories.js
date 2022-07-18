"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UiRsuite = exports.UiChakra = exports.UiGrommet = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var grommet_1 = require("grommet");
var react_1 = require("react");
var JsonForm_1 = tslib_1.__importDefault(require("../JsonForm"));
var prices_1 = require("./Schemes/prices");
var react_json_view_1 = tslib_1.__importDefault(require("react-json-view"));
var UiContext_1 = tslib_1.__importDefault(require("../UiContext"));
var grommet_2 = tslib_1.__importDefault(require("../ui/grommet"));
var chakra_1 = tslib_1.__importDefault(require("../ui/chakra"));
var rsuite_1 = tslib_1.__importDefault(require("../ui/rsuite"));
var react_2 = require("@chakra-ui/react");
require("rsuite/styles/index.less");
var JsonFormThemes;
(function (JsonFormThemes) {
    JsonFormThemes[JsonFormThemes["Grommet"] = 0] = "Grommet";
    JsonFormThemes[JsonFormThemes["ChakraUi"] = 1] = "ChakraUi";
    JsonFormThemes[JsonFormThemes["Rsuite"] = 2] = "Rsuite";
})(JsonFormThemes || (JsonFormThemes = {}));
var JsonFormStory = function (_a) {
    var theme = _a.theme;
    var _b = (0, react_1.useState)({}), value = _b[0], setValue = _b[1];
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(grommet_1.Box, tslib_1.__assign({ direction: "row" }, { children: [(0, jsx_runtime_1.jsx)(grommet_1.Box, tslib_1.__assign({ width: "33.3333%" }, { children: (0, jsx_runtime_1.jsx)(react_json_view_1.default, { src: prices_1.scheme, displayObjectSize: false }) })), (0, jsx_runtime_1.jsxs)(grommet_1.Box, tslib_1.__assign({ width: "33.3333%" }, { children: [theme === JsonFormThemes.Grommet && ((0, jsx_runtime_1.jsx)(UiContext_1.default.Provider, tslib_1.__assign({ value: grommet_2.default }, { children: (0, jsx_runtime_1.jsx)(JsonForm_1.default, tslib_1.__assign({}, prices_1.scheme, { value: value, onChange: setValue })) }))), theme === JsonFormThemes.ChakraUi && ((0, jsx_runtime_1.jsx)(react_2.ChakraProvider, { children: (0, jsx_runtime_1.jsx)(UiContext_1.default.Provider, tslib_1.__assign({ value: chakra_1.default }, { children: (0, jsx_runtime_1.jsx)(JsonForm_1.default, tslib_1.__assign({}, prices_1.scheme, { value: value, onChange: setValue })) })) })), theme === JsonFormThemes.Rsuite && ((0, jsx_runtime_1.jsx)(UiContext_1.default.Provider, tslib_1.__assign({ value: rsuite_1.default }, { children: (0, jsx_runtime_1.jsx)(JsonForm_1.default, tslib_1.__assign({}, prices_1.scheme, { value: value, onChange: setValue })) })))] })), (0, jsx_runtime_1.jsx)(grommet_1.Box, tslib_1.__assign({ width: "33.3333%" }, { children: (0, jsx_runtime_1.jsx)(react_json_view_1.default, { src: value, displayObjectSize: false }) }))] })) }));
};
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
var Template = function (args) {
    return (0, jsx_runtime_1.jsx)(JsonFormStory, tslib_1.__assign({}, args));
};
exports.UiGrommet = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
exports.UiGrommet.args = { theme: JsonFormThemes.Grommet };
// JsonFormStoryGrommet.name = "Grommet UI"
exports.UiChakra = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
exports.UiChakra.args = { theme: JsonFormThemes.ChakraUi };
// JsonFormStoryChakraUi.name = "Chakra UI"
exports.UiRsuite = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
exports.UiRsuite.args = { theme: JsonFormThemes.Rsuite };
// JsonFormStoryChakraUi.name = "Rsuite UI"
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
exports.default = {
    title: "Example/JsonForm",
    component: JsonFormStory,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    // argTypes: {
    //     backgroundColor: { control: "color" },
    // },
};
