import type { FC, ReactNode } from "react"
import { ConfigProvider, theme } from "antd"

/**
 * Dark algorithm keeps Ant Design controls aligned with the home-lib shell.
 * CSS-in-JS — no separate antd stylesheet import.
 */
export const ThemeRoot: FC<{ children: ReactNode }> = ({ children }) => (
    <ConfigProvider
        theme={{
            algorithm: theme.darkAlgorithm,
        }}
    >
        {children}
    </ConfigProvider>
)
