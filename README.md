# gd.js

A Geometry Dash private server written in TypeScript, supporting the latest version of the game (2.2091).

## Usage
Go to [releases](https://github.com/mochamap1e/gd.js/releases/latest) and download the latest version for your server's platform.

Run the program once, then `server.conf` will be created. Configure the server in this file, rerun the program, and you will be up and running!

## Building
Install [Bun](https://bun.com/get) on your machine, then run these commands:

Install dependencies:
```
bun ci
```

Build for all platforms:
```
bun run build
```
The compiled programs will be in the `dist` folder.