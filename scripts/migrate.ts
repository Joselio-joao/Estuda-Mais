/** Applies versioned MySQL migrations using the same TLS-aware connection as the production API. */
import { migrate } from "drizzle-orm/mysql2/migrator";
import { getDb } from "../server/db";

const db = await getDb();

if (!db) {
  throw new Error("DATABASE_URL is required to run database migrations.");
}

await migrate(db, { migrationsFolder: "./drizzle" });
console.log("Database migrations completed successfully.");
