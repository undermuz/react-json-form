import { Navigate, Route, Routes } from "react-router-dom"
import type { JsonFormUi } from "@undermuz/react-json-form"
import type { ThemeAppId } from "../siteUrls"
import ExamplesPage from "./ExamplesPage"
import type { Snippets } from "./snippets"

export type ExamplesAppProps = {
    ui: JsonFormUi
    snippets: Snippets
    homeHref: string
    themeId: ThemeAppId
    themeLabel?: string
}

export default function ExamplesApp({
    ui,
    snippets,
    homeHref,
    themeId,
    themeLabel,
}: ExamplesAppProps) {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
                path="/:exampleId"
                element={
                    <ExamplesPage
                        ui={ui}
                        snippets={snippets}
                        homeHref={homeHref}
                        themeId={themeId}
                        themeLabel={themeLabel ?? themeId}
                    />
                }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    )
}
