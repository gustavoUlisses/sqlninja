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
    return Number.isInteger(v) ? String(v) : v.toString();
  }
  return String(v).trim();
}

const ROW_SEP = ""; // unit separator — não aparece em SQL legítimo

function rowKey(row: Row, cols: string[]): string {
  return cols.map((c) => normalizeValue(row[c])).join(ROW_SEP);
}

function rowToString(row: Row, cols: string[]): string {
  return cols.map((c) => `${c}=${normalizeValue(row[c])}`).join(", ");
}

export interface MatchResult {
  ok: boolean;
  reason?: string;
}

/**
 * Compara resultado do usuário com o esperado.
 *
 * - Nomes das colunas são comparados como conjunto (ordem da SELECT não importa).
 * - Quando `ordemImporta = false` (default), linhas são comparadas como multiset
 *   — o usuário pode ordenar do jeito que preferir.
 * - Quando `ordemImporta = true`, linhas precisam aparecer na mesma ordem do gabarito.
 */
export function resultsMatch(
  userResult: QueryResult,
  expected: Row[],
  ordemImporta = false
): MatchResult {
  // Quantidade de linhas
  if (userResult.rows.length !== expected.length) {
    return {
      ok: false,
      reason: `Esperava ${expected.length} linha(s), você retornou ${userResult.rows.length}.`,
    };
  }
  if (expected.length === 0) return { ok: true };

  // Colunas
  const expectedCols = Object.keys(expected[0]);
  const userColsSet = new Set(userResult.columns);

  if (expectedCols.length !== userResult.columns.length) {
    return {
      ok: false,
      reason: `Esperava ${expectedCols.length} coluna(s): ${expectedCols.join(", ")}. Você retornou ${userResult.columns.length}: ${userResult.columns.join(", ")}.`,
    };
  }
  for (const col of expectedCols) {
    if (!userColsSet.has(col)) {
      return {
        ok: false,
        reason: `Coluna "${col}" está faltando. Verifique se usou o nome correto (ou retire o ALIAS).`,
      };
    }
  }

  // Ordem importa: comparação linha-a-linha
  if (ordemImporta) {
    for (let i = 0; i < expected.length; i++) {
      for (const col of expectedCols) {
        const exp = normalizeValue(expected[i][col]);
        const usr = normalizeValue(userResult.rows[i][col]);
        if (exp !== usr) {
          return {
            ok: false,
            reason: `Linha ${i + 1} difere em "${col}": esperado "${exp}", obtido "${usr}". Verifique a ordenação.`,
          };
        }
      }
    }
    return { ok: true };
  }

  // Multiset: linhas precisam coincidir, ordem livre
  const expectedCounts = new Map<string, number>();
  const expectedSamples = new Map<string, Row>();
  for (const row of expected) {
    const k = rowKey(row, expectedCols);
    expectedCounts.set(k, (expectedCounts.get(k) ?? 0) + 1);
    if (!expectedSamples.has(k)) expectedSamples.set(k, row);
  }
  const userCounts = new Map<string, number>();
  for (const row of userResult.rows) {
    const k = rowKey(row, expectedCols);
    userCounts.set(k, (userCounts.get(k) ?? 0) + 1);
  }

  for (const [k, exp] of expectedCounts) {
    const usr = userCounts.get(k) ?? 0;
    if (exp !== usr) {
      const sample = expectedSamples.get(k)!;
      const repr = rowToString(sample, expectedCols);
      if (usr === 0) {
        return {
          ok: false,
          reason: `Falta a linha: { ${repr} }.`,
        };
      }
      return {
        ok: false,
        reason: `Multiplicidade errada para { ${repr} } (esperado ${exp}, obtido ${usr}).`,
      };
    }
  }

  // Verificar se user tem linhas extras (de chave não presente em expected)
  for (const [k] of userCounts) {
    if (!expectedCounts.has(k)) {
      // Reconstituir uma linha de exemplo do usuário
      const userRow = userResult.rows.find((r) => rowKey(r, expectedCols) === k)!;
      const repr = rowToString(userRow, expectedCols);
      return {
        ok: false,
        reason: `Linha extra que não deveria estar no resultado: { ${repr} }.`,
      };
    }
  }

  return { ok: true };
}
