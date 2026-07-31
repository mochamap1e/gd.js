import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { client } from "@/panel/clients/eden";
import { Auth } from "@/panel/pages/Auth";
import { Dashboard } from "@/panel/pages/Dashboard";

export function App() {
    const [exists, setExists] = useState<boolean | null>(null);

    useEffect(() => {
        async function check() {
            try {
                const { data: exists } = await client.api.auth.doesAdminExist.post();
                setExists(exists ?? null);
            } catch(error) {
                console.error(error);
                setExists(null);
            }
        }

        check();
    }, []);

    if (exists === null) { return <h1>Loading...</h1> }
    if (exists) {
        return (
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/login" element={<Auth isRegister={false} isOnboarding={false}/>}/>
            </Routes>
        );
    } else {
        return (
            <Routes>
                <Route path="/" element={<Auth isRegister={true} isOnboarding={true}/>}/>
            </Routes>
        );
    }
}