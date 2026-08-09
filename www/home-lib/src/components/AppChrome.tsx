import type { FC, ReactNode } from "react"
import { Link, NavLink } from "react-router-dom"
import ThemeSwitcher from "./ThemeSwitcher"
import type { ThemeAppId } from "../siteUrls"

import {
    getPageBuilderHref,
    getUseFormHref,
} from "../siteUrls"

const GITHUB = "https://github.com/undermuz/react-json-form"

export type AppChromeProps = {
    /** External URL to the landing app (used by theme example apps). */
    homeHref?: string
    /** External URL to examples (used by landing to leave the home app). */
    examplesHref?: string
    /** Shown next to the product name on theme example apps. */
    themeLabel?: string
    /** When set, highlight this theme in the cross-links row. */
    activeTheme?: ThemeAppId
    /** Current example id — preserved when switching themes. */
    exampleId?: string
    /** Show theme cross-links (examples apps, or landing). */
    showThemeSwitcher?: boolean
    showEditorControls?: boolean
    /** Landing-only: ModeToggle (or similar) rendered in the editor toolbar. */
    modeToggle?: ReactNode
    onReset?: () => void
    onDownload?: () => void
    isDirty?: boolean
    editBanner?: boolean
}

const linkClass =
    "font-mono text-xs text-rpb-muted transition-colors hover:text-rpb-text"

const navClass = ({ isActive }: { isActive: boolean }) =>
    [
        "font-mono text-xs transition-colors",
        isActive ? "text-rpb-secondary" : "text-rpb-muted hover:text-rpb-text",
    ].join(" ")

const externalNavClass =
    "font-mono text-xs text-rpb-muted transition-colors hover:text-rpb-text"

const AppChrome: FC<AppChromeProps> = ({
    homeHref,
    examplesHref,
    themeLabel,
    activeTheme,
    exampleId,
    showThemeSwitcher = false,
    showEditorControls = false,
    modeToggle,
    onReset,
    onDownload,
    isDirty = false,
    editBanner = false,
}) => {
    const brand = (
        <>
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
                    {themeLabel ? (
                        <span className="ml-2 font-mono text-[11px] font-normal text-rpb-secondary">
                            {themeLabel}
                        </span>
                    ) : null}
                </p>
                <p className="truncate font-mono text-[10px] text-rpb-muted">
                    JSON scheme → React form
                </p>
            </div>
        </>
    )

    return (
        <header className="sticky top-0 z-50 border-b border-rpb-border bg-rpb-surface/75 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                    {homeHref ? (
                        <a
                            href={homeHref}
                            className="flex min-w-0 items-center gap-3 no-underline"
                        >
                            {brand}
                        </a>
                    ) : (
                        <Link
                            to="/"
                            className="flex min-w-0 items-center gap-3 no-underline"
                        >
                            {brand}
                        </Link>
                    )}
                </div>

                {showEditorControls && onDownload ? (
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {modeToggle}
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
                        {homeHref ? (
                            <a href={homeHref} className={externalNavClass}>
                                Home
                            </a>
                        ) : (
                            <NavLink to="/" end className={navClass}>
                                Home
                            </NavLink>
                        )}
                        {examplesHref ? (
                            <a href={examplesHref} className={externalNavClass}>
                                Examples
                            </a>
                        ) : homeHref ? (
                            <span className="font-mono text-xs text-rpb-secondary">
                                Examples
                            </span>
                        ) : (
                            <NavLink to="/examples" className={navClass}>
                                Examples
                            </NavLink>
                        )}
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
                            {examplesHref ? (
                                <a
                                    href={examplesHref}
                                    className={externalNavClass}
                                >
                                    Examples
                                </a>
                            ) : null}
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
                    <a className={linkClass} href={getUseFormHref()}>
                        use-form
                    </a>
                    <a className={linkClass} href={getPageBuilderHref()}>
                        page-builder
                    </a>
                </nav>
            </div>
            {showThemeSwitcher || activeTheme ? (
                <div className="border-t border-rpb-border/60 bg-rpb-surface/60 px-4 py-2 sm:px-6">
                    <div className="mx-auto max-w-6xl">
                        <ThemeSwitcher
                            activeTheme={activeTheme}
                            exampleId={exampleId}
                        />
                    </div>
                </div>
            ) : null}
            {showEditorControls && editBanner ? (
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
