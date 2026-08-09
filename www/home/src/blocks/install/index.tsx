import type { FC } from "react"
import { EnumSchemeItemType } from "@undermuz/react-json-form"
import type { IScheme } from "@undermuz/react-json-form"
import type { IBlock } from "@undermuz/react-page-builder"
import CodePanel from "../../components/CodePanel"

export type InstallValue = {
    title: string
    body: string
    command: string
    themeNote: string
}

const DEF_VALUE: InstallValue = {
    title: "Two packages, one form",
    body: "Core engine + a theme. Start with base (no UI kit), or plug Chakra / HeroUI / Rsuite / Grommet later.",
    command:
        "npm i @undermuz/react-json-form @undermuz/react-json-form-theme-base",
    themeNote:
        "For base: import styles.css, then wrap JsonForm in UiContext.Provider.",
}

const scheme: IScheme = {
    id: "install",
    title: "Install",
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
            name: "command",
            title: "Install command",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.command,
        },
        {
            name: "themeNote",
            title: "Theme note",
            type: EnumSchemeItemType.TextBlock,
            def_value: DEF_VALUE.themeNote,
        },
    ],
}

const InstallView: FC<{ id?: number; value?: InstallValue }> = ({ value }) => {
    const v = { ...DEF_VALUE, ...value }

    return (
        <section
            id="install"
            className="scroll-mt-28 w-full px-4 py-12 sm:px-6 sm:py-16"
        >
            <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-2">
                <div>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-rpb-secondary">
                        Setup
                    </p>
                    <h2 className="mt-2 font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
                        {v.title}
                    </h2>
                    <p className="mt-3 font-mono text-sm leading-relaxed text-rpb-muted">
                        {v.body}
                    </p>
                    <p className="mt-4 font-mono text-sm leading-relaxed text-rpb-muted">
                        {v.themeNote}
                    </p>
                </div>
                <CodePanel
                    filename="terminal"
                    code={`$ ${v.command}`}
                    copyable
                    copyText={v.command}
                />
            </div>
        </section>
    )
}

const InstallBlock: IBlock<InstallValue> = {
    id: "install",
    title: "Install",
    description: "Installation instructions",
    image: "",
    value: DEF_VALUE,
    scheme,
    view: InstallView,
}

export default InstallBlock
