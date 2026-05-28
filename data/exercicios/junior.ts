import type { ExercicioRaw } from "@/lib/types";

/**
 * 50 exercícios do nível JÚNIOR.
 *
 * Currículo (10 blocos × 5 ex em média):
 *   01-05  SELECT básico, *, colunas, alias, DISTINCT
 *   06-10  WHERE numérico (=, >, <, >=, <=, !=, expressões)
 *   11-18  WHERE texto + LIKE (todas as variações + NOT LIKE)
 *   19-25  IN, NOT IN, BETWEEN, IS NULL/NOT NULL, COALESCE
 *   26-31  AND, OR, NOT, precedência com parênteses
 *   32-37  ORDER BY (ASC, DESC, múltiplas), LIMIT, OFFSET
 *   38-40  DISTINCT (uma coluna, várias, combinado com ORDER BY)
 *   41-45  AS aliases, expressões aritméticas (margem, desconto)
 *   46-48  Funções de texto (UPPER, LOWER, LENGTH, SUBSTR)
 *   49-50  Datas básicas com strftime
 *
 * Universo narrativo: Analista Júnior na DataCo (e-commerce).
 * Cada exercício é uma demanda de um stakeholder real (gestora,
 * marketing, logística, financeiro, BI, comercial).
 */
export const EXERCICIOS_JUNIOR: ExercicioRaw[] = [
  // ═══════════════════════════════════════════════════════════
  // BLOCO 1 — SELECT BÁSICO (jr-001 a jr-005)
  // ═══════════════════════════════════════════════════════════
  {
    id: "jr-001",
    nivel: "junior",
    numero: 1,
    titulo: "Bem-vindo à DataCo!",
    demanda:
      "Seu primeiro dia! A gestora Ana Beatriz quer ver TUDO que temos cadastrado. Liste todas as informações de todos os produtos.",
    dica: "Use SELECT * para trazer todas as colunas. O asterisco significa 'tudo'.",
    tabelas: ["produtos"],
    gabarito: "SELECT * FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM"],
  },
  {
    id: "jr-002",
    nivel: "junior",
    numero: 2,
    titulo: "Lista para o Marketing",
    demanda:
      "A equipe de marketing precisa apenas dos NOMES dos produtos para uma campanha de email. Traga só a coluna nome.",
    dica: "Em vez de SELECT *, especifique a coluna que você quer: SELECT nome FROM produtos",
    tabelas: ["produtos"],
    gabarito: "SELECT nome FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM"],
  },
  {
    id: "jr-003",
    nivel: "junior",
    numero: 3,
    titulo: "Catálogo Simplificado",
    demanda:
      "O time de BI quer um catálogo enxuto com nome, marca e preço de cada produto, nessa ordem.",
    dica: "Você pode listar várias colunas separadas por vírgula no SELECT.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, marca, preco FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM"],
  },
  {
    id: "jr-004",
    nivel: "junior",
    numero: 4,
    titulo: "Renomeando para o Relatório",
    demanda:
      "O CEO acha 'preco' técnico demais. Liste o nome e o preço, mas mostre a coluna preço como 'Valor (R$)'.",
    dica: "Use AS para criar um alias: SELECT preco AS 'Valor (R$)' FROM produtos",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco AS 'Valor (R$)' FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
  },
  {
    id: "jr-005",
    nivel: "junior",
    numero: 5,
    titulo: "Categorias Disponíveis",
    demanda:
      "Quantas categorias diferentes temos na loja? Liste cada categoria UMA ÚNICA VEZ.",
    dica: "Use DISTINCT antes da coluna para eliminar duplicatas.",
    tabelas: ["produtos"],
    gabarito: "SELECT DISTINCT categoria FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "DISTINCT"],
  },

  // ═══════════════════════════════════════════════════════════
  // BLOCO 2 — WHERE NUMÉRICO (jr-006 a jr-010)
  // ═══════════════════════════════════════════════════════════
  {
    id: "jr-006",
    nivel: "junior",
    numero: 6,
    titulo: "Produtos com 45 Unidades",
    demanda:
      "O setor de auditoria quer saber qual produto tem EXATAMENTE 45 unidades em estoque. Traga nome e estoque.",
    dica: "Use WHERE com o operador = para igualdade exata.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, estoque FROM produtos WHERE estoque = 45",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE"],
    operadores_disponiveis: ["=", ">", "<", ">=", "<=", "!="],
    valores_disponiveis: ["45"],
  },
  {
    id: "jr-007",
    nivel: "junior",
    numero: 7,
    titulo: "Produtos Premium",
    demanda:
      "O time comercial quer focar em produtos de alto ticket. Liste o nome e o preço de produtos com preço MAIOR QUE R$5.000.",
    dica: "Use WHERE preco > 5000. Para números, não precisa de aspas.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco FROM produtos WHERE preco > 5000",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE"],
    operadores_disponiveis: [">", "<", ">=", "<=", "=", "!="],
    valores_disponiveis: ["5000"],
  },
  {
    id: "jr-008",
    nivel: "junior",
    numero: 8,
    titulo: "Produtos Acessíveis",
    demanda:
      "Para uma campanha de Black Friday, liste nome e preço dos produtos com preço MENOR OU IGUAL a R$1.000.",
    dica: "O operador <= significa 'menor ou igual a'. Inclui o próprio valor.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco FROM produtos WHERE preco <= 1000",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE"],
    operadores_disponiveis: ["<=", "<", ">=", ">", "="],
    valores_disponiveis: ["1000"],
  },
  {
    id: "jr-009",
    nivel: "junior",
    numero: 9,
    titulo: "Estoque Saudável",
    demanda:
      "Liste o nome e o estoque dos produtos que NÃO TÊM exatamente 50 unidades em estoque (qualquer valor, menos 50).",
    dica: "Use o operador != (ou <>) para 'diferente de'.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, estoque FROM produtos WHERE estoque != 50",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE"],
    operadores_disponiveis: ["!=", "<>", "=", ">", "<"],
    valores_disponiveis: ["50"],
  },
  {
    id: "jr-010",
    nivel: "junior",
    numero: 10,
    titulo: "Margem Calculada",
    demanda:
      "O CFO quer ver quais produtos têm MARGEM DE LUCRO maior que R$2.000. Margem = preço − custo. Liste nome, preço, custo e a margem calculada (alias 'margem').",
    dica: "Você pode usar expressões aritméticas tanto no SELECT quanto no WHERE: WHERE (preco - custo) > 2000",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, preco, custo, preco - custo AS margem FROM produtos WHERE preco - custo > 2000",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AS"],
    operadores_disponiveis: [">", "-", "<", "=", "+"],
    valores_disponiveis: ["2000"],
  },

  // ═══════════════════════════════════════════════════════════
  // BLOCO 3 — WHERE TEXTO + LIKE (jr-011 a jr-018)
  // ═══════════════════════════════════════════════════════════
  {
    id: "jr-011",
    nivel: "junior",
    numero: 11,
    titulo: "Apenas Apple",
    demanda:
      "O gestor da Apple Store nos pediu um relatório. Liste o nome, modelo e preço de todos os produtos da marca 'Apple'.",
    dica: "Para texto, use aspas simples: WHERE marca = 'Apple'.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, marca, preco FROM produtos WHERE marca = 'Apple'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE"],
    operadores_disponiveis: ["="],
    valores_disponiveis: ["'Apple'"],
  },
  {
    id: "jr-012",
    nivel: "junior",
    numero: 12,
    titulo: "Família iPhone",
    demanda:
      "O time de iOS quer ver todos os produtos cujo nome COMECE com 'iPhone'. Liste nome e preço.",
    dica: "Use LIKE com o caractere %: 'iPhone%' significa 'começa com iPhone'.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco FROM produtos WHERE nome LIKE 'iPhone%'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "LIKE"],
    valores_disponiveis: ["'iPhone%'", "'%iPhone'", "'%iPhone%'"],
  },
  {
    id: "jr-013",
    nivel: "junior",
    numero: 13,
    titulo: "Versão Pro",
    demanda:
      "Liste produtos cujo nome TERMINE com 'Pro' (qualquer linha Pro). Traga nome e marca.",
    dica: "O padrão '%Pro' significa qualquer coisa seguida de 'Pro' no final.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, marca FROM produtos WHERE nome LIKE '%Pro'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "LIKE"],
    valores_disponiveis: ["'%Pro'", "'Pro%'", "'%Pro%'"],
  },
  {
    id: "jr-014",
    nivel: "junior",
    numero: 14,
    titulo: "Linha Galaxy",
    demanda:
      "O gerente de Samsung quer todos os produtos que contenham 'Galaxy' em qualquer parte do nome. Liste nome e categoria.",
    dica: "Use %padrão% — o % no início e fim significa 'pode ter qualquer coisa antes ou depois'.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, categoria FROM produtos WHERE nome LIKE '%Galaxy%'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "LIKE"],
    valores_disponiveis: ["'%Galaxy%'", "'Galaxy%'", "'%Galaxy'"],
  },
  {
    id: "jr-015",
    nivel: "junior",
    numero: 15,
    titulo: "Linhas com Versão Numerada",
    demanda:
      "Liste o nome dos produtos que tenham o caracter '5' em qualquer parte do nome (S25, MX Master 3S, etc.).",
    dica: "Use LIKE com '%5%' — o % representa qualquer sequência de caracteres antes e depois.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome FROM produtos WHERE nome LIKE '%5%'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "LIKE"],
    valores_disponiveis: ["'%5%'", "'5%'", "'%5'"],
  },
  {
    id: "jr-016",
    nivel: "junior",
    numero: 16,
    titulo: "Sem Apple",
    demanda:
      "O concorrente nos pediu (rs!): liste nome e marca de todos os produtos que NÃO sejam da marca 'Apple'.",
    dica: "Você pode usar marca != 'Apple' ou NOT marca = 'Apple'.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, marca FROM produtos WHERE marca != 'Apple'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "NOT"],
    operadores_disponiveis: ["!=", "<>", "="],
    valores_disponiveis: ["'Apple'"],
  },
  {
    id: "jr-017",
    nivel: "junior",
    numero: 17,
    titulo: "Excluindo a Linha Pro",
    demanda:
      "Para uma promoção da linha 'standard', liste produtos cujo nome NÃO termine com 'Pro'. Traga nome e categoria.",
    dica: "Use NOT LIKE '%Pro' — funciona como o LIKE, mas invertido.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, categoria FROM produtos WHERE nome NOT LIKE '%Pro'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "NOT", "LIKE"],
    valores_disponiveis: ["'%Pro'", "'Pro%'"],
  },
  {
    id: "jr-018",
    nivel: "junior",
    numero: 18,
    titulo: "Smartphones Acessíveis",
    demanda:
      "Combine condições: liste produtos cujo nome CONTENHA 'Galaxy' E que custem MENOS QUE R$3.000. Traga nome e preço.",
    dica: "Use AND para combinar duas condições. As duas precisam ser verdadeiras.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, preco FROM produtos WHERE nome LIKE '%Galaxy%' AND preco < 3000",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "LIKE", "AND"],
    operadores_disponiveis: ["<", ">"],
    valores_disponiveis: ["'%Galaxy%'", "3000"],
  },

  // ═══════════════════════════════════════════════════════════
  // BLOCO 4 — IN, BETWEEN, NULL (jr-019 a jr-025)
  // ═══════════════════════════════════════════════════════════
  {
    id: "jr-019",
    nivel: "junior",
    numero: 19,
    titulo: "Linhas Selecionadas",
    demanda:
      "Para um catálogo especial, liste produtos que sejam da marca 'Apple', 'Samsung' OU 'Google'. Traga nome e marca.",
    dica: "Em vez de várias condições com OR, use IN ('a', 'b', 'c'). Mais limpo.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, marca FROM produtos WHERE marca IN ('Apple', 'Samsung', 'Google')",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "IN"],
    valores_disponiveis: ["'Apple'", "'Samsung'", "'Google'"],
  },
  {
    id: "jr-020",
    nivel: "junior",
    numero: 20,
    titulo: "Fora das Big Three",
    demanda:
      "Para uma campanha 'descubra marcas novas', liste produtos que NÃO sejam 'Apple', 'Samsung' nem 'Google'. Traga nome e marca.",
    dica: "Use NOT IN para excluir uma lista de valores.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, marca FROM produtos WHERE marca NOT IN ('Apple', 'Samsung', 'Google')",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "NOT", "IN"],
    valores_disponiveis: ["'Apple'", "'Samsung'", "'Google'"],
  },
  {
    id: "jr-021",
    nivel: "junior",
    numero: 21,
    titulo: "Faixa de Preço Média",
    demanda:
      "O setor financeiro quer ver produtos na faixa de R$1.500 a R$3.500 (inclusive). Liste nome e preço.",
    dica: "BETWEEN inclui os extremos. WHERE preco BETWEEN 1500 AND 3500.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, preco FROM produtos WHERE preco BETWEEN 1500 AND 3500",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "BETWEEN", "AND"],
    valores_disponiveis: ["1500", "3500"],
  },
  {
    id: "jr-022",
    nivel: "junior",
    numero: 22,
    titulo: "Lançamentos de 2024",
    demanda:
      "O time de marketing quer ver produtos lançados em 2024. Liste nome e data de lançamento (lancamento) dos lançamentos entre '2024-01-01' e '2024-12-31'.",
    dica: "BETWEEN funciona com datas em formato texto YYYY-MM-DD porque essa ordenação é lexicográfica e cronológica.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, lancamento FROM produtos WHERE lancamento BETWEEN '2024-01-01' AND '2024-12-31'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "BETWEEN", "AND"],
    valores_disponiveis: ["'2024-01-01'", "'2024-12-31'"],
  },
  {
    id: "jr-023",
    nivel: "junior",
    numero: 23,
    titulo: "Produtos Sem Desconto",
    demanda:
      "O time de precificação quer saber quais produtos NÃO têm desconto definido (campo desconto_pct vazio/nulo). Traga nome e marca.",
    dica: "Cuidado: WHERE coluna = NULL NÃO funciona. Use WHERE coluna IS NULL.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, marca FROM produtos WHERE desconto_pct IS NULL",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "IS NULL"],
  },
  {
    id: "jr-024",
    nivel: "junior",
    numero: 24,
    titulo: "Produtos com Promoção Ativa",
    demanda:
      "Liste produtos que TÊM um desconto cadastrado (qualquer valor). Traga nome e desconto_pct.",
    dica: "Para campos preenchidos, use IS NOT NULL.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, desconto_pct FROM produtos WHERE desconto_pct IS NOT NULL",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "IS NOT NULL"],
  },
  {
    id: "jr-025",
    nivel: "junior",
    numero: 25,
    titulo: "Desconto Tratado",
    demanda:
      "Mostre nome e desconto_pct de TODOS os produtos. Onde o desconto for nulo, exiba 0. Use o alias 'desconto_pct' no resultado.",
    dica: "COALESCE(coluna, valor_default) retorna o primeiro valor não-NULL.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, COALESCE(desconto_pct, 0) AS desconto_pct FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["COALESCE()"],
    valores_disponiveis: ["0"],
  },

  // ═══════════════════════════════════════════════════════════
  // BLOCO 5 — AND, OR, NOT, PRECEDÊNCIA (jr-026 a jr-031)
  // ═══════════════════════════════════════════════════════════
  {
    id: "jr-026",
    nivel: "junior",
    numero: 26,
    titulo: "Smartphone Caro",
    demanda:
      "Liste nome e preço dos produtos da categoria 'Smartphones' que custem MAIS QUE R$7.000.",
    dica: "Combine duas condições com AND — ambas precisam ser verdadeiras.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, preco FROM produtos WHERE categoria = 'Smartphones' AND preco > 7000",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AND"],
    operadores_disponiveis: [">", "<", "="],
    valores_disponiveis: ["'Smartphones'", "7000"],
  },
  {
    id: "jr-027",
    nivel: "junior",
    numero: 27,
    titulo: "Audio ou Wearables",
    demanda:
      "Para um combo de presente, liste produtos das categorias 'Audio' OU 'Wearables'. Traga nome e categoria.",
    dica: "OR é verdadeiro se pelo menos UMA das condições for verdadeira.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, categoria FROM produtos WHERE categoria = 'Audio' OR categoria = 'Wearables'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "OR"],
    operadores_disponiveis: ["="],
    valores_disponiveis: ["'Audio'", "'Wearables'"],
  },
  {
    id: "jr-028",
    nivel: "junior",
    numero: 28,
    titulo: "Apple Caro OU Samsung Barato",
    demanda:
      "Liste produtos que sejam 'Apple' com preço > R$5.000, OU produtos 'Samsung' com preço < R$3.000. Traga nome, marca e preço.",
    dica: "Para combinar AND e OR sem ambiguidade, USE PARÊNTESES: (a AND b) OR (c AND d).",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, marca, preco FROM produtos WHERE (marca = 'Apple' AND preco > 5000) OR (marca = 'Samsung' AND preco < 3000)",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AND", "OR"],
    operadores_disponiveis: [">", "<", "="],
    valores_disponiveis: ["'Apple'", "'Samsung'", "5000", "3000"],
  },
  {
    id: "jr-029",
    nivel: "junior",
    numero: 29,
    titulo: "Precedência Importa",
    demanda:
      "Atenção: liste produtos da categoria 'Notebooks' que tenham (preço < R$5.000 OU estoque > 80). Traga nome, preço e estoque.",
    dica: "Sem parênteses, AND tem precedência sobre OR. Use parênteses para deixar claro a sua intenção.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, preco, estoque FROM produtos WHERE categoria = 'Notebooks' AND (preco < 5000 OR estoque > 80)",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AND", "OR"],
    operadores_disponiveis: ["<", ">", "="],
    valores_disponiveis: ["'Notebooks'", "5000", "80"],
  },
  {
    id: "jr-030",
    nivel: "junior",
    numero: 30,
    titulo: "Fora dos Smartphones",
    demanda:
      "Liste nome e categoria dos produtos que NÃO sejam da categoria 'Smartphones'.",
    dica: "Você pode escrever NOT categoria = 'Smartphones' ou categoria != 'Smartphones'. Os dois funcionam.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, categoria FROM produtos WHERE NOT categoria = 'Smartphones'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "NOT"],
    operadores_disponiveis: ["=", "!="],
    valores_disponiveis: ["'Smartphones'"],
  },
  {
    id: "jr-031",
    nivel: "junior",
    numero: 31,
    titulo: "Caso Complexo",
    demanda:
      "Relatório executivo: produtos que (sejam Apple OU Samsung) E que custem entre R$2.000 e R$8.000 E que tenham estoque > 30. Liste nome, marca, preço e estoque.",
    dica: "Combine BETWEEN, IN, AND, parênteses. Faz tudo em uma query!",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, marca, preco, estoque FROM produtos WHERE marca IN ('Apple', 'Samsung') AND preco BETWEEN 2000 AND 8000 AND estoque > 30",
    keywords_disponiveis: [
      "SELECT",
      "FROM",
      "WHERE",
      "IN",
      "BETWEEN",
      "AND",
    ],
    operadores_disponiveis: [">"],
    valores_disponiveis: ["'Apple'", "'Samsung'", "2000", "8000", "30"],
  },

  // ═══════════════════════════════════════════════════════════
  // BLOCO 6 — ORDER BY, LIMIT, OFFSET (jr-032 a jr-037)
  // ═══════════════════════════════════════════════════════════
  {
    id: "jr-032",
    nivel: "junior",
    numero: 32,
    titulo: "Catálogo Alfabético",
    demanda:
      "A equipe de UX quer o catálogo ordenado por nome (A → Z). Liste nome e marca.",
    dica: "ORDER BY coluna ASC ordena crescente. ASC é o padrão; pode omitir.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, marca FROM produtos ORDER BY nome ASC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY"],
    valores_disponiveis: ["ASC", "DESC"],
    ordem_importa: true,
  },
  {
    id: "jr-033",
    nivel: "junior",
    numero: 33,
    titulo: "Top Mais Caros",
    demanda:
      "Liste todos os produtos do mais caro para o mais barato. Traga nome e preço.",
    dica: "Para ordem decrescente: ORDER BY coluna DESC.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco FROM produtos ORDER BY preco DESC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY"],
    valores_disponiveis: ["DESC", "ASC"],
    ordem_importa: true,
  },
  {
    id: "jr-034",
    nivel: "junior",
    numero: 34,
    titulo: "Ordenação Multi-Coluna",
    demanda:
      "Ordene os produtos por categoria (A → Z) e dentro da mesma categoria, do mais caro para o mais barato. Traga nome, categoria e preço.",
    dica: "ORDER BY aceita várias colunas: ORDER BY col1 ASC, col2 DESC.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, categoria, preco FROM produtos ORDER BY categoria ASC, preco DESC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY"],
    valores_disponiveis: ["ASC", "DESC"],
    ordem_importa: true,
  },
  {
    id: "jr-035",
    nivel: "junior",
    numero: 35,
    titulo: "Os Primeiros 5",
    demanda:
      "A landing page só mostra 5 produtos. Liste APENAS os 5 PRIMEIROS produtos (pela ordem natural da tabela). Traga nome e preço.",
    dica: "Use LIMIT N para limitar a quantidade de linhas.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco FROM produtos LIMIT 5",
    keywords_disponiveis: ["SELECT", "FROM", "LIMIT"],
    valores_disponiveis: ["5", "10"],
    ordem_importa: true,
  },
  {
    id: "jr-036",
    nivel: "junior",
    numero: 36,
    titulo: "Paginação: Página 2",
    demanda:
      "A página de listagem mostra 5 produtos por página. Mostre a SEGUNDA página (do 6º ao 10º produto na ordem natural). Traga nome e preço.",
    dica: "LIMIT 5 OFFSET 5 — pula 5 linhas e pega as próximas 5.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco FROM produtos LIMIT 5 OFFSET 5",
    keywords_disponiveis: ["SELECT", "FROM", "LIMIT"],
    valores_disponiveis: ["5", "OFFSET"],
    ordem_importa: true,
  },
  {
    id: "jr-037",
    nivel: "junior",
    numero: 37,
    titulo: "Top 3 Mais Caros",
    demanda:
      "Para a vitrine premium, liste os 3 produtos MAIS CAROS. Traga nome, marca e preço.",
    dica: "Combine ORDER BY preco DESC com LIMIT 3.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, marca, preco FROM produtos ORDER BY preco DESC LIMIT 3",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "LIMIT"],
    valores_disponiveis: ["DESC", "3"],
    ordem_importa: true,
  },

  // ═══════════════════════════════════════════════════════════
  // BLOCO 7 — DISTINCT AVANÇADO (jr-038 a jr-040)
  // ═══════════════════════════════════════════════════════════
  {
    id: "jr-038",
    nivel: "junior",
    numero: 38,
    titulo: "Marcas que Vendemos",
    demanda:
      "Quantas marcas diferentes temos? Liste cada marca uma única vez, ordenada alfabeticamente.",
    dica: "DISTINCT marca + ORDER BY marca.",
    tabelas: ["produtos"],
    gabarito: "SELECT DISTINCT marca FROM produtos ORDER BY marca",
    keywords_disponiveis: ["SELECT", "FROM", "DISTINCT", "ORDER BY"],
    ordem_importa: true,
  },
  {
    id: "jr-039",
    nivel: "junior",
    numero: 39,
    titulo: "Combinações Marca + Categoria",
    demanda:
      "Liste as combinações ÚNICAS de marca + categoria (cada par só uma vez). Ordenadas por marca e depois categoria.",
    dica: "DISTINCT funciona com várias colunas: SELECT DISTINCT col1, col2 — ele considera o PAR único.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT DISTINCT marca, categoria FROM produtos ORDER BY marca, categoria",
    keywords_disponiveis: ["SELECT", "FROM", "DISTINCT", "ORDER BY"],
    ordem_importa: true,
  },
  {
    id: "jr-040",
    nivel: "junior",
    numero: 40,
    titulo: "Cores em Estoque",
    demanda:
      "Liste as cores únicas dos produtos (sem repetir). Ignore produtos sem cor. Ordene alfabeticamente.",
    dica: "Combine DISTINCT, IS NOT NULL e ORDER BY.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT DISTINCT cor FROM produtos WHERE cor IS NOT NULL ORDER BY cor",
    keywords_disponiveis: [
      "SELECT",
      "FROM",
      "WHERE",
      "DISTINCT",
      "IS NOT NULL",
      "ORDER BY",
    ],
    ordem_importa: true,
  },

  // ═══════════════════════════════════════════════════════════
  // BLOCO 8 — ALIASES E EXPRESSÕES (jr-041 a jr-045)
  // ═══════════════════════════════════════════════════════════
  {
    id: "jr-041",
    nivel: "junior",
    numero: 41,
    titulo: "Renomeando Colunas",
    demanda:
      "Para o dashboard executivo: mostre nome como 'Produto', preco como 'Preço (R$)' e estoque como 'Disponível'.",
    dica: "AS define o nome da coluna no resultado. Pode usar aspas se tiver espaços/acentos.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome AS Produto, preco AS 'Preço (R$)', estoque AS Disponível FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
  },
  {
    id: "jr-042",
    nivel: "junior",
    numero: 42,
    titulo: "Margem Absoluta",
    demanda:
      "O CFO quer ver a margem ABSOLUTA (preço − custo) de cada produto. Traga nome, preço, custo e a margem como coluna 'margem'.",
    dica: "Expressões no SELECT: preco - custo AS margem.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, preco, custo, preco - custo AS margem FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    operadores_disponiveis: ["-"],
  },
  {
    id: "jr-043",
    nivel: "junior",
    numero: 43,
    titulo: "Concatenando Marca e Nome",
    demanda:
      "Para o frontend mobile, crie uma coluna 'produto_completo' juntando marca + ' — ' + nome. Liste só essa coluna.",
    dica: "SQLite concatena strings com || — exemplo: 'Hello' || ' ' || 'World'.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT marca || ' — ' || nome AS produto_completo FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    operadores_disponiveis: ["||"],
    valores_disponiveis: ["' — '"],
  },
  {
    id: "jr-044",
    nivel: "junior",
    numero: 44,
    titulo: "Preço com Desconto Aplicado",
    demanda:
      "Para a campanha 'preço final', calcule preco * (1 - desconto_pct/100.0) e mostre como 'preco_final'. Use 0 para produtos sem desconto (COALESCE). Traga nome e preco_final.",
    dica: "Importante: divida por 100.0 (não 100) para forçar conversão para REAL e evitar divisão inteira.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, preco * (1 - COALESCE(desconto_pct, 0) / 100.0) AS preco_final FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["COALESCE()"],
    operadores_disponiveis: ["*", "/", "-"],
    valores_disponiveis: ["1", "100.0", "0"],
  },
  {
    id: "jr-045",
    nivel: "junior",
    numero: 45,
    titulo: "Alias na Tabela",
    demanda:
      "Você verá isso muito no Pleno. Use um alias na tabela: SELECT p.nome, p.preco FROM produtos AS p. Liste os produtos cujo preço esteja entre R$1.000 e R$2.000.",
    dica: "AS pode ser usado em colunas E tabelas. Dar alias à tabela facilita escrever JOINs depois.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT p.nome, p.preco FROM produtos AS p WHERE p.preco BETWEEN 1000 AND 2000",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AS", "BETWEEN", "AND"],
    valores_disponiveis: ["1000", "2000"],
  },

  // ═══════════════════════════════════════════════════════════
  // BLOCO 9 — FUNÇÕES DE TEXTO (jr-046 a jr-048)
  // ═══════════════════════════════════════════════════════════
  {
    id: "jr-046",
    nivel: "junior",
    numero: 46,
    titulo: "Tudo em CAIXA ALTA",
    demanda:
      "Para uma campanha berrante, mostre todos os nomes de produtos em MAIÚSCULAS. Use o alias 'nome'.",
    dica: "UPPER(texto) transforma em maiúsculas. LOWER(texto) faz o oposto.",
    tabelas: ["produtos"],
    gabarito: "SELECT UPPER(nome) AS nome FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["UPPER()", "LOWER()"],
  },
  {
    id: "jr-047",
    nivel: "junior",
    numero: 47,
    titulo: "Nomes Curtos para Mobile",
    demanda:
      "No mobile, nomes longos quebram o layout. Liste APENAS produtos cujo nome tenha 15 caracteres OU MENOS. Traga nome e o tamanho como 'caracteres'.",
    dica: "LENGTH(texto) retorna o número de caracteres da string.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, LENGTH(nome) AS caracteres FROM produtos WHERE LENGTH(nome) <= 15",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AS"],
    funcoes_disponiveis: ["LENGTH()"],
    operadores_disponiveis: ["<=", "<", "=", ">", ">="],
    valores_disponiveis: ["15"],
  },
  {
    id: "jr-048",
    nivel: "junior",
    numero: 48,
    titulo: "Primeiras Letras",
    demanda:
      "Para criar tags curtas, pegue os 3 PRIMEIROS caracteres do nome de cada produto. Mostre nome e o trecho como 'sigla'.",
    dica: "SUBSTR(texto, posição_inicial, quantidade). Posição começa em 1.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, SUBSTR(nome, 1, 3) AS sigla FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["SUBSTR()"],
    valores_disponiveis: ["1", "3"],
  },

  // ═══════════════════════════════════════════════════════════
  // BLOCO 10 — DATAS BÁSICAS (jr-049 a jr-050)
  // ═══════════════════════════════════════════════════════════
  {
    id: "jr-049",
    nivel: "junior",
    numero: 49,
    titulo: "Ano de Lançamento",
    demanda:
      "Para um relatório de roadmap, mostre o nome e APENAS o ano de lançamento (extraído da coluna lancamento) como 'ano'.",
    dica: "No SQLite, use strftime('%Y', data) para extrair o ano. Funciona com datas em formato 'YYYY-MM-DD'.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, strftime('%Y', lancamento) AS ano FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["STRFTIME()"],
    valores_disponiveis: ["'%Y'", "'%m'", "'%Y-%m'"],
  },
  {
    id: "jr-050",
    nivel: "junior",
    numero: 50,
    titulo: "Lançamentos de 2025",
    demanda:
      "Liste os produtos lançados em 2025. Use strftime para comparar apenas o ano. Traga nome e a data lancamento.",
    dica: "WHERE strftime('%Y', lancamento) = '2025'. Lembrando que strftime retorna texto, então compare com '2025' (com aspas).",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, lancamento FROM produtos WHERE strftime('%Y', lancamento) = '2025'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE"],
    funcoes_disponiveis: ["STRFTIME()"],
    operadores_disponiveis: ["="],
    valores_disponiveis: ["'%Y'", "'2025'"],
  },
];
