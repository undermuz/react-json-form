import type { FC } from "react"
import { EnumSchemeItemType } from "@undermuz/react-json-form"
import type { IScheme } from "@undermuz/react-json-form"
import type { IBlock } from "@undermuz/react-page-builder"

export type HeroValue = {
    brand: string
    eyebrow: string
    headline: string
    support: string
    primaryLabel: string
    primaryHref: string
    secondaryLabel: string
    secondaryHref: string
    tipEyebrow: string
    tipTitle: string
    tipBody: string
}

const DEF_VALUE: HeroValue = {
    brand: "@undermuz/react-json-form",
    eyebrow: "Scheme-first forms for React",
    headline: "Stop hand-wiring fields. Ship the scheme instead.",
    support:
        "One JSON scheme drives inputs, validation, nested widgets, and submit. Headless by default — optional themes for popular UI kits (install or copy-paste). Base theme scaffolds custom chrome.",
    primaryLabel: "Install →",
    primaryHref: "#install",
    secondaryLabel: "Examples",
    secondaryHref: "#/examples",
    tipEyebrow: "What you get",
    tipTitle: "Scheme in → value out",
    tipBody:
        "Authors edit a scheme; users fill a form. Same contract for login, settings, or deeply nested CMS-style data.",
}

const scheme: IScheme = {
    id: "hero",
    title: "Hero",
    multiple: false,
    scheme: [
        {
            name: "brand",
            title: "Brand",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.brand,
        },
        {
            name: "eyebrow",
            title: "Eyebrow",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.eyebrow,
        },
        {
            name: "headline",
            title: "Headline",
            type: EnumSchemeItemType.TextBlock,
            def_value: DEF_VALUE.headline,
        },
        {
            name: "support",
            title: "Support",
            type: EnumSchemeItemType.TextBlock,
            def_value: DEF_VALUE.support,
        },
        {
            name: "primaryLabel",
            title: "Primary CTA label",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.primaryLabel,
        },
        {
            name: "primaryHref",
            title: "Primary CTA href",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.primaryHref,
        },
        {
            name: "secondaryLabel",
            title: "Secondary CTA label",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.secondaryLabel,
        },
        {
            name: "secondaryHref",
            title: "Secondary CTA href",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.secondaryHref,
        },
        {
            name: "tipEyebrow",
            title: "Tip eyebrow",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.tipEyebrow,
        },
        {
            name: "tipTitle",
            title: "Tip title",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.tipTitle,
        },
        {
            name: "tipBody",
            title: "Tip body",
            type: EnumSchemeItemType.TextBlock,
            def_value: DEF_VALUE.tipBody,
        },
    ],
}

const HERO_EMPHASIS_RE = /\b(Headless|themes|copy-paste|scaffolds)\b/gi

const HERO_EMPHASIS_CLASS =
    "bg-gradient-to-r from-rpb-secondary via-rpb-primary to-[#b6e08a] bg-clip-text font-semibold text-transparent"

function emphasizeSupport(text: string) {
    return text.split(HERO_EMPHASIS_RE).map((part, index) => {
        if (/^(Headless|themes|copy-paste|scaffolds)$/i.test(part)) {
            return (
                <span key={index} className={HERO_EMPHASIS_CLASS}>
                    {part}
                </span>
            )
        }
        return part
    })
}

const FlowArrow: FC = () => (
    <span
        className="hidden shrink-0 text-rpb-primary/70 sm:inline"
        aria-hidden
    >
        <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
            <path
                d="M0 6h24M20 1l6 5-6 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    </span>
)

