import type { IBlockResultValue } from "@undermuz/react-page-builder"
import HeroBlock from "./hero"
import HighlightsBlock from "./highlights"
import ThemesBlock from "./themes"
import InstallBlock from "./install"
import UsageBlock from "./usage"
import LiveDemoBlock from "./live-demo"
import NestedWidgetsBlock from "./nested-widgets"
import CustomizeBlock from "./customize"
import CodeWindowBlock from "./code-window"
import EcosystemBlock from "./ecosystem"

function instance(
    id: number,
    block: { id: string; value: IBlockResultValue["value"] }
): IBlockResultValue {
    return {
        id,
        blockId: block.id,
        value: structuredClone(block.value),
    }
}

/** Educational seed layout for the landing page. */
export const DEFAULT_PAGE: IBlockResultValue[] = [
    instance(101, HeroBlock),
    instance(102, HighlightsBlock),
    instance(103, ThemesBlock),
    instance(104, InstallBlock),
    instance(105, UsageBlock),
    instance(106, LiveDemoBlock),
    instance(107, NestedWidgetsBlock),
    instance(108, CustomizeBlock),
    instance(109, CodeWindowBlock),
    instance(110, EcosystemBlock),
]
