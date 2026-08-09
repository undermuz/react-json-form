import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ExamplesPage from "./pages/ExamplesPage"

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/examples" element={<Navigate to="/examples/login" replace />} />
            <Route path="/examples/:exampleId" element={<ExamplesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default App
