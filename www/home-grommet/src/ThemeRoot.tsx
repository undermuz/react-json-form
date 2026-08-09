import type { FC, ReactNode } from "react"
import { Grommet } from "grommet"

/** Component theme only — page shell/background stays with home-lib. */
export const ThemeRoot: FC<{ children: ReactNode }> = ({ children }) => (
    <Grommet themeMode="dark">{children}</Grommet>
)
