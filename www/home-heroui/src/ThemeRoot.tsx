import { useEffect, type FC, type ReactNode } from "react"
import { HeroUIProvider } from "@heroui/react"

/** Provider + dark class so HeroUI tokens match the shell. */
export const ThemeRoot: FC<{ children: ReactNode }> = ({ children }) => {
    useEffect(() => {
        document.documentElement.classList.add("dark")
        return () => document.documentElement.classList.remove("dark")
    }, [])

    return <HeroUIProvider>{children}</HeroUIProvider>
}
