import type { FC } from "react"
import { EnumSchemeItemType } from "@undermuz/react-json-form"
import type { IScheme } from "@undermuz/react-json-form"
import type { IBlock } from "@undermuz/react-page-builder"
import { CodePanel } from "@undermuz/react-json-form-home-lib"

export type CodeWindowValue = {
    title: string
    body: string
    filename: string
    code: string
}

const DEF_VALUE: CodeWindowValue = {
    title: "Store schemes next to your API",
    body: "Versions, feature flags, or per-tenant forms become data — not another React route full of inputs.",
    filename: "scheme.json",
    code: `{
  "id": "checkout-v3",
  "title": "Checkout",
  "scheme": [
    {
      "name": "email",
      "title": "E-mail",
      "type": "input",
      "settings": { "inputType": "email" },
      "rules": [[["Boolean"], "Required"]]
    },
    {
      "name": "shipping",
      "title": "Shipping",
      "type": "widget",
      "scheme": [
        { "name": "city", "title": "City", "type": "text" },
        { "name": "zip", "title": "ZIP", "type": "text" }
      ]
    }
  ]
}`,
}

const scheme: IScheme = {
    id: "code-window",
    title: "Code window",
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
            name: "filename",
            title: "Filename",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.filename,
        },
        {
            name: "code",
            title: "Code",
            type: EnumSchemeItemType.TextBlock,
            def_value: DEF_VALUE.code,
        },
    ],
}

const CodeWindowView: FC<{ id?: number; value?: CodeWindowValue }> = ({
    value,
}) => {
    const v = { ...DEF_VALUE, ...value }

    return (
        <section className="w-full px-4 py-12 sm:px-6 sm:py-16">
            <div className="mx-auto max-w-6xl">
                <h2 className="font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
                    {v.title}
                </h2>
                <p className="mt-3 max-w-3xl font-mono text-sm leading-relaxed text-rpb-muted">
                    {v.body}
                </p>
                <div className="mt-8">
                    <CodePanel filename={v.filename} code={v.code} />
                </div>
            </div>
        </section>
    )
}

const CodeWindowBlock: IBlock<CodeWindowValue> = {
    id: "code-window",
    title: "Code window",
    description: "Visual code / scheme sample",
    image: "",
    value: DEF_VALUE,
    scheme,
    view: CodeWindowView,
}

export default CodeWindowBlock
