import { useNavigate } from "react-router-dom";

import { adminExists } from "@/panel/utils/adminExists";

export function Home() {
    const navigate = useNavigate();

    async function check() {
        const exists = await adminExists();

        exists ? navigate("/login") : navigate("/onboarding");
    }

    check();

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}