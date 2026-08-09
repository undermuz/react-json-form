import type { FC, ReactNode } from "react"
import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"

/** Dark scheme keeps Mantine controls aligned with the home-lib shell. */
export const ThemeRoot: FC<{ children: ReactNode }> = ({ children }) => (
    <MantineProvider forceColorScheme="dark">{children}</MantineProvider>
)
