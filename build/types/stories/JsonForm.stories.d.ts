import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FC } from "react";
import "rsuite/styles/index.less";
declare enum JsonFormThemes {
    Grommet = 0,
    ChakraUi = 1,
    Rsuite = 2
}
interface IJsonFormStory {
    theme: JsonFormThemes;
}
export declare const UiGrommet: ComponentStory<FC<IJsonFormStory>>;
export declare const UiChakra: ComponentStory<FC<IJsonFormStory>>;
export declare const UiRsuite: ComponentStory<FC<IJsonFormStory>>;
declare const _default: ComponentMeta<FC<IJsonFormStory>>;
export default _default;
