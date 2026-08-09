import type { FC } from "react"
import {
    THEME_APP_IDS,
    THEME_APP_LABELS,
    getExamplesHref,
    type ThemeAppId,
} from "../siteUrls"

export type ThemeSwitcherProps = {
    activeTheme?: ThemeAppId
    /** Keep the same example when jumping between theme apps. */
    exampleId?: string
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({
    activeTheme,
    exampleId,
}) => {
    return (
        <nav
            aria-label="Theme examples"
            className="flex flex-wrap items-center gap-1.5"
        >
            <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.14em] text-rpb-muted">
                Themes
            </span>
            {THEME_APP_IDS.map((id) => {
                const active = id === activeTheme
                return (
                    <a
                        key={id}
                        href={getExamplesHref(id, exampleId)}
                        aria-current={active ? "page" : undefined}
                        className={[
                            "rounded-full border px-2.5 py-1 font-mono text-[11px] no-underline transition",
                            active
                                ? "border-rpb-primary/50 bg-rpb-primary/20 text-rpb-text"
                                : "border-rpb-border bg-rpb-glass text-rpb-muted hover:border-rpb-primary/40 hover:text-rpb-text",
                        ].join(" ")}
                    >
                        {THEME_APP_LABELS[id]}
                    </a>
                )
            })}
        </nav>
    )
}

export default ThemeSwitcher
