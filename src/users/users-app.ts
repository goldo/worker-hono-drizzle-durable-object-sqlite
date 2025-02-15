import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "../zod-validator-middleware";

export const usersApp = new Hono<{ Bindings: Env }>();

const ID_USERS = "users";

usersApp.get("/", async (c) => {
  const id = c.env.USERS.idFromName(ID_USERS);
  const stub = c.env.USERS.get(id);
  const users = await stub.getAll();
  return c.json({ success: true, data: users });
});

const createUserSchema = z
  .object({
    email: z.string(),
    password: z.string(),
  })
  .strict();

usersApp.post("/", zValidator("json", createUserSchema), async (c) => {
  const id = c.env.USERS.idFromName(ID_USERS);
  const stub = c.env.USERS.get(id);
  const { email, password } = c.req.valid("json");
  const result = await stub.insert({ email, password });
  return c.json({ success: true, data: result });
});
