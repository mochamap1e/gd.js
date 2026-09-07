import { Elysia } from "elysia";

export const getInfo = new Elysia()
    .get("/getInfo.php", () => {
        // todo: add a way of configuring this
        return {
            motd: "Your GDPS name",
            version: 1,
            icon: "https://raw.githubusercontent.com/Kingminer7/gdps-switcher/refs/heads/main/resources/gdlogo.png"
        };
    });