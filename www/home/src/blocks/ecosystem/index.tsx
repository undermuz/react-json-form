import type { FC } from "react"
import { EnumSchemeItemType } from "@undermuz/react-json-form"
import type { IScheme } from "@undermuz/react-json-form"
import type { IBlock } from "@undermuz/react-page-builder"

export type EcosystemLink = {
    id: number
    name: string
    description: string
    href: string
}

export type EcosystemValue = {
    title: string
    body: string
    links: EcosystemLink[]
}

const DEF_VALUE: EcosystemValue = {
    title: "Around the form",
    body: "Validation core, theme packages, and higher-level builders that reuse the same scheme contract.",
    links: [
        {
            id: 1,
            name: "GitHub · react-json-form",
            description: "Source, issues, and releases.",
            href: "https://github.com/undermuz/react-json-form",
        },
        {
            id: 2,
            name: "npm · react-json-form",
            description: "Published core package.",
            href: "https://www.npmjs.com/package/@undermuz/react-json-form",
        },
        {
            id: 3,
            name: "@undermuz/use-form",
            description: "Form state, tests, and submit helpers under the hood.",
            href: "https://www.npmjs.com/package/@undermuz/use-form",
        },
        {
            id: 4,
            name: "@undermuz/react-page-builder",
            description:
                "Block pages that generate edit dialogs with this library.",
            href: "https://www.npmjs.com/package/@undermuz/react-page-builder",
        },
        {
            id: 5,
            name: "Form examples",
            description: "Login, signup, selects, layouts — live on this site.",
            href: "#/examples",
        },
    ],
}

const scheme: IScheme = {
    id: "ecosystem",
    title: "Ecosystem",
    multiple: false,
    scheme: [
        {
            name: "title",
            title: "Title",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.title,
        },
        {
            name: "body",
            title: "Body",
            type: EnumSchemeItemType.TextBlock,
            def_value: DEF_VALUE.body,
        },
        {
            name: "links",
            title: "Links",
            type: EnumSchemeItemType.Widget,
            multiple: true,
            scheme: [
                {
                    name: "name",
                    title: "Name",
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
                    title: "URL",
                    type: EnumSchemeItemType.Text,
                    def_value: "",
                },
            ],
        },
    ],
}

const EcosystemView: FC<{ id?: number; value?: EcosystemValue }> = ({
    value,
}) => {
    const v = {
        ...DEF_VALUE,
        ...value,
        links: value?.links?.length ? value.links : DEF_VALUE.links,
    }

    return (
        <section className="w-full px-4 py-12 pb-20 sm:px-6 sm:py-16 sm:pb-24">
            <div className="mx-auto max-w-6xl">
                <h2 className="font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
                    {v.title}
                </h2>
                <p className="mt-3 max-w-3xl font-mono text-sm leading-relaxed text-rpb-muted">
                    {v.body}
                </p>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                    {v.links.map((link, index) => (
                        <li key={`${link.name}-${index}`}>
                            <a
                                href={link.href}
                                target={
                                    link.href.startsWith("http")
                                        ? "_blank"
                                        : undefined
                                }
                                rel={
                                    link.href.startsWith("http")
                                        ? "noreferrer"
                                        : undefined
                                }
                                className="glass glass-hover block h-full rounded-2xl p-5 no-underline"
                            >
                                <p className="font-semibold text-rpb-text">
                                    {link.name}
                                </p>
                                <p className="mt-2 font-mono text-sm leading-relaxed text-rpb-muted">
                                    {link.description}
                                </p>
                                <p className="mt-4 font-mono text-xs text-rpb-secondary">
                                    Open →
                                </p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

const EcosystemBlock: IBlock<EcosystemValue> = {
    id: "ecosystem",
    title: "Ecosystem",
    description: "Related libraries and GitHub links",
    image: "",
    value: DEF_VALUE,
    scheme,
    view: EcosystemView,
}

export default EcosystemBlock
