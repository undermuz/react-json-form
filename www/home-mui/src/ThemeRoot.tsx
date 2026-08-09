import type { FC, ReactNode } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
})

/**
 * Dark palette keeps MUI controls aligned with the home-lib shell.
 * LocalizationProvider is required for DatePicker.
 */
export const ThemeRoot: FC<{ children: ReactNode }> = ({ children }) => (
    <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
        </LocalizationProvider>
    </ThemeProvider>
)
