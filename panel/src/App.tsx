import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/dashboard/Dashboard";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Auth isRegister={false} isOnboarding={false}/>}/>
            <Route path="/onboarding" element={<Auth isRegister={true} isOnboarding={true}/>}/>

            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    );
}