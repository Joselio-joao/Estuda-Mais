/** Applies versioned database migrations through the API's TLS-aware MySQL connection. */
import { migrate } from "drizzle-orm/mysql2/migrator";
import { getDb } from "../db";

export async function runDatabaseMigrations() {
  const db = await getDb();
  if (!db) throw new Error("DATABASE_URL is required to run database migrations.");
  await migrate(db, { migrationsFolder: "./drizzle" });
}
