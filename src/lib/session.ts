import { REGISTER_SESSION_LENGTH } from "@server/constants";

export const registerSessions: RegisterSession[] = [];

export function deleteSession(token: string) {
    const index = registerSessions.findIndex(session => session.token === token);
    if (index !== -1) registerSessions.splice(index, 1);
}

setInterval(() => {
    const now = Date.now();

    for (let i = registerSessions.length - 1; i >= 0; i--) {
        if (now - registerSessions[i]!.timestamp >= REGISTER_SESSION_LENGTH) {
            registerSessions.splice(i, 1);
        }
    }
}, 10 * 1000); // 10 seconds