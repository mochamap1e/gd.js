import fs from "fs";
import Conf from "Conf";

const firstRun = !fs.existsSync("./server.conf");

export const config = new Conf({
    projectName: "GDPS",
    configName: "server",
    fileExtension: "conf",
    cwd: "./",
    defaults: {
        host: "0.0.0.0",
        port: 3000,
        db_name: "database.db"
    }
});

if (firstRun) {
    console.warn("It appears it is your first time running the server. Please edit server.conf and rerun!");
    console.log("");
    console.log("Press any key to exit...");

    process.stdin.resume();
    await new Promise(resolve => process.stdin.once("data", resolve));
    process.exit(0);
}