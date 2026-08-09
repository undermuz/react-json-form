import type { FC } from "react"
import { EnumSchemeItemType } from "@undermuz/react-json-form"
import type { IScheme } from "@undermuz/react-json-form"
import type { IBlock } from "@undermuz/react-page-builder"
import { CodePanel } from "@undermuz/react-json-form-home-lib"

export type UsageValue = {
    title: string
    body: string
    editorCode: string
}

const DEF_VALUE: UsageValue = {
    title: "Minimal form in ~30 lines",
    body: "Controlled value + scheme + theme. Rules and field types travel with the scheme — not with JSX per field.",
    editorCode: `import { useState } from "react"
import JsonForm, {
  UiContext,
  EnumSchemeItemType,
} from "@undermuz/react-json-form"
import BaseTheme from "@undermuz/react-json-form-theme-base"
import "@undermuz/react-json-form-theme-base/styles.css"

const scheme = {
  id: "login-form-v1",
  title: "Login",
  scheme: [
    {
      name: "email",
      title: "E-mail",
      type: EnumSchemeItemType.Input,
      settings: { inputType: "email" },
      rules: [[["Boolean"], "Required"]],
    },
    {
      name: "password",
      title: "Password",
      type: EnumSchemeItemType.Input,
      settings: { inputType: "password" },
      rules: [[["Boolean"], "Required"]],
    },
  ],
}

function LoginForm() {
  const [value, setValue] = useState({})

  return (
    <UiContext.Provider value={BaseTheme}>
      <JsonForm {...scheme} value={value} onChange={setValue} />
    </UiContext.Provider>
  )
}

export default LoginForm`,
}

const scheme: IScheme = {
    id: "usage",
    title: "Basic usage",
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
            name: "editorCode",
            title: "Example code",
            type: EnumSchemeItemType.TextBlock,
            def_value: DEF_VALUE.editorCode,
        },
    ],
}

const UsageView: FC<{ id?: number; value?: UsageValue }> = ({ value }) => {
    const v = { ...DEF_VALUE, ...value }

    return (
        <section className="w-full px-4 py-12 sm:px-6 sm:py-16">
            <div className="mx-auto max-w-6xl">
                <h2 className="font-sans text-2xl font-semibold tracking-tight text-rpb-text sm:text-3xl">
                    {v.title}
                </h2>
                <p className="mt-3 max-w-3xl font-mono text-sm leading-relaxed text-rpb-muted">
                    {v.body}
                </p>
                <div className="mt-8">
                    <p className="mb-3 font-mono text-xs uppercase tracking-wider text-rpb-secondary">
                        JsonForm
                    </p>
                    <CodePanel filename="LoginForm.tsx" code={v.editorCode} />
                </div>
            </div>
        </section>
    )
}

const UsageBlock: IBlock<UsageValue> = {
    id: "usage",
    title: "Basic usage",
    description: "JsonForm with UiContext theme",
    image: "",
    value: DEF_VALUE,
    scheme,
    view: UsageView,
}

export default UsageBlock
