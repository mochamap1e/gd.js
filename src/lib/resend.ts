import { Resend } from "resend";

import { config } from "@server/config";

const resend = config.get("require_account_activation") ?
    new Resend(config.get("resend_api_key")) :
    null;

export async function sendActivationEmail(to: string, username: string, link: string) {
    if (resend) {
        const { error } = await resend.emails.send({
            from: config.get("resend_email"),
            to,
            template: {
                id: config.get("resend_template_id"),
                variables: {
                    USERNAME: username,
                    LINK: link,
                    GDPS_NAME: config.get("gdps_name")
                }
            }
        });

        if (!error) {
            return true;
        } else {
            return false;
        }
    }
}