"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UiRsuite = exports.UiChakra = exports.UiGrommet = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const grommet_1 = require("grommet");
const react_1 = require("react");
const JsonForm_1 = tslib_1.__importDefault(require("../src/JsonForm"));
const prices_1 = tslib_1.__importDefault(require("./Schemes/prices"));
const react_json_view_1 = tslib_1.__importDefault(require("react-json-view"));
const UiContext_1 = tslib_1.__importDefault(require("../src/UiContext"));
const grommet_2 = tslib_1.__importDefault(require("../src/themes/grommet"));
const chakra_1 = tslib_1.__importDefault(require("../src/themes/chakra"));
const rsuite_1 = tslib_1.__importDefault(require("../src/themes/rsuite"));
const react_2 = require("@chakra-ui/react");
require("rsuite/styles/index.less");
var JsonFormThemes;
(function (JsonFormThemes) {
    JsonFormThemes[JsonFormThemes["Grommet"] = 0] = "Grommet";
    JsonFormThemes[JsonFormThemes["ChakraUi"] = 1] = "ChakraUi";
    JsonFormThemes[JsonFormThemes["Rsuite"] = 2] = "Rsuite";
})(JsonFormThemes || (JsonFormThemes = {}));
const JsonFormStory = ({ theme }) => {
    const [value, setValue] = (0, react_1.useState)({});
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(grommet_1.Box, { direction: "row", children: [(0, jsx_runtime_1.jsx)(grommet_1.Box, { width: "33.3333%", children: (0, jsx_runtime_1.jsx)(react_json_view_1.default, { src: prices_1.default, displayObjectSize: false }) }), (0, jsx_runtime_1.jsxs)(grommet_1.Box, { width: "33.3333%", children: [theme === JsonFormThemes.Grommet && ((0, jsx_runtime_1.jsx)(UiContext_1.default.Provider, { value: grommet_2.default, children: (0, jsx_runtime_1.jsx)(JsonForm_1.default, { ...prices_1.default, value: value, onChange: setValue }) })), theme === JsonFormThemes.ChakraUi && ((0, jsx_runtime_1.jsx)(react_2.ChakraProvider, { children: (0, jsx_runtime_1.jsx)(UiContext_1.default.Provider, { value: chakra_1.default, children: (0, jsx_runtime_1.jsx)(JsonForm_1.default, { ...prices_1.default, value: value, onChange: setValue }) }) })), theme === JsonFormThemes.Rsuite && ((0, jsx_runtime_1.jsx)(UiContext_1.default.Provider, { value: rsuite_1.default, children: (0, jsx_runtime_1.jsx)(JsonForm_1.default, { ...prices_1.default, value: value, onChange: setValue }) }))] }), (0, jsx_runtime_1.jsx)(grommet_1.Box, { width: "33.3333%", children: (0, jsx_runtime_1.jsx)(react_json_view_1.default, { src: value, displayObjectSize: false }) })] }) }));
};
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
    return (0, jsx_runtime_1.jsx)(JsonFormStory, { ...args });
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
