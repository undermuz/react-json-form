import type { FC } from "react"
import { EnumSchemeItemType } from "@undermuz/react-json-form"
import type { IScheme } from "@undermuz/react-json-form"
import type { IBlock } from "@undermuz/react-page-builder"
import {
    getExamplesHref,
    type ThemeAppId,
} from "@undermuz/react-json-form-home-lib"

export type ThemeItem = {
    id: number
    name: string
    description: string
    themeId: ThemeAppId
    npmHref: string
}

export type ThemesValue = {
    title: string
    subtitle: string
    items: ThemeItem[]
}

const DEF_VALUE: ThemesValue = {
    title: "Pick a face for the same scheme",
    subtitle:
        "UiContext swaps the entire chrome. Migrate design systems without rewriting field lists. Open live examples for each theme.",
    items: [
        {
            id: 1,
            name: "@undermuz/react-json-form-theme-base",
            description: "Native HTML + CSS. Zero UI library dependency.",
            themeId: "base",
            npmHref:
                "https://www.npmjs.com/package/@undermuz/react-json-form-theme-base",
        },
        {
            id: 2,
            name: "@undermuz/react-json-form-theme-chakra",
            description: "Chakra UI v2 theme.",
            themeId: "chakra",
            npmHref:
                "https://www.npmjs.com/package/@undermuz/react-json-form-theme-chakra",
        },
        {
            id: 3,
            name: "@undermuz/react-json-form-theme-chakra-v3",
            description: "Chakra UI v3 theme.",
            themeId: "chakra3",
            npmHref:
                "https://www.npmjs.com/package/@undermuz/react-json-form-theme-chakra-v3",
        },
        {
            id: 4,
            name: "@undermuz/react-json-form-theme-heroui",
            description: "HeroUI theme.",
            themeId: "heroui",
            npmHref:
                "https://www.npmjs.com/package/@undermuz/react-json-form-theme-heroui",
        },
        {
            id: 5,
            name: "@undermuz/react-json-form-theme-rsuite",
            description: "Rsuite theme.",
            themeId: "rsuite",
            npmHref:
                "https://www.npmjs.com/package/@undermuz/react-json-form-theme-rsuite",
        },
        {
            id: 6,
            name: "@undermuz/react-json-form-theme-grommet",
            description: "Grommet theme.",
            themeId: "grommet",
            npmHref:
                "https://www.npmjs.com/package/@undermuz/react-json-form-theme-grommet",
        },
    ],
}

const scheme: IScheme = {
    id: "themes",
    title: "Themes",
    multiple: false,
    scheme: [
        {
            name: "title",
            title: "Title",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.title,
        },
        {
            name: "subtitle",
            title: "Subtitle",
            type: EnumSchemeItemType.TextBlock,
            def_value: DEF_VALUE.subtitle,
        },
        {
            name: "items",
            title: "Themes",
            type: EnumSchemeItemType.Widget,
            multiple: true,
            scheme: [
                {
                    name: "name",
                    title: "Package name",
                    type: EnumSchemeItemType.Text,
                    def_value: "",
                },
                {
                    name: "description",
                    title: "Description",
                    type: EnumSchemeItemType.TextBlock,
                    def_value: "",
                },
                {
                    name: "themeId",
                    title: "Examples app id",
                    type: EnumSchemeItemType.Text,
                    def_value: "base",
                },
                {
                    name: "npmHref",
                    title: "npm URL",
                    type: EnumSchemeItemType.Text,
                    def_value: "",
                },
            ],
        },
    ],
}

const ThemesView: FC<{ id?: number; value?: ThemesValue }> = ({ value }) => {
    const v = {
        ...DEF_VALUE,
        ...value,
        items: value?.items?.length ? value.items : DEF_VALUE.items,
    }

    return (
        <section className="w-full px-4 py-12 sm:px-6 sm:py-16">
            <div className="mx-auto max-w-6xl">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-rpb-secondary">
                    UI kits
                </p>
                <h2 className="mt-2 font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
                    {v.title}
                </h2>
                <p className="mt-3 max-w-3xl font-mono text-sm leading-relaxed text-rpb-muted">
                    {v.subtitle}
                </p>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {v.items.map((item, index) => {
                        const examplesHref = getExamplesHref(
                            (item.themeId || "base") as ThemeAppId
                        )
                        return (
                            <li key={`${item.name}-${index}`}>
                                <div className="glass glass-hover flex h-full flex-col rounded-2xl p-5">
                                    <p className="break-all font-mono text-xs font-semibold text-rpb-secondary">
                                        {item.name}
                                    </p>
                                    <p className="mt-3 flex-1 text-sm leading-relaxed text-rpb-muted">
                                        {item.description}
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-3 font-mono text-xs">
                                        <a
                                            href={examplesHref}
                                            className="text-rpb-primary no-underline hover:underline"
                                        >
                                            Live examples →
                                        </a>
                                        <a
                                            href={item.npmHref}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-rpb-muted no-underline hover:text-rpb-text"
                                        >
                                            npm
                                        </a>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}

const ThemesBlock: IBlock<ThemesValue> = {
    id: "themes",
    title: "Themes",
    description: "Available UI theme packages",
    image: "",
    value: DEF_VALUE,
    scheme,
    view: ThemesView,
}

export default ThemesBlock
