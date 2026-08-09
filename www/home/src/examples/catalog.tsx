import { useRef, useState, type FC, type ReactNode } from "react"
import JsonForm, {
    ApiContext,
    CustomComponentsContext,
    JFL,
    UiContext,
    useSubmit,
    type IJsonFormRefObject,
    type IScheme,
    type TypeCustomComponentProps,
} from "@undermuz/react-json-form"
import BaseTheme from "@undermuz/react-json-form-theme-base"
import CodePanel from "../components/CodePanel"
import ExampleShell from "./ExampleShell"
import { SNIPPETS } from "./snippets"
import { demoApi } from "./api"
import LoginScheme from "./schemes/login"
import SignUpScheme from "./schemes/signup"
import SelectScheme from "./schemes/async-select"
import OfferScheme from "./schemes/offer"
import OfferDefaults from "./schemes/offer-defaults"
import LayoutScheme from "./schemes/layout"

export type ExampleId =
    | "login"
    | "signup"
    | "select"
    | "offer"
    | "submit"
    | "custom-component"
    | "grid-layout"

export type ExampleMeta = {
    id: ExampleId
    title: string
    blurb: string
}

export const EXAMPLES: ExampleMeta[] = [
    {
        id: "login",
        title: "Login",
        blurb: "Input, password, checkbox + validation rules",
    },
    {
        id: "signup",
        title: "Signup",
        blurb: "Nested widgets, files, and employee tabs",
    },
    {
        id: "select",
        title: "Async select",
        blurb: "Static options and ApiContext-powered lists",
    },
    {
        id: "offer",
        title: "Offer / prices",
        blurb: "Date, toggles, and tabbed price widgets",
    },
    {
        id: "submit",
        title: "useSubmit",
        blurb: "Validate on submit and inspect the result",
    },
    {
        id: "custom-component",
        title: "Custom field",
        blurb: "CustomComponentsContext field override",
    },
    {
        id: "grid-layout",
        title: "Grid layout",
        blurb: "JsonFormLayout (JFL) with a CSS grid",
    },
]

const BaseForm: FC<{
    scheme: IScheme
    value: Record<string, unknown>
    onChange: (v: Record<string, unknown>) => void
    children?: ReactNode
    withApi?: boolean
}> = ({ scheme, value, onChange, children, withApi = false }) => {
    const form = (
        <UiContext.Provider value={BaseTheme}>
            <JsonForm {...scheme} value={value} onChange={onChange}>
                {children}
            </JsonForm>
        </UiContext.Provider>
    )

    if (!withApi) return form

    return <ApiContext.Provider value={demoApi}>{form}</ApiContext.Provider>
}

const LoginExample: FC = () => {
    const [value, setValue] = useState<Record<string, unknown>>({})
    return (
        <ExampleShell
            title="Login"
            description="Canonical login scheme from stories — email rules, password length, remember checkbox."
            value={value}
            code={SNIPPETS.login.code}
            codeFilename={SNIPPETS.login.filename}
        >
            <BaseForm scheme={LoginScheme} value={value} onChange={setValue} />
        </ExampleShell>
    )
}

const SignupExample: FC = () => {
    const [value, setValue] = useState<Record<string, unknown>>({})
    return (
        <ExampleShell
            title="Signup"
            description="Richer form: files, nested company widget, projects list, and tabbed employees."
            value={value}
            code={SNIPPETS.signup.code}
            codeFilename={SNIPPETS.signup.filename}
        >
            <BaseForm scheme={SignUpScheme} value={value} onChange={setValue} />
        </ExampleShell>
    )
}

const SelectExample: FC = () => {
    const [value, setValue] = useState<Record<string, unknown>>({
        "multiple-async-list": [4, 5, 6],
        "multiple-simple-list": [4, 5, 6],
        "single-async-list": 5,
        "single-simple-list": 4,
    })
    return (
        <ExampleShell
            title="Async select"
            description="Four select variants — multi/single × static options / mock API via ApiContext."
            value={value}
            code={SNIPPETS.select.code}
            codeFilename={SNIPPETS.select.filename}
        >
            <BaseForm
                scheme={SelectScheme}
                value={value}
                onChange={setValue}
                withApi
            />
        </ExampleShell>
    )
}

const OfferExample: FC = () => {
    const [value, setValue] = useState<Record<string, unknown>>({
        ...OfferDefaults,
        date: new Date(),
    })
    return (
        <ExampleShell
            title="Offer / prices"
            description="CMS-style offer editor with showToggle fields, date, async size select, and tabbed prices."
            value={value}
            code={SNIPPETS.offer.code}
            codeFilename={SNIPPETS.offer.filename}
        >
            <BaseForm
                scheme={OfferScheme}
                value={value}
                onChange={setValue}
                withApi
            />
        </ExampleShell>
    )
}

