import type { NextApiRequest, NextApiResponse } from "next";
import duckdb from "duckdb";

const TASK_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY,
  title VARCHAR,
  description VARCHAR,
  status VARCHAR,
  assignee VARCHAR,
  due_date DATE
);

INSERT INTO tasks VALUES
  (1, 'Design UI', 'Create the user interface for the app', 'In Progress', 'Alice', '2025-07-15'),
  (2, 'Setup DB', 'Initialize DuckDB and schema', 'Done', 'Bob', '2025-07-10'),
  (3, 'Write Docs', 'Document the codebase', 'To Do', 'Charlie', '2025-07-20');
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { query } = req.body;

  // Create DuckDB in-memory database
  const db = new duckdb.Database(":memory:");
  const conn = db.connect();

  try {
    // Initialize schema and dummy data
    conn.run(TASK_SCHEMA_SQL);

    // Run user query and collect all results asynchronously
    const result: any[] = await new Promise((resolve, reject) => {
      conn.all(query, (err: Error | null, rows: any[]) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    const columns = result.length > 0 ? Object.keys(result[0]) : [];

    res.status(200).json({ columns, result });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  } finally {
    conn.close();
    db.close();
  }
}
