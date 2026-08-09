import { NavLink, useParams } from "react-router-dom"
import AppChrome from "../components/AppChrome"
import {
    EXAMPLES,
    EXAMPLE_VIEWS,
    type ExampleId,
} from "../examples/catalog"

function isExampleId(id: string | undefined): id is ExampleId {
    return Boolean(id && id in EXAMPLE_VIEWS)
}

function ExamplesPage() {
    const { exampleId } = useParams()
    const activeId: ExampleId = isExampleId(exampleId) ? exampleId : "login"
    const ActiveView = EXAMPLE_VIEWS[activeId]

    return (
        <div data-rpb-landing className="flex min-h-screen w-full flex-col">
            <AppChrome showEditorControls={false} />

            <main className="flex-1 px-4 py-10 sm:px-6 sm:py-14">
                <div className="mx-auto max-w-6xl">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-rpb-secondary">
                        Examples
                    </p>
                    <h1 className="mt-2 font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
                        See schemes in action
                    </h1>
                    <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-rpb-muted">
                        Interactive forms with live value and source — login,
                        nested widgets, async selects, custom fields, and
                        layouts.
                    </p>

                    <div className="mt-10 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
                        <nav
                            aria-label="Examples"
                            className="flex gap-2 overflow-x-auto lg:sticky lg:top-28 lg:flex-col lg:overflow-visible"
                        >
                            {EXAMPLES.map((item) => (
                                <NavLink
                                    key={item.id}
                                    to={`/examples/${item.id}`}
                                    className={({ isActive }) =>
                                        [
                                            "shrink-0 rounded-xl border px-3 py-2.5 text-left transition",
                                            isActive || activeId === item.id
                                                ? "border-rpb-primary/50 bg-rpb-primary/15 text-rpb-text"
                                                : "border-rpb-border bg-rpb-glass text-rpb-muted hover:border-rpb-primary/40 hover:text-rpb-text",
                                        ].join(" ")
                                    }
                                >
                                    <span className="block font-sans text-sm font-semibold">
                                        {item.title}
                                    </span>
                                    <span className="mt-0.5 block font-mono text-[11px] leading-snug opacity-80">
                                        {item.blurb}
                                    </span>
                                </NavLink>
                            ))}
                        </nav>

                        <div className="min-w-0">
                            <ActiveView />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ExamplesPage
