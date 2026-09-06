# gd.js

A Geometry Dash 2.2 private server made in TypeScript.

The server uses the [Elysia](https://elysiajs.com/) framework with PostgreSQL and Drizzle ORM for the database.
The panel uses the [Astro](https://astro.build/) framework with the [Tabler](https://tabler.io/) component library.

This project entirely relies on [boomlings.dev](https://boomlings.dev/) for documentation on the GD backend. All credit for reverse engineering goes to them.

### Generating certificates:
```
mkcert --cert-file certs/cert.pem --key-file certs/key.pem localhost 127.0.0.1 ::1
```
