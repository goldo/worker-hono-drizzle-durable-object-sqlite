/// <reference types="@cloudflare/workers-types" />
import { DurableObject } from "cloudflare:workers";
import { getTableColumns } from "drizzle-orm";
import { drizzle, DrizzleSqliteDODatabase } from "drizzle-orm/durable-sqlite";
import { migrate } from "drizzle-orm/durable-sqlite/migrator";
import { nanoid } from "nanoid";
import { usersTable } from "src/db/schema";

// @ts-ignore
import migrations from "drizzle/migrations/migrations";

export class UsersDo extends DurableObject {
  storage: DurableObjectStorage;
  db: DrizzleSqliteDODatabase<any>;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.storage = ctx.storage;
    this.db = drizzle(this.storage, {
      logger: false,
    });
    // Make sure all migrations complete before accepting queries.
    // Otherwise you will need to run `this.migrate()` in any function
    // that accesses the Drizzle database `this.db`.
    ctx.blockConcurrencyWhile(async () => {
      await this._migrate();
    });
  }

  async insertAndGetAll(
    user: Pick<typeof usersTable.$inferInsert, "email" | "password">
  ) {
    await this.insert(user);
    return this.getAll();
  }
  async insert(
    user: Pick<typeof usersTable.$inferInsert, "email" | "password">
  ) {
    const { password, ...fields } = getTableColumns(usersTable);

    const inserted = await this.db
      .insert(usersTable)
      .values({ ...user, id: this._getGeneratedId() })
      .returning(fields);

    return inserted[0];
  }
  async getAll() {
    const { password, ...fields } = getTableColumns(usersTable);
    return this.db.select(fields).from(usersTable);
  }

  async _migrate() {
    console.log(`Migrating to version ${migrations?.journal?.version}`);
    migrate(this.db, migrations);
    console.log("Migration completed");
  }

  _getGeneratedId() {
    return nanoid(6);
  }
}
