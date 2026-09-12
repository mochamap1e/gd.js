import fs from "fs";
import conf from "conf";

const configExisted = fs.existsSync("./config.conf");

export const config = new conf({
    cwd: "./",
    fileExtension: "conf",
    defaults: {
        host: "0.0.0.0",
        server_port: 3000,
        website_port: 4000,
        domain: "example.com",
        gdps_name: "Example GDPS",
        gdps_icon: "https://raw.githubusercontent.com/Kingminer7/gdps-switcher/refs/heads/main/resources/gdlogo.png",
        resend_email: "Example GDPS <email@yourgdps.com>",
        resend_key: "example_key",
        verification_email_template: "verification-template-id"
    }
});

if (!configExisted) {
    console.warn("It appears it is your first time starting the server. Please edit config.conf and reopen!");
    process.exit(0);
}