// https://wyliemaster.github.io/gddocs/#/endpoints

import fs from "fs";
import { Elysia, status } from "elysia";

const PORT = 4500;

new Elysia({
    serve: {
        tls: {
            cert: fs.readFileSync("cert.pem"),
            key: fs.readFileSync("key.pem")
        }
    }
})
    .post("*", ({ request, body }) => {
        const endpoint = new URL(request.url).pathname.replace("/", "");
        console.log("path:", endpoint, "Body:", body);

        switch (endpoint) {
            case "getGJDailyLevel.php": // Returns the index of the current daily level and the time left in seconds, separated by a pipe.
                return "1|1";
            default:
                break;
        }
    })
    .listen(PORT);

console.log("GD backend running on port", PORT);