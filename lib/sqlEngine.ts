import type { Database, SqlJsStatic } from "sql.js";
import type { QueryOutput, QueryResult, Row, TabelaSchema } from "./types";

let SQL: SqlJsStatic | null = null;

async function getSqlJs(): Promise<SqlJsStatic> {
  if (SQL) return SQL;
  const initSqlJs = (await import("sql.js")).default;
  SQL = await initSqlJs({ locateFile: () => "/sql-wasm.wasm" });
  return SQL;
}

function isReadOnly(query: string): boolean {
  const normalized = query.trim().toUpperCase();
  const forbidden = /^\s*(INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|REPLACE|ATTACH|DETACH|PRAGMA)/;
  return !forbidden.test(normalized);
}

export async function executeQuery(
  schemaTables: TabelaSchema[],
  userQuery: string
): Promise<QueryOutput> {
  if (!isReadOnly(userQuery)) {
    return { ok: false, error: "Apenas consultas SELECT são permitidas." };
  }

  let db: Database | null = null;
  try {
    const sqlJs = await getSqlJs();
    db = new sqlJs.Database();

    for (const table of schemaTables) {
      db.run(table.seed);
    }

    const result = db.exec(userQuery.trim());

    if (result.length === 0) {
      return { ok: true, result: { columns: [], rows: [] } };
    }

    const { columns, values } = result[0];
    const rows: Row[] = values.map((rowArr) => {
      const row: Row = {};
      columns.forEach((col, i) => {
        const val = rowArr[i];
        row[col] = val === null || val === undefined ? null : val as string | number;
      });
      return row;
    });

    return { ok: true, result: { columns, rows } };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, error: msg };
  } finally {
    db?.close();
  }
}

export function resultsMatch(
  userResult: QueryResult,
  expected: Row[]
): boolean {
  if (userResult.rows.length !== expected.length) return false;
  if (expected.length === 0) return true;

  const expectedCols = Object.keys(expected[0]).sort();
  const userCols = [...userResult.columns].sort();
  if (expectedCols.join(",") !== userCols.join(",")) return false;

  for (let i = 0; i < expected.length; i++) {
    const expRow = expected[i];
    const userRow = userResult.rows[i];
    for (const col of expectedCols) {
      const exp = expRow[col];
      const usr = userRow[col];
      if (String(exp) !== String(usr)) return false;
    }
  }
  return true;
}
