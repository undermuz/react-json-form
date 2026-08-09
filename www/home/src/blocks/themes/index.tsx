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
    title: "Themes when you want chrome — not before",
    subtitle:
        "The engine stays headless. Themes implement JsonFormUi and plug in via UiContext — install from npm or copy the package into your project and own the source (shadcn-style). Base is the reference scaffold for custom themes.",
    items: [
        {
            id: 1,
            name: "@undermuz/react-json-form-theme-base",
            description:
                "Scaffold: native HTML + CSS, zero UI kit. Copy into your app and evolve into a custom theme.",
            themeId: "base",
            npmHref:
                "https://www.npmjs.com/package/@undermuz/react-json-form-theme-base",
        },
        {
            id: 2,
            name: "@undermuz/react-json-form-theme-chakra",
            description:
                "Drop-in Chakra UI v2 chrome — npm install or copy into your project.",
            themeId: "chakra",
            npmHref:
                "https://www.npmjs.com/package/@undermuz/react-json-form-theme-chakra",
        },
        {
            id: 3,
            name: "@undermuz/react-json-form-theme-chakra-v3",
            description:
                "Drop-in Chakra UI v3 chrome — npm install or copy into your project.",
            themeId: "chakra3",
            npmHref:
                "https://www.npmjs.com/package/@undermuz/react-json-form-theme-chakra-v3",
        },
        {
            id: 4,
            name: "@undermuz/react-json-form-theme-heroui",
            description:
                "Drop-in HeroUI chrome — npm install or copy into your project.",
            themeId: "heroui",
            npmHref:
                "https://www.npmjs.com/package/@undermuz/react-json-form-theme-heroui",
        },
        {
            id: 5,
            name: "@undermuz/react-json-form-theme-rsuite",
            description:
                "Drop-in Rsuite chrome — npm install or copy into your project.",
            themeId: "rsuite",
            npmHref:
                "https://www.npmjs.com/package/@undermuz/react-json-form-theme-rsuite",
        },
        {
            id: 6,
            name: "@undermuz/react-json-form-theme-grommet",
            description:
                "Drop-in Grommet chrome — npm install or copy into your project.",
            themeId: "grommet",
            npmHref:
                "https://www.npmjs.com/package/@undermuz/react-json-form-theme-grommet",
        },
        {
            id: 7,
            name: "@undermuz/react-json-form-theme-antd",
            description:
                "Drop-in Ant Design v6 chrome — npm install or copy into your project.",
            themeId: "antd",
            npmHref:
                "https://www.npmjs.com/package/@undermuz/react-json-form-theme-antd",
        },
        {
            id: 8,
            name: "@undermuz/react-json-form-theme-mantine",
            description:
                "Drop-in Mantine v9 chrome (React 19.2+) — npm install or copy into your project.",
            themeId: "mantine",
            npmHref:
                "https://www.npmjs.com/package/@undermuz/react-json-form-theme-mantine",
        },
        {
            id: 9,
            name: "@undermuz/react-json-form-theme-mui",
            description:
                "Drop-in Material UI chrome — npm install or copy into your project.",
            themeId: "mui",
            npmHref:
                "https://www.npmjs.com/package/@undermuz/react-json-form-theme-mui",
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
                    Bring your UI
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
                                <div
                                    className={[
                                        "glass glass-hover flex h-full flex-col rounded-2xl p-5",
                                        item.themeId === "base"
                                            ? "border-rpb-primary/35"
                                            : "",
                                    ].join(" ")}
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-2">
                                        <p className="break-all font-mono text-xs font-semibold text-rpb-secondary">
                                            {item.name}
                                        </p>
                                        {item.themeId === "base" ? (
                                            <span className="shrink-0 rounded-md border border-rpb-primary/40 bg-rpb-primary/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-rpb-secondary">
                                                Scaffold
                                            </span>
                                        ) : null}
                                    </div>
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
