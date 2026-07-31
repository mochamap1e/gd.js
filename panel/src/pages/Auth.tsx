import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { client } from "@/panel/clients/eden";
import { adminExists } from "@/panel/utils/adminExists";

export function Auth({ isRegister, isOnboarding }: { isRegister: boolean, isOnboarding: boolean }) {
    const navigate = useNavigate();

    const [username, setUsername] = useState(isOnboarding ? "admin" : "");
    const [password, setPassword] = useState("");

    // Use this at some point idk
    const errorMsg = "Password must include one uppercase letter, lowercase letter, number, and special character.";

    async function auth() {
        try {
            const body = { username, password };

            const response = isRegister ?
                await client.api.auth.register.post(body) :
                await client.api.auth.login.post(body);

            if (!response.error) navigate("/dashboard");
        } catch(error) {
            console.error(error);
        }
    }

    async function check() {
        const exists = await adminExists();

        if (exists && isOnboarding)
            navigate("/login");
    }

    check();

    return (
        <div>
            <h1>{isOnboarding ? "Setup" : "Authentication"}</h1>
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
        </div>
    );
}