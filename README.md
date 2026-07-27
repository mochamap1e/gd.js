# gd.js

A Geometry Dash 2.2 private server made in TypeScript.

The server uses the Elysia framework with PostgreSQL and Drizzle ORM for the database.

### Generating certificates:
```
mkcert --cert-file certs/cert.pem --key-file certs/key.pem localhost 127.0.0.1 ::1
```