/**
 * Inserção inteligente de fragmentos SQL no editor.
 * Aplica quebras de linha, indentação e vírgulas automáticas conforme o tipo do token.
 */

const NEWLINE_KEYWORDS = new Set([
  "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT",
  "JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN", "CROSS JOIN",
  "UNION", "UNION ALL", "WITH",
]);

const INDENT_KEYWORDS = new Set(["AND", "OR"]);

const OPERATORS = new Set([
  "=", "!=", "<>", ">", "<", ">=", "<=",
  "LIKE", "NOT LIKE", "IN", "NOT IN", "BETWEEN",
  "IS NULL", "IS NOT NULL", "IS", "EXISTS", "NOT EXISTS",
]);

const SUFFIX_KEYWORDS = new Set(["ASC", "DESC", "ON", "AS", "NOT"]);

const STANDALONE_PUNCT = new Set([",", ";", "(", ")"]);

function isStringLiteral(s: string): boolean {
  return /^['"].*['"]$/.test(s) || s.startsWith("'") || s.startsWith('"');
}

function isNumberLiteral(s: string): boolean {
  return /^-?\d+(\.\d+)?$/.test(s);
}

function isParenStart(s: string): boolean {
  return s.endsWith("(") && !s.endsWith(" (");
}

export function smartInsert(current: string, fragment: string): string {
  const raw = fragment.trim();
  if (!raw) return current;

  const trimmed = current.trimEnd();
  const isEmpty = trimmed === "";

  // ";" → append, evita duplicação
  if (raw === ";") {
    if (trimmed.endsWith(";")) return trimmed;
    return trimmed + ";";
  }

  // "(" → cola junto sem espaço extra antes
  if (raw === "(") {
    if (isEmpty) return "(";
    // Após função (terminada em "("), ou após espaço → só adiciona
    if (trimmed.endsWith("(")) return trimmed + "(";
    return trimmed + " (";
  }

  // ")" → cola direto, sem espaço antes
  if (raw === ")") {
    return trimmed + ")";
  }

  // "," → cola direto, com espaço depois
  if (raw === ",") {
    return trimmed + ", ";
  }

  // SELECT — sempre quebra linha (se já houver conteúdo) e dá espaço final
  if (raw === "SELECT" || raw === "SELECT DISTINCT") {
    if (isEmpty) return raw + " ";
    return trimmed + "\n" + raw + " ";
  }

  // DISTINCT solo — só inserir junto se já tem SELECT na última linha
  if (raw === "DISTINCT") {
    const lastLine = trimmed.split("\n").pop() ?? "";
    if (/^\s*SELECT\s*$/i.test(lastLine)) {
      return trimmed + " DISTINCT ";
    }
    return trimmed + " DISTINCT ";
  }

  // Cláusulas que iniciam nova linha
  if (NEWLINE_KEYWORDS.has(raw)) {
    if (isEmpty) return raw + " ";
    return trimmed + "\n" + raw + " ";
  }

  // AND / OR → nova linha + indent
  if (INDENT_KEYWORDS.has(raw)) {
    if (isEmpty) return raw + " ";
    return trimmed + "\n  " + raw + " ";
  }

  // Operadores → espaços de ambos os lados
  if (OPERATORS.has(raw)) {
    if (isEmpty) return raw + " ";
    return trimmed + " " + raw + " ";
  }

  // Sufixos (ASC, DESC, ON, AS, NOT) → espaço antes
  if (SUFFIX_KEYWORDS.has(raw)) {
    if (isEmpty) return raw + " ";
    return trimmed + " " + raw + " ";
  }

  // Caso geral: identificador, valor, função
  const lastLine = trimmed.split("\n").pop() ?? "";

  // Casos especiais onde NÃO estamos ainda numa "coluna do SELECT":
  //   1. linha = "SELECT" → primeira coluna a ser inserida
  //   2. linha = "SELECT DISTINCT" → primeira coluna após DISTINCT
  //   3. dentro de função: "COUNT(" ou "SUM( "
  const isAtSelectStart = /^\s*SELECT(\s+DISTINCT)?\s*$/i.test(lastLine);
  const insideOpenParen = /\([^)]*$/.test(trimmed); // ( aberto, sem ) correspondente até o fim

  // Estamos efetivamente no SELECT-list (já há ao menos uma coluna)?
  // Match: linha começa com SELECT e já contém pelo menos um identificador/expressão DEPOIS de DISTINCT
  const isInSelectList =
    !isAtSelectStart &&
    !insideOpenParen &&
    /^\s*SELECT(\s+DISTINCT)?\s+\S/i.test(lastLine) &&
    !/\b(FROM|WHERE|GROUP\s+BY|ORDER\s+BY|HAVING|LIMIT)\b/i.test(lastLine);

  const endsAfterIdentifier = /[\w)"']$/.test(trimmed);
  const endsAfterParen = trimmed.endsWith("(");
  const endsAfterComma = trimmed.endsWith(",");

  // Após "(" → sem espaço
  if (endsAfterParen) return trimmed + raw;

  // Após "," → cola com espaço único
  if (endsAfterComma) return trimmed + " " + raw + " ";

  // No SELECT-list, depois de identificador → vírgula
  if (isInSelectList && endsAfterIdentifier) {
    return trimmed + ", " + raw + " ";
  }

  // Caso default
  if (isEmpty) return raw + " ";
  return trimmed + " " + raw + " ";
}
