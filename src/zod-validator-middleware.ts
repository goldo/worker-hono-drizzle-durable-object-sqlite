import { zValidator as zv } from "@hono/zod-validator";
import type { ValidationTargets } from "hono";
import { ZodSchema } from "zod";
import { fromError } from "zod-validation-error";

export const zValidator = <
  T extends ZodSchema,
  Target extends keyof ValidationTargets,
>(
  target: Target,
  schema: T
) =>
  zv(target, schema, (result, c) => {
    if (!result.success) {
      const validationError = fromError(result.error);
      return c.json({ success: false, error: validationError.message }, 400);
    }
    return result.data;
  });
