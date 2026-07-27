import crypto from "crypto";

export const secrets = {
    common: "Wmfd2893gb7",
    account: "Wmfv3899gc9",
    level: "Wmfv2898gc9",
    mod: "Wmfp3879gc3",
    admin: "Wmfx2878gb9"
}

export function generateGJP2(string: string) {
    return crypto.createHash("sha1").update(string += "mI29fmAnxgTs").digest("hex");
}