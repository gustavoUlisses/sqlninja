/**
 * Dicionário de documentação para tokens SQL.
 * Cada entry tem: descrição, exemplo de uso e categoria visual.
 */

export type TokenCategory = "clause" | "function" | "operator" | "punct" | "value";

export interface SqlDoc {
  title: string;
  description: string;
  example?: string;
  category: TokenCategory;
}

export const SQL_DOCS: Record<string, SqlDoc> = {
  // ===== CLÁUSULAS =====
  SELECT: {
    title: "SELECT",
    description: "Define quais colunas serão retornadas pela consulta.",
    example: "SELECT nome, preco FROM produtos",
    category: "clause",
  },
  "SELECT DISTINCT": {
    title: "SELECT DISTINCT",
    description: "Retorna apenas valores únicos, eliminando duplicatas.",
    example: "SELECT DISTINCT categoria FROM produtos",
    category: "clause",
  },
  DISTINCT: {
    title: "DISTINCT",
    description: "Elimina linhas duplicadas do resultado.",
    example: "SELECT DISTINCT categoria FROM produtos",
    category: "clause",
  },
  FROM: {
    title: "FROM",
    description: "Indica a tabela (ou tabelas) de onde os dados serão lidos.",
    example: "SELECT * FROM produtos",
    category: "clause",
  },
  WHERE: {
    title: "WHERE",
    description: "Filtra as linhas que atendem a uma condição.",
    example: "SELECT * FROM produtos WHERE preco > 1000",
    category: "clause",
  },
  "GROUP BY": {
    title: "GROUP BY",
    description: "Agrupa linhas com mesmo valor para usar com funções de agregação.",
    example: "SELECT categoria, COUNT(*) FROM produtos GROUP BY categoria",
    category: "clause",
  },
  HAVING: {
    title: "HAVING",
    description: "Filtra grupos criados por GROUP BY (como WHERE, mas para agregações).",
    example: "GROUP BY categoria HAVING COUNT(*) > 5",
    category: "clause",
  },
  "ORDER BY": {
    title: "ORDER BY",
    description: "Ordena os resultados por uma ou mais colunas. Use ASC (crescente) ou DESC (decrescente).",
    example: "SELECT * FROM produtos ORDER BY preco DESC",
    category: "clause",
  },
  LIMIT: {
    title: "LIMIT",
    description: "Limita o número de linhas retornadas.",
    example: "SELECT * FROM produtos LIMIT 10",
    category: "clause",
  },
  JOIN: {
    title: "JOIN",
    description: "Combina linhas de duas tabelas com base em uma relação. Sinônimo de INNER JOIN.",
    example: "FROM pedidos JOIN clientes ON pedidos.cliente_id = clientes.id",
    category: "clause",
  },
  "INNER JOIN": {
    title: "INNER JOIN",
    description: "Retorna apenas linhas que têm correspondência nas duas tabelas.",
    example: "FROM a INNER JOIN b ON a.id = b.a_id",
    category: "clause",
  },
  "LEFT JOIN": {
    title: "LEFT JOIN",
    description: "Retorna todas as linhas da tabela esquerda, mesmo sem correspondência na direita.",
    example: "FROM clientes LEFT JOIN pedidos ON clientes.id = pedidos.cliente_id",
    category: "clause",
  },
  "RIGHT JOIN": {
    title: "RIGHT JOIN",
    description: "Retorna todas as linhas da tabela direita, mesmo sem correspondência na esquerda.",
    example: "FROM a RIGHT JOIN b ON a.id = b.a_id",
    category: "clause",
  },
  ON: {
    title: "ON",
    description: "Define a condição de junção entre tabelas (usado com JOIN).",
    example: "JOIN pedidos ON clientes.id = pedidos.cliente_id",
    category: "clause",
  },
  AS: {
    title: "AS",
    description: "Cria um alias (apelido) para coluna ou tabela.",
    example: "SELECT nome AS produto FROM produtos",
    category: "clause",
  },
  WITH: {
    title: "WITH",
    description: "Define uma CTE (Common Table Expression) — uma sub-consulta temporária nomeada.",
    example: "WITH vendas AS (SELECT ...) SELECT * FROM vendas",
    category: "clause",
  },
  UNION: {
    title: "UNION",
    description: "Combina resultados de duas consultas, removendo duplicatas.",
    example: "SELECT nome FROM a UNION SELECT nome FROM b",
    category: "clause",
  },
  "UNION ALL": {
    title: "UNION ALL",
    description: "Combina resultados de duas consultas mantendo duplicatas.",
    example: "SELECT id FROM a UNION ALL SELECT id FROM b",
    category: "clause",
  },
  CASE: {
    title: "CASE",
    description: "Estrutura condicional dentro de uma query (similar a if/else).",
    example: "CASE WHEN preco > 100 THEN 'caro' ELSE 'barato' END",
    category: "clause",
  },
  WHEN: {
    title: "WHEN",
    description: "Define uma condição dentro de CASE.",
    example: "CASE WHEN preco > 100 THEN 'caro' END",
    category: "clause",
  },
  THEN: {
    title: "THEN",
    description: "Valor retornado quando a condição do WHEN é verdadeira.",
    example: "WHEN status = 'pago' THEN 1",
    category: "clause",
  },
  ELSE: {
    title: "ELSE",
    description: "Valor retornado quando nenhuma condição do CASE foi atendida.",
    example: "CASE WHEN ... ELSE 'default' END",
    category: "clause",
  },
  END: {
    title: "END",
    description: "Encerra uma estrutura CASE.",
    example: "CASE WHEN ... THEN ... END",
    category: "clause",
  },

  // ===== FUNÇÕES =====
  "COUNT(*)": {
    title: "COUNT(*)",
    description: "Conta o número total de linhas (incluindo NULL).",
    example: "SELECT COUNT(*) FROM pedidos",
    category: "function",
  },
  "COUNT(DISTINCT )": {
    title: "COUNT(DISTINCT coluna)",
    description: "Conta valores únicos de uma coluna.",
    example: "SELECT COUNT(DISTINCT cliente_id) FROM pedidos",
    category: "function",
  },
  "SUM()": {
    title: "SUM(coluna)",
    description: "Soma os valores numéricos de uma coluna.",
    example: "SELECT SUM(valor) FROM pedidos",
    category: "function",
  },
  "AVG()": {
    title: "AVG(coluna)",
    description: "Calcula a média aritmética dos valores.",
    example: "SELECT AVG(preco) FROM produtos",
    category: "function",
  },
  "MAX()": {
    title: "MAX(coluna)",
    description: "Retorna o maior valor da coluna.",
    example: "SELECT MAX(preco) FROM produtos",
    category: "function",
  },
  "MIN()": {
    title: "MIN(coluna)",
    description: "Retorna o menor valor da coluna.",
    example: "SELECT MIN(preco) FROM produtos",
    category: "function",
  },
  "ROUND()": {
    title: "ROUND(valor, casas)",
    description: "Arredonda um número para o número de casas decimais especificado.",
    example: "SELECT ROUND(preco, 2) FROM produtos",
    category: "function",
  },
  "COALESCE()": {
    title: "COALESCE(a, b, ...)",
    description: "Retorna o primeiro valor não-NULL da lista.",
    example: "SELECT COALESCE(apelido, nome) FROM clientes",
    category: "function",
  },
  "UPPER()": {
    title: "UPPER(texto)",
    description: "Converte texto para maiúsculas.",
    example: "SELECT UPPER(nome) FROM produtos",
    category: "function",
  },
  "LOWER()": {
    title: "LOWER(texto)",
    description: "Converte texto para minúsculas.",
    example: "SELECT LOWER(email) FROM clientes",
    category: "function",
  },
  "LENGTH()": {
    title: "LENGTH(texto)",
    description: "Retorna o número de caracteres de uma string.",
    example: "SELECT nome, LENGTH(nome) FROM produtos",
    category: "function",
  },
  "SUBSTR()": {
    title: "SUBSTR(texto, início, tamanho)",
    description: "Extrai parte de uma string.",
    example: "SELECT SUBSTR(nome, 1, 5) FROM produtos",
    category: "function",
  },
  "DATE()": {
    title: "DATE(valor)",
    description: "Extrai a parte de data de um timestamp.",
    example: "SELECT DATE(criado_em) FROM pedidos",
    category: "function",
  },
  "STRFTIME()": {
    title: "STRFTIME(formato, data)",
    description: "Formata uma data segundo o padrão especificado (SQLite).",
    example: "STRFTIME('%Y-%m', data_pedido)",
    category: "function",
  },
  "ROW_NUMBER()": {
    title: "ROW_NUMBER() OVER (...)",
    description: "Window function: número sequencial da linha dentro da partição.",
    example: "ROW_NUMBER() OVER (PARTITION BY categoria ORDER BY preco)",
    category: "function",
  },
  "RANK()": {
    title: "RANK() OVER (...)",
    description: "Window function: ranking com gaps quando há empate.",
    example: "RANK() OVER (ORDER BY preco DESC)",
    category: "function",
  },
  "DENSE_RANK()": {
    title: "DENSE_RANK() OVER (...)",
    description: "Window function: ranking sem gaps quando há empate.",
    example: "DENSE_RANK() OVER (ORDER BY vendas DESC)",
    category: "function",
  },
  "LAG()": {
    title: "LAG(coluna) OVER (...)",
    description: "Window function: valor da linha anterior.",
    example: "LAG(preco) OVER (ORDER BY data)",
    category: "function",
  },
  "LEAD()": {
    title: "LEAD(coluna) OVER (...)",
    description: "Window function: valor da próxima linha.",
    example: "LEAD(preco) OVER (ORDER BY data)",
    category: "function",
  },

  // ===== OPERADORES =====
  "=": {
    title: "= (igual)",
    description: "Compara igualdade entre dois valores.",
    example: "WHERE categoria = 'Smartphones'",
    category: "operator",
  },
  "!=": {
    title: "!= (diferente)",
    description: "Verifica se dois valores são diferentes.",
    example: "WHERE status != 'cancelado'",
    category: "operator",
  },
  "<>": {
    title: "<> (diferente)",
    description: "Sinônimo de !=. Verifica se dois valores são diferentes.",
    example: "WHERE preco <> 0",
    category: "operator",
  },
  ">": {
    title: "> (maior que)",
    description: "Verdadeiro quando o valor à esquerda é maior que o à direita.",
    example: "WHERE preco > 1000",
    category: "operator",
  },
  "<": {
    title: "< (menor que)",
    description: "Verdadeiro quando o valor à esquerda é menor que o à direita.",
    example: "WHERE estoque < 10",
    category: "operator",
  },
  ">=": {
    title: ">= (maior ou igual)",
    description: "Verdadeiro quando o valor à esquerda é maior ou igual ao da direita.",
    example: "WHERE preco >= 5000",
    category: "operator",
  },
  "<=": {
    title: "<= (menor ou igual)",
    description: "Verdadeiro quando o valor à esquerda é menor ou igual ao da direita.",
    example: "WHERE estoque <= 30",
    category: "operator",
  },
  AND: {
    title: "AND",
    description: "Combina condições — todas precisam ser verdadeiras.",
    example: "WHERE preco > 100 AND estoque > 0",
    category: "operator",
  },
  OR: {
    title: "OR",
    description: "Combina condições — pelo menos uma precisa ser verdadeira.",
    example: "WHERE categoria = 'A' OR categoria = 'B'",
    category: "operator",
  },
  NOT: {
    title: "NOT",
    description: "Inverte uma condição (verdadeiro vira falso).",
    example: "WHERE NOT status = 'ativo'",
    category: "operator",
  },
  LIKE: {
    title: "LIKE",
    description: "Compara strings com padrões. Use % para qualquer sequência e _ para um único caractere.",
    example: "WHERE nome LIKE 'iPhone%'",
    category: "operator",
  },
  "NOT LIKE": {
    title: "NOT LIKE",
    description: "Oposto de LIKE: retorna linhas que NÃO casam com o padrão.",
    example: "WHERE email NOT LIKE '%@spam.com'",
    category: "operator",
  },
  IN: {
    title: "IN",
    description: "Verifica se o valor está em uma lista de opções.",
    example: "WHERE categoria IN ('A', 'B', 'C')",
    category: "operator",
  },
  "NOT IN": {
    title: "NOT IN",
    description: "Verifica se o valor NÃO está na lista de opções.",
    example: "WHERE status NOT IN ('cancelado', 'pendente')",
    category: "operator",
  },
  BETWEEN: {
    title: "BETWEEN",
    description: "Verifica se o valor está dentro de um intervalo (inclusivo). Use com AND.",
    example: "WHERE preco BETWEEN 100 AND 500",
    category: "operator",
  },
  "IS NULL": {
    title: "IS NULL",
    description: "Verifica se o valor é NULL (vazio/ausente).",
    example: "WHERE email IS NULL",
    category: "operator",
  },
  "IS NOT NULL": {
    title: "IS NOT NULL",
    description: "Verifica se o valor NÃO é NULL.",
    example: "WHERE telefone IS NOT NULL",
    category: "operator",
  },
  EXISTS: {
    title: "EXISTS",
    description: "Verifica se uma sub-consulta retorna ao menos uma linha.",
    example: "WHERE EXISTS (SELECT 1 FROM pedidos WHERE ...)",
    category: "operator",
  },
  ASC: {
    title: "ASC (crescente)",
    description: "Ordena do menor para o maior (padrão do ORDER BY).",
    example: "ORDER BY preco ASC",
    category: "operator",
  },
  DESC: {
    title: "DESC (decrescente)",
    description: "Ordena do maior para o menor.",
    example: "ORDER BY preco DESC",
    category: "operator",
  },
  "PARTITION BY": {
    title: "PARTITION BY",
    description: "Divide o resultado em grupos para uma window function.",
    example: "ROW_NUMBER() OVER (PARTITION BY categoria ORDER BY preco)",
    category: "function",
  },
  "OVER()": {
    title: "OVER (...)",
    description: "Define a janela (partição e ordem) para uma window function.",
    example: "SUM(valor) OVER (PARTITION BY cliente_id)",
    category: "function",
  },

  // ===== PONTUAÇÃO =====
  "*": {
    title: "*",
    description: "Asterisco — seleciona TODAS as colunas da tabela.",
    example: "SELECT * FROM produtos",
    category: "punct",
  },
  "(": {
    title: "( — abre parênteses",
    description: "Inicia agrupamento de expressões ou lista de argumentos.",
    category: "punct",
  },
  ")": {
    title: ") — fecha parênteses",
    description: "Encerra agrupamento de expressões ou lista de argumentos.",
    category: "punct",
  },
  ",": {
    title: ", — vírgula",
    description: "Separa elementos de uma lista (colunas, valores, argumentos).",
    example: "SELECT id, nome, preco FROM produtos",
    category: "punct",
  },
};

export function getDoc(token: string): SqlDoc | undefined {
  return SQL_DOCS[token];
}
