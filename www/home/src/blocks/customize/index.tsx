import type { FC } from "react"
import { EnumSchemeItemType } from "@undermuz/react-json-form"
import type { IScheme } from "@undermuz/react-json-form"
import type { IBlock } from "@undermuz/react-page-builder"
import { CodePanel } from "@undermuz/react-json-form-home-lib"

export type CustomizePillar = {
    id: number
    title: string
    body: string
}

export type CustomizeValue = {
    title: string
    subtitle: string
    pillars: CustomizePillar[]
    code: string
}

const DEF_VALUE: CustomizeValue = {
    title: "Customize for your product",
    subtitle:
        "Three knobs: theme chrome, field components, and layout. The scheme stays the source of truth.",
    pillars: [
        {
            id: 1,
            title: "Themes (UiContext)",
            body: "Install a theme package, copy it into your codebase, or extend base. Same scheme — your chrome.",
        },
        {
            id: 2,
            title: "Custom field components",
            body: "Register overrides via CustomComponentsContext — replace a single input without forking the library.",
        },
        {
            id: 3,
            title: "Layouts (JFL)",
            body: "Compose JsonFormLayout (JFL) to place fields, array items, and sections exactly where your UX needs them.",
        },
    ],
    code: `import JsonForm, {
  UiContext,
  CustomComponentsContext,
  JFL,
} from "@undermuz/react-json-form"
import BaseTheme from "@undermuz/react-json-form-theme-base"

const PriceField = (props) => (
  <label>
    {props.title}
    <input {...props} inputMode="decimal" />
  </label>
)

function ProductForm({ scheme, value, onChange }) {
  return (
    <UiContext.Provider value={BaseTheme}>
      <CustomComponentsContext.Provider
        value={{ price: PriceField }}
      >
        <JsonForm {...scheme} value={value} onChange={onChange}>
          <JFL.Form>
            <div className="grid gap-4 md:grid-cols-2">
              <JFL.Field name="title" />
              <JFL.Field name="price" />
            </div>
            <JFL.Fields except={["title", "price"]} />
          </JFL.Form>
        </JsonForm>
      </CustomComponentsContext.Provider>
    </UiContext.Provider>
  )
}`,
}

const scheme: IScheme = {
    id: "customize",
    title: "Customize",
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
            name: "pillars",
            title: "Pillars",
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
                    name: "body",
                    title: "Body",
                    type: EnumSchemeItemType.TextBlock,
                    def_value: "",
                },
            ],
        },
        {
            name: "code",
            title: "Example code",
            type: EnumSchemeItemType.TextBlock,
            def_value: DEF_VALUE.code,
        },
    ],
}

const CustomizeView: FC<{ id?: number; value?: CustomizeValue }> = ({
    value,
}) => {
    const v = {
        ...DEF_VALUE,
        ...value,
        pillars: value?.pillars?.length ? value.pillars : DEF_VALUE.pillars,
    }

    return (
        <section
            id="customize"
            className="scroll-mt-28 w-full px-4 py-12 sm:px-6 sm:py-16"
        >
            <div className="mx-auto max-w-6xl">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-rpb-secondary">
                    Extensibility
                </p>
                <h2 className="mt-2 font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
                    {v.title}
                </h2>
                <p className="mt-3 max-w-3xl font-mono text-sm leading-relaxed text-rpb-muted">
                    {v.subtitle}
                </p>

                <ul className="mt-8 grid gap-4 md:grid-cols-3">
                    {v.pillars.map((pillar, index) => (
                        <li
                            key={`${pillar.title}-${index}`}
                            className="glass glass-hover rounded-2xl p-5"
                        >
                            <span
                                className="mb-3 inline-flex size-8 items-center justify-center rounded-lg border border-rpb-primary/40 bg-rpb-primary/15 font-mono text-xs font-semibold text-rpb-secondary"
                                aria-hidden
                            >
                                {index + 1}
                            </span>
                            <p className="font-semibold text-rpb-text">
                                {pillar.title}
                            </p>
                            <p className="mt-2 font-mono text-sm leading-relaxed text-rpb-muted">
                                {pillar.body}
                            </p>
                        </li>
                    ))}
                </ul>

                <div className="mt-8">
                    <p className="mb-3 font-mono text-xs uppercase tracking-wider text-rpb-secondary">
                        Theme + custom field + JFL
                    </p>
                    <CodePanel filename="ProductForm.tsx" code={v.code} />
                </div>
            </div>
        </section>
    )
}

const CustomizeBlock: IBlock<CustomizeValue> = {
    id: "customize",
    title: "Customize",
    description: "Themes, custom components, and JFL layouts",
    image: "",
    value: DEF_VALUE,
    scheme,
    view: CustomizeView,
}

export default CustomizeBlock
