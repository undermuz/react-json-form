import type { FC, ReactNode } from "react"
import { CustomProvider } from "rsuite"

export const ThemeRoot: FC<{ children: ReactNode }> = ({ children }) => (
    <CustomProvider theme="dark">{children}</CustomProvider>
)
