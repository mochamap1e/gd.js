async function build(target: Bun.Build.CompileTarget) {
    console.log("Building for", target);

    await Bun.build({
        entrypoints: ["./src/index.ts"],
        compile: {
            outfile: `./dist/gdps-${target.replace("bun-", "")}`,
            target,
            assets: ["./drizzle"],
            ...(target.includes("windows") && {
                windows: {
                    icon: "./assets/icon.ico",
                },
            })
        }
    });
}

// windows
await build("bun-windows-x64");
await build("bun-windows-arm64");

// linux
await build("bun-linux-x64");
await build("bun-linux-x64-musl");
await build("bun-linux-arm64");
await build("bun-linux-arm64-musl");

// mac for some reason
await build("bun-darwin-x64");
await build("bun-darwin-arm64");

console.log("\u{2713} Done building.");