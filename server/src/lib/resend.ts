import { Resend } from "resend";

import { config } from "@server/lib/config";

const resend = new Resend(config.get("resend_key"));

export async function sendVerificationEmail(to: string, username: string, link: string) {
    return await resend.emails.send({
        from: config.get("resend_email"),
        to,
        template: {
            id: config.get("verification_email_template"),
            variables: {
                GDPS_NAME: config.get("gdps_name"),
                USERNAME: username,
                LINK: link
            }
        }
    });
}