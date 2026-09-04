import { Routes, Route } from "react-router-dom";

import { Home } from "@panel/pages/Home";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes>
    );
}