import type { ExercicioRaw } from "@/lib/types";

/**
 * Exercícios do nível PLENO.
 * Entrega em partes — blocos adicionados progressivamente.
 *
 * Personagens:
 *   Ana Beatriz    — Gestora direta (promoveu o usuário a Pleno)
 *   Rafael Drummond — CFO
 *   Camila Torres  — Diretora de Marketing
 *   Diego Mendes   — Gerente de Logística
 *   Priya Nair     — Head de Produto
 *   Lucas Oliveira — Analista de BI Sênior (mentor)
 *   Fernanda Lima  — Gerente de CRM
 *   Thiago Santos  — Head de Vendas
 *   Mariana Costa  — Analista de BI
 *   Beatriz Melo   — Gerente Comercial
 */
export const EXERCICIOS_PLENO: ExercicioRaw[] = [

  // ══════════════════════════════════════════════════════════════════════
  // BLOCO 01 — GROUP BY BÁSICO (pl-001 a pl-008)
  // "Agora você agrupa dados — de análise pontual para relatórios reais"
  // ══════════════════════════════════════════════════════════════════════

  {
    id: "pl-001",
    nivel: "pleno",
    numero: 1,
    secao: "curriculo",
    titulo: "Promoção a Pleno!",
    demanda:
      "Ana Beatriz chama você para uma reunião: 'Parabéns pela promoção! Agora você vai trabalhar com análises muito mais ricas. Primeira tarefa do seu novo cargo: me conta quantos pedidos temos por status. Quero ver status e total — é o relatório de situação que o CEO pede toda segunda-feira.' GROUP BY é a ferramenta que mudará como você enxerga dados.",
    dica: "GROUP BY agrupa as linhas pelo valor da coluna. COUNT(*) dentro de cada grupo conta as linhas daquele grupo.",
    tabelas: ["pedidos"],
    gabarito: "SELECT status, COUNT(*) AS total FROM pedidos GROUP BY status ORDER BY total DESC",
    keywords_disponiveis: ["SELECT", "FROM", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["COUNT(*)", "SUM()", "AVG()", "MIN()", "MAX()"],
    operadores_disponiveis: ["DESC", "ASC"],
    ordem_importa: true,
  },

  {
    id: "pl-002",
    nivel: "pleno",
    numero: 2,
    secao: "curriculo",
    titulo: "Receita por Forma de Pagamento",
    demanda:
      "Rafael Drummond precisa entender a distribuição dos recebíveis: 'Quero saber o valor total recebido por forma de pagamento — pix, crédito e boleto. Traz forma_pagamento e receita_total (SUM de valor_total), ordenado da maior receita para a menor. Só considere pedidos que não foram cancelados.'",
    dica: "WHERE filtra antes do GROUP BY. SUM soma os valores dentro de cada grupo.",
    tabelas: ["pedidos"],
    gabarito: "SELECT forma_pagamento, SUM(valor_total) AS receita_total FROM pedidos WHERE status != 'cancelado' GROUP BY forma_pagamento ORDER BY receita_total DESC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["SUM()", "COUNT(*)", "AVG()", "MIN()", "MAX()", "ROUND()"],
    operadores_disponiveis: ["!=", "=", "DESC"],
    valores_disponiveis: ["'cancelado'", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-003",
    nivel: "pleno",
    numero: 3,
    secao: "curriculo",
    titulo: "Métricas por Região de Vendedor",
    demanda:
      "Thiago Santos, o Head de Vendas, quer um panorama rápido: 'Quantos pedidos cada região fechou? Traz regiao e total_pedidos a partir da tabela de vendedores e pedidos — mas espera, você vai precisar de JOIN para isso. Por enquanto, use só a tabela pedidos e agrupe pelo vendedor_id. Traz vendedor_id (incluindo NULL para vendas diretas) e total_pedidos.'",
    dica: "GROUP BY funciona até com colunas que têm NULL — o NULL forma um grupo próprio.",
    tabelas: ["pedidos"],
    gabarito: "SELECT vendedor_id, COUNT(*) AS total_pedidos FROM pedidos GROUP BY vendedor_id ORDER BY total_pedidos DESC",
    keywords_disponiveis: ["SELECT", "FROM", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["COUNT(*)", "SUM()", "AVG()"],
    valores_disponiveis: ["DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-004",
    nivel: "pleno",
    numero: 4,
    secao: "curriculo",
    titulo: "Ticket Médio por Status",
    demanda:
      "Mariana Costa está montando um dashboard de saúde dos pedidos: 'Qual o ticket médio (AVG de valor_total) por status de pedido? Traz status e ticket_medio arredondado para 2 casas. Ordena pelo maior ticket médio.'",
    dica: "AVG dentro do GROUP BY calcula a média de cada grupo separadamente.",
    tabelas: ["pedidos"],
    gabarito: "SELECT status, ROUND(AVG(valor_total), 2) AS ticket_medio FROM pedidos GROUP BY status ORDER BY ticket_medio DESC",
    keywords_disponiveis: ["SELECT", "FROM", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["AVG()", "ROUND()", "COUNT(*)", "SUM()", "MIN()", "MAX()"],
    valores_disponiveis: ["2", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-005",
    nivel: "pleno",
    numero: 5,
    secao: "curriculo",
    titulo: "Pedidos por Mês",
    demanda:
      "Camila Torres quer ver a evolução mensal: 'Me traz a quantidade de pedidos por mês em 2025 — extrai o mês com strftime. Traz mes (formato YYYY-MM) e total_pedidos, ordenados cronologicamente. Só 2025.'",
    dica: "strftime('%Y-%m', data_pedido) extrai o ano e mês juntos. Você pode agrupar por uma expressão de função, não só por coluna direta.",
    tabelas: ["pedidos"],
    gabarito: "SELECT strftime('%Y-%m', data_pedido) AS mes, COUNT(*) AS total_pedidos FROM pedidos WHERE strftime('%Y', data_pedido) = '2025' GROUP BY mes ORDER BY mes ASC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["COUNT(*)", "STRFTIME()", "SUM()", "AVG()"],
    operadores_disponiveis: ["="],
    valores_disponiveis: ["'%Y-%m'", "'%Y'", "'2025'", "ASC"],
    ordem_importa: true,
  },

  {
    id: "pl-006",
    nivel: "pleno",
    numero: 6,
    secao: "curriculo",
    titulo: "Receita Mensal de 2025",
    demanda:
      "Rafael Drummond precisa do P&L mensal: 'Traz a receita total por mês em 2025 (SUM de valor_total), ignorando cancelamentos. Alias mes (YYYY-MM) e receita_mensal arredondada para 2 casas. Ordem cronológica.'",
    tabelas: ["pedidos"],
    gabarito: "SELECT strftime('%Y-%m', data_pedido) AS mes, ROUND(SUM(valor_total), 2) AS receita_mensal FROM pedidos WHERE strftime('%Y', data_pedido) = '2025' AND status != 'cancelado' GROUP BY mes ORDER BY mes ASC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "AS", "AND"],
    funcoes_disponiveis: ["SUM()", "ROUND()", "COUNT(*)", "STRFTIME()"],
    operadores_disponiveis: ["!=", "=", "ASC"],
    valores_disponiveis: ["'%Y-%m'", "'%Y'", "'2025'", "'cancelado'", "2"],
    ordem_importa: true,
  },

  {
    id: "pl-007",
    nivel: "pleno",
    numero: 7,
    secao: "curriculo",
    titulo: "Itens Vendidos por Produto",
    demanda:
      "Diego Mendes precisa saber quais produtos saíram mais: 'Na tabela itens_pedido, traz produto_id e total_vendido (SUM de quantidade). Ordena dos mais vendidos para os menos. Ignora itens de pedidos cancelados — por hora filtra pelo pedido_id NOT IN (subconsulta de cancelados).'",
    dica: "Você pode usar NOT IN com uma subquery: WHERE pedido_id NOT IN (SELECT id FROM pedidos WHERE status = 'cancelado'). GROUP BY depois agrupa por produto.",
    tabelas: ["itens_pedido", "pedidos"],
    gabarito: "SELECT produto_id, SUM(quantidade) AS total_vendido FROM itens_pedido WHERE pedido_id NOT IN (SELECT id FROM pedidos WHERE status = 'cancelado') GROUP BY produto_id ORDER BY total_vendido DESC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "AS", "NOT", "IN"],
    funcoes_disponiveis: ["SUM()", "COUNT(*)", "AVG()"],
    operadores_disponiveis: ["=", "NOT IN", "DESC"],
    valores_disponiveis: ["'cancelado'", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-008",
    nivel: "pleno",
    numero: 8,
    secao: "curriculo",
    titulo: "Número de Clientes por Segmento",
    demanda:
      "Fernanda Lima, Gerente de CRM, quer entender a base: 'Quantos clientes temos em cada segmento (B2C e B2B)? E quantos estão ativos em cada segmento? Traz segmento, total_clientes (COUNT total) e ativos (COUNT dos ativo=1). Tudo em uma linha por segmento.'",
    dica: "COUNT(CASE WHEN ativo = 1 THEN 1 END) conta só os ativos dentro de cada grupo.",
    tabelas: ["clientes"],
    gabarito: "SELECT segmento, COUNT(*) AS total_clientes, COUNT(CASE WHEN ativo = 1 THEN 1 END) AS ativos FROM clientes GROUP BY segmento ORDER BY total_clientes DESC",
    keywords_disponiveis: ["SELECT", "FROM", "GROUP BY", "ORDER BY", "AS", "CASE", "WHEN", "THEN", "END"],
    funcoes_disponiveis: ["COUNT(*)", "COUNT(DISTINCT )", "SUM()", "CASE"],
    operadores_disponiveis: ["=", "DESC"],
    valores_disponiveis: ["1", "DESC"],
    ordem_importa: true,
  },

  // ══════════════════════════════════════════════════════════════════════
  // BLOCO 02 — HAVING (pl-009 a pl-016)
  // ══════════════════════════════════════════════════════════════════════

  {
    id: "pl-009",
    nivel: "pleno",
    numero: 9,
    secao: "curriculo",
    titulo: "Clientes com Mais de 2 Pedidos",
    demanda:
      "Fernanda Lima quer identificar os clientes recorrentes: 'Traz cliente_id e total_pedidos dos clientes que fizeram MAIS DE 2 pedidos. Ordena pelo maior número de pedidos.' Aqui você aprende a diferença entre WHERE (filtra linhas) e HAVING (filtra grupos).",
    dica: "HAVING filtra DEPOIS do GROUP BY, sobre os grupos formados. WHERE filtra ANTES, sobre as linhas brutas. Você não pode usar WHERE COUNT(*) > 2 — isso é sintaxe inválida.",
    tabelas: ["pedidos"],
    gabarito: "SELECT cliente_id, COUNT(*) AS total_pedidos FROM pedidos GROUP BY cliente_id HAVING COUNT(*) > 2 ORDER BY total_pedidos DESC",
    keywords_disponiveis: ["SELECT", "FROM", "GROUP BY", "HAVING", "ORDER BY", "AS"],
    funcoes_disponiveis: ["COUNT(*)", "SUM()", "AVG()", "MIN()", "MAX()"],
    operadores_disponiveis: [">", "=", ">=", "DESC"],
    valores_disponiveis: ["2", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-010",
    nivel: "pleno",
    numero: 10,
    secao: "curriculo",
    titulo: "Produtos com Receita Acima de R$50.000",
    demanda:
      "Rafael Drummond quer focar nos produtos que mais faturam: 'Quais produtos geraram mais de R$50.000 em receita total (considerando quantidade × preço_unit)? Traz produto_id e receita_produto arredondada. Ordena da maior receita.'",
    tabelas: ["itens_pedido", "pedidos"],
    gabarito: "SELECT produto_id, ROUND(SUM(preco_unit * quantidade), 2) AS receita_produto FROM itens_pedido WHERE pedido_id NOT IN (SELECT id FROM pedidos WHERE status = 'cancelado') GROUP BY produto_id HAVING SUM(preco_unit * quantidade) > 50000 ORDER BY receita_produto DESC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "AS", "NOT", "IN"],
    funcoes_disponiveis: ["SUM()", "ROUND()", "COUNT(*)", "AVG()"],
    operadores_disponiveis: ["*", ">", "=", "NOT IN", "DESC"],
    valores_disponiveis: ["50000", "2", "'cancelado'", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-011",
    nivel: "pleno",
    numero: 11,
    secao: "curriculo",
    titulo: "WHERE + HAVING Juntos",
    demanda:
      "Lucas Oliveira te dá um exercício didático fundamental: 'Filtra pedidos de 2025 com status entregue (WHERE), agrupa por cliente_id e mostra só os que gastaram mais de R$10.000 no total (HAVING). Traz cliente_id e total_gasto. Entender a ordem WHERE → GROUP BY → HAVING é essencial.'",
    dica: "A ordem de execução SQL é: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. WHERE vem antes do grupo, HAVING depois.",
    tabelas: ["pedidos"],
    gabarito: "SELECT cliente_id, SUM(valor_total) AS total_gasto FROM pedidos WHERE status = 'entregue' AND strftime('%Y', data_pedido) = '2025' GROUP BY cliente_id HAVING SUM(valor_total) > 10000 ORDER BY total_gasto DESC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "AS", "AND"],
    funcoes_disponiveis: ["SUM()", "COUNT(*)", "ROUND()", "STRFTIME()"],
    operadores_disponiveis: ["=", ">", "AND", "DESC"],
    valores_disponiveis: ["'entregue'", "'%Y'", "'2025'", "10000", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-012",
    nivel: "pleno",
    numero: 12,
    secao: "curriculo",
    titulo: "Meses com Receita Abaixo da Meta",
    demanda:
      "Rafael Drummond quer identificar meses problemáticos: 'Quais meses de 2025 tiveram receita total (sem cancelamentos) abaixo de R$30.000? Traz mes (YYYY-MM) e receita_mensal. Ordena cronologicamente.'",
    tabelas: ["pedidos"],
    gabarito: "SELECT strftime('%Y-%m', data_pedido) AS mes, ROUND(SUM(valor_total), 2) AS receita_mensal FROM pedidos WHERE status != 'cancelado' AND strftime('%Y', data_pedido) = '2025' GROUP BY mes HAVING SUM(valor_total) < 30000 ORDER BY mes ASC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "AS", "AND"],
    funcoes_disponiveis: ["SUM()", "ROUND()", "COUNT(*)", "STRFTIME()"],
    operadores_disponiveis: ["!=", "=", "<", "AND", "ASC"],
    valores_disponiveis: ["'cancelado'", "'%Y-%m'", "'%Y'", "'2025'", "30000", "2"],
    ordem_importa: true,
  },

  {
    id: "pl-013",
    nivel: "pleno",
    numero: 13,
    secao: "curriculo",
    titulo: "Formas de Pagamento Populares",
    demanda:
      "Mariana Costa quer focar as análises nas formas de pagamento relevantes: 'Mostra só as formas de pagamento que tiveram pelo menos 10 pedidos ao longo de toda a história. Traz forma_pagamento e total_pedidos.'",
    tabelas: ["pedidos"],
    gabarito: "SELECT forma_pagamento, COUNT(*) AS total_pedidos FROM pedidos GROUP BY forma_pagamento HAVING COUNT(*) >= 10 ORDER BY total_pedidos DESC",
    keywords_disponiveis: ["SELECT", "FROM", "GROUP BY", "HAVING", "ORDER BY", "AS"],
    funcoes_disponiveis: ["COUNT(*)", "SUM()", "AVG()"],
    operadores_disponiveis: [">=", ">", "=", "DESC"],
    valores_disponiveis: ["10", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-014",
    nivel: "pleno",
    numero: 14,
    secao: "curriculo",
    titulo: "Vendedores Acima da Meta Média",
    demanda:
      "Thiago Santos quer reconhecer os vendedores com desempenho acima da média: 'Quais vendedores têm meta_mensal acima da média de todos os vendedores? Traz nome, regiao e meta_mensal. Ordena pela maior meta.'",
    dica: "HAVING meta_mensal > (SELECT AVG(meta_mensal) FROM vendedores) — subquery escalar no HAVING.",
    tabelas: ["vendedores"],
    gabarito: "SELECT nome, regiao, meta_mensal FROM vendedores WHERE meta_mensal > (SELECT AVG(meta_mensal) FROM vendedores) ORDER BY meta_mensal DESC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "AS"],
    funcoes_disponiveis: ["AVG()", "SUM()", "COUNT(*)", "ROUND()"],
    operadores_disponiveis: [">", "=", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-015",
    nivel: "pleno",
    numero: 15,
    secao: "curriculo",
    titulo: "UFs com Muitos Clientes B2C",
    demanda:
      "Fernanda Lima quer priorizar estados para campanhas de aquisição: 'Quais estados (UF) têm mais de 2 clientes B2C ativos? Traz uf e total_b2c_ativos.'",
    tabelas: ["clientes"],
    gabarito: "SELECT uf, COUNT(*) AS total_b2c_ativos FROM clientes WHERE segmento = 'B2C' AND ativo = 1 GROUP BY uf HAVING COUNT(*) > 2 ORDER BY total_b2c_ativos DESC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "AS", "AND"],
    funcoes_disponiveis: ["COUNT(*)", "SUM()", "AVG()"],
    operadores_disponiveis: ["=", ">", "AND", "DESC"],
    valores_disponiveis: ["'B2C'", "1", "2", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-016",
    nivel: "pleno",
    numero: 16,
    secao: "curriculo",
    titulo: "Produtos com Ticket Médio Alto por Categoria",
    demanda:
      "Beatriz Melo quer entender onde estão os produtos premium: 'Na tabela itens_pedido, agrupa por produto_id e calcula o preco_unit médio (ticket_medio_unit). Mostra só produtos com ticket_medio_unit acima de R$5.000. Ordena do maior ticket.'",
    tabelas: ["itens_pedido"],
    gabarito: "SELECT produto_id, ROUND(AVG(preco_unit), 2) AS ticket_medio_unit FROM itens_pedido GROUP BY produto_id HAVING AVG(preco_unit) > 5000 ORDER BY ticket_medio_unit DESC",
    keywords_disponiveis: ["SELECT", "FROM", "GROUP BY", "HAVING", "ORDER BY", "AS"],
    funcoes_disponiveis: ["AVG()", "ROUND()", "COUNT(*)", "SUM()", "MIN()", "MAX()"],
    operadores_disponiveis: [">", "=", "DESC"],
    valores_disponiveis: ["5000", "2", "DESC"],
    ordem_importa: true,
  },

  // ══════════════════════════════════════════════════════════════════════
  // BLOCO 03 — INNER JOIN (pl-017 a pl-026)
  // ══════════════════════════════════════════════════════════════════════

  {
    id: "pl-017",
    nivel: "pleno",
    numero: 17,
    secao: "curriculo",
    titulo: "Pedidos com Nome do Cliente",
    demanda:
      "Lucas Oliveira te apresenta o JOIN: 'Até agora você via cliente_id nos pedidos. JOIN conecta as tabelas pelo campo em comum. Traz id do pedido, nome do cliente, data_pedido e valor_total. Ordena pelo valor mais alto.' Esse é o JOIN mais básico — e o mais usado no dia a dia.",
    dica: "SELECT p.id, c.nome, p.data_pedido FROM pedidos p JOIN clientes c ON p.cliente_id = c.id — o ON define o critério de ligação entre as tabelas.",
    tabelas: ["pedidos", "clientes"],
    gabarito: "SELECT p.id, c.nome, p.data_pedido, p.valor_total FROM pedidos p JOIN clientes c ON p.cliente_id = c.id ORDER BY p.valor_total DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "ORDER BY", "AS", "WHERE", "AND", "INNER JOIN"],
    operadores_disponiveis: ["=", "DESC", "ASC"],
    ordem_importa: true,
  },

  {
    id: "pl-018",
    nivel: "pleno",
    numero: 18,
    secao: "curriculo",
    titulo: "Itens com Nome do Produto",
    demanda:
      "Diego Mendes precisa de uma listagem de itens legível: 'Na tabela itens_pedido temos só produto_id. Faz um JOIN com produtos e traz: pedido_id, nome do produto, quantidade, preco_unit. Ordena por pedido_id ASC.'",
    tabelas: ["itens_pedido", "produtos"],
    gabarito: "SELECT i.pedido_id, p.nome, i.quantidade, i.preco_unit FROM itens_pedido i JOIN produtos p ON i.produto_id = p.id ORDER BY i.pedido_id ASC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "ORDER BY", "AS", "WHERE", "INNER JOIN"],
    operadores_disponiveis: ["=", "ASC", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-019",
    nivel: "pleno",
    numero: 19,
    secao: "curriculo",
    titulo: "Pedidos com Vendedor Responsável",
    demanda:
      "Thiago Santos quer ver os pedidos junto com o nome do vendedor: 'Traz id do pedido, nome do vendedor (da tabela vendedores), data_pedido e valor_total. Só pedidos que têm vendedor associado (vendedor_id não nulo). Ordena por data.'",
    tabelas: ["pedidos", "vendedores"],
    gabarito: "SELECT p.id, v.nome AS vendedor, p.data_pedido, p.valor_total FROM pedidos p JOIN vendedores v ON p.vendedor_id = v.id ORDER BY p.data_pedido ASC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "ORDER BY", "WHERE", "AS", "AND", "INNER JOIN"],
    operadores_disponiveis: ["=", "ASC", "IS NULL", "IS NOT NULL"],
    ordem_importa: true,
  },

  {
    id: "pl-020",
    nivel: "pleno",
    numero: 20,
    secao: "curriculo",
    titulo: "Receita por Nome de Produto",
    demanda:
      "Mariana Costa quer o relatório de receita com nomes reais: 'Traz nome do produto e receita_total (SUM de preco_unit × quantidade) de cada produto, ordenado do que mais vendeu. Ignora cancelamentos.'",
    tabelas: ["itens_pedido", "pedidos", "produtos"],
    gabarito: "SELECT p.nome, ROUND(SUM(i.preco_unit * i.quantidade), 2) AS receita_total FROM itens_pedido i JOIN produtos p ON i.produto_id = p.id JOIN pedidos ped ON i.pedido_id = ped.id WHERE ped.status != 'cancelado' GROUP BY p.id, p.nome ORDER BY receita_total DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["SUM()", "ROUND()", "COUNT(*)", "AVG()"],
    operadores_disponiveis: ["*", "!=", "=", "DESC"],
    valores_disponiveis: ["'cancelado'", "2", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-021",
    nivel: "pleno",
    numero: 21,
    secao: "curriculo",
    titulo: "Clientes de São Paulo e seus Pedidos",
    demanda:
      "Fernanda Lima quer analisar os clientes do maior mercado: 'Traz nome do cliente, data_pedido e valor_total dos pedidos de clientes de SP (uf = SP). Ordena pelo maior valor.'",
    tabelas: ["pedidos", "clientes"],
    gabarito: "SELECT c.nome, p.data_pedido, p.valor_total FROM pedidos p JOIN clientes c ON p.cliente_id = c.id WHERE c.uf = 'SP' ORDER BY p.valor_total DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "ORDER BY", "AS", "AND", "INNER JOIN"],
    operadores_disponiveis: ["=", "!=", "DESC"],
    valores_disponiveis: ["'SP'", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-022",
    nivel: "pleno",
    numero: 22,
    secao: "curriculo",
    titulo: "Pedidos de Clientes B2B",
    demanda:
      "Rafael Drummond quer separar a receita corporate: 'Traz cliente nome, total_pedidos (COUNT) e total_gasto (SUM valor_total) dos clientes B2B. Agrupa por cliente. Ordena pelo maior gasto.'",
    tabelas: ["pedidos", "clientes"],
    gabarito: "SELECT c.nome, COUNT(p.id) AS total_pedidos, ROUND(SUM(p.valor_total), 2) AS total_gasto FROM pedidos p JOIN clientes c ON p.cliente_id = c.id WHERE c.segmento = 'B2B' GROUP BY c.id, c.nome ORDER BY total_gasto DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["COUNT(*)", "SUM()", "ROUND()", "AVG()"],
    operadores_disponiveis: ["=", "DESC"],
    valores_disponiveis: ["'B2B'", "2", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-023",
    nivel: "pleno",
    numero: 23,
    secao: "curriculo",
    titulo: "Quantidade Total Vendida por Categoria",
    demanda:
      "Diego Mendes precisa saber quanto saiu fisicamente de cada categoria: 'Faz o JOIN itens_pedido → produtos e traz categoria e total_unidades (SUM de quantidade). Só pedidos entregues. Ordena do maior volume.'",
    tabelas: ["itens_pedido", "pedidos", "produtos"],
    gabarito: "SELECT pr.categoria, SUM(i.quantidade) AS total_unidades FROM itens_pedido i JOIN produtos pr ON i.produto_id = pr.id JOIN pedidos p ON i.pedido_id = p.id WHERE p.status = 'entregue' GROUP BY pr.categoria ORDER BY total_unidades DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["SUM()", "COUNT(*)", "AVG()"],
    operadores_disponiveis: ["=", "DESC"],
    valores_disponiveis: ["'entregue'", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-024",
    nivel: "pleno",
    numero: 24,
    secao: "curriculo",
    titulo: "Itens com Desconto Aplicado",
    demanda:
      "Camila Torres quer ver o impacto real dos descontos: 'Traz nome do produto, quantidade, preco_unit, desconto_pct (do item) e o preco_final (preco_unit × (1 - desconto_pct/100.0)) para todos os itens que têm desconto. Ordena pelo maior desconto.'",
    tabelas: ["itens_pedido", "produtos"],
    gabarito: "SELECT p.nome, i.quantidade, i.preco_unit, i.desconto_pct, ROUND(i.preco_unit * (1 - i.desconto_pct / 100.0), 2) AS preco_final FROM itens_pedido i JOIN produtos p ON i.produto_id = p.id WHERE i.desconto_pct IS NOT NULL ORDER BY i.desconto_pct DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "ORDER BY", "AS", "IS NOT NULL"],
    funcoes_disponiveis: ["ROUND()", "COALESCE()", "ABS()"],
    operadores_disponiveis: ["*", "/", "-", "DESC", "IS NOT NULL"],
    valores_disponiveis: ["100.0", "1", "2", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-025",
    nivel: "pleno",
    numero: 25,
    secao: "curriculo",
    titulo: "Margem Real por Item Vendido",
    demanda:
      "Rafael Drummond quer a lucratividade real de cada venda: 'Traz nome do produto, preco_unit de venda (do item), custo (do produto) e margem_real = preco_unit - custo. Ordena pela maior margem_real. Só itens de pedidos entregues.'",
    tabelas: ["itens_pedido", "pedidos", "produtos"],
    gabarito: "SELECT pr.nome, i.preco_unit, pr.custo, ROUND(i.preco_unit - pr.custo, 2) AS margem_real FROM itens_pedido i JOIN produtos pr ON i.produto_id = pr.id JOIN pedidos p ON i.pedido_id = p.id WHERE p.status = 'entregue' ORDER BY margem_real DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "ORDER BY", "AS"],
    funcoes_disponiveis: ["ROUND()", "ABS()", "AVG()"],
    operadores_disponiveis: ["-", "=", "DESC"],
    valores_disponiveis: ["'entregue'", "2", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-026",
    nivel: "pleno",
    numero: 26,
    secao: "curriculo",
    titulo: "Vendedores com Pedidos em Janeiro/2025",
    demanda:
      "Thiago Santos quer ver quem vendeu em janeiro: 'Traz nome do vendedor e total de pedidos em Janeiro de 2025. Só vendedores que tiveram pelo menos 1 pedido nesse mês.'",
    tabelas: ["pedidos", "vendedores"],
    gabarito: "SELECT v.nome, COUNT(p.id) AS total_pedidos FROM pedidos p JOIN vendedores v ON p.vendedor_id = v.id WHERE strftime('%Y-%m', p.data_pedido) = '2025-01' GROUP BY v.id, v.nome ORDER BY total_pedidos DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["COUNT(*)", "STRFTIME()", "SUM()"],
    operadores_disponiveis: ["=", "DESC"],
    valores_disponiveis: ["'%Y-%m'", "'2025-01'", "DESC"],
    ordem_importa: true,
  },

  // ══════════════════════════════════════════════════════════════════════
  // BLOCO 04 — LEFT JOIN E ANTI-JOIN (pl-027 a pl-034)
  // ══════════════════════════════════════════════════════════════════════

  {
    id: "pl-027",
    nivel: "pleno",
    numero: 27,
    secao: "curriculo",
    titulo: "Todos os Clientes e seus Pedidos",
    demanda:
      "Fernanda Lima quer um mapa completo da base: 'Lista TODOS os clientes com o total de pedidos de cada um — mesmo quem nunca comprou (aparece como 0). Traz nome e total_pedidos.' LEFT JOIN é a chave: mantém todos da tabela esquerda, mesmo sem correspondência na direita.",
    dica: "LEFT JOIN mantém TODAS as linhas da tabela esquerda. Quando não há correspondência, as colunas da tabela direita ficam NULL. COUNT(p.id) retorna 0 quando não há pedido (não conta NULLs).",
    tabelas: ["clientes", "pedidos"],
    gabarito: "SELECT c.nome, COUNT(p.id) AS total_pedidos FROM clientes c LEFT JOIN pedidos p ON c.id = p.cliente_id GROUP BY c.id, c.nome ORDER BY total_pedidos DESC",
    keywords_disponiveis: ["SELECT", "FROM", "LEFT JOIN", "JOIN", "ON", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["COUNT(*)", "SUM()", "COALESCE()"],
    operadores_disponiveis: ["=", "DESC", "IS NULL"],
    ordem_importa: true,
  },

  {
    id: "pl-028",
    nivel: "pleno",
    numero: 28,
    secao: "curriculo",
    titulo: "Clientes que Nunca Compraram",
    demanda:
      "Fernanda Lima quer ativar clientes dormentes: 'Quais clientes NUNCA fizeram um pedido? Traz nome, email e data_cadastro. Ordena pela data de cadastro mais antiga.' Esse é o anti-JOIN pattern — um dos mais usados em CRM.",
    dica: "LEFT JOIN + WHERE p.id IS NULL detecta as linhas que não tiveram correspondência. É mais eficiente que NOT IN para tabelas grandes.",
    tabelas: ["clientes", "pedidos"],
    gabarito: "SELECT c.nome, c.email, c.data_cadastro FROM clientes c LEFT JOIN pedidos p ON c.id = p.cliente_id WHERE p.id IS NULL ORDER BY c.data_cadastro ASC",
    keywords_disponiveis: ["SELECT", "FROM", "LEFT JOIN", "ON", "WHERE", "ORDER BY", "AS", "IS NULL"],
    operadores_disponiveis: ["=", "IS NULL", "ASC"],
    ordem_importa: true,
  },

  {
    id: "pl-029",
    nivel: "pleno",
    numero: 29,
    secao: "curriculo",
    titulo: "Produtos Nunca Vendidos",
    demanda:
      "Diego Mendes quer identificar produtos parados no estoque que nunca saíram: 'Quais produtos da tabela produtos nunca apareceram em nenhum item_pedido? Traz nome, categoria e preco.'",
    tabelas: ["produtos", "itens_pedido"],
    gabarito: "SELECT p.nome, p.categoria, p.preco FROM produtos p LEFT JOIN itens_pedido i ON p.id = i.produto_id WHERE i.id IS NULL ORDER BY p.categoria, p.nome",
    keywords_disponiveis: ["SELECT", "FROM", "LEFT JOIN", "ON", "WHERE", "ORDER BY", "AS", "IS NULL"],
    operadores_disponiveis: ["=", "IS NULL", "ASC"],
    ordem_importa: true,
  },

  {
    id: "pl-030",
    nivel: "pleno",
    numero: 30,
    secao: "curriculo",
    titulo: "Pedidos sem Vendedor (Venda Direta)",
    demanda:
      "Thiago Santos quer entender o canal direto: 'Traz id, cliente_id, data_pedido e valor_total de todos os pedidos feitos diretamente pelo site (sem vendedor atribuído — vendedor_id é NULL). Ordena por valor_total DESC.'",
    tabelas: ["pedidos"],
    gabarito: "SELECT id, cliente_id, data_pedido, valor_total FROM pedidos WHERE vendedor_id IS NULL ORDER BY valor_total DESC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "LEFT JOIN", "IS NULL", "IS NOT NULL"],
    operadores_disponiveis: ["IS NULL", "IS NOT NULL", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-031",
    nivel: "pleno",
    numero: 31,
    secao: "curriculo",
    titulo: "Todos os Vendedores e sua Receita",
    demanda:
      "Thiago Santos quer o ranking completo incluindo vendedores que não fecharam nada ainda: 'Traz nome do vendedor, regiao e receita_total (SUM valor_total, ou 0 se não tiver). Ordena pela maior receita.'",
    dica: "COALESCE(SUM(p.valor_total), 0) trata o NULL quando não há pedidos.",
    tabelas: ["vendedores", "pedidos"],
    gabarito: "SELECT v.nome, v.regiao, ROUND(COALESCE(SUM(p.valor_total), 0), 2) AS receita_total FROM vendedores v LEFT JOIN pedidos p ON v.id = p.vendedor_id AND p.status != 'cancelado' GROUP BY v.id, v.nome, v.regiao ORDER BY receita_total DESC",
    keywords_disponiveis: ["SELECT", "FROM", "LEFT JOIN", "ON", "WHERE", "GROUP BY", "ORDER BY", "AS", "AND"],
    funcoes_disponiveis: ["SUM()", "COALESCE()", "ROUND()", "COUNT(*)"],
    operadores_disponiveis: ["!=", "=", "DESC", "IS NULL"],
    valores_disponiveis: ["'cancelado'", "0", "2", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-032",
    nivel: "pleno",
    numero: 32,
    secao: "curriculo",
    titulo: "INNER vs LEFT — Na Prática",
    demanda:
      "Lucas Oliveira te dá um exercício que aparece em toda entrevista Pleno: 'Compara os dois resultados. Use LEFT JOIN entre clientes e pedidos — quantas linhas retorna? Agora use INNER JOIN — quantas? A diferença são os clientes sem pedido. Escreve a versão INNER JOIN: cliente nome e total_pedidos, só quem tem pelo menos 1 pedido.'",
    tabelas: ["clientes", "pedidos"],
    gabarito: "SELECT c.nome, COUNT(p.id) AS total_pedidos FROM clientes c INNER JOIN pedidos p ON c.id = p.cliente_id GROUP BY c.id, c.nome ORDER BY total_pedidos DESC",
    keywords_disponiveis: ["SELECT", "FROM", "INNER JOIN", "JOIN", "LEFT JOIN", "ON", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["COUNT(*)", "SUM()"],
    operadores_disponiveis: ["=", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-033",
    nivel: "pleno",
    numero: 33,
    secao: "curriculo",
    titulo: "Gasto Total por Cliente — Incluindo Zero",
    demanda:
      "Fernanda Lima quer segmentar a base pelo gasto histórico: 'Traz nome do cliente, segmento e total_gasto (SUM valor_total dos pedidos entregues, ou 0 se nunca comprou). Ordena do maior gasto.'",
    tabelas: ["clientes", "pedidos"],
    gabarito: "SELECT c.nome, c.segmento, ROUND(COALESCE(SUM(CASE WHEN p.status = 'entregue' THEN p.valor_total ELSE 0 END), 0), 2) AS total_gasto FROM clientes c LEFT JOIN pedidos p ON c.id = p.cliente_id GROUP BY c.id, c.nome, c.segmento ORDER BY total_gasto DESC",
    keywords_disponiveis: ["SELECT", "FROM", "LEFT JOIN", "ON", "GROUP BY", "ORDER BY", "AS", "CASE", "WHEN", "THEN", "ELSE", "END"],
    funcoes_disponiveis: ["SUM()", "COALESCE()", "ROUND()", "COUNT(*)"],
    operadores_disponiveis: ["=", "DESC"],
    valores_disponiveis: ["'entregue'", "0", "2", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-034",
    nivel: "pleno",
    numero: 34,
    secao: "curriculo",
    titulo: "Produtos sem Desconto Nunca Vendidos",
    demanda:
      "Priya Nair quer identificar oportunidades: 'Quais produtos que não têm desconto configurado também nunca foram vendidos? Traz nome, categoria e preco.'",
    tabelas: ["produtos", "itens_pedido"],
    gabarito: "SELECT p.nome, p.categoria, p.preco FROM produtos p LEFT JOIN itens_pedido i ON p.id = i.produto_id WHERE p.desconto_pct IS NULL AND i.id IS NULL ORDER BY p.preco DESC",
    keywords_disponiveis: ["SELECT", "FROM", "LEFT JOIN", "ON", "WHERE", "ORDER BY", "IS NULL", "AND"],
    operadores_disponiveis: ["IS NULL", "AND", "DESC"],
    ordem_importa: true,
  },

  // ══════════════════════════════════════════════════════════════════════
  // BLOCO 05 — JOINS MÚLTIPLOS (pl-035 a pl-044)
  // ══════════════════════════════════════════════════════════════════════

  {
    id: "pl-035",
    nivel: "pleno",
    numero: 35,
    secao: "curriculo",
    titulo: "Pedido Completo: Cliente + Vendedor",
    demanda:
      "Mariana Costa precisa de uma visão 360° do pedido: 'Traz id do pedido, nome do cliente, nome do vendedor (ou Site para NULL), data_pedido, status e valor_total. Usa LEFT JOIN no vendedor para manter pedidos sem vendedor.'",
    dica: "COALESCE(v.nome, 'Site') trata o NULL do LEFT JOIN.",
    tabelas: ["pedidos", "clientes", "vendedores"],
    gabarito: "SELECT p.id, c.nome AS cliente, COALESCE(v.nome, 'Site') AS vendedor, p.data_pedido, p.status, p.valor_total FROM pedidos p JOIN clientes c ON p.cliente_id = c.id LEFT JOIN vendedores v ON p.vendedor_id = v.id ORDER BY p.data_pedido DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "LEFT JOIN", "ON", "ORDER BY", "AS", "INNER JOIN"],
    funcoes_disponiveis: ["COALESCE()", "ROUND()", "COUNT(*)"],
    operadores_disponiveis: ["=", "DESC"],
    valores_disponiveis: ["'Site'", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-036",
    nivel: "pleno",
    numero: 36,
    secao: "curriculo",
    titulo: "Item com Cliente, Produto e Pedido",
    demanda:
      "Precisa de um relatório de itens completo para o BI: 'Traz: nome do cliente, nome do produto, quantidade, preco_unit do item, data do pedido. Só itens de pedidos entregues. Ordena por data_pedido.'",
    tabelas: ["itens_pedido", "pedidos", "clientes", "produtos"],
    gabarito: "SELECT c.nome AS cliente, pr.nome AS produto, i.quantidade, i.preco_unit, p.data_pedido FROM itens_pedido i JOIN pedidos p ON i.pedido_id = p.id JOIN clientes c ON p.cliente_id = c.id JOIN produtos pr ON i.produto_id = pr.id WHERE p.status = 'entregue' ORDER BY p.data_pedido ASC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "ORDER BY", "AS", "LEFT JOIN", "INNER JOIN"],
    operadores_disponiveis: ["=", "ASC", "DESC"],
    valores_disponiveis: ["'entregue'", "ASC"],
    ordem_importa: true,
  },

  {
    id: "pl-037",
    nivel: "pleno",
    numero: 37,
    secao: "curriculo",
    titulo: "Receita por Vendedor e Região",
    demanda:
      "Thiago Santos quer o relatório de performance por vendedor: 'Traz nome do vendedor, regiao, total_pedidos e receita_total (SUM valor_total, ignorando cancelados). Usa JOIN entre pedidos e vendedores. Ordena pela maior receita.'",
    tabelas: ["pedidos", "vendedores"],
    gabarito: "SELECT v.nome, v.regiao, COUNT(p.id) AS total_pedidos, ROUND(SUM(p.valor_total), 2) AS receita_total FROM pedidos p JOIN vendedores v ON p.vendedor_id = v.id WHERE p.status != 'cancelado' GROUP BY v.id, v.nome, v.regiao ORDER BY receita_total DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["SUM()", "COUNT(*)", "ROUND()", "AVG()"],
    operadores_disponiveis: ["!=", "=", "DESC"],
    valores_disponiveis: ["'cancelado'", "2", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-038",
    nivel: "pleno",
    numero: 38,
    secao: "curriculo",
    titulo: "LTV por Cliente com Nome",
    demanda:
      "Fernanda Lima quer o Lifetime Value real dos clientes: 'Traz nome, segmento e ltv (SUM valor_total de pedidos entregues). Ordena do maior LTV. Só quem tem pelo menos 1 pedido entregue.'",
    tabelas: ["clientes", "pedidos"],
    gabarito: "SELECT c.nome, c.segmento, ROUND(SUM(p.valor_total), 2) AS ltv FROM clientes c JOIN pedidos p ON c.id = p.cliente_id WHERE p.status = 'entregue' GROUP BY c.id, c.nome, c.segmento ORDER BY ltv DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["SUM()", "ROUND()", "COUNT(*)", "AVG()"],
    operadores_disponiveis: ["=", "DESC"],
    valores_disponiveis: ["'entregue'", "2", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-039",
    nivel: "pleno",
    numero: 39,
    secao: "curriculo",
    titulo: "Produto Mais Vendido por Categoria",
    demanda:
      "Beatriz Melo quer os destaques por categoria: 'Traz categoria, nome do produto e total_unidades (SUM quantidade). Mostra só o top-1 por categoria usando GROUP BY + ORDER BY + LIMIT... ou subquery. Versão simples: sem filtrar top-1 ainda — traz categoria, produto e total_unidades de todos, ordenados por categoria ASC e total_unidades DESC.'",
    tabelas: ["itens_pedido", "pedidos", "produtos"],
    gabarito: "SELECT pr.categoria, pr.nome, SUM(i.quantidade) AS total_unidades FROM itens_pedido i JOIN produtos pr ON i.produto_id = pr.id JOIN pedidos p ON i.pedido_id = p.id WHERE p.status = 'entregue' GROUP BY pr.categoria, pr.id, pr.nome ORDER BY pr.categoria ASC, total_unidades DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["SUM()", "COUNT(*)", "AVG()"],
    operadores_disponiveis: ["=", "ASC", "DESC"],
    valores_disponiveis: ["'entregue'", "ASC", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-040",
    nivel: "pleno",
    numero: 40,
    secao: "curriculo",
    titulo: "Pedido Cartesiano — Evitando o Erro",
    demanda:
      "Lucas Oliveira te mostra o erro mais comum com JOINs: 'Se você esquecer o ON, cria um produto cartesiano (todos os pedidos com todos os clientes). Demonstra a forma CORRETA: traz id, cliente nome, status dos 5 pedidos mais recentes com JOIN correto.'",
    dica: "Sempre verifique que o ON conecta os campos corretos: pedidos.cliente_id = clientes.id. Sem esse ON, cada linha de pedidos se combina com todas as linhas de clientes.",
    tabelas: ["pedidos", "clientes"],
    gabarito: "SELECT p.id, c.nome, p.status FROM pedidos p JOIN clientes c ON p.cliente_id = c.id ORDER BY p.data_pedido DESC LIMIT 5",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "ORDER BY", "LIMIT", "AS", "LEFT JOIN", "INNER JOIN"],
    operadores_disponiveis: ["=", "DESC"],
    valores_disponiveis: ["5", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-041",
    nivel: "pleno",
    numero: 41,
    secao: "curriculo",
    titulo: "Receita Total com Desconto Real",
    demanda:
      "Rafael Drummond quer a receita líquida considerando os descontos dos itens: 'Traz pedido_id, nome do cliente e receita_liquida (SUM de preco_unit × quantidade × (1 - COALESCE(i.desconto_pct,0)/100.0)). Só pedidos entregues. Ordena da maior receita.'",
    tabelas: ["itens_pedido", "pedidos", "clientes"],
    gabarito: "SELECT p.id AS pedido_id, c.nome, ROUND(SUM(i.preco_unit * i.quantidade * (1 - COALESCE(i.desconto_pct, 0) / 100.0)), 2) AS receita_liquida FROM itens_pedido i JOIN pedidos p ON i.pedido_id = p.id JOIN clientes c ON p.cliente_id = c.id WHERE p.status = 'entregue' GROUP BY p.id, c.nome ORDER BY receita_liquida DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["SUM()", "ROUND()", "COALESCE()", "COUNT(*)"],
    operadores_disponiveis: ["*", "/", "-", "=", "DESC"],
    valores_disponiveis: ["100.0", "1", "0", "2", "'entregue'", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-042",
    nivel: "pleno",
    numero: 42,
    secao: "curriculo",
    titulo: "Clientes com Pedidos em Múltiplos Meses",
    demanda:
      "Fernanda Lima quer identificar clientes recorrentes ao longo do tempo: 'Quantos meses distintos cada cliente teve pelo menos um pedido (entregue)? Traz nome, segmento e meses_com_pedido. Só clientes com 2+ meses distintos.'",
    tabelas: ["clientes", "pedidos"],
    gabarito: "SELECT c.nome, c.segmento, COUNT(DISTINCT strftime('%Y-%m', p.data_pedido)) AS meses_com_pedido FROM clientes c JOIN pedidos p ON c.id = p.cliente_id WHERE p.status = 'entregue' GROUP BY c.id, c.nome, c.segmento HAVING COUNT(DISTINCT strftime('%Y-%m', p.data_pedido)) >= 2 ORDER BY meses_com_pedido DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "AS"],
    funcoes_disponiveis: ["COUNT(DISTINCT )", "COUNT(*)", "STRFTIME()"],
    operadores_disponiveis: ["=", ">=", "DESC"],
    valores_disponiveis: ["'%Y-%m'", "'entregue'", "2", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-043",
    nivel: "pleno",
    numero: 43,
    secao: "curriculo",
    titulo: "Margem Bruta por Vendedor",
    demanda:
      "Rafael Drummond quer cruzar performance comercial com rentabilidade: 'Traz nome do vendedor, total_vendas (COUNT pedidos entregues), receita_total e margem_total (SUM de (preco_unit - custo) × quantidade). Ordena pela maior margem.'",
    tabelas: ["pedidos", "vendedores", "itens_pedido", "produtos"],
    gabarito: "SELECT v.nome, COUNT(DISTINCT p.id) AS total_vendas, ROUND(SUM(i.preco_unit * i.quantidade), 2) AS receita_total, ROUND(SUM((i.preco_unit - pr.custo) * i.quantidade), 2) AS margem_total FROM pedidos p JOIN vendedores v ON p.vendedor_id = v.id JOIN itens_pedido i ON p.id = i.pedido_id JOIN produtos pr ON i.produto_id = pr.id WHERE p.status = 'entregue' GROUP BY v.id, v.nome ORDER BY margem_total DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["SUM()", "COUNT(DISTINCT )", "ROUND()", "AVG()"],
    operadores_disponiveis: ["*", "-", "=", "DESC"],
    valores_disponiveis: ["'entregue'", "2", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-044",
    nivel: "pleno",
    numero: 44,
    secao: "curriculo",
    titulo: "Relatório Completo de Pedido",
    demanda:
      "Mariana Costa precisa de um relatório ad-hoc: 'Para o pedido 27, mostra: nome do cliente, nome do vendedor, nome de cada produto comprado, quantidade, preco_unit e subtotal (preco_unit × quantidade). Ordena por subtotal DESC.'",
    tabelas: ["pedidos", "clientes", "vendedores", "itens_pedido", "produtos"],
    gabarito: "SELECT c.nome AS cliente, v.nome AS vendedor, pr.nome AS produto, i.quantidade, i.preco_unit, ROUND(i.preco_unit * i.quantidade, 2) AS subtotal FROM pedidos p JOIN clientes c ON p.cliente_id = c.id LEFT JOIN vendedores v ON p.vendedor_id = v.id JOIN itens_pedido i ON p.id = i.pedido_id JOIN produtos pr ON i.produto_id = pr.id WHERE p.id = 27 ORDER BY subtotal DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "LEFT JOIN", "ON", "WHERE", "ORDER BY", "AS"],
    funcoes_disponiveis: ["ROUND()", "COALESCE()"],
    operadores_disponiveis: ["*", "=", "DESC"],
    valores_disponiveis: ["27", "2", "DESC"],
    ordem_importa: true,
  },

  // ══════════════════════════════════════════════════════════════════════
  // BLOCO 06 — GROUP BY COM JOIN (pl-045 a pl-054)
  // ══════════════════════════════════════════════════════════════════════

  {
    id: "pl-045",
    nivel: "pleno",
    numero: 45,
    secao: "curriculo",
    titulo: "AOV — Ticket Médio Real por Cliente",
    demanda:
      "Fernanda Lima quer o AOV (Average Order Value) de cada cliente: 'Traz nome do cliente e aov (AVG valor_total dos pedidos entregues). Ordena do maior AOV. Só clientes com pelo menos 2 pedidos entregues.'",
    tabelas: ["clientes", "pedidos"],
    gabarito: "SELECT c.nome, ROUND(AVG(p.valor_total), 2) AS aov FROM clientes c JOIN pedidos p ON c.id = p.cliente_id WHERE p.status = 'entregue' GROUP BY c.id, c.nome HAVING COUNT(p.id) >= 2 ORDER BY aov DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "AS"],
    funcoes_disponiveis: ["AVG()", "ROUND()", "COUNT(*)", "SUM()"],
    operadores_disponiveis: ["=", ">=", "DESC"],
    valores_disponiveis: ["'entregue'", "2", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-046",
    nivel: "pleno",
    numero: 46,
    secao: "curriculo",
    titulo: "GMV por Mês",
    demanda:
      "Rafael Drummond quer o GMV (Gross Merchandise Value) mensal: 'Traz mes (YYYY-MM) e gmv (SUM de preco_unit × quantidade de todos os itens de pedidos entregues). Ordena cronologicamente.'",
    tabelas: ["itens_pedido", "pedidos"],
    gabarito: "SELECT strftime('%Y-%m', p.data_pedido) AS mes, ROUND(SUM(i.preco_unit * i.quantidade), 2) AS gmv FROM itens_pedido i JOIN pedidos p ON i.pedido_id = p.id WHERE p.status = 'entregue' GROUP BY mes ORDER BY mes ASC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["SUM()", "ROUND()", "COUNT(*)", "STRFTIME()"],
    operadores_disponiveis: ["*", "=", "ASC"],
    valores_disponiveis: ["'%Y-%m'", "'entregue'", "2", "ASC"],
    ordem_importa: true,
  },

  {
    id: "pl-047",
    nivel: "pleno",
    numero: 47,
    secao: "curriculo",
    titulo: "Top 5 Clientes por Receita",
    demanda:
      "Beatriz Melo quer os clientes VIP para uma campanha exclusiva: 'Top 5 clientes com maior gasto total (pedidos entregues). Traz nome, segmento e total_gasto.'",
    tabelas: ["clientes", "pedidos"],
    gabarito: "SELECT c.nome, c.segmento, ROUND(SUM(p.valor_total), 2) AS total_gasto FROM clientes c JOIN pedidos p ON c.id = p.cliente_id WHERE p.status = 'entregue' GROUP BY c.id, c.nome, c.segmento ORDER BY total_gasto DESC LIMIT 5",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "GROUP BY", "ORDER BY", "LIMIT", "AS"],
    funcoes_disponiveis: ["SUM()", "ROUND()", "COUNT(*)", "AVG()"],
    operadores_disponiveis: ["=", "DESC"],
    valores_disponiveis: ["'entregue'", "2", "5", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-048",
    nivel: "pleno",
    numero: 48,
    secao: "curriculo",
    titulo: "Receita por Categoria com Margem",
    demanda:
      "Mariana Costa monta o dashboard de rentabilidade por categoria: 'Traz categoria, receita_total (SUM preco_unit×quantidade) e margem_total (SUM (preco_unit-custo)×quantidade). Só pedidos entregues. Ordena pela maior margem.'",
    tabelas: ["itens_pedido", "pedidos", "produtos"],
    gabarito: "SELECT pr.categoria, ROUND(SUM(i.preco_unit * i.quantidade), 2) AS receita_total, ROUND(SUM((i.preco_unit - pr.custo) * i.quantidade), 2) AS margem_total FROM itens_pedido i JOIN produtos pr ON i.produto_id = pr.id JOIN pedidos p ON i.pedido_id = p.id WHERE p.status = 'entregue' GROUP BY pr.categoria ORDER BY margem_total DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["SUM()", "ROUND()", "COUNT(*)"],
    operadores_disponiveis: ["*", "-", "=", "DESC"],
    valores_disponiveis: ["'entregue'", "2", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-049",
    nivel: "pleno",
    numero: 49,
    secao: "curriculo",
    titulo: "Média de Itens por Pedido",
    demanda:
      "Mariana Costa quer entender o comportamento de compra: 'Qual a média de itens (linhas de itens_pedido) por pedido? Traz uma linha só: media_itens_por_pedido arredondada para 1 casa. Considere só pedidos entregues.'",
    dica: "Você pode usar uma subquery: SELECT AVG(total) FROM (SELECT pedido_id, COUNT(*) AS total FROM itens_pedido ... GROUP BY pedido_id). Ou COUNT(i.id) / COUNT(DISTINCT p.id) com JOIN.",
    tabelas: ["itens_pedido", "pedidos"],
    gabarito: "SELECT ROUND(CAST(COUNT(i.id) AS REAL) / COUNT(DISTINCT i.pedido_id), 1) AS media_itens_por_pedido FROM itens_pedido i JOIN pedidos p ON i.pedido_id = p.id WHERE p.status = 'entregue'",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "AS"],
    funcoes_disponiveis: ["COUNT(*)", "COUNT(DISTINCT )", "ROUND()", "AVG()", "CAST( AS )"],
    operadores_disponiveis: ["/", "="],
    valores_disponiveis: ["'entregue'", "1", "REAL"],
  },

  {
    id: "pl-050",
    nivel: "pleno",
    numero: 50,
    secao: "curriculo",
    titulo: "Receita por Segmento de Cliente",
    demanda:
      "Rafael Drummond quer comparar B2C vs B2B em receita: 'Traz segmento, total_clientes_que_compraram (COUNT DISTINCT), total_pedidos e receita_total (pedidos entregues). Ordena pela maior receita.'",
    tabelas: ["clientes", "pedidos"],
    gabarito: "SELECT c.segmento, COUNT(DISTINCT c.id) AS total_clientes, COUNT(p.id) AS total_pedidos, ROUND(SUM(p.valor_total), 2) AS receita_total FROM clientes c JOIN pedidos p ON c.id = p.cliente_id WHERE p.status = 'entregue' GROUP BY c.segmento ORDER BY receita_total DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["COUNT(DISTINCT )", "COUNT(*)", "SUM()", "ROUND()", "AVG()"],
    operadores_disponiveis: ["=", "DESC"],
    valores_disponiveis: ["'entregue'", "2", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-051",
    nivel: "pleno",
    numero: 51,
    secao: "curriculo",
    titulo: "Clientes com Pedido Cancelado",
    demanda:
      "Fernanda Lima quer estudar o churn: 'Quais clientes tiveram pelo menos 1 pedido cancelado? Traz nome, email e total_cancelados. Ordena pelo maior número de cancelamentos.'",
    tabelas: ["clientes", "pedidos"],
    gabarito: "SELECT c.nome, c.email, COUNT(p.id) AS total_cancelados FROM clientes c JOIN pedidos p ON c.id = p.cliente_id WHERE p.status = 'cancelado' GROUP BY c.id, c.nome, c.email ORDER BY total_cancelados DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["COUNT(*)", "SUM()", "AVG()"],
    operadores_disponiveis: ["=", "DESC"],
    valores_disponiveis: ["'cancelado'", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-052",
    nivel: "pleno",
    numero: 52,
    secao: "curriculo",
    titulo: "Receita por UF",
    demanda:
      "Camila Torres quer um mapa geográfico de receita: 'Traz uf, total_clientes_com_pedido (COUNT DISTINCT clientes) e receita_total (pedidos entregues). Ordena pela maior receita.'",
    tabelas: ["clientes", "pedidos"],
    gabarito: "SELECT c.uf, COUNT(DISTINCT c.id) AS total_clientes, ROUND(SUM(p.valor_total), 2) AS receita_total FROM clientes c JOIN pedidos p ON c.id = p.cliente_id WHERE p.status = 'entregue' GROUP BY c.uf ORDER BY receita_total DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["COUNT(DISTINCT )", "SUM()", "ROUND()", "COUNT(*)"],
    operadores_disponiveis: ["=", "DESC"],
    valores_disponiveis: ["'entregue'", "2", "DESC"],
    ordem_importa: true,
  },

  {
    id: "pl-053",
    nivel: "pleno",
    numero: 53,
    secao: "curriculo",
    titulo: "Primeiro e Último Pedido de Cada Cliente",
    demanda:
      "Mariana Costa quer fazer análise de cohort: 'Traz nome do cliente, data do primeiro pedido (MIN data_pedido) e data do último pedido (MAX data_pedido). Só pedidos entregues. Ordena pelo primeiro pedido mais antigo.'",
    tabelas: ["clientes", "pedidos"],
    gabarito: "SELECT c.nome, MIN(p.data_pedido) AS primeiro_pedido, MAX(p.data_pedido) AS ultimo_pedido FROM clientes c JOIN pedidos p ON c.id = p.cliente_id WHERE p.status = 'entregue' GROUP BY c.id, c.nome ORDER BY primeiro_pedido ASC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "GROUP BY", "ORDER BY", "AS"],
    funcoes_disponiveis: ["MIN()", "MAX()", "COUNT(*)", "SUM()"],
    operadores_disponiveis: ["=", "ASC"],
    valores_disponiveis: ["'entregue'", "ASC"],
    ordem_importa: true,
  },

  {
    id: "pl-054",
    nivel: "pleno",
    numero: 54,
    secao: "curriculo",
    titulo: "Vendedores com Desempenho Acima da Meta",
    demanda:
      "Thiago Santos quer reconhecer os top performers: 'Para cada vendedor, calcula a receita total (pedidos entregues) e compara com a meta_mensal × 3 (meta trimestral aproximada). Traz nome, receita_total e meta_trimestral. Mostra só quem superou a meta trimestral. Ordena pela maior receita.'",
    tabelas: ["pedidos", "vendedores"],
    gabarito: "SELECT v.nome, ROUND(SUM(p.valor_total), 2) AS receita_total, v.meta_mensal * 3 AS meta_trimestral FROM pedidos p JOIN vendedores v ON p.vendedor_id = v.id WHERE p.status = 'entregue' GROUP BY v.id, v.nome, v.meta_mensal HAVING SUM(p.valor_total) >= v.meta_mensal * 3 ORDER BY receita_total DESC",
    keywords_disponiveis: ["SELECT", "FROM", "JOIN", "ON", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "AS"],
    funcoes_disponiveis: ["SUM()", "ROUND()", "COUNT(*)", "AVG()"],
    operadores_disponiveis: ["*", ">=", "=", "DESC"],
    valores_disponiveis: ["'entregue'", "3", "2", "DESC"],
    ordem_importa: true,
  },

];
