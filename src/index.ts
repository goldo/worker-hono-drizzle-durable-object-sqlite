import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { usersApp } from "./users/users-app";

// Export the DO class so it can be used as a Durable Object.
export { UsersDo } from "./users/UsersDo";

export const app = new Hono<{ Bindings: Env }>();

app.use(cors());
app.use(logger());

app.get("/", (c) => c.json({ message: "Hello World! Try /users" }));
app.route("/users", usersApp);

export default app;
