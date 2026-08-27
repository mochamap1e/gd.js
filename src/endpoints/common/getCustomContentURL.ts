import { Elysia } from "elysia";

import { getServerAddress } from "@/server/index";

const useCustomCdn = true;

export const getCustomContentURL = new Elysia()
    .post("/getCustomContentURL.php", (): string | number => {
        if (useCustomCdn) {
            return getServerAddress() + "/cdn";
        } else {
            return "https://geometrydashfiles.b-cdn.net";
        }
    });