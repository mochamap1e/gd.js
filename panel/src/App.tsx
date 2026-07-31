import { Routes, Route } from "react-router-dom";

import { Onboarding } from "./pages/Onboarding";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Onboarding/>}/>
        </Routes>
    );
}