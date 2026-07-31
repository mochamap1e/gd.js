import { useState } from "react";

import { client } from "@/panel/clients/eden";

export function AuthBox({ isRegister, isOnboarding }: { isRegister?: boolean, isOnboarding?: boolean }) {
    const [username, setUsername] = useState(isOnboarding ? "admin" : "");
    const [password, setPassword] = useState("");

    // Use this at some point idk
    const errorMsg = "Password must include one uppercase letter, lowercase letter, number, and special character.";

    async function auth() {
        if (isOnboarding) {
            await client.api.auth.registerAdmin.post({ password });
            return;
        }

        if (isRegister) {
            await client.api.auth.register.post({ username, password });
            return;
        }

        // login
    }

    return (
        <div>
            <h1>{isRegister ? "Register" : "Login"}</h1>
            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isOnboarding}
            />
            <input
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={auth}>{isRegister ? "Register" : "Login"}</button>
        </div>
    );
}