import type { FC, ReactNode } from "react"
import {
    ChakraProvider,
    createSystem,
    defaultConfig,
} from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"

/**
 * preflight: false — same idea as Chakra v2 resetCSS={false}:
 * don't let Chakra's CSS reset restyle the home-lib shell.
 * Dark class keeps control tokens aligned with the page.
 */
const system = createSystem(defaultConfig, {
    preflight: false,
})

export const ThemeRoot: FC<{ children: ReactNode }> = ({ children }) => (
    <ChakraProvider value={system}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    </ChakraProvider>
)
