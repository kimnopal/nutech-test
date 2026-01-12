import { Pool, QueryResult, QueryResultRow } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  database: process.env.DB_NAME || "sims_ppob",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export interface PreparedQuery {
  text: string;
  values?: unknown[];
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  queryConfig: PreparedQuery
): Promise<QueryResult<T>> {
  const client = await pool.connect();
  try {
    const result = await client.query<T>(queryConfig.text, queryConfig.values);
    return result;
  } finally {
    client.release();
  }
}

export async function getClient() {
  return pool.connect();
}

export async function testConnection(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query("SELECT NOW()");
    client.release();
    console.log("✓ Database connection established");
    return true;
  } catch (error) {
    console.error("✗ Database connection failed:", error);
    return false;
  }
}

export default pool;
