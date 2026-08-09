import type { FC, ReactNode } from "react"
import { ChakraProvider } from "@chakra-ui/react"

/** Component theme only — page shell/background stays with home-lib. */
export const ThemeRoot: FC<{ children: ReactNode }> = ({ children }) => (
    <ChakraProvider resetCSS={false} disableGlobalStyle>
        {children}
    </ChakraProvider>
)
