import type { FC } from "react"
import { EnumSchemeItemType } from "@undermuz/react-json-form"
import type { IScheme } from "@undermuz/react-json-form"
import type { IBlock } from "@undermuz/react-page-builder"

export type HighlightItem = {
    id: number
    title: string
    description: string
}

export type HighlightsValue = {
    title: string
    subtitle: string
    items: HighlightItem[]
    cardOneTitle: string
    cardOneBody: string
    cardTwoTitle: string
    cardTwoBody: string
}

const DEF_VALUE: HighlightsValue = {
    title: "Built for real product forms",
    subtitle:
        "Not a page composer — a form engine: schemes, rules, nesting, and UI you control.",
    items: [
        {
            id: 1,
            title: "Declare once",
            description:
                "Fields, defaults, and rules live in IScheme — JsonForm turns them into UI.",
        },
        {
            id: 2,
            title: "Validate with use-form",
            description:
                "Required, email, length, and custom rules ride on @undermuz/use-form.",
        },
        {
            id: 3,
            title: "Nest without fear",
            description:
                "Widget-in-Widget trees map to plain JSON — ideal for addresses, variants, CMS blocks.",
        },
        {
            id: 4,
            title: "Own the chrome",
            description:
                "Themes, custom field components, and JsonFormLayout (JFL) reshape the UX.",
        },
    ],
    cardOneTitle: "CMS & admin UIs",
    cardOneBody:
        "Generate edit screens from config stored in your API — change the scheme, not the React tree.",
    cardTwoTitle: "Design-system friendly",
    cardTwoBody:
        "Keep Chakra, HeroUI, or your own theme. The scheme stays stable while the UI kit evolves.",
}

const scheme: IScheme = {
    id: "highlights",
    title: "Highlights",
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
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.subtitle,
        },
        {
            name: "items",
            title: "Steps",
            type: EnumSchemeItemType.Widget,
            multiple: true,
            scheme: [
                {
                    name: "title",
                    title: "Title",
                    type: EnumSchemeItemType.Text,
                    def_value: "",
                },
                {
                    name: "description",
                    title: "Description",
                    type: EnumSchemeItemType.TextBlock,
                    def_value: "",
                },
            ],
        },
        {
            name: "cardOneTitle",
            title: "Card 1 title",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.cardOneTitle,
        },
        {
            name: "cardOneBody",
            title: "Card 1 body",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.cardOneBody,
        },
        {
            name: "cardTwoTitle",
            title: "Card 2 title",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.cardTwoTitle,
        },
        {
            name: "cardTwoBody",
            title: "Card 2 body",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.cardTwoBody,
        },
    ],
}

const HighlightsView: FC<{ id?: number; value?: HighlightsValue }> = ({
    value,
}) => {
    const v = {
        ...DEF_VALUE,
        ...value,
        items: value?.items?.length ? value.items : DEF_VALUE.items,
    }

    return (
        <section className="w-full px-4 py-12 sm:px-6 sm:py-16">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14">
                    {/* Sticky pitch column */}
                    <div className="lg:sticky lg:top-28">
                        <p className="font-mono text-xs uppercase tracking-[0.16em] text-rpb-secondary">
                            Offer
                        </p>
                        <h2 className="mt-3 max-w-md font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
                            {v.title}
                        </h2>
                        <p className="mt-4 max-w-md border-l-2 border-rpb-primary/50 pl-4 font-mono text-sm leading-relaxed text-rpb-muted">
                            {v.subtitle}
                        </p>

                        <div className="mt-8 space-y-3">
                            <article className="rounded-2xl border border-rpb-primary/30 bg-gradient-to-br from-rpb-primary/20 to-transparent px-5 py-5">
                                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-rpb-secondary">
                                    Use case
                                </p>
                                <p className="mt-2 font-semibold text-rpb-text">
                                    {v.cardOneTitle}
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-rpb-text/85">
                                    {v.cardOneBody}
                                </p>
                            </article>
                            <article className="ml-0 rounded-2xl border border-rpb-border bg-rpb-elevated/70 px-5 py-5 sm:ml-6">
                                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-rpb-muted">
                                    Use case
                                </p>
                                <p className="mt-2 font-semibold text-rpb-text">
                                    {v.cardTwoTitle}
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-rpb-muted">
                                    {v.cardTwoBody}
                                </p>
                            </article>
                        </div>
                    </div>

                    {/* Pipeline steps */}
                    <ol className="relative m-0 list-none space-y-0 p-0">
                        <div
                            className="pointer-events-none absolute bottom-4 left-[1.15rem] top-4 w-px bg-gradient-to-b from-rpb-primary via-rpb-border to-transparent sm:left-[1.35rem]"
                            aria-hidden
                        />
                        {v.items.map((item, index) => {
                            const odd = index % 2 === 1
                            return (
                                <li
                                    key={`${item.title}-${index}`}
                                    className={[
                                        "relative flex gap-4 pb-8 last:pb-0 sm:gap-5",
                                        odd ? "sm:pl-8" : "",
                                    ].join(" ")}
                                >
                                    <span
                                        className="relative z-10 mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-rpb-primary/50 bg-rpb-surface font-mono text-[11px] font-semibold text-rpb-secondary shadow-[0_0_20px_rgb(95_160_78_/0.25)] sm:size-11 sm:text-xs"
                                        aria-hidden
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div
                                        className={[
                                            "glass glass-hover min-w-0 flex-1 rounded-2xl p-5",
                                            odd
                                                ? "sm:translate-y-1"
                                                : "sm:-translate-y-0.5",
                                        ].join(" ")}
                                    >
                                        <p className="font-sans text-lg font-semibold tracking-tight text-rpb-text">
                                            {item.title}
                                        </p>
                                        <p className="mt-2 font-mono text-sm leading-relaxed text-rpb-muted">
                                            {item.description}
                                        </p>
                                    </div>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        </section>
    )
}

const HighlightsBlock: IBlock<HighlightsValue> = {
    id: "highlights",
    title: "Highlights",
    description: "Product offer and feature steps",
    image: "",
    value: DEF_VALUE,
    scheme,
    view: HighlightsView,
}

export default HighlightsBlock
