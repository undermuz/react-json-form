import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box } from "grommet";
import { useState } from "react";
import JsonForm from "../JsonForm";
import { scheme } from "./Schemes/prices";
import ReactJson from "react-json-view";
import UiContext from "../UiContext";
import GrommetUi from "../ui/grommet";
import ChakraUi from "../ui/chakra";
import RsuiteUi from "../ui/rsuite";
import { ChakraProvider } from "@chakra-ui/react";
import "rsuite/styles/index.less";
var JsonFormThemes;
(function (JsonFormThemes) {
    JsonFormThemes[JsonFormThemes["Grommet"] = 0] = "Grommet";
    JsonFormThemes[JsonFormThemes["ChakraUi"] = 1] = "ChakraUi";
    JsonFormThemes[JsonFormThemes["Rsuite"] = 2] = "Rsuite";
})(JsonFormThemes || (JsonFormThemes = {}));
var JsonFormStory = function (_a) {
    var theme = _a.theme;
    var _b = useState({}), value = _b[0], setValue = _b[1];
    return (_jsx(_Fragment, { children: _jsxs(Box, __assign({ direction: "row" }, { children: [_jsx(Box, __assign({ width: "33.3333%" }, { children: _jsx(ReactJson, { src: scheme, displayObjectSize: false }) })), _jsxs(Box, __assign({ width: "33.3333%" }, { children: [theme === JsonFormThemes.Grommet && (_jsx(UiContext.Provider, __assign({ value: GrommetUi }, { children: _jsx(JsonForm, __assign({}, scheme, { value: value, onChange: setValue })) }))), theme === JsonFormThemes.ChakraUi && (_jsx(ChakraProvider, { children: _jsx(UiContext.Provider, __assign({ value: ChakraUi }, { children: _jsx(JsonForm, __assign({}, scheme, { value: value, onChange: setValue })) })) })), theme === JsonFormThemes.Rsuite && (_jsx(UiContext.Provider, __assign({ value: RsuiteUi }, { children: _jsx(JsonForm, __assign({}, scheme, { value: value, onChange: setValue })) })))] })), _jsx(Box, __assign({ width: "33.3333%" }, { children: _jsx(ReactJson, { src: value, displayObjectSize: false }) }))] })) }));
};
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
var Template = function (args) {
    return _jsx(JsonFormStory, __assign({}, args));
};
export var UiGrommet = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
UiGrommet.args = { theme: JsonFormThemes.Grommet };
// JsonFormStoryGrommet.name = "Grommet UI"
export var UiChakra = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
UiChakra.args = { theme: JsonFormThemes.ChakraUi };
// JsonFormStoryChakraUi.name = "Chakra UI"
export var UiRsuite = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
UiRsuite.args = { theme: JsonFormThemes.Rsuite };
// JsonFormStoryChakraUi.name = "Rsuite UI"
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Example/JsonForm",
    component: JsonFormStory,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    // argTypes: {
    //     backgroundColor: { control: "color" },
    // },
};
