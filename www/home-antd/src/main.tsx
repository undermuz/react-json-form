import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { HashRouter } from "react-router-dom"
import "./index.css"
import App from "./App.tsx"
import { ThemeRoot } from "./ThemeRoot.tsx"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <HashRouter>
            <ThemeRoot>
                <App />
            </ThemeRoot>
        </HashRouter>
    </StrictMode>
)
