import type { Database, SqlJsStatic } from "sql.js";
import type { QueryOutput, QueryResult, Row, TabelaSchema } from "./types";

let SQL: SqlJsStatic | null = null;

async function getSqlJs(): Promise<SqlJsStatic> {
  if (SQL) return SQL;
  const initSqlJs = (await import("sql.js")).default;
  SQL = await initSqlJs({ locateFile: () => "/sql-wasm.wasm" });
  return SQL;
}

const FORBIDDEN_KEYWORDS = [
  "INSERT", "UPDATE", "DELETE", "DROP", "CREATE", "ALTER",
  "TRUNCATE", "REPLACE", "ATTACH", "DETACH", "PRAGMA", "VACUUM", "REINDEX",
];

function stripStringsAndComments(sql: string): string {
  return sql
    .replace(/--[^\n]*/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/'[^']*'/g, "''")
    .replace(/"[^"]*"/g, '""');
}

function validateQuery(query: string): string | null {
  const cleaned = stripStringsAndComments(query).toUpperCase();

  // Bloqueia múltiplas statements separadas por ;
  const statements = cleaned.split(";").map((s) => s.trim()).filter(Boolean);
  if (statements.length > 1) {
    return "Apenas uma consulta por vez é permitida.";
  }

  // Bloqueia qualquer keyword destrutiva em qualquer posição
  for (const kw of FORBIDDEN_KEYWORDS) {
    const re = new RegExp(`\\b${kw}\\b`);
    if (re.test(cleaned)) {
      return `Operações de ${kw.toLowerCase()} não são permitidas.`;
    }
  }

  // Exige que comece com SELECT ou WITH (CTEs)
  if (!/^\s*(SELECT|WITH)\b/.test(cleaned)) {
    return "A consulta deve começar com SELECT ou WITH.";
  }

  return null;
}

export async function executeQuery(
  schemaTables: TabelaSchema[],
  userQuery: string
): Promise<QueryOutput> {
  const validationError = validateQuery(userQuery);
  if (validationError) {
    return { ok: false, error: validationError };
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
        row[col] = val === null || val === undefined ? null : (val as string | number);
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

function normalizeValue(v: unknown): string {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "number") {
    // Normaliza decimais (1.5 === 1.50)
    return Number.isInteger(v) ? String(v) : v.toString();
  }
  return String(v);
}

/**
 * Compara resultado do usuário com o esperado.
 *
 * Regras:
 * - Número de linhas e colunas devem bater
 * - Nomes das colunas: comparados como conjunto (ordem não importa, evita falso negativo)
 * - Valores: comparados linha-a-linha, na ordem em que o usuário retornou
 *   (se o exercício exige ORDER BY, o gabarito já vem ordenado)
 */
export function resultsMatch(userResult: QueryResult, expected: Row[]): boolean {
  if (userResult.rows.length !== expected.length) return false;
  if (expected.length === 0) return true;

  const expectedCols = Object.keys(expected[0]);
  const userColsSet = new Set(userResult.columns);

  if (expectedCols.length !== userResult.columns.length) return false;
  for (const col of expectedCols) {
    if (!userColsSet.has(col)) return false;
  }

  for (let i = 0; i < expected.length; i++) {
    const expRow = expected[i];
    const userRow = userResult.rows[i];
    for (const col of expectedCols) {
      if (normalizeValue(expRow[col]) !== normalizeValue(userRow[col])) {
        return false;
      }
    }
  }
  return true;
}
