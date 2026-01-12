import fs from "fs";
import path from "path";
import { getClient } from "../config/database";
import dotenv from "dotenv";

dotenv.config();

const isFresh = process.argv.includes("--fresh");

async function runMigrations() {
  const client = await getClient();

  try {
    const migrationsDir = path.join(__dirname, "../../sql/migrations");

    if (isFresh) {
      console.log("🔄 Running FRESH migration (dropping all tables)...\n");

      const dropTablePath = path.join(migrationsDir, "delete_all_table.sql");
      if (fs.existsSync(dropTablePath)) {
        const dropSql = fs.readFileSync(dropTablePath, "utf-8");
        console.log("Executing: delete_all_table.sql");
        await client.query(dropSql);
        console.log("✓ All tables dropped\n");
      } else {
        console.log("⚠ delete_all_table.sql not found, skipping drop step\n");
      }
    } else {
      console.log("Running migrations...\n");
    }

    const files = fs
      .readdirSync(migrationsDir)
      .filter(
        (file) => file.endsWith(".sql") && file !== "delete_all_table.sql"
      )
      .sort();

    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, "utf-8");

      console.log(`Executing: ${file}`);
      await client.query(sql);
      console.log(`✓ ${file} completed\n`);
    }

    console.log("All migrations completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    client.release();
    process.exit(0);
  }
}

runMigrations();