const HeroFlow: FC<{
    eyebrow: string
    title: string
    body: string
}> = ({ eyebrow, title, body }) => (
    <aside
        className="hero-tip animate-rise-delay w-full min-w-0"
        aria-label="Product tip"
    >
        <div className="glass relative overflow-hidden rounded-2xl border-rpb-primary/30 p-5 shadow-[0_0_48px_rgb(95_160_78_/0.12)] sm:p-6">
            <div className="pointer-events-none absolute -left-10 top-0 size-40 rounded-full bg-rpb-primary/10 blur-3xl" />
            <div className="relative flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between xl:gap-10">
                <div className="min-w-0 max-w-xl shrink">
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-rpb-secondary">
                        {eyebrow}
                    </p>
                    <p className="mt-1.5 font-sans text-lg font-semibold leading-snug text-rpb-text">
                        {title}
                    </p>
                    <p className="mt-2 font-mono text-sm leading-relaxed text-rpb-muted">
                        {body}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 xl:shrink-0">
                    {(
                        [
                            ["01", "Scheme"],
                            ["02", "Form"],
                            ["03", "Value"],
                        ] as const
                    ).map(([n, label], i) => (
                        <div key={label} className="contents">
                            {i > 0 ? <FlowArrow /> : null}
                            <div className="flex min-w-[5.5rem] flex-col gap-0.5 rounded-xl border border-rpb-border bg-rpb-elevated/80 px-4 py-3">
                                <span className="font-mono text-[10px] text-rpb-primary">
                                    {n}
                                </span>
                                <span className="font-sans text-sm font-semibold text-rpb-text">
                                    {label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </aside>
)

const HeroView: FC<{ id?: number; value?: HeroValue }> = ({ value }) => {
    const v = { ...DEF_VALUE, ...value }

    return (
        <section className="relative w-full overflow-hidden px-4 pb-14 pt-12 sm:px-6 sm:pb-16 sm:pt-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_0%,rgb(95_160_78_/0.2),transparent_55%)]" />
            <div className="pointer-events-none absolute -right-24 top-10 hidden h-64 w-64 rounded-full border border-rpb-border/60 lg:block" aria-hidden />
            <div className="pointer-events-none absolute -right-10 top-24 hidden h-40 w-40 rounded-full border border-rpb-primary/25 lg:block" aria-hidden />

            <div className="relative mx-auto flex max-w-6xl flex-col gap-10">
                <div className="animate-rise grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
                    <div className="min-w-0">
                        <p className="mb-5 inline-flex rounded-full border border-rpb-border bg-rpb-glass px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-rpb-secondary">
                            {v.eyebrow}
                        </p>
                        <h1 className="text-balance break-all font-sans text-[clamp(1.75rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-rpb-text">
                            {v.brand}
                        </h1>
                        <p className="mt-6 max-w-2xl text-balance font-sans text-xl font-medium leading-snug tracking-tight text-rpb-text/90 sm:text-2xl md:text-[1.85rem]">
                            {v.headline}
                        </p>
                    </div>

                    <div className="animate-rise-delay flex flex-col gap-4 lg:w-56 lg:pb-1">
                        <a
                            href={v.primaryHref}
                            className="inline-flex items-center justify-center rounded-lg border border-rpb-primary bg-rpb-primary/20 px-5 py-3 text-sm font-semibold text-rpb-text transition hover:bg-rpb-primary/30"
                        >
                            {v.primaryLabel}
                        </a>
                        <a
                            href={v.secondaryHref}
                            target={
                                v.secondaryHref.startsWith("http")
                                    ? "_blank"
                                    : undefined
                            }
                            rel={
                                v.secondaryHref.startsWith("http")
                                    ? "noreferrer"
                                    : undefined
                            }
                            className="inline-flex items-center justify-center rounded-lg border border-rpb-border bg-rpb-elevated/80 px-5 py-3 text-sm font-medium text-rpb-text transition hover:border-rpb-secondary/40"
                        >
                            {v.secondaryLabel}
                        </a>
                    </div>
                </div>

                <div className="animate-rise-delay flex flex-col gap-6 border-t border-rpb-border/70 pt-8">
                    <p className="max-w-2xl font-mono text-sm leading-relaxed text-rpb-muted sm:text-[15px]">
                        {emphasizeSupport(v.support)}
                    </p>
                    <HeroFlow
                        eyebrow={v.tipEyebrow}
                        title={v.tipTitle}
                        body={v.tipBody}
                    />
                </div>
            </div>
        </section>
    )
}

const HeroBlock: IBlock<HeroValue> = {
    id: "hero",
    title: "Hero",
    description: "Brand-first hero section",
    image: "",
    value: DEF_VALUE,
    scheme,
    view: HeroView,
}

export default HeroBlock