const SubmitExample: FC = () => {
    const [value, setValue] = useState<Record<string, unknown>>({})
    const [result, setResult] = useState<unknown>(null)
    const ref = useRef<IJsonFormRefObject>(null)
    const onSubmit = useSubmit(ref, (values, errors, isValid) => {
        setResult({ values, errors, isValid })
    })

    return (
        <ExampleShell
            title="useSubmit"
            description="Wrap JsonForm in a form, call useSubmit — validate the whole tree and get values + errors."
            value={value}
            code={SNIPPETS.submit.code}
            codeFilename={SNIPPETS.submit.filename}
            aside={
                result ? (
                    <CodePanel
                        filename="submit-result.json"
                        language="json"
                        code={JSON.stringify(result, null, 2)}
                    />
                ) : null
            }
        >
            <form onSubmit={onSubmit} className="space-y-4">
                <UiContext.Provider value={BaseTheme}>
                    <JsonForm
                        {...LoginScheme}
                        ref={ref}
                        value={value}
                        onChange={setValue}
                    />
                </UiContext.Provider>
                <button
                    type="submit"
                    className="inline-flex rounded-lg border border-rpb-primary bg-rpb-primary/20 px-4 py-2 text-sm font-semibold text-rpb-text transition hover:bg-rpb-primary/30"
                >
                    Submit
                </button>
            </form>
        </ExampleShell>
    )
}

const ToggleButton: FC<TypeCustomComponentProps<{ texts?: string[] }>> = (
    props
) => {
    const texts = props.texts ?? ["Allowed", "Disallowed"]
    return (
        <button
            type="button"
            onClick={() => props.onChange?.(!props.value)}
            className="rounded-lg border border-rpb-border bg-rpb-elevated px-4 py-2 text-sm font-medium text-rpb-text transition hover:border-rpb-primary/50"
        >
            {props.value ? `✓ ${texts[0]}` : `× ${texts[1]}`}
        </button>
    )
}

const customComponents = { ToggleButton }

const customScheme: IScheme = {
    id: "CustomLogin",
    title: "Login + custom field",
    scheme: [
        ...LoginScheme.scheme.filter((f) => f.name !== "remember"),
        {
            name: "allowed_send_news",
            title: "News letters",
            type: "ToggleButton",
            def_value: false,
        },
    ],
}

const CustomComponentExample: FC = () => {
    const [value, setValue] = useState<Record<string, unknown>>({
        allowed_send_news: false,
    })

    return (
        <ExampleShell
            title="Custom field"
            description="Register a ToggleButton via CustomComponentsContext and place it with JFL.Field."
            value={value}
            code={SNIPPETS["custom-component"].code}
            codeFilename={SNIPPETS["custom-component"].filename}
        >
            <UiContext.Provider value={BaseTheme}>
                <CustomComponentsContext.Provider value={customComponents}>
                    <JsonForm
                        {...customScheme}
                        value={value}
                        onChange={setValue}
                    >
                        <JFL.Form>
                            <JFL.Fields except={["allowed_send_news"]} />
                            <JFL.Field
                                name="allowed_send_news"
                                texts={["Enabled", "Disabled"]}
                            />
                        </JFL.Form>
                    </JsonForm>
                </CustomComponentsContext.Provider>
            </UiContext.Provider>
        </ExampleShell>
    )
}

const GridBox: FC<{ children?: ReactNode; className?: string }> = ({
    children,
    className = "",
}) => (
    <div
        className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${className}`.trim()}
    >
        {children}
    </div>
)

const GridLayoutExample: FC = () => {
    const [value, setValue] = useState<Record<string, unknown>>({})
    return (
        <ExampleShell
            title="Grid layout"
            description="Pass a layout as JFL.Form as={…} — here a simple CSS grid instead of a UI-kit Grid."
            value={value}
            code={SNIPPETS["grid-layout"].code}
            codeFilename={SNIPPETS["grid-layout"].filename}
        >
            <BaseForm scheme={LayoutScheme} value={value} onChange={setValue}>
                <JFL.Form as={GridBox} />
            </BaseForm>
        </ExampleShell>
    )
}

export const EXAMPLE_VIEWS: Record<ExampleId, FC> = {
    login: LoginExample,
    signup: SignupExample,
    select: SelectExample,
    offer: OfferExample,
    submit: SubmitExample,
    "custom-component": CustomComponentExample,
    "grid-layout": GridLayoutExample,
}
