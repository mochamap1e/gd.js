const expirationDelay = 12 * 60 * 60 * 1000; // 12 hours

export const registerSessions: RegisterSession[] = [];

export function deleteSession(token: string) {
    const index = registerSessions.findIndex(session => session.token === token);
    if (index !== -1) registerSessions.splice(index, 1);
}

setInterval(() => {
    const now = Date.now();

    for (let i = registerSessions.length - 1; i >= 0; i--) {
        if (now - registerSessions[i]!.timestamp >= expirationDelay) {
            registerSessions.splice(i, 1);
        }
    }
}, 10 * 1000); // 10 seconds