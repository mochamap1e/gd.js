import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
    const navigate = useNavigate();
    const [cookie] = useCookies(["auth"]);

    useEffect(() => { if (!cookie.auth) navigate("/login"); }, []);

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}