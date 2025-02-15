#  CF Workers + Hono + Drizzle + SQLite on Durable Objects  ⚡

A modern fully typed API built with Hono.js, using Drizzle ORM with SQLite on Durable Objects and Cloudflare Workers.

Unlock Zero-latency SQLite storage with Durable Object all around the world!

Learn more [here](https://blog.cloudflare.com/sqlite-in-durable-objects/)

## Features

- 🚀 [Hono](https://hono.dev/) - Lightweight, ultrafast web framework
- 🗄️ [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM with SQLite
- ⚡ [Cloudflare Workers](https://workers.cloudflare.com/) - Edge computing platform
- 🔄 Durable Objects for persistent storage
- ✨ TypeScript support
- 🔍 Request validation with Zod
- 📝 Built-in logging
- 🔒 CORS enabled

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [Bun](https://bun.sh/) package manager
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (Cloudflare Workers CLI)
- A Cloudflare account

## Local Development

1. Clone the repository:
```bash
git clone git@github.com:goldo/worker-hono-drizzle-durable-object-sqlite.git
cd worker-hono-drizzle-durable-object-sqlite
```

2. Install dependencies:
```bash
bun install
```

3. Generate database migrations:
```bash
bun run db:generate
```

4. Generate TypeScript types for Cloudflare Workers:
```bash
bun run types
```

5. Start the development server:
```bash
bun run dev
```

The API will be available at `http://127.0.0.1:8787`

## API Endpoints

### Users

- `GET /users` - Get all users
- `POST /users` - Create a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

## Project Structure

```
├── src/
│   ├── db/
│   │   └── schema.ts         # Database schema
│   ├── users/
│   │   ├── UsersDo.ts        # Users Durable Object
│   │   └── users-app.ts      # Users routes
│   ├── index.ts              # Main application
│   └── zod-validator-middleware.ts
├── drizzle/
│   └── migrations/           # Database migrations
├── wrangler.toml            # Cloudflare Workers config
└── package.json
```

## Deployment

1. Login to Cloudflare:
```bash
wrangler login
```

2. Deploy to Cloudflare Workers:
```bash
bun run deploy
```

## Environment Variables

No environment variables are required for basic setup. All configuration is handled through `wrangler.toml`.

## Development Notes

- The project uses SQLite through Durable Objects for persistence
- Migrations are automatically run when the Durable Object is instantiated
- Request validation is handled by Zod schemas
- CORS is enabled by default for all origins

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

