import type { FC, ReactNode } from "react"
import CodePanel from "../components/CodePanel"

type ExampleShellProps = {
    title: string
    description: string
    value: unknown
    children: ReactNode
    aside?: ReactNode
    code?: string
    codeFilename?: string
}

const ExampleShell: FC<ExampleShellProps> = ({
    title,
    description,
    value,
    children,
    aside,
    code,
    codeFilename = "Example.tsx",
}) => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="font-sans text-2xl font-semibold tracking-tight text-rpb-text">
                    {title}
                </h2>
                <p className="mt-2 max-w-2xl font-mono text-sm leading-relaxed text-rpb-muted">
                    {description}
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div
                    className="rjf-live-demo glass min-w-0 rounded-2xl p-5 sm:p-6"
                    data-rjf-live-demo
                >
                    {children}
                </div>
                <div className="min-w-0 space-y-4">
                    {aside}
                    <CodePanel
                        filename="value.json"
                        language="json"
                        code={JSON.stringify(value, null, 2)}
                    />
                </div>
            </div>

            {code ? (
                <div>
                    <p className="mb-3 font-mono text-xs uppercase tracking-wider text-rpb-secondary">
                        Source
                    </p>
                    <CodePanel filename={codeFilename} code={code} />
                </div>
            ) : null}
        </div>
    )
}

export default ExampleShell
