import { useState, type FC } from "react"
import JsonForm, {
    EnumSchemeItemType,
    UiContext,
    type IScheme,
} from "@undermuz/react-json-form"
import BaseTheme from "@undermuz/react-json-form-theme-base"
import type { IBlock } from "@undermuz/react-page-builder"
import CodePanel from "../../components/CodePanel"

export type LiveDemoValue = {
    title: string
    body: string
}

const DEF_VALUE: LiveDemoValue = {
    title: "Fill it — watch the value",
    body: "Same login scheme as the snippet above, rendered with the base theme. Type in the fields; the JSON on the right is the form state.",
}

const demoScheme: IScheme = {
    id: "live-demo-login",
    title: "Login",
    multiple: false,
    scheme: [
        {
            name: "email",
            title: "E-mail",
            type: EnumSchemeItemType.Input,
            settings: { inputType: "email" },
            def_value: "",
            rules: [[["Boolean"], "Required"]],
        },
        {
            name: "password",
            title: "Password",
            type: EnumSchemeItemType.Input,
            settings: { inputType: "password" },
            def_value: "",
            rules: [[["Boolean"], "Required"]],
        },
        {
            name: "remember",
            title: "Remember me",
            type: EnumSchemeItemType.Checkbox,
            def_value: false,
        },
    ],
}

const scheme: IScheme = {
    id: "live-demo",
    title: "Live demo",
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
    ],
}

const LiveDemoView: FC<{ id?: number; value?: LiveDemoValue }> = ({
    value,
}) => {
    const v = { ...DEF_VALUE, ...value }
    const [formValue, setFormValue] = useState<Record<string, unknown>>({
        email: "",
        password: "",
        remember: false,
    })

    return (
        <section
            id="demo"
            className="scroll-mt-28 w-full px-4 py-12 sm:px-6 sm:py-16"
        >
            <div className="mx-auto max-w-6xl">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-rpb-secondary">
                    Interactive
                </p>
                <h2 className="mt-2 font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
                    {v.title}
                </h2>
                <p className="mt-3 max-w-3xl font-mono text-sm leading-relaxed text-rpb-muted">
                    {v.body}
                </p>
                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    <div
                        className="rjf-live-demo glass rounded-2xl p-5 sm:p-6"
                        data-rjf-live-demo
                    >
                        <UiContext.Provider value={BaseTheme}>
                            <JsonForm
                                {...demoScheme}
                                value={formValue}
                                onChange={setFormValue}
                            />
                        </UiContext.Provider>
                    </div>
                    <CodePanel
                        filename="value.json"
                        language="json"
                        code={JSON.stringify(formValue, null, 2)}
                    />
                </div>
            </div>
        </section>
    )
}

const LiveDemoBlock: IBlock<LiveDemoValue> = {
    id: "live-demo",
    title: "Live demo",
    description: "Interactive JsonForm with base theme",
    image: "",
    value: DEF_VALUE,
    scheme,
    view: LiveDemoView,
}

export default LiveDemoBlock
