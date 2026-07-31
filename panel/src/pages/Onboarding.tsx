import { AuthBox } from "@/panel/components/AuthBox";

export function Onboarding() {
    return (
        <div>
            <h1>Setup</h1>
            <AuthBox isRegister={true} isOnboarding={true}/>
        </div>
    );
}