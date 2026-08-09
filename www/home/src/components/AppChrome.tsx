import type { FC } from "react"
import { Link, NavLink } from "react-router-dom"
import ModeToggle, { type AppMode } from "./ModeToggle"

const GITHUB = "https://github.com/undermuz/react-json-form"
const NPM = "https://www.npmjs.com/package/@undermuz/react-json-form"
const USE_FORM = "https://www.npmjs.com/package/@undermuz/use-form"
const PAGE_BUILDER =
    "https://www.npmjs.com/package/@undermuz/react-page-builder"

type AppChromeProps = {
    mode?: AppMode
    onModeChange?: (mode: AppMode) => void
    onReset?: () => void
    onDownload?: () => void
    isDirty?: boolean
    showEditorControls?: boolean
}

const linkClass =
    "font-mono text-xs text-rpb-muted transition-colors hover:text-rpb-text"

const navClass = ({ isActive }: { isActive: boolean }) =>
    [
        "font-mono text-xs transition-colors",
        isActive ? "text-rpb-secondary" : "text-rpb-muted hover:text-rpb-text",
    ].join(" ")

const AppChrome: FC<AppChromeProps> = ({
    mode = "view",
    onModeChange,
    onReset,
    onDownload,
    isDirty = false,
    showEditorControls = false,
}) => {
    return (
        <header className="sticky top-0 z-50 border-b border-rpb-border bg-rpb-surface/75 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                    <Link
                        to="/"
                        className="flex min-w-0 items-center gap-3 no-underline"
                    >
                        <div
                            className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-rpb-border bg-rpb-glass"
                            aria-hidden
                        >
                            <span className="flex flex-col gap-0.5">
                                <span className="h-0.5 w-3.5 rounded-full bg-rpb-primary" />
                                <span className="h-0.5 w-3.5 rounded-full bg-rpb-text/80" />
                                <span className="h-0.5 w-3.5 rounded-full bg-rpb-text/50" />
                            </span>
                        </div>
                        <div className="min-w-0">
                            <p className="truncate font-sans text-sm font-semibold tracking-tight text-rpb-text">
                                react-json-form
                            </p>
                            <p className="truncate font-mono text-[10px] text-rpb-muted">
                                JSON scheme → React form
                            </p>
                        </div>
                    </Link>
                </div>

                {showEditorControls && onModeChange && onDownload ? (
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <ModeToggle mode={mode} onChange={onModeChange} />
                        <button
                            type="button"
                            onClick={onDownload}
                            className="rounded-full border border-rpb-border bg-rpb-elevated/80 px-3 py-1.5 font-mono text-xs font-semibold text-rpb-text transition hover:border-rpb-primary/50"
                        >
                            Download JSON
                        </button>
                        {isDirty && onReset ? (
                            <button
                                type="button"
                                onClick={onReset}
                                className="rounded-full border border-amber-400/60 bg-amber-400 px-3 py-1.5 font-mono text-xs font-semibold text-rpb-surface transition hover:bg-amber-300"
                            >
                                Reset demo
                            </button>
                        ) : null}
                    </div>
                ) : (
                    <nav
                        className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
                        aria-label="Site"
                    >
                        <NavLink to="/" end className={navClass}>
                            Home
                        </NavLink>
                        <NavLink to="/examples" className={navClass}>
                            Examples
                        </NavLink>
                    </nav>
                )}

                <nav
                    className="flex flex-wrap items-center gap-x-4 gap-y-2"
                    aria-label="Project links"
                >
                    {showEditorControls ? (
                        <>
                            <NavLink to="/" end className={navClass}>
                                Home
                            </NavLink>
                            <NavLink to="/examples" className={navClass}>
                                Examples
                            </NavLink>
                        </>
                    ) : null}
                    <a
                        className={linkClass}
                        href={GITHUB}
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                    <a
                        className={linkClass}
                        href={NPM}
                        target="_blank"
                        rel="noreferrer"
                    >
                        npm
                    </a>
                    <a
                        className={linkClass}
                        href={USE_FORM}
                        target="_blank"
                        rel="noreferrer"
                    >
                        use-form
                    </a>
                    <a
                        className={linkClass}
                        href={PAGE_BUILDER}
                        target="_blank"
                        rel="noreferrer"
                    >
                        page-builder
                    </a>
                </nav>
            </div>
            {showEditorControls && mode === "edit" ? (
                <p className="border-t border-rpb-border/60 bg-rpb-primary/10 px-4 py-2 text-center font-mono text-[11px] text-rpb-text/90 sm:px-6">
                    DEV edit mode — add, reorder, or edit sections, then Download
                    JSON to update defaultPage. Switch to View for the public
                    page.
                </p>
            ) : null}
        </header>
    )
}

export default AppChrome
