/** Applies versioned MySQL migrations using the same TLS-aware connection as the production API. */
import { runDatabaseMigrations } from "../server/_core/migrate";

await runDatabaseMigrations();
console.log("Database migrations completed successfully.");
