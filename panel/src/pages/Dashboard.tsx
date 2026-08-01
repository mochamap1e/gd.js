import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { client } from "@/panel/clients/eden";

export function Dashboard() {
    const navigate = useNavigate();
    const [cookie] = useCookies(["auth"]);

    useEffect(() => { if (!cookie.auth) navigate("/login"); }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={() => {
                client.api.music.create.post()
            }}>Test</button>
        </div>
    );
}