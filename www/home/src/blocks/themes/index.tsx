import type { FC } from "react"
import { EnumSchemeItemType } from "@undermuz/react-json-form"
import type { IScheme } from "@undermuz/react-json-form"
import type { IBlock } from "@undermuz/react-page-builder"

export type ThemeItem = {
    id: number
    name: string
    description: string
    href: string
}

export type ThemesValue = {
    title: string
    subtitle: string
    items: ThemeItem[]
}

const DEF_VALUE: ThemesValue = {
    title: "Pick a face for the same scheme",
    subtitle:
        "UiContext swaps the entire chrome. Migrate design systems without rewriting field lists.",
    items: [
        {
            id: 1,
            name: "@undermuz/react-json-form-theme-base",
            description: "Native HTML + CSS. Zero UI library dependency.",
            href: "https://www.npmjs.com/package/@undermuz/react-json-form-theme-base",
        },
        {
            id: 2,
            name: "@undermuz/react-json-form-theme-chakra",
            description: "Chakra UI v2 theme.",
            href: "https://www.npmjs.com/package/@undermuz/react-json-form-theme-chakra",
        },
        {
            id: 3,
            name: "@undermuz/react-json-form-theme-chakra-v3",
            description: "Chakra UI v3 theme.",
            href: "https://www.npmjs.com/package/@undermuz/react-json-form-theme-chakra-v3",
        },
        {
            id: 4,
            name: "@undermuz/react-json-form-theme-heroui",
            description: "HeroUI theme.",
            href: "https://www.npmjs.com/package/@undermuz/react-json-form-theme-heroui",
        },
        {
            id: 5,
            name: "@undermuz/react-json-form-theme-rsuite",
            description: "Rsuite theme.",
            href: "https://www.npmjs.com/package/@undermuz/react-json-form-theme-rsuite",
        },
        {
            id: 6,
            name: "@undermuz/react-json-form-theme-grommet",
            description: "Grommet theme.",
            href: "https://www.npmjs.com/package/@undermuz/react-json-form-theme-grommet",
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
                    name: "href",
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
                    {v.items.map((item, index) => (
                        <li key={`${item.name}-${index}`}>
                            <a
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                className="glass glass-hover block h-full rounded-2xl p-5 no-underline"
                            >
                                <p className="break-all font-mono text-xs font-semibold text-rpb-secondary">
                                    {item.name}
                                </p>
                                <p className="mt-3 text-sm leading-relaxed text-rpb-muted">
                                    {item.description}
                                </p>
                                <p className="mt-4 font-mono text-xs text-rpb-primary">
                                    npm →
                                </p>
                            </a>
                        </li>
                    ))}
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
