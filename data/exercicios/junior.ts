import type { ExercicioRaw } from "@/lib/types";

/**
 * 90 exercícios do nível JÚNIOR.
 *
 * Currículo (15 blocos):
 *   Bloco 01 (jr-001..005) SELECT básico, *, alias, DISTINCT
 *   Bloco 02 (jr-006..008) WHERE numérico e expressões
 *   Bloco 03 (jr-009..015) WHERE texto + LIKE (todas as variações)
 *   Bloco 04 (jr-016..022) IN, NOT IN, BETWEEN, IS NULL, COALESCE
 *   Bloco 05 (jr-023..028) AND, OR, NOT, precedência
 *   Bloco 06 (jr-029..034) ORDER BY, LIMIT, OFFSET
 *   Bloco 07 (jr-035..036) DISTINCT multi-coluna
 *   Bloco 08 (jr-037..041) AS, expressões aritméticas, concatenação ||
 *   Bloco 09 (jr-042..047) Funções de texto: UPPER/LOWER/LENGTH/SUBSTR/TRIM/REPLACE
 *   Bloco 10 (jr-048..053) Agregação escalar: COUNT, SUM, AVG, MIN, MAX
 *   Bloco 11 (jr-054..057) CASE WHEN básico
 *   Bloco 12 (jr-058..060) ROUND, ABS, CAST
 *   Bloco 13 (jr-061..065) Datas: strftime, date('now'), julianday, modifiers
 *   Bloco 14 (jr-066..080) Reforço: exercícios multi-conceito sem dica
 *   Bloco 15 (jr-081..090) Simulado de entrevista Júnior (Valentina Cruz)
 *
 * Universo: DataCo — e-commerce brasileiro de eletrônicos, 2026.
 *
 * Personagens recorrentes:
 *   Ana Beatriz  — Gestora direta do analista
 *   Camila Torres — Diretora de Marketing
 *   Rafael Drummond — CFO
 *   Diego Mendes — Gerente de Logística
 *   Priya Nair — Head de Produto
 *   Lucas Oliveira — Analista de BI Sênior (mentor)
 *   Beatriz Melo — Gerente Comercial
 *   Valentina Cruz — Engenheira de Dados Sênior (entrevistadora do bloco 15)
 */
export const EXERCICIOS_JUNIOR: ExercicioRaw[] = [

  // ═══════════════════════════════════════════════════════════════
  // BLOCO 1 — SELECT BÁSICO (jr-001 a jr-005)
  // ═══════════════════════════════════════════════════════════════

  {
    id: "jr-001",
    nivel: "junior",
    secao: "curriculo",
    numero: 1,
    titulo: "Bem-vindo à DataCo!",
    demanda:
      "Hoje é o seu primeiro dia como Analista de Dados Júnior na DataCo, o maior e-commerce de eletrônicos do Brasil. Sua gestora Ana Beatriz aparece com um sorriso: 'Que bom que você chegou! Precisamos te ambientar. Para começar, pode me trazer uma listagem completa de todos os nossos produtos com TODAS as informações disponíveis? Quero ver tudo mesmo — isso vai te ajudar a entender o que a gente vende.' Mostre todos os dados de todos os produtos.",
    dica: "Use SELECT * para trazer todas as colunas de uma tabela. O asterisco (*) representa 'tudo'.",
    tabelas: ["produtos"],
    gabarito: "SELECT * FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM"],
  },

  {
    id: "jr-002",
    nivel: "junior",
    secao: "curriculo",
    numero: 2,
    titulo: "Lista para a Campanha de Email",
    demanda:
      "Camila Torres, a Diretora de Marketing, acabou de entrar na sala. 'Preciso de uma lista de produtos para enviar para a nossa agência de publicidade criar os criativos da campanha de Black Friday. Eles pediram só os nomes, nada mais.' Você abre o Slack e vê a mensagem dela com o pedido. Extraia apenas a coluna nome de todos os produtos.",
    dica: "Em vez de SELECT *, especifique somente a coluna que você quer: SELECT nome FROM produtos",
    tabelas: ["produtos"],
    gabarito: "SELECT nome FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM"],
  },

  {
    id: "jr-003",
    nivel: "junior",
    secao: "curriculo",
    numero: 3,
    titulo: "Catálogo Simplificado para o BI",
    demanda:
      "Lucas Oliveira, o Analista de BI Sênior que está te mentorando, manda uma mensagem: 'Ei, para montar o dashboard de precificação preciso de um catálogo enxuto — só nome, marca e preço de cada produto, nessa ordem. Pode me ajudar? Vai ser a base de um relatório que o board vai ver semana que vem.' Gere essa listagem exatamente como ele pediu.",
    dica: "Você pode listar várias colunas separadas por vírgula no SELECT: SELECT col1, col2, col3.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, marca, preco FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM"],
  },

  {
    id: "jr-004",
    nivel: "junior",
    secao: "curriculo",
    numero: 4,
    titulo: "Renomeando Colunas para o CEO",
    demanda:
      "Ana Beatriz chega correndo: 'O CEO vai ver o relatório amanhã e ele reclamou da última vez que o nome das colunas era muito técnico. Você consegue gerar a lista de produtos com o nome e o preço, mas renomeando a coluna preco para Valor (R$)? Fica mais apresentável.' Faça isso usando alias.",
    dica: "Use AS para criar um apelido (alias) para a coluna: SELECT preco AS 'Valor (R$)'",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco AS 'Valor (R$)' FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
  },

  {
    id: "jr-005",
    nivel: "junior",
    secao: "curriculo",
    numero: 5,
    titulo: "Quais Categorias Temos?",
    demanda:
      "Priya Nair, a Head de Produto, quer mapear o portfólio da DataCo. Ela te manda um recado: 'Preciso saber em quantas categorias a gente atua — você pode me trazer a lista de categorias únicas que temos no catálogo? Sem repetir a mesma categoria múltiplas vezes.' Retorne cada categoria uma única vez.",
    dica: "Use DISTINCT antes da coluna para eliminar duplicatas: SELECT DISTINCT categoria.",
    tabelas: ["produtos"],
    gabarito: "SELECT DISTINCT categoria FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "DISTINCT"],
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO 2 — WHERE NUMÉRICO E EXPRESSÕES (jr-006 a jr-008)
  // ═══════════════════════════════════════════════════════════════

  {
    id: "jr-006",
    nivel: "junior",
    secao: "curriculo",
    numero: 6,
    titulo: "Produtos Premium para o Comercial",
    demanda:
      "Beatriz Melo, a Gerente Comercial, está preparando uma reunião com representantes de marcas premium. Ela te liga: 'Preciso de uma lista focada em produtos de alto valor — só nome e preço dos produtos que custam mais de R$5.000. Esse é o segmento que vamos trabalhar com os representantes.' Filtre os produtos com preço acima desse valor.",
    dica: "Use WHERE para filtrar linhas. Com números, os operadores são: > maior, < menor, >= maior ou igual, <= menor ou igual, = igual, != diferente.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco FROM produtos WHERE preco > 5000",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE"],
    operadores_disponiveis: [">", "<", ">=", "<=", "=", "!="],
    valores_disponiveis: ["5000"],
  },

  {
    id: "jr-007",
    nivel: "junior",
    secao: "curriculo",
    numero: 7,
    titulo: "Alerta de Estoque Crítico",
    demanda:
      "Diego Mendes, o Gerente de Logística, te manda uma mensagem urgente no Teams: 'Temos uma reunião de reposição amanhã cedo e eu preciso identificar quais produtos estão com estoque ABAIXO de 30 unidades — são os que estamos em risco de ruptura. Me passa nome e estoque desses produtos?' Ele precisa desses dados antes do fim do dia.",
    dica: "O operador < retorna linhas onde o valor é estritamente menor que o número especificado.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, estoque FROM produtos WHERE estoque < 30",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE"],
    operadores_disponiveis: ["<", ">", "<=", ">=", "=", "!="],
    valores_disponiveis: ["30"],
  },

  {
    id: "jr-008",
    nivel: "junior",
    secao: "curriculo",
    numero: 8,
    titulo: "Análise de Margem Bruta",
    demanda:
      "Rafael Drummond, o CFO, convocou uma reunião de resultado e quer uma análise de margem. Ele te manda um email: 'Preciso de uma tabela com nome, preço, custo e a margem bruta calculada (preço menos custo) de todos os produtos onde essa margem seja maior que R$2.000. É para o relatório de rentabilidade do Q2.' Crie uma coluna calculada chamada margem.",
    dica: "Você pode usar expressões aritméticas tanto no SELECT quanto no WHERE: (preco - custo) calcula a margem. Dê um alias 'margem' para a coluna calculada.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, preco, custo, preco - custo AS margem FROM produtos WHERE preco - custo > 2000",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AS"],
    operadores_disponiveis: [">", "-", "<", "="],
    valores_disponiveis: ["2000"],
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO 3 — WHERE TEXTO + LIKE (jr-009 a jr-015)
  // ═══════════════════════════════════════════════════════════════

  {
    id: "jr-009",
    nivel: "junior",
    secao: "curriculo",
    numero: 9,
    titulo: "Relatório de Produtos Apple",
    demanda:
      "A DataCo tem uma parceria especial com a Apple e o gerente de conta pediu um relatório completo do portfólio deles na nossa plataforma. Beatriz Melo te repassa o pedido: 'Precisa de nome, marca e preço de todos os produtos da marca Apple. Eles vão usar para comparar com a concorrência.' Filtre apenas os produtos da marca Apple.",
    dica: "Para filtrar por texto, use aspas simples em volta do valor: WHERE marca = 'Apple'",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, marca, preco FROM produtos WHERE marca = 'Apple'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE"],
    operadores_disponiveis: ["="],
    valores_disponiveis: ["'Apple'"],
  },

  {
    id: "jr-010",
    nivel: "junior",
    secao: "curriculo",
    numero: 10,
    titulo: "Toda a Família iPhone",
    demanda:
      "Camila Torres está preparando uma landing page especial para a linha iPhone. Ela te manda uma mensagem rápida: 'Preciso de todos os iPhones que a gente tem no catálogo — nome e preço. Só os iPhones mesmo, independente da versão ou capacidade.' Use LIKE para encontrar todos os produtos cujo nome comece com 'iPhone'.",
    dica: "LIKE usa o caractere % como curinga. 'iPhone%' significa 'começa com iPhone, pode ter qualquer coisa depois'.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco FROM produtos WHERE nome LIKE 'iPhone%'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "LIKE"],
    valores_disponiveis: ["'iPhone%'", "'%iPhone'", "'%iPhone%'"],
  },

  {
    id: "jr-011",
    nivel: "junior",
    secao: "curriculo",
    numero: 11,
    titulo: "Todos os Modelos Pro",
    demanda:
      "Priya Nair está montando um relatório de roadmap para os produtos da linha premium. Ela te pede: 'Preciso de uma lista de todos os produtos cujo nome termina com Pro — esses são nossos modelos topo de linha. Me passa nome e marca?' Use LIKE para filtrar esses produtos.",
    dica: "O padrão '%Pro' significa 'pode ter qualquer coisa antes, mas deve terminar com Pro'.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, marca FROM produtos WHERE nome LIKE '%Pro'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "LIKE"],
    valores_disponiveis: ["'%Pro'", "'Pro%'", "'%Pro%'"],
  },

  {
    id: "jr-012",
    nivel: "junior",
    secao: "curriculo",
    numero: 12,
    titulo: "Linha Galaxy Completa",
    demanda:
      "O representante da Samsung vai visitar a DataCo amanhã e a Beatriz Melo precisa de uma visão geral do portfólio Samsung Galaxy. 'Me passa nome e categoria de tudo que tiver Galaxy no nome — pode ser Galaxy S25, Galaxy Tab, Galaxy Buds, qualquer coisa da família Galaxy.' Use LIKE com o padrão correto.",
    dica: "Use %Galaxy% — o % no início significa 'pode ter qualquer coisa antes' e o % no final 'pode ter qualquer coisa depois'.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, categoria FROM produtos WHERE nome LIKE '%Galaxy%'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "LIKE"],
    valores_disponiveis: ["'%Galaxy%'", "'Galaxy%'", "'%Galaxy'"],
  },

  {
    id: "jr-013",
    nivel: "junior",
    secao: "curriculo",
    numero: 13,
    titulo: "Versões com Número 5",
    demanda:
      "Diego Mendes está reorganizando o armazém e precisa identificar os produtos de uma determinada geração tecnológica. 'Sabe esses produtos que têm o número 5 no nome — tipo o S25, A55, Moto G75, iPhone 16? Preciso do nome de todos eles para etiquetar as prateleiras.' Traga o nome dos produtos que contenham o caractere '5' em qualquer parte do nome.",
    dica: "Use %5% — com % em ambos os lados, o LIKE vai encontrar o padrão em qualquer posição do texto.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome FROM produtos WHERE nome LIKE '%5%'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "LIKE"],
    valores_disponiveis: ["'%5%'", "'5%'", "'%5'"],
  },

  {
    id: "jr-014",
    nivel: "junior",
    secao: "curriculo",
    numero: 14,
    titulo: "Produtos Fora da Linha Pro",
    demanda:
      "Camila Torres está criando a campanha 'Tudo que não é Pro é para todo mundo' — uma iniciativa para atrair clientes que não querem os modelos mais caros. 'Preciso de nome e categoria de todos os produtos que não terminam com Pro. Vou usar essa lista para criar os criativos da campanha.' Exclua os produtos cujo nome termina com 'Pro'.",
    dica: "Use NOT LIKE para filtrar o oposto. WHERE nome NOT LIKE '%Pro' retorna linhas que não batem com o padrão.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, categoria FROM produtos WHERE nome NOT LIKE '%Pro'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "NOT", "LIKE"],
    valores_disponiveis: ["'%Pro'", "'Pro%'"],
  },

  {
    id: "jr-015",
    nivel: "junior",
    secao: "curriculo",
    numero: 15,
    titulo: "Notebooks Acessíveis",
    demanda:
      "Lucas Oliveira está mentorando um exercício que mistura filtro de texto com filtro numérico. 'Vou te dar um desafio real que aparece bastante: o time comercial quer ver notebooks que contenham Galaxy no nome e custem menos de R$3.000. Isso mostra que você sabe combinar LIKE com comparação numérica no mesmo WHERE.' Traga nome e preço.",
    dica: "Combine LIKE e comparação numérica com AND: WHERE nome LIKE '%Galaxy%' AND preco < 3000",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, preco FROM produtos WHERE nome LIKE '%Galaxy%' AND preco < 3000",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "LIKE", "AND"],
    operadores_disponiveis: ["<", ">"],
    valores_disponiveis: ["'%Galaxy%'", "3000"],
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO 4 — IN, NOT IN, BETWEEN, IS NULL, COALESCE (jr-016 a jr-022)
  // ═══════════════════════════════════════════════════════════════

  {
    id: "jr-016",
    nivel: "junior",
    secao: "curriculo",
    numero: 16,
    titulo: "Catálogo Multi-Marca",
    demanda:
      "A DataCo está negociando uma verba cooperada com Apple, Samsung e Google para um hotsite conjunto. Beatriz Melo te pede: 'Preciso de nome e marca de todos os produtos dessas três marcas para montar o briefing da ação. São Apple, Samsung e Google — pode trazer todos?' Use IN para filtrar por múltiplas marcas de uma vez.",
    dica: "IN é mais limpo que várias condições com OR: WHERE marca IN ('Apple', 'Samsung', 'Google')",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, marca FROM produtos WHERE marca IN ('Apple', 'Samsung', 'Google')",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "IN"],
    valores_disponiveis: ["'Apple'", "'Samsung'", "'Google'"],
  },

  {
    id: "jr-017",
    nivel: "junior",
    secao: "curriculo",
    numero: 17,
    titulo: "Marcas Alternativas",
    demanda:
      "Priya Nair quer diversificar o catálogo com marcas menos conhecidas. 'Para o nosso programa de novos fornecedores, preciso listar os produtos que não são da Apple, Samsung nem Google. Esses são os que precisam de mais visibilidade.' Traga nome e marca de todos os produtos fora das três grandes.",
    dica: "NOT IN exclui uma lista de valores: WHERE marca NOT IN ('Apple', 'Samsung', 'Google')",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, marca FROM produtos WHERE marca NOT IN ('Apple', 'Samsung', 'Google')",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "NOT", "IN"],
    valores_disponiveis: ["'Apple'", "'Samsung'", "'Google'"],
  },

  {
    id: "jr-018",
    nivel: "junior",
    secao: "curriculo",
    numero: 18,
    titulo: "Faixa de Preço para o Dia das Mães",
    demanda:
      "A campanha do Dia das Mães tem foco em presentes entre R$1.500 e R$3.500 — faixa identificada como a mais convertida no ano passado. Camila Torres te passa: 'Preciso de nome e preço dos produtos nessa faixa para montar o banner do hotsite. Inclui os extremos sim — R$1.500 e R$3.500 também entram.' Use BETWEEN para simplificar.",
    dica: "BETWEEN inclui os dois extremos: WHERE preco BETWEEN 1500 AND 3500 é equivalente a WHERE preco >= 1500 AND preco <= 3500",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, preco FROM produtos WHERE preco BETWEEN 1500 AND 3500",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "BETWEEN", "AND"],
    valores_disponiveis: ["1500", "3500"],
  },

  {
    id: "jr-019",
    nivel: "junior",
    secao: "curriculo",
    numero: 19,
    titulo: "Lançamentos de 2024",
    demanda:
      "Priya Nair está montando o relatório de produto para a revisão anual: 'Preciso de todos os produtos que foram lançados em 2024 — nome e data de lançamento. Vamos avaliar a performance desses produtos um ano depois do lançamento.' As datas estão no formato YYYY-MM-DD, então BETWEEN funciona para filtrar o intervalo de um ano inteiro.",
    dica: "BETWEEN funciona com datas em formato texto YYYY-MM-DD porque a ordem lexicográfica coincide com a ordem cronológica nesse formato.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, lancamento FROM produtos WHERE lancamento BETWEEN '2024-01-01' AND '2024-12-31'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "BETWEEN", "AND"],
    valores_disponiveis: ["'2024-01-01'", "'2024-12-31'"],
  },

  {
    id: "jr-020",
    nivel: "junior",
    secao: "curriculo",
    numero: 20,
    titulo: "Produtos Sem Desconto",
    demanda:
      "Rafael Drummond está revisando a política de precificação: 'Preciso saber quais produtos ainda não têm desconto cadastrado no sistema — esses são candidatos para ações promocionais que ainda não foram configuradas. Me traz nome e marca desses produtos.' O campo desconto_pct fica nulo quando não há desconto configurado.",
    dica: "CUIDADO: WHERE coluna = NULL não funciona em SQL! Para verificar se um campo é nulo, use IS NULL.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, marca FROM produtos WHERE desconto_pct IS NULL",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "IS NULL"],
  },

  {
    id: "jr-021",
    nivel: "junior",
    secao: "curriculo",
    numero: 21,
    titulo: "Promoções Ativas",
    demanda:
      "Camila Torres precisa de uma lista para o relatório de promoções ativas da semana: 'Quero ver nome e o percentual de desconto de todos os produtos que já têm um desconto configurado — esses vão entrar no email marketing de amanhã.' Filtre apenas os que têm desconto_pct preenchido.",
    dica: "IS NOT NULL retorna linhas onde o campo tem algum valor (não é nulo).",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, desconto_pct FROM produtos WHERE desconto_pct IS NOT NULL",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "IS NOT NULL"],
  },

  {
    id: "jr-022",
    nivel: "junior",
    secao: "curriculo",
    numero: 22,
    titulo: "Desconto Padrão para o Frontend",
    demanda:
      "O time de desenvolvimento precisa exibir o desconto de todos os produtos na vitrine, mas o campo pode estar nulo. Lucas Oliveira explica: 'Quando não tem desconto configurado, o frontend precisa receber 0 — não pode receber NULL porque vai quebrar o componente. Use COALESCE para resolver isso. Traga nome e desconto_pct com zero nos nulos.'",
    dica: "COALESCE(valor, default) retorna o primeiro argumento se não for NULL, ou o segundo caso seja NULL.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, COALESCE(desconto_pct, 0) AS desconto_pct FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["COALESCE()"],
    valores_disponiveis: ["0"],
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO 5 — AND, OR, NOT, PRECEDÊNCIA (jr-023 a jr-028)
  // ═══════════════════════════════════════════════════════════════

  {
    id: "jr-023",
    nivel: "junior",
    secao: "curriculo",
    numero: 23,
    titulo: "Smartphones de Alto Valor",
    demanda:
      "Beatriz Melo está montando o kit de apresentação para uma operadora de celular que quer fazer um bundle com smartphones premium: 'Preciso de nome e preço dos smartphones acima de R$7.000. São dois critérios juntos — categoria E preço. Pode me ajudar?' Use AND para combinar as duas condições.",
    dica: "AND combina condições: AMBAS precisam ser verdadeiras para a linha aparecer no resultado.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, preco FROM produtos WHERE categoria = 'Smartphones' AND preco > 7000",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AND"],
    operadores_disponiveis: [">", "="],
    valores_disponiveis: ["'Smartphones'", "7000"],
  },

  {
    id: "jr-024",
    nivel: "junior",
    secao: "curriculo",
    numero: 24,
    titulo: "Combo de Presentes",
    demanda:
      "A DataCo vai lançar uma campanha de combos para o Dia dos Namorados. Camila Torres quer produtos das categorias Audio ou Wearables para sugerir como presentes: 'Me traz nome e categoria dos produtos nessas duas categorias — fones e smartwatches são perfeitos para presentear.' Use OR para buscar as duas categorias.",
    dica: "OR retorna linhas onde PELO MENOS UMA das condições é verdadeira.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, categoria FROM produtos WHERE categoria = 'Audio' OR categoria = 'Wearables'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "OR"],
    operadores_disponiveis: ["="],
    valores_disponiveis: ["'Audio'", "'Wearables'"],
  },

  {
    id: "jr-025",
    nivel: "junior",
    secao: "curriculo",
    numero: 25,
    titulo: "Segmentação Complexa",
    demanda:
      "Rafael Drummond quer uma análise cruzada para a reunião de sócios: 'Produtos Apple acima de R$5.000 OU produtos Samsung abaixo de R$3.000 — são dois segmentos distintos que quero analisar juntos: Apple premium versus Samsung custo-benefício. Preciso de nome, marca e preço.' Atenção: use parênteses para deixar a lógica clara.",
    dica: "Sem parênteses, AND tem precedência sobre OR (é avaliado primeiro). Use (a AND b) OR (c AND d) para garantir que cada par seja avaliado junto.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, marca, preco FROM produtos WHERE (marca = 'Apple' AND preco > 5000) OR (marca = 'Samsung' AND preco < 3000)",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AND", "OR"],
    operadores_disponiveis: [">", "<", "="],
    valores_disponiveis: ["'Apple'", "'Samsung'", "5000", "3000"],
  },

  {
    id: "jr-026",
    nivel: "junior",
    secao: "curriculo",
    numero: 26,
    titulo: "Notebooks em Promoção ou Baratos",
    demanda:
      "Diego Mendes está reorganizando a área de exposição dos notebooks e quer destacar duas situações: 'Me passa nome, preço e estoque dos notebooks que estão em promoção (desconto_pct preenchido) OU que custam menos de R$5.000 — esses vão ficar nas gondolas de destaque.' Use AND e OR com parênteses.",
    dica: "Agrupe com parênteses quando misturar AND e OR: WHERE categoria = 'X' AND (condição1 OR condição2)",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, preco, estoque FROM produtos WHERE categoria = 'Notebooks' AND (preco < 5000 OR estoque > 80)",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AND", "OR"],
    operadores_disponiveis: ["<", ">", "="],
    valores_disponiveis: ["'Notebooks'", "5000", "80"],
  },

  {
    id: "jr-027",
    nivel: "junior",
    secao: "curriculo",
    numero: 27,
    titulo: "Tudo Exceto Smartphones",
    demanda:
      "Priya Nair está fazendo uma análise de diversificação de portfólio e quer ver tudo que não seja smartphone: 'Para entender nossa força além de celulares, me traz nome e categoria de todos os produtos que não são da categoria Smartphones.' Você pode usar != ou NOT.",
    dica: "Você pode escrever WHERE NOT categoria = 'Smartphones' ou WHERE categoria != 'Smartphones'. Os dois funcionam — escolha o que achar mais legível.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, categoria FROM produtos WHERE NOT categoria = 'Smartphones'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "NOT"],
    operadores_disponiveis: ["=", "!="],
    valores_disponiveis: ["'Smartphones'"],
  },

  {
    id: "jr-028",
    nivel: "junior",
    secao: "curriculo",
    numero: 28,
    titulo: "Relatório Executivo Cruzado",
    demanda:
      "Ana Beatriz precisa de um relatório para apresentar na reunião de diretoria esta tarde: 'Precisamos de produtos que sejam da Apple ou Samsung, com preço entre R$2.000 e R$8.000, e que ainda tenham pelo menos 30 unidades em estoque. São esses que vão entrar na vitrine principal amanhã. Traz nome, marca, preço e estoque.' Combine IN, BETWEEN e AND.",
    dica: "Você pode combinar IN com BETWEEN e AND na mesma query. Leia como: 'marca deve ser Apple ou Samsung, E preço deve estar na faixa, E estoque deve ser suficiente'.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, marca, preco, estoque FROM produtos WHERE marca IN ('Apple', 'Samsung') AND preco BETWEEN 2000 AND 8000 AND estoque > 30",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "IN", "BETWEEN", "AND"],
    operadores_disponiveis: [">"],
    valores_disponiveis: ["'Apple'", "'Samsung'", "2000", "8000", "30"],
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO 6 — ORDER BY, LIMIT, OFFSET (jr-029 a jr-034)
  // ═══════════════════════════════════════════════════════════════

  {
    id: "jr-029",
    nivel: "junior",
    secao: "curriculo",
    numero: 29,
    titulo: "Catálogo em Ordem Alfabética",
    demanda:
      "O time de UX vai lançar uma nova versão da página de listagem e quer o catálogo em ordem alfabética por padrão. Camila Torres te passa o requisito: 'Para o redesign, preciso do catálogo ordenado por nome de A a Z. Me traz nome e marca nessa ordem para eu montar o mockup?' Ordene ascendentemente por nome.",
    dica: "ORDER BY coluna ASC ordena crescente. ASC é o padrão — pode omitir. ORDER BY coluna DESC ordena decrescente.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, marca FROM produtos ORDER BY nome ASC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY"],
    valores_disponiveis: ["ASC", "DESC"],
    ordem_importa: true,
  },

  {
    id: "jr-030",
    nivel: "junior",
    secao: "curriculo",
    numero: 30,
    titulo: "Os Mais Caros do Catálogo",
    demanda:
      "Rafael Drummond precisa de uma lista para o relatório de produtos premium: 'Me manda todos os produtos do mais caro para o mais barato — quero ver nome e preço nessa ordem decrescente. Isso vai para a ata da reunião de pricing.' Ordene por preço de forma decrescente.",
    dica: "Para ordem decrescente (maior para menor), use ORDER BY coluna DESC.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco FROM produtos ORDER BY preco DESC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY"],
    valores_disponiveis: ["DESC", "ASC"],
    ordem_importa: true,
  },

  {
    id: "jr-031",
    nivel: "junior",
    secao: "curriculo",
    numero: 31,
    titulo: "Catálogo por Categoria e Preço",
    demanda:
      "Diego Mendes vai reorganizar o armazém por categoria e, dentro de cada categoria, pelos produtos mais caros primeiro: 'Preciso do catálogo ordenado por categoria alfabeticamente e, dentro de cada categoria, do mais caro para o mais barato. Traz nome, categoria e preço.' Use ordenação por múltiplas colunas.",
    dica: "ORDER BY aceita várias colunas separadas por vírgula: ORDER BY col1 ASC, col2 DESC — cada uma pode ter sua direção.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, categoria, preco FROM produtos ORDER BY categoria ASC, preco DESC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY"],
    valores_disponiveis: ["ASC", "DESC"],
    ordem_importa: true,
  },

  {
    id: "jr-032",
    nivel: "junior",
    secao: "curriculo",
    numero: 32,
    titulo: "Vitrine da Landing Page",
    demanda:
      "O time de desenvolvimento está integrando a API do catálogo na nova landing page e o layout comporta apenas 5 produtos na vitrine de destaque. Lucas Oliveira te orienta: 'A query precisa retornar só os 5 primeiros produtos da ordem natural do banco — isso é o default de carregamento antes de aplicar qualquer filtro. Traz nome e preço.'",
    dica: "Use LIMIT N para limitar a quantidade de linhas retornadas.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco FROM produtos LIMIT 5",
    keywords_disponiveis: ["SELECT", "FROM", "LIMIT"],
    valores_disponiveis: ["5", "10"],
    ordem_importa: true,
  },

  {
    id: "jr-033",
    nivel: "junior",
    secao: "curriculo",
    numero: 33,
    titulo: "Paginação: Segunda Página",
    demanda:
      "O e-commerce exibe 5 produtos por página na listagem. Um usuário clicou em 'próxima página' e o sistema precisa buscar a página 2, ou seja, os produtos do 6º ao 10º na ordem natural. Lucas Oliveira explica: 'Para paginar, você pula N registros com OFFSET e pega os próximos N com LIMIT. Essa é a lógica de paginação mais usada em APIs.'",
    dica: "LIMIT 5 OFFSET 5 — pula os primeiros 5 e retorna os próximos 5.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco FROM produtos LIMIT 5 OFFSET 5",
    keywords_disponiveis: ["SELECT", "FROM", "LIMIT"],
    valores_disponiveis: ["5", "OFFSET"],
    ordem_importa: true,
  },

  {
    id: "jr-034",
    nivel: "junior",
    secao: "curriculo",
    numero: 34,
    titulo: "Vitrine Premium: Top 3",
    demanda:
      "Beatriz Melo precisa de uma vitrine 'Top 3 mais caros' para a seção premium do site: 'Quero nome, marca e preço dos 3 produtos mais caros do catálogo, do mais caro para o mais barato. Esses vão ficar em destaque na home com fundo dourado.' Combine ORDER BY com LIMIT.",
    dica: "Combine ORDER BY preco DESC com LIMIT 3 — primeiro ordena, depois recorta.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, marca, preco FROM produtos ORDER BY preco DESC LIMIT 3",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "LIMIT"],
    valores_disponiveis: ["DESC", "3"],
    ordem_importa: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO 7 — DISTINCT AVANÇADO (jr-035 a jr-036)
  // ═══════════════════════════════════════════════════════════════

  {
    id: "jr-035",
    nivel: "junior",
    secao: "curriculo",
    numero: 35,
    titulo: "Mapa de Marcas do Catálogo",
    demanda:
      "Priya Nair está construindo a seção 'Nossas Marcas' no site e precisa de uma lista limpa: 'Me traz todas as marcas que temos no catálogo, cada uma uma única vez, ordenadas de A a Z. Vou usar para criar os logos na página de marcas parceiras.' Use DISTINCT e ORDER BY juntos.",
    dica: "DISTINCT elimina duplicatas. Combine com ORDER BY para deixar a lista organizada.",
    tabelas: ["produtos"],
    gabarito: "SELECT DISTINCT marca FROM produtos ORDER BY marca",
    keywords_disponiveis: ["SELECT", "FROM", "DISTINCT", "ORDER BY"],
    ordem_importa: true,
  },

  {
    id: "jr-036",
    nivel: "junior",
    secao: "curriculo",
    numero: 36,
    titulo: "Combinações Únicas de Marca e Categoria",
    demanda:
      "O time de BI está montando uma matriz de portfólio e precisa entender quais marcas atuam em quais categorias. Lucas Oliveira te passa: 'Me traz os pares únicos de marca e categoria — cada combinação que existe no catálogo só uma vez. Ordena por marca e depois por categoria.' DISTINCT funciona com múltiplas colunas.",
    dica: "SELECT DISTINCT col1, col2 — o DISTINCT considera o PAR de valores como único. Ordene com ORDER BY no final.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT DISTINCT marca, categoria FROM produtos ORDER BY marca, categoria",
    keywords_disponiveis: ["SELECT", "FROM", "DISTINCT", "ORDER BY"],
    ordem_importa: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO 8 — AS, EXPRESSÕES ARITMÉTICAS, CONCATENAÇÃO (jr-037 a jr-041)
  // ═══════════════════════════════════════════════════════════════

  {
    id: "jr-037",
    nivel: "junior",
    secao: "curriculo",
    numero: 37,
    titulo: "Renomeando para o Dashboard Executivo",
    demanda:
      "Ana Beatriz precisa de uma query para alimentar o dashboard do board de diretores, e os rótulos das colunas precisam ser legíveis em português: 'O dashboard mostra Produto, Preço (R$) e Disponível. Consegue gerar a query com esses nomes de coluna exatos?' Use AS para renomear as três colunas.",
    dica: "AS define o alias (apelido) da coluna no resultado. Use aspas simples se o alias tiver espaços ou caracteres especiais.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome AS Produto, preco AS 'Preço (R$)', estoque AS Disponível FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
  },

  {
    id: "jr-038",
    nivel: "junior",
    secao: "curriculo",
    numero: 38,
    titulo: "Análise de Margem Bruta Completa",
    demanda:
      "Rafael Drummond vai apresentar a análise de rentabilidade do portfólio para os sócios. 'Quero uma tabela com nome, preço, custo e uma quarta coluna chamada margem que calcule a diferença preço menos custo. Isso vai para o slide de análise de produto.' Crie a coluna calculada com alias.",
    dica: "Você pode usar expressões matemáticas diretamente no SELECT: preco - custo AS margem",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, preco, custo, preco - custo AS margem FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    operadores_disponiveis: ["-"],
  },

  {
    id: "jr-039",
    nivel: "junior",
    secao: "curriculo",
    numero: 39,
    titulo: "Etiqueta de Produto Completa",
    demanda:
      "O time de operações precisa imprimir etiquetas para o armazém e quer um campo único com marca e nome concatenados. Diego Mendes te explica: 'No sistema de etiquetas só tem um campo de texto. Preciso da marca seguida de um travessão e o nome do produto — tipo Apple — iPhone 16 Pro. Me traz só essa coluna chamada produto_completo.'",
    dica: "SQLite concatena strings com ||: 'texto1' || ' separador ' || 'texto2'",
    tabelas: ["produtos"],
    gabarito:
      "SELECT marca || ' — ' || nome AS produto_completo FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    operadores_disponiveis: ["||"],
    valores_disponiveis: ["' — '"],
  },

  {
    id: "jr-040",
    nivel: "junior",
    secao: "curriculo",
    numero: 40,
    titulo: "Preço Final com Desconto",
    demanda:
      "A equipe de precificação precisa calcular o preço final de cada produto considerando o desconto. Camila Torres te manda: 'Para o email de Black Friday preciso de nome e preco_final — que é o preço original vezes (1 menos o desconto em decimal). Onde não tem desconto, usa zero. Importante: divida por 100.0, não por 100, pra não ter erro de arredondamento.'",
    dica: "Use COALESCE para tratar os NULLs e divida por 100.0 para forçar divisão em ponto flutuante: preco * (1 - COALESCE(desconto_pct, 0) / 100.0)",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, preco * (1 - COALESCE(desconto_pct, 0) / 100.0) AS preco_final FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["COALESCE()"],
    operadores_disponiveis: ["*", "/", "-"],
    valores_disponiveis: ["1", "100.0", "0"],
  },

  {
    id: "jr-041",
    nivel: "junior",
    secao: "curriculo",
    numero: 41,
    titulo: "Alias na Tabela — Preparação para JOINs",
    demanda:
      "Lucas Oliveira te dá uma dica importante para o futuro: 'No nível Pleno você vai trabalhar com JOINs entre várias tabelas. Para facilitar, a gente costuma dar um alias curto para cada tabela. Pratica agora: escreve a query de produtos da categoria Notebooks usando FROM produtos AS p e referenciando as colunas como p.nome e p.preco — entre R$1.000 e R$2.000.'",
    dica: "AS pode ser usado em tabelas também: FROM produtos AS p. Depois use p.coluna no SELECT e WHERE.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT p.nome, p.preco FROM produtos AS p WHERE p.preco BETWEEN 1000 AND 2000",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AS", "BETWEEN", "AND"],
    valores_disponiveis: ["1000", "2000"],
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO 9 — FUNÇÕES DE TEXTO (jr-042 a jr-047)
  // ═══════════════════════════════════════════════════════════════

  {
    id: "jr-042",
    nivel: "junior",
    secao: "curriculo",
    numero: 42,
    titulo: "Nomes em Maiúsculo para Banner",
    demanda:
      "O designer da campanha de fim de ano pediu os nomes dos produtos em CAIXA ALTA para usar nos banners. Camila Torres repassa: 'O layout exige tudo maiúsculo. Me traz uma coluna chamada nome com todos os nomes em maiúsculo — e só essa coluna.' Use a função UPPER.",
    dica: "UPPER(texto) transforma qualquer texto em maiúsculas. LOWER(texto) faz o oposto.",
    tabelas: ["produtos"],
    gabarito: "SELECT UPPER(nome) AS nome FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["UPPER()", "LOWER()"],
  },

  {
    id: "jr-043",
    nivel: "junior",
    secao: "curriculo",
    numero: 43,
    titulo: "Nomes Curtos para o App Mobile",
    demanda:
      "O desenvolvedor do app mobile relatou um problema: nomes muito longos quebram o layout. Lucas Oliveira te orienta: 'Para o card do produto no mobile, precisamos só de produtos com nome de até 15 caracteres. Traz nome e o tamanho do nome como coluna caracteres — vou usar pra verificar no design system.' Use LENGTH para contar e filtrar.",
    dica: "LENGTH(texto) retorna o número de caracteres. Você pode usar LENGTH no SELECT para criar a coluna E no WHERE para filtrar.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, LENGTH(nome) AS caracteres FROM produtos WHERE LENGTH(nome) <= 15",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AS"],
    funcoes_disponiveis: ["LENGTH()"],
    operadores_disponiveis: ["<=", "<", "="],
    valores_disponiveis: ["15"],
  },

  {
    id: "jr-044",
    nivel: "junior",
    secao: "curriculo",
    numero: 44,
    titulo: "Código de Produto para o ERP",
    demanda:
      "O sistema ERP da DataCo usa um código baseado nos 3 primeiros caracteres do nome do produto para agrupamento. Diego Mendes precisa de uma migração: 'Traz nome e os 3 primeiros caracteres do nome como coluna codigo_erp — vou usar para fazer o de/para no sistema legado.' Use SUBSTR.",
    dica: "SUBSTR(texto, posição_inicial, quantidade). Posição começa em 1, não em 0.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, SUBSTR(nome, 1, 3) AS codigo_erp FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["SUBSTR()"],
    valores_disponiveis: ["1", "3"],
  },

  {
    id: "jr-045",
    nivel: "junior",
    secao: "curriculo",
    numero: 45,
    titulo: "Limpando Dados de Cor",
    demanda:
      "Durante uma importação de dados, alguns valores da coluna cor vieram com espaços em branco nas pontas — tipo ' Preto ' em vez de 'Preto'. Isso causa problemas nos filtros. Lucas Oliveira pede: 'Traz nome e cor de todos os produtos, mas aplica TRIM na cor para remover esses espaços. Coloca o resultado na coluna cor.' Isso é limpeza de dados básica.",
    dica: "TRIM(texto) remove espaços em branco do início e do fim da string.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, TRIM(cor) AS cor FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["TRIM()"],
  },

  {
    id: "jr-046",
    nivel: "junior",
    secao: "curriculo",
    numero: 46,
    titulo: "Padronizando Categoria para o Sistema",
    demanda:
      "O novo sistema de integração com o marketplace exige que a categoria 'Perifericos' seja escrita como 'Periféricos' (com acento). Priya Nair pede: 'Para a carga de dados de hoje, traz nome e categoria de todos os produtos da categoria Perifericos, mas substituindo o texto na saída por Periféricos. Isso é um ajuste de padronização.' Use REPLACE.",
    dica: "REPLACE(texto, 'de', 'para') substitui todas as ocorrências de um texto por outro.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, REPLACE(categoria, 'Perifericos', 'Periféricos') AS categoria FROM produtos WHERE categoria = 'Perifericos'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AS"],
    funcoes_disponiveis: ["REPLACE()"],
    valores_disponiveis: ["'Perifericos'", "'Periféricos'"],
  },

  {
    id: "jr-047",
    nivel: "junior",
    secao: "curriculo",
    numero: 47,
    titulo: "Email Padronizado em Minúsculo",
    demanda:
      "Lucas Oliveira mostra um exemplo de boas práticas de dados: 'Em sistemas reais, é comum normalizar campos de texto para evitar duplicatas. Por exemplo, se a gente tivesse emails, faríamos LOWER para comparar. Pratica isso: traz nome e marca em minúsculo (alias nome e marca). Esse padrão aparece bastante em dados de clientes.'",
    dica: "LOWER(texto) converte para minúsculas. Isso é muito usado para comparações case-insensitive e normalização de dados.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT LOWER(nome) AS nome, LOWER(marca) AS marca FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["LOWER()", "UPPER()"],
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO 10 — AGREGAÇÃO ESCALAR SEM GROUP BY (jr-048 a jr-053)
  // ═══════════════════════════════════════════════════════════════

  {
    id: "jr-048",
    nivel: "junior",
    secao: "curriculo",
    numero: 48,
    titulo: "Tamanho do Catálogo",
    demanda:
      "Ana Beatriz precisa de um número simples para o relatório semanal: 'Quantos produtos temos cadastrados no sistema? Só um número mesmo — o total.' Essa é uma das queries mais básicas e usadas no dia a dia: contar linhas de uma tabela.",
    dica: "COUNT(*) conta o total de linhas de uma tabela, incluindo NULLs. Retorna um único número.",
    tabelas: ["produtos"],
    gabarito: "SELECT COUNT(*) AS total_produtos FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["COUNT(*)", "COUNT(DISTINCT )", "SUM()", "AVG()", "MAX()", "MIN()"],
  },

  {
    id: "jr-049",
    nivel: "junior",
    secao: "curriculo",
    numero: 49,
    titulo: "Valor Total do Estoque",
    demanda:
      "Rafael Drummond está calculando o capital imobilizado em estoque para o balanço patrimonial. 'Preciso do valor total investido em estoque — que é a soma de (custo × estoque) de cada produto. É uma linha só no resultado, com o alias valor_total_estoque.' Esse tipo de KPI é básico no dia a dia financeiro.",
    dica: "SUM(expressão) soma os valores. Você pode usar SUM(custo * estoque) para somar o produto de duas colunas.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT SUM(custo * estoque) AS valor_total_estoque FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["SUM()", "AVG()", "COUNT(*)", "MAX()", "MIN()"],
    operadores_disponiveis: ["*"],
  },

  {
    id: "jr-050",
    nivel: "junior",
    secao: "curriculo",
    numero: 50,
    titulo: "Ticket Médio do Catálogo",
    demanda:
      "Beatriz Melo precisa de um número de referência para o pitch com investidores: 'Qual é o preço médio dos nossos produtos? Isso vai no slide de posicionamento de mercado.' Retorne o preço médio com alias preco_medio.",
    dica: "AVG(coluna) calcula a média aritmética dos valores não-nulos da coluna.",
    tabelas: ["produtos"],
    gabarito: "SELECT AVG(preco) AS preco_medio FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["AVG()", "SUM()", "COUNT(*)", "MAX()", "MIN()"],
  },

  {
    id: "jr-051",
    nivel: "junior",
    secao: "curriculo",
    numero: 51,
    titulo: "Extremos de Preço",
    demanda:
      "Camila Torres está criando o slogan da loja e precisa saber o range de preços: 'Qual o produto mais caro e qual o mais barato? Quero os dois valores em uma linha só — preco_max e preco_min.' Use MIN e MAX na mesma query.",
    dica: "Você pode usar várias funções de agregação na mesma query: SELECT MAX(coluna) AS max, MIN(coluna) AS min",
    tabelas: ["produtos"],
    gabarito:
      "SELECT MAX(preco) AS preco_max, MIN(preco) AS preco_min FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["MAX()", "MIN()", "AVG()", "SUM()", "COUNT(*)"],
  },

  {
    id: "jr-052",
    nivel: "junior",
    secao: "curriculo",
    numero: 52,
    titulo: "Quantas Marcas no Catálogo?",
    demanda:
      "Priya Nair quer uma métrica de diversidade de portfólio: 'Quantas marcas diferentes a gente oferece? Contando uma vez só cada marca.' A diferença entre COUNT(*) e COUNT(DISTINCT coluna) é fundamental.",
    dica: "COUNT(DISTINCT coluna) conta os valores únicos (não repete a mesma marca). Diferente de COUNT(*) que conta todas as linhas.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT COUNT(DISTINCT marca) AS total_marcas FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["COUNT(DISTINCT )", "COUNT(*)", "SUM()", "AVG()"],
  },

  {
    id: "jr-053",
    nivel: "junior",
    secao: "curriculo",
    numero: 53,
    titulo: "KPI de Smartphones",
    demanda:
      "Ana Beatriz quer um painel rápido do segmento de smartphones: 'Para a reunião de amanhã: quantos smartphones temos cadastrados? Filtra só a categoria Smartphones e me dá o COUNT.' Combine filtro WHERE com agregação.",
    dica: "WHERE filtra as linhas ANTES de COUNT processar. COUNT(*) então conta só as linhas que passaram pelo filtro.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT COUNT(*) AS total_smartphones FROM produtos WHERE categoria = 'Smartphones'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AS"],
    funcoes_disponiveis: ["COUNT(*)", "COUNT(DISTINCT )", "SUM()", "AVG()"],
    valores_disponiveis: ["'Smartphones'"],
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO 11 — CASE WHEN BÁSICO (jr-054 a jr-057)
  // ═══════════════════════════════════════════════════════════════

  {
    id: "jr-054",
    nivel: "junior",
    secao: "curriculo",
    numero: 54,
    titulo: "Classificando Produtos por Faixa de Preço",
    demanda:
      "Camila Torres está segmentando o catálogo para campanhas diferentes: 'Preciso de nome, preço e uma coluna faixa que classifique os produtos: até R$1.000 é Entrada, de R$1.001 a R$5.000 é Intermediário, acima disso é Premium. CASE WHEN é a ferramenta certa aqui.' Você vai aprender uma das estruturas mais usadas em SQL.",
    dica: "CASE WHEN condição1 THEN 'valor1' WHEN condição2 THEN 'valor2' ELSE 'padrão' END — as condições são avaliadas em ordem; a primeira verdadeira vence.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, preco, CASE WHEN preco <= 1000 THEN 'Entrada' WHEN preco <= 5000 THEN 'Intermediário' ELSE 'Premium' END AS faixa FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS", "CASE", "WHEN", "THEN", "ELSE", "END"],
    operadores_disponiveis: ["<=", ">"],
    valores_disponiveis: ["1000", "5000", "'Entrada'", "'Intermediário'", "'Premium'"],
  },

  {
    id: "jr-055",
    nivel: "junior",
    secao: "curriculo",
    numero: 55,
    titulo: "Flag de Disponibilidade",
    demanda:
      "O sistema de e-commerce precisa exibir um badge 'Disponível' ou 'Esgotado' em cada produto. Diego Mendes te passa: 'Traz nome e uma coluna status_estoque: se estoque for 0 mostra Esgotado, caso contrário Disponível. O front-end vai usar essa coluna para escolher a cor do badge.'",
    dica: "CASE com uma única condição funciona como um if-else: CASE WHEN estoque = 0 THEN 'Esgotado' ELSE 'Disponível' END",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, CASE WHEN estoque = 0 THEN 'Esgotado' ELSE 'Disponível' END AS status_estoque FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS", "CASE", "WHEN", "THEN", "ELSE", "END"],
    operadores_disponiveis: ["="],
    valores_disponiveis: ["0", "'Esgotado'", "'Disponível'"],
  },

  {
    id: "jr-056",
    nivel: "junior",
    secao: "curriculo",
    numero: 56,
    titulo: "Substituindo NULL por Texto",
    demanda:
      "O relatório de cores do catálogo estava mostrando NULL para produtos sem cor definida e o CEO reclamou. Ana Beatriz pede: 'Traz nome e uma coluna cor_exibicao: se a cor for nula mostra Sem cor especificada, caso contrário mostra a cor normal. CASE é mais explícito que COALESCE e deixa o código mais legível.'",
    dica: "Você pode usar CASE WHEN coluna IS NULL THEN 'substituto' ELSE coluna END para tratar NULLs de forma explícita.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, CASE WHEN cor IS NULL THEN 'Sem cor especificada' ELSE cor END AS cor_exibicao FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS", "CASE", "WHEN", "THEN", "ELSE", "END", "IS NULL"],
    valores_disponiveis: ["'Sem cor especificada'"],
  },

  {
    id: "jr-057",
    nivel: "junior",
    secao: "curriculo",
    numero: 57,
    titulo: "Prioridade de Reposição",
    demanda:
      "Diego Mendes quer priorizar a reposição de estoque de forma visual: 'Traz nome, estoque e uma coluna prioridade_reposicao: estoque abaixo de 20 é URGENTE, entre 20 e 50 é ATENÇÃO, acima de 50 é OK. Ordena pela prioridade — URGENTE primeiro, ATENÇÃO depois, OK por último.' Use CASE também no ORDER BY.",
    dica: "CASE pode ser usado no ORDER BY também! ORDER BY CASE WHEN prioridade = 'URGENTE' THEN 1 WHEN prioridade = 'ATENÇÃO' THEN 2 ELSE 3 END",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, estoque, CASE WHEN estoque < 20 THEN 'URGENTE' WHEN estoque <= 50 THEN 'ATENÇÃO' ELSE 'OK' END AS prioridade_reposicao FROM produtos ORDER BY CASE WHEN estoque < 20 THEN 1 WHEN estoque <= 50 THEN 2 ELSE 3 END",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "AS", "CASE", "WHEN", "THEN", "ELSE", "END"],
    operadores_disponiveis: ["<", "<=", ">"],
    valores_disponiveis: ["20", "50", "1", "2", "3", "'URGENTE'", "'ATENÇÃO'", "'OK'"],
    ordem_importa: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO 12 — ROUND, ABS, CAST (jr-058 a jr-060)
  // ═══════════════════════════════════════════════════════════════

  {
    id: "jr-058",
    nivel: "junior",
    secao: "curriculo",
    numero: 58,
    titulo: "Preços Arredondados para o Relatório",
    demanda:
      "Rafael Drummond está montando um relatório para impressão e os preços com muitas casas decimais ficam feios. 'Traz nome e o preco_final calculado (preço com desconto usando COALESCE), mas arredondado para 2 casas decimais. Use ROUND para isso.' Combine ROUND com a expressão de desconto.",
    dica: "ROUND(valor, casas_decimais) arredonda para o número de casas especificado. ROUND(valor) sem o segundo argumento arredonda para inteiro.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, ROUND(preco * (1 - COALESCE(desconto_pct, 0) / 100.0), 2) AS preco_final FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["ROUND()", "ABS()", "COALESCE()"],
    operadores_disponiveis: ["*", "/", "-"],
    valores_disponiveis: ["2", "100.0", "0"],
  },

  {
    id: "jr-059",
    nivel: "junior",
    secao: "curriculo",
    numero: 59,
    titulo: "Variação Absoluta de Preço",
    demanda:
      "Beatriz Melo está negociando reajuste de preços com fornecedores e precisa medir o gap entre preço e custo em termos absolutos: 'Me traz nome e a variação absoluta entre preço e custo — chama de gap_preco_custo. Usa ABS porque às vezes o custo pode ser maior que o preço em promoções e não quero número negativo.' Aplique ABS.",
    dica: "ABS(valor) retorna o valor absoluto (sem sinal negativo). Útil para diferenças onde a direção não importa.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, ABS(preco - custo) AS gap_preco_custo FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["ABS()", "ROUND()", "COALESCE()"],
    operadores_disponiveis: ["-"],
  },

  {
    id: "jr-060",
    nivel: "junior",
    secao: "curriculo",
    numero: 60,
    titulo: "Conversão de Tipo para Relatório de Texto",
    demanda:
      "O sistema de envio de relatórios por SMS precisa de tudo em texto. Lucas Oliveira explica o CAST: 'Quando você tenta concatenar um número com texto em SQL sem converter, dá erro. Use CAST para converter o estoque para TEXT e crie uma frase como AirPods Pro 2: 94 unidades. Coluna chamada resumo.' Combine CAST com concatenação ||.",
    dica: "CAST(valor AS TEXT) converte um número para texto, permitindo usar || para concatenar com outras strings.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome || ': ' || CAST(estoque AS TEXT) || ' unidades' AS resumo FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["CAST( AS )"],
    operadores_disponiveis: ["||"],
    valores_disponiveis: ["': '", "' unidades'", "TEXT"],
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO 13 — DATAS AVANÇADAS (jr-061 a jr-065)
  // ═══════════════════════════════════════════════════════════════

  {
    id: "jr-061",
    nivel: "junior",
    secao: "curriculo",
    numero: 61,
    titulo: "Ano e Mês de Lançamento",
    demanda:
      "Priya Nair está construindo um timeline de lançamentos para a apresentação da empresa: 'Preciso de nome e o mês/ano de lançamento separados em duas colunas — ano_lancamento e mes_lancamento. Assim posso montar a linha do tempo no PowerPoint mais facilmente.' Use strftime para extrair cada parte.",
    dica: "strftime('%Y', data) extrai o ano (4 dígitos). strftime('%m', data) extrai o mês (2 dígitos com zero à esquerda).",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, strftime('%Y', lancamento) AS ano_lancamento, strftime('%m', lancamento) AS mes_lancamento FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["STRFTIME()"],
    valores_disponiveis: ["'%Y'", "'%m'", "'%Y-%m'"],
  },

  {
    id: "jr-062",
    nivel: "junior",
    secao: "curriculo",
    numero: 62,
    titulo: "Produtos Lançados em 2025",
    demanda:
      "Beatriz Melo quer fazer uma campanha especial de '1 Ano de Novidades' com produtos lançados em 2025: 'Me traz nome e data de lançamento dos produtos lançados em 2025 — vou usar isso para o email de aniversário de lançamento.' Use strftime para extrair o ano e comparar.",
    dica: "WHERE strftime('%Y', lancamento) = '2025' — Note que strftime retorna texto, então compare com '2025' (com aspas).",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, lancamento FROM produtos WHERE strftime('%Y', lancamento) = '2025'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE"],
    funcoes_disponiveis: ["STRFTIME()"],
    operadores_disponiveis: ["="],
    valores_disponiveis: ["'%Y'", "'2025'"],
  },

  {
    id: "jr-063",
    nivel: "junior",
    secao: "curriculo",
    numero: 63,
    titulo: "Produtos Recentes (Últimos 2 Anos)",
    demanda:
      "Diego Mendes quer identificar produtos com menos de 2 anos desde o lançamento para organizar a seção 'Novidades' do armazém: 'Traz nome e data de lançamento dos produtos lançados após 2024-01-01.' No sistema real você usaria date('now', '-2 years'), mas por simplicidade use a data fixa. Os dados cobrem até 2026.",
    dica: "date('now') retorna a data de hoje. date('now', '-2 years') retorna 2 anos atrás. Em exercícios com data fixa, compare diretamente com o texto da data.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, lancamento FROM produtos WHERE lancamento > '2024-01-01'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE"],
    funcoes_disponiveis: ["DATE()"],
    operadores_disponiveis: [">", "<"],
    valores_disponiveis: ["'2024-01-01'", "date('now')"],
  },

  {
    id: "jr-064",
    nivel: "junior",
    secao: "curriculo",
    numero: 64,
    titulo: "Dias Desde o Lançamento",
    demanda:
      "Priya Nair quer saber a 'idade' de cada produto no catálogo para análise de ciclo de vida: 'Traz nome e quantos dias se passaram desde o lançamento de cada produto — chama de dias_no_catalogo. Use julianday para calcular. A data de referência é 2026-05-01.' Arredonde para inteiro.",
    dica: "julianday(data) converte uma data para número de dias desde um ponto de referência. A diferença julianday('2026-05-01') - julianday(lancamento) dá os dias entre as duas datas.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, ROUND(julianday('2026-05-01') - julianday(lancamento)) AS dias_no_catalogo FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["STRFTIME()", "DATE()", "ROUND()"],
    operadores_disponiveis: ["-"],
    valores_disponiveis: ["'2026-05-01'"],
  },

  {
    id: "jr-065",
    nivel: "junior",
    secao: "curriculo",
    numero: 65,
    titulo: "Data de Garantia",
    demanda:
      "O sistema de garantias precisa calcular a data de expiração para cada produto (1 ano após o lançamento). Lucas Oliveira explica: 'SQLite tem uma função date() que aceita modifiers — date(data, \'+1 year\') adiciona um ano. Traz nome, lancamento e a data_garantia calculada com esse modifier.' Você vai usar isso bastante em análises temporais.",
    dica: "date(coluna, '+N year') ou '+N month' ou '+N day' — são os modifiers do SQLite para aritmética de datas.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, lancamento, date(lancamento, '+1 year') AS data_garantia FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["DATE()"],
    valores_disponiveis: ["'+1 year'", "'+6 month'", "'+30 day'"],
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO 14 — REFORÇO MULTI-CONCEITO, SEM DICA (jr-066 a jr-080)
  // ═══════════════════════════════════════════════════════════════

  {
    id: "jr-066",
    nivel: "junior",
    secao: "curriculo",
    numero: 66,
    titulo: "Urgência no Armazém",
    demanda:
      "Diego Mendes aparece direto na sua mesa: 'Preciso de uma lista urgente dos 5 produtos com MENOR estoque que ainda tenham desconto ativo. Traz nome, estoque e desconto_pct — do menor estoque pro maior.' Resolva sem dica.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, estoque, desconto_pct FROM produtos WHERE desconto_pct IS NOT NULL ORDER BY estoque ASC LIMIT 5",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "LIMIT", "IS NOT NULL"],
    ordem_importa: true,
  },

  {
    id: "jr-067",
    nivel: "junior",
    secao: "reforco",
    numero: 67,
    titulo: "Campanha de Email Premium",
    demanda:
      "Camila Torres quer uma lista em caixa alta de produtos Apple com margem acima de R$2.000, ordenada da maior margem para a menor. 'Preciso de nome em maiúsculo e a margem calculada — coluna nome e margem.' Resolva sem dica.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT UPPER(nome) AS nome, preco - custo AS margem FROM produtos WHERE marca = 'Apple' AND preco - custo > 2000 ORDER BY preco - custo DESC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "AS", "AND"],
    funcoes_disponiveis: ["UPPER()", "LOWER()"],
    operadores_disponiveis: [">", "-", "="],
    valores_disponiveis: ["'Apple'", "2000", "DESC"],
    ordem_importa: true,
  },

  {
    id: "jr-068",
    nivel: "junior",
    secao: "reforco",
    numero: 68,
    titulo: "Produto Mais Barato com Preço Formatado",
    demanda:
      "Rafael Drummond quer uma linha só: 'Qual é o produto mais barato e qual o preço arredondado para 2 casas? Colunas nome e preco_min.' Resolva sem dica.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, ROUND(preco, 2) AS preco_min FROM produtos ORDER BY preco ASC LIMIT 1",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "LIMIT", "AS"],
    funcoes_disponiveis: ["ROUND()", "MIN()"],
    valores_disponiveis: ["ASC", "1", "2"],
    ordem_importa: true,
  },

  {
    id: "jr-069",
    nivel: "junior",
    secao: "reforco",
    numero: 69,
    titulo: "Mapa de Categorias sem Apple",
    demanda:
      "Priya Nair quer entender o portfólio além da Apple: 'Quais categorias únicas a gente tem excluindo produtos da Apple? Lista as categorias sem repetição, em ordem alfabética.' Resolva sem dica.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT DISTINCT categoria FROM produtos WHERE marca != 'Apple' ORDER BY categoria ASC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "DISTINCT", "ORDER BY"],
    operadores_disponiveis: ["!=", "="],
    valores_disponiveis: ["'Apple'", "ASC"],
    ordem_importa: true,
  },

  {
    id: "jr-070",
    nivel: "junior",
    secao: "reforco",
    numero: 70,
    titulo: "Portfólio Premium Completo",
    demanda:
      "Beatriz Melo quer um relatório de portfólio premium: 'Traz nome, marca, preço e o preço final com desconto (arredondado para 2 casas) dos produtos acima de R$3.000 que tenham desconto cadastrado, ordenado por preço final do menor para o maior.' Resolva sem dica.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, marca, preco, ROUND(preco * (1 - COALESCE(desconto_pct, 0) / 100.0), 2) AS preco_final FROM produtos WHERE preco > 3000 AND desconto_pct IS NOT NULL ORDER BY preco_final ASC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "AS", "AND", "IS NOT NULL"],
    funcoes_disponiveis: ["ROUND()", "COALESCE()"],
    operadores_disponiveis: [">", "*", "/", "-"],
    valores_disponiveis: ["3000", "100.0", "0", "2", "ASC"],
    ordem_importa: true,
  },

  {
    id: "jr-071",
    nivel: "junior",
    secao: "reforco",
    numero: 71,
    titulo: "Resumo de Inventário em Texto",
    demanda:
      "O sistema de alertas precisa de mensagens de texto para o gerente. Diego Mendes pede: 'Para cada produto com estoque abaixo de 40, gera uma mensagem no formato NOME: X unidades em estoque. Coluna resumo, ordenada por estoque crescente.' Resolva sem dica.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome || ': ' || CAST(estoque AS TEXT) || ' unidades em estoque' AS resumo FROM produtos WHERE estoque < 40 ORDER BY estoque ASC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "AS"],
    funcoes_disponiveis: ["CAST( AS )"],
    operadores_disponiveis: ["||", "<"],
    valores_disponiveis: ["40", "': '", "' unidades em estoque'", "TEXT"],
    ordem_importa: true,
  },

  {
    id: "jr-072",
    nivel: "junior",
    secao: "reforco",
    numero: 72,
    titulo: "Total Investido em Produtos Premium",
    demanda:
      "Rafael Drummond quer saber o capital em estoque só dos produtos acima de R$5.000: 'Qual o valor total (custo × estoque) dos produtos com preço maior que R$5.000? Um número só, com alias total_investido_premium.' Resolva sem dica.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT SUM(custo * estoque) AS total_investido_premium FROM produtos WHERE preco > 5000",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AS"],
    funcoes_disponiveis: ["SUM()", "COUNT(*)", "AVG()"],
    operadores_disponiveis: ["*", ">"],
    valores_disponiveis: ["5000"],
  },

  {
    id: "jr-073",
    nivel: "junior",
    secao: "reforco",
    numero: 73,
    titulo: "Contagem por Marcas Alternativas",
    demanda:
      "Priya Nair quer saber quantos produtos a DataCo tem fora das três grandes marcas (Apple, Samsung, Google): 'Só um número — total_outros_fornecedores.' Resolva sem dica.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT COUNT(*) AS total_outros_fornecedores FROM produtos WHERE marca NOT IN ('Apple', 'Samsung', 'Google')",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AS"],
    funcoes_disponiveis: ["COUNT(*)", "COUNT(DISTINCT )"],
    valores_disponiveis: ["'Apple'", "'Samsung'", "'Google'"],
  },

  {
    id: "jr-074",
    nivel: "junior",
    secao: "reforco",
    numero: 74,
    titulo: "Ticket Médio dos Wearables",
    demanda:
      "Beatriz Melo está negociando com um distribuidor de wearables e precisa de referência de preço: 'Qual o preço médio dos nossos wearables? Arredonda para 2 casas — coluna preco_medio_wearables.' Resolva sem dica.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT ROUND(AVG(preco), 2) AS preco_medio_wearables FROM produtos WHERE categoria = 'Wearables'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AS"],
    funcoes_disponiveis: ["AVG()", "ROUND()", "COUNT(*)", "SUM()"],
    valores_disponiveis: ["'Wearables'", "2"],
  },

  {
    id: "jr-075",
    nivel: "junior",
    secao: "reforco",
    numero: 75,
    titulo: "Classificação de Estoque",
    demanda:
      "Diego Mendes quer uma visão rápida do status de estoque de todos os produtos: 'Traz nome, estoque e status_estoque: abaixo de 25 é CRÍTICO, entre 25 e 60 é NORMAL, acima é ABUNDANTE. Ordena por estoque crescente.' Resolva sem dica.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, estoque, CASE WHEN estoque < 25 THEN 'CRÍTICO' WHEN estoque <= 60 THEN 'NORMAL' ELSE 'ABUNDANTE' END AS status_estoque FROM produtos ORDER BY estoque ASC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "AS", "CASE", "WHEN", "THEN", "ELSE", "END"],
    operadores_disponiveis: ["<", "<=", ">"],
    valores_disponiveis: ["25", "60", "'CRÍTICO'", "'NORMAL'", "'ABUNDANTE'", "ASC"],
    ordem_importa: true,
  },

  {
    id: "jr-076",
    nivel: "junior",
    secao: "reforco",
    numero: 76,
    titulo: "Produtos Samsung Recentes",
    demanda:
      "Priya Nair quer uma lista de produtos Samsung lançados a partir de 2024 para avaliar a parceria: 'Nome, marca e data de lançamento dos produtos Samsung lançados em 2024 em diante, ordenados do mais recente para o mais antigo.' Resolva sem dica.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, marca, lancamento FROM produtos WHERE marca = 'Samsung' AND lancamento >= '2024-01-01' ORDER BY lancamento DESC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "AND"],
    operadores_disponiveis: [">=", "="],
    valores_disponiveis: ["'Samsung'", "'2024-01-01'", "DESC"],
    ordem_importa: true,
  },

  {
    id: "jr-077",
    nivel: "junior",
    secao: "reforco",
    numero: 77,
    titulo: "Etiqueta de Categoria Padronizada",
    demanda:
      "O time de operações quer etiquetas com categoria em maiúsculo, apenas para produtos com cor definida: 'Traz nome e categoria em maiúsculo como categoria_maiusculo, só dos produtos que têm cor cadastrada, ordenados por categoria.' Resolva sem dica.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, UPPER(categoria) AS categoria_maiusculo FROM produtos WHERE cor IS NOT NULL ORDER BY categoria",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "AS", "IS NOT NULL"],
    funcoes_disponiveis: ["UPPER()", "LOWER()"],
    ordem_importa: true,
  },

  {
    id: "jr-078",
    nivel: "junior",
    secao: "reforco",
    numero: 78,
    titulo: "Top 5 Margens do Portfólio",
    demanda:
      "Rafael Drummond quer os 5 produtos mais rentáveis: 'Traz nome e margem (preco - custo) como margem, dos 5 produtos com maior margem, da maior para a menor.' Resolva sem dica.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, preco - custo AS margem FROM produtos ORDER BY preco - custo DESC LIMIT 5",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "LIMIT", "AS"],
    operadores_disponiveis: ["-", "DESC"],
    valores_disponiveis: ["5"],
    ordem_importa: true,
  },

  {
    id: "jr-079",
    nivel: "junior",
    secao: "reforco",
    numero: 79,
    titulo: "Marcas com Produtos na Faixa Média",
    demanda:
      "Camila Torres quer fazer uma campanha de mid-range: 'Quais marcas únicas têm produtos entre R$2.000 e R$6.000? Lista as marcas sem repetição, em ordem alfabética.' Resolva sem dica.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT DISTINCT marca FROM produtos WHERE preco BETWEEN 2000 AND 6000 ORDER BY marca ASC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "DISTINCT", "ORDER BY", "BETWEEN", "AND"],
    valores_disponiveis: ["2000", "6000", "ASC"],
    ordem_importa: true,
  },

  {
    id: "jr-080",
    nivel: "junior",
    secao: "reforco",
    numero: 80,
    titulo: "Análise Completa de Produto",
    demanda:
      "Ana Beatriz pede uma query de síntese para você mostrar o que aprendeu: 'Gera uma coluna resumo com o formato: NOME (MARCA) - Faixa: ENTRADA/INTERMEDIÁRIO/PREMIUM - Estoque: X un. Só os produtos com margem acima de R$1.000 e estoque maior que 40, ordenados por nome. Coluna resumo apenas.' Resolva sem dica.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome || ' (' || marca || ') - Faixa: ' || CASE WHEN preco <= 1000 THEN 'ENTRADA' WHEN preco <= 5000 THEN 'INTERMEDIÁRIO' ELSE 'PREMIUM' END || ' - Estoque: ' || CAST(estoque AS TEXT) || ' un.' AS resumo FROM produtos WHERE preco - custo > 1000 AND estoque > 40 ORDER BY nome ASC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "AS", "AND", "CASE", "WHEN", "THEN", "ELSE", "END"],
    funcoes_disponiveis: ["CAST( AS )"],
    operadores_disponiveis: ["||", ">", "-"],
    valores_disponiveis: ["1000", "5000", "40", "' ('", "') - Faixa: '", "' - Estoque: '", "' un.'", "'ENTRADA'", "'INTERMEDIÁRIO'", "'PREMIUM'", "TEXT", "ASC"],
    ordem_importa: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO 15 — SIMULADO DE ENTREVISTA (jr-081 a jr-090)
  // Entrevistadora: Valentina Cruz — Engenheira de Dados Sênior
  // ═══════════════════════════════════════════════════════════════

  {
    id: "jr-081",
    nivel: "junior",
    secao: "reforco",
    numero: 81,
    titulo: "Entrevista — Questão 1: Filtro Básico",
    demanda:
      "Você chegou na entrevista para Analista de Dados Júnior. Valentina Cruz, Engenheira de Dados Sênior da empresa, te recebe com um laptop aberto. 'Vou te dar acesso a uma base de produtos. Primeira pergunta: me mostre todos os produtos com preço acima de R$3.000. Quero ver nome, marca e preço.' Sem dica — é uma entrevista.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, marca, preco FROM produtos WHERE preco > 3000",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "AND", "OR", "IN", "BETWEEN", "DISTINCT", "AS", "LIKE", "IS NULL", "IS NOT NULL", "LIMIT", "NOT"],
    funcoes_disponiveis: ["COUNT(*)", "SUM()", "AVG()", "MAX()", "MIN()", "ROUND()", "UPPER()", "LOWER()", "LENGTH()", "COALESCE()", "CASE"],
    operadores_disponiveis: ["=", "!=", ">", "<", ">=", "<=", "AND", "OR", "NOT", "IN", "BETWEEN", "LIKE", "IS NULL", "IS NOT NULL"],
    valores_disponiveis: ["3000"],
  },

  {
    id: "jr-082",
    nivel: "junior",
    secao: "entrevista",
    numero: 82,
    titulo: "Entrevista — Questão 2: Busca por Padrão",
    demanda:
      "Valentina continua: 'Boa. Segunda questão: quero ver todos os produtos que contenham a palavra Galaxy em qualquer parte do nome. Só nome e categoria.'",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, categoria FROM produtos WHERE nome LIKE '%Galaxy%'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "LIKE", "AND", "OR", "NOT", "IS NULL", "IN", "BETWEEN", "ORDER BY", "DISTINCT"],
    operadores_disponiveis: ["=", "!=", ">", "<", "LIKE", "NOT LIKE", "AND", "OR"],
    valores_disponiveis: ["'%Galaxy%'", "'Galaxy%'", "'%Galaxy'"],
  },

  {
    id: "jr-083",
    nivel: "junior",
    secao: "entrevista",
    numero: 83,
    titulo: "Entrevista — Questão 3: Campos Nulos",
    demanda:
      "Valentina: 'Você sabe trabalhar com campos nulos? Mostre apenas os produtos que não têm cor definida — nome e marca. Esse é um erro clássico que elimina candidatos.'",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, marca FROM produtos WHERE cor IS NULL",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "IS NULL", "IS NOT NULL", "AND", "OR", "LIKE", "IN"],
    operadores_disponiveis: ["=", "!=", "IS NULL", "IS NOT NULL"],
  },

  {
    id: "jr-084",
    nivel: "junior",
    secao: "entrevista",
    numero: 84,
    titulo: "Entrevista — Questão 4: Top N",
    demanda:
      "Valentina: 'Mostre os 5 produtos mais caros do catálogo. Quero nome, marca e preço — do mais caro para o mais barato.'",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, marca, preco FROM produtos ORDER BY preco DESC LIMIT 5",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "LIMIT", "WHERE", "AND", "OR", "DISTINCT"],
    valores_disponiveis: ["DESC", "ASC", "5", "3", "10"],
    ordem_importa: true,
  },

  {
    id: "jr-085",
    nivel: "junior",
    secao: "entrevista",
    numero: 85,
    titulo: "Entrevista — Questão 5: Intervalo de Datas",
    demanda:
      "Valentina: 'Quero ver os produtos lançados entre 2024-01-01 e 2024-12-31 — nome e data de lançamento. Como você filtraria isso?'",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, lancamento FROM produtos WHERE lancamento BETWEEN '2024-01-01' AND '2024-12-31'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "BETWEEN", "AND", "ORDER BY", "LIKE", ">=", "<="],
    valores_disponiveis: ["'2024-01-01'", "'2024-12-31'", "'2024-01-01'"],
  },

  {
    id: "jr-086",
    nivel: "junior",
    secao: "entrevista",
    numero: 86,
    titulo: "Entrevista — Questão 6: Lista de Exclusão",
    demanda:
      "Valentina: 'Suponha que temos contratos exclusivos com Dell, Lenovo e Acer e não podemos exibir os produtos deles para certos usuários. Como você filtraria para mostrar APENAS os produtos que não são dessas três marcas? Quero nome e marca.'",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, marca FROM produtos WHERE marca NOT IN ('Dell', 'Lenovo', 'Acer')",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "NOT", "IN", "AND", "OR", "!="],
    valores_disponiveis: ["'Dell'", "'Lenovo'", "'Acer'"],
  },

  {
    id: "jr-087",
    nivel: "junior",
    secao: "entrevista",
    numero: 87,
    titulo: "Entrevista — Questão 7: Expressão Calculada",
    demanda:
      "Valentina: 'Mostre nome e o preço com desconto aplicado de cada produto. Onde não há desconto, considere 0%. A coluna deve se chamar preco_final. Arredonde para 2 casas.'",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, ROUND(preco * (1 - COALESCE(desconto_pct, 0) / 100.0), 2) AS preco_final FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AS", "ORDER BY", "AND"],
    funcoes_disponiveis: ["ROUND()", "COALESCE()", "ABS()", "CAST( AS )", "UPPER()", "LOWER()"],
    operadores_disponiveis: ["*", "/", "-", "+"],
    valores_disponiveis: ["100.0", "0", "2"],
  },

  {
    id: "jr-088",
    nivel: "junior",
    secao: "entrevista",
    numero: 88,
    titulo: "Entrevista — Questão 8: Classificação com CASE",
    demanda:
      "Valentina: 'CASE WHEN é muito cobrado. Quero nome, preço e uma coluna segmento: produtos até R$2.000 são Básico, de R$2.001 a R$7.000 são Intermediário, acima são Top de Linha. Mostre todos os produtos com essa classificação.'",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, preco, CASE WHEN preco <= 2000 THEN 'Básico' WHEN preco <= 7000 THEN 'Intermediário' ELSE 'Top de Linha' END AS segmento FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AS", "CASE", "WHEN", "THEN", "ELSE", "END", "ORDER BY"],
    operadores_disponiveis: ["<=", "<", ">", "="],
    valores_disponiveis: ["2000", "7000", "'Básico'", "'Intermediário'", "'Top de Linha'"],
  },

  {
    id: "jr-089",
    nivel: "junior",
    secao: "entrevista",
    numero: 89,
    titulo: "Entrevista — Questão 9: Agregação com Filtro",
    demanda:
      "Valentina: 'Última questão técnica: quantos produtos da categoria Notebooks temos no catálogo? Um único número, com alias total.' Simples, mas você precisa combinar COUNT com WHERE.",
    tabelas: ["produtos"],
    gabarito:
      "SELECT COUNT(*) AS total FROM produtos WHERE categoria = 'Notebooks'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AS", "AND", "OR"],
    funcoes_disponiveis: ["COUNT(*)", "COUNT(DISTINCT )", "SUM()", "AVG()", "MAX()", "MIN()"],
    valores_disponiveis: ["'Notebooks'"],
  },

  {
    id: "jr-090",
    nivel: "junior",
    secao: "entrevista",
    numero: 90,
    titulo: "Entrevista — Questão 10: Desafio Final",
    demanda:
      "Valentina sorri: 'Última questão — e essa eu deixo em aberto propositalmente. Mostre-me um relatório útil com os produtos da DataCo que você acha que um gestor gostaria de ver. Use pelo menos 3 conceitos diferentes que aprendeu. Há múltiplas respostas corretas — quero ver como você pensa.' Use o que quiser do que aprendeu. O importante é a query retornar dados relevantes com pelo menos 2 colunas e usar 3 recursos diferentes (WHERE, ORDER BY, funções, CASE, agregação, etc.).",
    tabelas: ["produtos"],
    gabarito:
      "SELECT nome, marca, ROUND(preco, 2) AS preco, CASE WHEN preco - custo > 3000 THEN 'Alta Margem' WHEN preco - custo > 1000 THEN 'Margem OK' ELSE 'Margem Baixa' END AS analise_margem FROM produtos WHERE estoque > 30 ORDER BY preco - custo DESC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "LIMIT", "AND", "OR", "IN", "NOT", "BETWEEN", "LIKE", "IS NULL", "IS NOT NULL", "DISTINCT", "AS", "CASE", "WHEN", "THEN", "ELSE", "END"],
    funcoes_disponiveis: ["COUNT(*)", "SUM()", "AVG()", "MAX()", "MIN()", "ROUND()", "UPPER()", "LOWER()", "LENGTH()", "COALESCE()", "CAST( AS )"],
    operadores_disponiveis: ["=", "!=", ">", "<", ">=", "<=", "AND", "OR", "NOT", "-", "+", "*", "/", "||"],
    ordem_importa: false,
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO 14 — NEGÓCIOS E KPIS REAIS (jr-091 a jr-105)
  // "Você já sabe SQL. Agora vamos usá-lo como um analista de verdade."
  // ═══════════════════════════════════════════════════════════════

  {
    id: "jr-091",
    nivel: "junior",
    numero: 91,
    titulo: "Margem Percentual por Produto",
    secao: "curriculo",
    demanda:
      "Rafael Drummond quer um KPI que todo analista financeiro precisa saber calcular: a margem bruta percentual. 'Traz nome e a margem_pct calculada como (preco - custo) / preco * 100, arredondada para 1 casa decimal. Ordena da maior margem para a menor. Esse número vai no deck de investidores.'",
    dica: "Margem percentual = ((preço - custo) / preço) × 100. Use ROUND(..., 1) para 1 casa decimal.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, ROUND((preco - custo) / preco * 100, 1) AS margem_pct FROM produtos ORDER BY margem_pct DESC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "AS"],
    funcoes_disponiveis: ["ROUND()", "ABS()"],
    operadores_disponiveis: ["-", "/", "*"],
    valores_disponiveis: ["100", "1", "DESC"],
    ordem_importa: true,
  },

  {
    id: "jr-092",
    nivel: "junior",
    numero: 92,
    titulo: "Produtos Abaixo da Margem Mínima",
    secao: "curriculo",
    demanda:
      "A política financeira da DataCo exige margem bruta mínima de 30%. Rafael Drummond dispara no Slack: 'Quais produtos estão abaixo dessa meta? Me traz nome e margem_pct (arredondada para 1 casa), ordenados da menor para a maior margem. Precisamos renegociar preços com os fornecedores.'",
    dica: "Calcule a margem % no WHERE também: WHERE (preco - custo) / preco * 100 < 30. Você pode usar a mesma expressão no SELECT e no WHERE.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, ROUND((preco - custo) / preco * 100, 1) AS margem_pct FROM produtos WHERE (preco - custo) / preco * 100 < 30 ORDER BY margem_pct ASC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "AS"],
    funcoes_disponiveis: ["ROUND()"],
    operadores_disponiveis: ["-", "/", "*", "<"],
    valores_disponiveis: ["100", "30", "1", "ASC"],
    ordem_importa: true,
  },

  {
    id: "jr-093",
    nivel: "junior",
    numero: 93,
    titulo: "ROI do Estoque por Produto",
    secao: "curriculo",
    demanda:
      "Diego Mendes quer saber o retorno potencial de cada produto se o estoque fosse vendido: 'Calcula o ROI de estoque — que é (preco - custo) × estoque — e chama de lucro_potencial. Traz nome, estoque e lucro_potencial, ordenado pelo maior lucro potencial. Isso vai ajudar a priorizar reposição.'",
    dica: "O lucro potencial de vender todo o estoque é: (preco - custo) * estoque. Sem ROUND aqui — Rafael quer o valor exato.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, estoque, (preco - custo) * estoque AS lucro_potencial FROM produtos ORDER BY lucro_potencial DESC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "AS"],
    operadores_disponiveis: ["-", "*", "DESC"],
    ordem_importa: true,
  },

  {
    id: "jr-094",
    nivel: "junior",
    numero: 94,
    titulo: "Preço Médio por Categoria — Sem GROUP BY",
    secao: "curriculo",
    demanda:
      "Lucas Oliveira te explica um padrão importante: 'Antes do GROUP BY existir na sua caixinha de ferramentas, um analista precisa saber calcular a média de TODA a tabela. Me traz o preço médio de TODOS os produtos (scalar aggregation), o mais caro, o mais barato, tudo em uma linha. Alias: preco_medio, preco_max, preco_min.'",
    dica: "Múltiplas funções de agregação na mesma query retornam uma única linha com todas as métricas.",
    tabelas: ["produtos"],
    gabarito: "SELECT ROUND(AVG(preco), 2) AS preco_medio, MAX(preco) AS preco_max, MIN(preco) AS preco_min FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["AVG()", "MAX()", "MIN()", "ROUND()", "COUNT(*)", "SUM()"],
    valores_disponiveis: ["2"],
  },

  {
    id: "jr-095",
    nivel: "junior",
    numero: 95,
    titulo: "Produtos Acima da Média de Preço",
    secao: "curriculo",
    demanda:
      "Beatriz Melo quer uma lista de produtos premium para a vitrine VIP: 'Preciso dos produtos com preço acima da média geral do catálogo. Mas atenção — não é uma média fixa, é a média real da tabela. Me traz nome e preço.' Esse é um padrão clássico de entrevista: filtrar acima/abaixo da média.",
    dica: "Use uma subquery escalar: WHERE preco > (SELECT AVG(preco) FROM produtos). A subquery retorna um único número que é usado como comparação.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco FROM produtos WHERE preco > (SELECT AVG(preco) FROM produtos) ORDER BY preco DESC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY"],
    funcoes_disponiveis: ["AVG()", "ROUND()", "MAX()", "MIN()"],
    valores_disponiveis: ["DESC"],
    ordem_importa: true,
  },

  {
    id: "jr-096",
    nivel: "junior",
    numero: 96,
    titulo: "Valor Investido por Faixa de Preço",
    secao: "curriculo",
    demanda:
      "Rafael Drummond quer entender a alocação de capital: 'Separa os produtos em Entrada (até R$2.000), Intermediário (R$2.001 a R$7.000) e Premium (acima de R$7.000). Para cada produto mostra: nome, faixa e o capital_imobilizado (custo × estoque). Ordena por faixa e depois por capital_imobilizado decrescente.'",
    dica: "Combine CASE WHEN para criar a faixa e a expressão custo * estoque para o capital. Depois ordene com ORDER BY na faixa e no valor.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, CASE WHEN preco <= 2000 THEN 'Entrada' WHEN preco <= 7000 THEN 'Intermediário' ELSE 'Premium' END AS faixa, custo * estoque AS capital_imobilizado FROM produtos ORDER BY faixa ASC, capital_imobilizado DESC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "AS", "CASE", "WHEN", "THEN", "ELSE", "END"],
    operadores_disponiveis: ["<=", ">", "*"],
    valores_disponiveis: ["2000", "7000", "'Entrada'", "'Intermediário'", "'Premium'", "ASC", "DESC"],
    ordem_importa: true,
  },

  {
    id: "jr-097",
    nivel: "junior",
    numero: 97,
    titulo: "Eficiência de Desconto",
    secao: "curriculo",
    demanda:
      "Camila Torres quer medir o impacto das promoções: 'Para produtos com desconto ativo, mostra nome, desconto_pct, preco_original, preco_final (arredondado para 2 casas) e economia_reais (quanto o cliente economiza). Ordena por economia_reais do maior para o menor.'",
    dica: "economia_reais = preco - preco_final = preco * desconto_pct / 100.0. Use ROUND em ambas as colunas calculadas.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, desconto_pct, preco AS preco_original, ROUND(preco * (1 - desconto_pct / 100.0), 2) AS preco_final, ROUND(preco * desconto_pct / 100.0, 2) AS economia_reais FROM produtos WHERE desconto_pct IS NOT NULL ORDER BY economia_reais DESC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "AS", "IS NOT NULL"],
    funcoes_disponiveis: ["ROUND()", "COALESCE()"],
    operadores_disponiveis: ["*", "/", "-", "DESC"],
    valores_disponiveis: ["100.0", "1", "2"],
    ordem_importa: true,
  },

  {
    id: "jr-098",
    nivel: "junior",
    numero: 98,
    titulo: "Total de Capital em Estoque — Categoria Audio",
    secao: "curriculo",
    demanda:
      "Rafael Drummond precisa de uma métrica rápida: 'Quanto temos imobilizado em estoque da categoria Audio? Soma de custo × estoque. Um número só, alias total_audio.' Agregações filtradas são pan comum no dia a dia financeiro.",
    tabelas: ["produtos"],
    gabarito: "SELECT SUM(custo * estoque) AS total_audio FROM produtos WHERE categoria = 'Audio'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AS"],
    funcoes_disponiveis: ["SUM()", "AVG()", "COUNT(*)", "MAX()", "MIN()"],
    operadores_disponiveis: ["*", "="],
    valores_disponiveis: ["'Audio'"],
  },

  {
    id: "jr-099",
    nivel: "junior",
    numero: 99,
    titulo: "Maior Desconto Disponível",
    secao: "curriculo",
    demanda:
      "O cliente perguntou para o atendimento: 'Qual o maior desconto que vocês têm hoje?' Camila Torres te pede: 'Qual produto tem o maior desconto percentual ativo? Traz nome e desconto_pct — só um produto, o top.' Combine MAX com subquery ou ORDER BY + LIMIT.",
    dica: "Use ORDER BY desconto_pct DESC LIMIT 1, filtrando IS NOT NULL. Ou, se preferir, use uma subquery com MAX.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, desconto_pct FROM produtos WHERE desconto_pct IS NOT NULL ORDER BY desconto_pct DESC LIMIT 1",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "LIMIT", "IS NOT NULL"],
    funcoes_disponiveis: ["MAX()", "MIN()", "COUNT(*)"],
    valores_disponiveis: ["DESC", "1"],
    ordem_importa: true,
  },

  {
    id: "jr-100",
    nivel: "junior",
    numero: 100,
    titulo: "Milestone: Centésimo Exercício!",
    secao: "curriculo",
    demanda:
      "Parabéns, você chegou ao exercício 100! Ana Beatriz aparece com um bolo (metafórico): 'Para comemorar, me dá o relatório mais completo que você conseguir em uma query: nome, marca, categoria, preco, margem_pct (1 casa), faixa de preço e se tem desconto (Sim/Não). Filtra só os que têm estoque maior que 20. Ordena por categoria e dentro da categoria por margem_pct decrescente.'",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, marca, categoria, preco, ROUND((preco - custo) / preco * 100, 1) AS margem_pct, CASE WHEN preco <= 2000 THEN 'Entrada' WHEN preco <= 7000 THEN 'Intermediário' ELSE 'Premium' END AS faixa, CASE WHEN desconto_pct IS NOT NULL THEN 'Sim' ELSE 'Não' END AS tem_desconto FROM produtos WHERE estoque > 20 ORDER BY categoria ASC, margem_pct DESC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "AS", "AND", "CASE", "WHEN", "THEN", "ELSE", "END", "IS NOT NULL", "IS NULL"],
    funcoes_disponiveis: ["ROUND()", "COALESCE()", "COUNT(*)", "SUM()"],
    operadores_disponiveis: ["-", "/", "*", ">", "<=", "ASC", "DESC"],
    valores_disponiveis: ["20", "2000", "7000", "100", "1", "'Entrada'", "'Intermediário'", "'Premium'", "'Sim'", "'Não'"],
    ordem_importa: true,
  },

  {
    id: "jr-101",
    nivel: "junior",
    numero: 101,
    titulo: "Tendência de Precificação por Ano",
    secao: "curriculo",
    demanda:
      "Priya Nair quer uma análise temporal de lançamentos: 'Para cada produto, mostra nome, ano de lançamento e uma coluna tendencia: se lançado em 2025 ou mais recente é Novo, se em 2024 é Recente, se antes é Legado. Ordena por ano de lançamento descrescente.'",
    dica: "Use strftime('%Y', lancamento) para extrair o ano como texto, depois compare com strings '2024', '2025'.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, strftime('%Y', lancamento) AS ano_lancamento, CASE WHEN strftime('%Y', lancamento) >= '2025' THEN 'Novo' WHEN strftime('%Y', lancamento) = '2024' THEN 'Recente' ELSE 'Legado' END AS tendencia FROM produtos ORDER BY lancamento DESC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "AS", "CASE", "WHEN", "THEN", "ELSE", "END"],
    funcoes_disponiveis: ["STRFTIME()", "DATE()"],
    operadores_disponiveis: [">=", "=", "DESC"],
    valores_disponiveis: ["'%Y'", "'2025'", "'2024'", "'Novo'", "'Recente'", "'Legado'"],
    ordem_importa: true,
  },

  {
    id: "jr-102",
    nivel: "junior",
    numero: 102,
    titulo: "Alerta de Margem Negativa",
    secao: "curriculo",
    demanda:
      "Rafael Drummond dispara um alerta: 'Algum produto pode ter virado deficitário depois de um desconto agressivo? Calcula o preço com desconto aplicado e mostra os casos onde o preco_final ficou ABAIXO do custo. Traz nome, custo, preco_final e o prejuizo (custo - preco_final). Filtra só os deficitários.' Isso acontece em vendas mal calculadas.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, custo, ROUND(preco * (1 - COALESCE(desconto_pct, 0) / 100.0), 2) AS preco_final, ROUND(custo - preco * (1 - COALESCE(desconto_pct, 0) / 100.0), 2) AS prejuizo FROM produtos WHERE preco * (1 - COALESCE(desconto_pct, 0) / 100.0) < custo",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AS"],
    funcoes_disponiveis: ["ROUND()", "COALESCE()", "ABS()"],
    operadores_disponiveis: ["*", "/", "-", "<"],
    valores_disponiveis: ["100.0", "1", "0", "2"],
  },

  {
    id: "jr-103",
    nivel: "junior",
    numero: 103,
    titulo: "Concentração de Estoque por Categoria",
    secao: "curriculo",
    demanda:
      "Diego Mendes quer entender onde está concentrado o estoque físico: 'Me dá o total de unidades em estoque (SUM) e o total de itens distintos (COUNT) — tudo em uma linha com aliases total_unidades e total_skus. Isso vai pro relatório de inventário de hoje.'",
    tabelas: ["produtos"],
    gabarito: "SELECT SUM(estoque) AS total_unidades, COUNT(*) AS total_skus FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["SUM()", "COUNT(*)", "COUNT(DISTINCT )", "AVG()", "MAX()", "MIN()"],
  },

  {
    id: "jr-104",
    nivel: "junior",
    numero: 104,
    titulo: "Score de Produto para Ranking",
    secao: "curriculo",
    demanda:
      "Ana Beatriz quer um critério composto para ranquear produtos para a vitrine: 'Cria um score = margem_pct × 0.6 + (estoque / 10.0) × 0.4. Traz nome e score arredondado para 2 casas, ordenado do maior score para o menor. Os 10 maiores vão pra home.' Esse tipo de scoring ponderado é muito usado em recomendações.",
    dica: "Calcule a margem_pct inline: (preco - custo) / preco * 100. O score combina ela com o estoque normalizado.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, ROUND((preco - custo) / preco * 100 * 0.6 + (estoque / 10.0) * 0.4, 2) AS score FROM produtos ORDER BY score DESC LIMIT 10",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "LIMIT", "AS"],
    funcoes_disponiveis: ["ROUND()"],
    operadores_disponiveis: ["-", "/", "*", "+"],
    valores_disponiveis: ["100", "0.6", "0.4", "10.0", "2", "10", "DESC"],
    ordem_importa: true,
  },

  {
    id: "jr-105",
    nivel: "junior",
    numero: 105,
    titulo: "Análise ABC de Valor de Estoque",
    secao: "curriculo",
    demanda:
      "Rafael Drummond quer aplicar a Análise ABC clássica por valor de estoque: 'Classifica cada produto: capital_imobilizado (custo × estoque) acima de R$500.000 é A, entre R$100.000 e R$500.000 é B, abaixo é C. Traz nome, capital_imobilizado e classe_abc. Ordena por capital_imobilizado decrescente.' Análise ABC é usada em toda empresa séria de varejo.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, custo * estoque AS capital_imobilizado, CASE WHEN custo * estoque > 500000 THEN 'A' WHEN custo * estoque >= 100000 THEN 'B' ELSE 'C' END AS classe_abc FROM produtos ORDER BY capital_imobilizado DESC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "AS", "CASE", "WHEN", "THEN", "ELSE", "END"],
    operadores_disponiveis: ["*", ">", ">="],
    valores_disponiveis: ["500000", "100000", "'A'", "'B'", "'C'", "DESC"],
    ordem_importa: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO 15 — QUALIDADE DE DADOS (jr-106 a jr-120)
  // "O analista que sabe limpar dados é 10x mais valioso"
  // ═══════════════════════════════════════════════════════════════

  {
    id: "jr-106",
    nivel: "junior",
    numero: 106,
    titulo: "Perfil de Completude da Tabela",
    secao: "curriculo",
    demanda:
      "Lucas Oliveira te ensina uma query essencial em qualquer pipeline de dados: 'Quando você recebe uma tabela nova, a primeira coisa é perfilar os dados. Me traz: total de produtos (total), quantos têm cor definida (com_cor), quantos têm desconto (com_desconto), e quantos têm cor E desconto (completos). Tudo em uma linha.' Isso é data profiling básico.",
    dica: "Use COUNT(*) para total e COUNT(coluna) para colunas — COUNT ignora NULLs automaticamente! COUNT(cor) conta só os não-nulos.",
    tabelas: ["produtos"],
    gabarito: "SELECT COUNT(*) AS total, COUNT(cor) AS com_cor, COUNT(desconto_pct) AS com_desconto, COUNT(CASE WHEN cor IS NOT NULL AND desconto_pct IS NOT NULL THEN 1 END) AS completos FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["COUNT(*)", "COUNT(DISTINCT )", "SUM()", "CASE"],
    valores_disponiveis: ["1"],
  },

  {
    id: "jr-107",
    nivel: "junior",
    numero: 107,
    titulo: "COUNT(*) vs COUNT(coluna) — A Diferença Crítica",
    secao: "curriculo",
    demanda:
      "Lucas Oliveira te dá um exercício que reprova 40% dos candidatos em entrevista: 'Explica na prática a diferença. Me traz COUNT(*) AS conta_total e COUNT(cor) AS conta_cor. Por que os valores são diferentes?' Entender isso é fundamental — e poucos sabem explicar.",
    dica: "COUNT(*) conta todas as linhas, incluindo NULLs. COUNT(coluna) conta apenas os valores não-nulos naquela coluna. A diferença é o número de NULLs.",
    tabelas: ["produtos"],
    gabarito: "SELECT COUNT(*) AS conta_total, COUNT(cor) AS conta_cor, COUNT(*) - COUNT(cor) AS nulos_cor FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["COUNT(*)", "COUNT(DISTINCT )"],
    operadores_disponiveis: ["-"],
  },

  {
    id: "jr-108",
    nivel: "junior",
    numero: 108,
    titulo: "NULLIF — Evitando Divisão por Zero",
    secao: "curriculo",
    demanda:
      "Lucas Oliveira te apresenta uma função pouco conhecida mas muito útil: 'NULLIF(a, b) retorna NULL se a = b, senão retorna a. É perfeito para evitar erro de divisão por zero. Traz nome e a relacao_preco_custo = preco / NULLIF(custo, 0). Se custo for zero, retorna NULL em vez de dar erro.' Defensivo e profissional.",
    dica: "NULLIF(custo, 0) retorna NULL quando custo é 0, tornando a divisão segura. Combine com COALESCE para dar um valor padrão ao NULL resultante.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, ROUND(preco / NULLIF(custo, 0), 2) AS relacao_preco_custo FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["NULLIF()", "COALESCE()", "ROUND()"],
    operadores_disponiveis: ["/"],
    valores_disponiveis: ["0", "2"],
  },

  {
    id: "jr-109",
    nivel: "junior",
    numero: 109,
    titulo: "Detecção de Dados Suspeitos",
    secao: "curriculo",
    demanda:
      "Rafael Drummond detectou anomalias no relatório de ontem: 'Preciso identificar produtos com dados suspeitos — onde o preço é menor que o custo (margem negativa impossível em operação normal). Isso indica erro de cadastro. Traz nome, preco e custo de todos os produtos onde preco < custo.'",
    dica: "Dados com preço < custo são erros de qualidade. Em empresas reais, isso vira alerta automático no pipeline de dados.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco, custo FROM produtos WHERE preco < custo",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE"],
    operadores_disponiveis: ["<", ">", "="],
  },

  {
    id: "jr-110",
    nivel: "junior",
    numero: 110,
    titulo: "Validação de Estoque Negativo",
    secao: "curriculo",
    demanda:
      "Diego Mendes quer rodar uma checagem de qualidade antes de gerar o relatório de inventário: 'Existe algum produto com estoque negativo? Isso não deveria ser possível no sistema. Traz nome e estoque de qualquer produto com estoque < 0. Se não tiver, a query retorna vazia — e isso é ótimo.' Queries de validação retornando vazio são resultados positivos.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, estoque FROM produtos WHERE estoque < 0",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE"],
    operadores_disponiveis: ["<", ">", "=", "!="],
  },

  {
    id: "jr-111",
    nivel: "junior",
    numero: 111,
    titulo: "Normalização de Texto em Consultas",
    secao: "curriculo",
    demanda:
      "Priya Nair detectou inconsistências no catálogo: alguns produtos têm espaços extras no nome por erro de importação. 'Cria uma consulta de diagnóstico: traz nome e TRIM(nome) AS nome_limpo, mas filtra apenas os produtos onde o nome é diferente do nome trimado — ou seja, aqueles com espaços no começo ou fim.' Assim sabemos quais têm o problema.",
    dica: "WHERE nome != TRIM(nome) vai retornar apenas as linhas onde há diferença entre o valor original e o trimado.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, TRIM(nome) AS nome_limpo FROM produtos WHERE nome != TRIM(nome)",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AS"],
    funcoes_disponiveis: ["TRIM()", "UPPER()", "LOWER()", "REPLACE()"],
    operadores_disponiveis: ["!=", "="],
  },

  {
    id: "jr-112",
    nivel: "junior",
    numero: 112,
    titulo: "Produto com Nome Mais Curto e Mais Longo",
    secao: "curriculo",
    demanda:
      "Priya Nair quer entender os extremos de nomenclatura dos produtos para criar regras de validação: 'Qual o produto com nome mais curto e qual tem o nome mais longo? Traz em uma linha só: nome_mais_curto (MIN do LENGTH), nome_mais_longo (MAX do LENGTH) e comprimento_max. Útil para definir constraints de banco.'",
    tabelas: ["produtos"],
    gabarito: "SELECT MIN(LENGTH(nome)) AS comprimento_min, MAX(LENGTH(nome)) AS comprimento_max FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["LENGTH()", "MIN()", "MAX()", "AVG()"],
  },

  {
    id: "jr-113",
    nivel: "junior",
    numero: 113,
    titulo: "Valores Distintos de Desconto",
    secao: "curriculo",
    demanda:
      "Camila Torres quer auditar os descontos aplicados: 'Quais são os percentuais de desconto únicos que aparecem no catálogo (excluindo os nulos)? Liste em ordem crescente. Isso vai me dizer se temos muita granularidade ou se precisamos padronizar.' Data profiling de valores únicos.",
    tabelas: ["produtos"],
    gabarito: "SELECT DISTINCT desconto_pct FROM produtos WHERE desconto_pct IS NOT NULL ORDER BY desconto_pct ASC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "DISTINCT", "ORDER BY", "IS NOT NULL"],
    valores_disponiveis: ["ASC"],
    ordem_importa: true,
  },

  {
    id: "jr-114",
    nivel: "junior",
    numero: 114,
    titulo: "COALESCE com Múltiplos Fallbacks",
    secao: "curriculo",
    demanda:
      "Lucas Oliveira mostra um padrão avançado de COALESCE: 'Às vezes você tem 3 campos que podem ser NULL e quer o primeiro não-nulo. Para cor: tenta cor primeiro, se NULL tenta a categoria como fallback, se ambos NULL retorna Indefinido. Traz nome e cor_display com essa lógica.' COALESCE aceita mais de 2 argumentos.",
    dica: "COALESCE(a, b, c) retorna o primeiro não-NULL da lista. Pode ter quantos argumentos quiser.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, COALESCE(cor, categoria, 'Indefinido') AS cor_display FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["COALESCE()", "NULLIF()", "CASE"],
    valores_disponiveis: ["'Indefinido'"],
  },

  {
    id: "jr-115",
    nivel: "junior",
    numero: 115,
    titulo: "NOT IN com NULL — A Armadilha Clássica",
    secao: "curriculo",
    demanda:
      "Lucas Oliveira te conta sobre uma das armadilhas mais comuns: 'NOT IN com NULL retorna zero linhas. Se você tentar WHERE id NOT IN (1, 2, NULL), SQLite retorna nada — porque NULL = qualquer coisa é UNKNOWN. Por isso use NOT EXISTS ou filtre o NULL antes. Demonstra isso: traz nome dos produtos onde desconto_pct NOT IN (10, 15) mas FILTRANDO nulos antes com AND desconto_pct IS NOT NULL.'",
    dica: "Sempre adicione IS NOT NULL quando usar NOT IN em colunas que podem ter NULL. Sem isso, a query pode retornar 0 linhas silenciosamente.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, desconto_pct FROM produtos WHERE desconto_pct IS NOT NULL AND desconto_pct NOT IN (10, 15)",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AND", "NOT", "IN", "IS NOT NULL"],
    valores_disponiveis: ["10", "15"],
  },

  {
    id: "jr-116",
    nivel: "junior",
    numero: 116,
    titulo: "Identificando Outliers de Preço",
    secao: "curriculo",
    demanda:
      "Rafael Drummond quer detectar outliers de preço para auditoria: 'Um produto é outlier se seu preço for mais de 2× a média geral. Usa uma subquery para calcular a média e filtra os produtos acima de 2× esse valor. Traz nome e preco.'",
    dica: "WHERE preco > (SELECT AVG(preco) * 2 FROM produtos). A subquery calcula AVG(preco) * 2 e esse valor é o threshold do outlier.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco FROM produtos WHERE preco > (SELECT AVG(preco) * 2 FROM produtos) ORDER BY preco DESC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY"],
    funcoes_disponiveis: ["AVG()", "MAX()", "MIN()", "ROUND()"],
    operadores_disponiveis: [">", "*"],
    valores_disponiveis: ["2", "DESC"],
    ordem_importa: true,
  },

  {
    id: "jr-117",
    nivel: "junior",
    numero: 117,
    titulo: "Percentual de Produtos Sem Cor",
    secao: "curriculo",
    demanda:
      "Priya Nair precisa reportar a taxa de completude do campo cor: 'Quantos % dos produtos estão sem cor definida? Calcula como (COUNT dos nulos / COUNT total) * 100, arredondado para 1 casa. Alias: pct_sem_cor.' Métricas de data quality em percentual são essenciais em pipelines.",
    tabelas: ["produtos"],
    gabarito: "SELECT ROUND(CAST(COUNT(*) - COUNT(cor) AS REAL) / COUNT(*) * 100, 1) AS pct_sem_cor FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["COUNT(*)", "ROUND()", "CAST( AS )"],
    operadores_disponiveis: ["-", "/", "*"],
    valores_disponiveis: ["100", "1", "REAL"],
  },

  {
    id: "jr-118",
    nivel: "junior",
    numero: 118,
    titulo: "Validação de Formato de Data",
    secao: "curriculo",
    demanda:
      "Lucas Oliveira quer que você verifique a qualidade das datas: 'Todos os lançamentos têm exatamente 10 caracteres (YYYY-MM-DD)? Traz nome e lancamento dos produtos onde LENGTH(lancamento) != 10 — se retornar vazio, as datas são válidas.' Validação de formato com SQL puro.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, lancamento FROM produtos WHERE LENGTH(lancamento) != 10",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE"],
    funcoes_disponiveis: ["LENGTH()", "SUBSTR()", "TRIM()"],
    operadores_disponiveis: ["!=", "=", "<", ">"],
    valores_disponiveis: ["10"],
  },

  {
    id: "jr-119",
    nivel: "junior",
    numero: 119,
    titulo: "Padronização de Case em Nomes",
    secao: "curriculo",
    demanda:
      "Priya Nair quer garantir que os nomes estejam todos em Title Case (primeira letra maiúscula, resto minúsculo). 'Para verificar: traz nome e LOWER(nome) AS nome_lower. Compara visualmente se há inconsistências. Depois traz também UPPER(SUBSTR(nome, 1, 1)) || LOWER(SUBSTR(nome, 2)) AS nome_title para ver o formato desejado.'",
    dica: "SQLite não tem função INITCAP diretamente, mas você pode simular com UPPER da primeira letra + LOWER do resto usando concatenação ||.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, LOWER(nome) AS nome_lower, UPPER(SUBSTR(nome, 1, 1)) || LOWER(SUBSTR(nome, 2)) AS nome_title FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["UPPER()", "LOWER()", "SUBSTR()", "LENGTH()", "TRIM()"],
    operadores_disponiveis: ["||"],
    valores_disponiveis: ["1", "2"],
  },

  {
    id: "jr-120",
    nivel: "junior",
    numero: 120,
    titulo: "Relatório de Qualidade Completo",
    secao: "curriculo",
    demanda:
      "Lucas Oliveira te desafia com um data quality report completo: 'Em uma única query, me dá: total de SKUs, % com cor, % com desconto, menor margem %, maior margem %, e uma flag tem_problema: Sim se existir algum produto com preco < custo, Não caso contrário. Uma linha só. Esse tipo de query vai no seu portfolio.' Use subqueries escalares para a flag.",
    tabelas: ["produtos"],
    gabarito: "SELECT COUNT(*) AS total_skus, ROUND(COUNT(cor) * 100.0 / COUNT(*), 1) AS pct_com_cor, ROUND(COUNT(desconto_pct) * 100.0 / COUNT(*), 1) AS pct_com_desconto, ROUND(MIN((preco - custo) / preco * 100), 1) AS menor_margem_pct, ROUND(MAX((preco - custo) / preco * 100), 1) AS maior_margem_pct, CASE WHEN (SELECT COUNT(*) FROM produtos WHERE preco < custo) > 0 THEN 'Sim' ELSE 'Não' END AS tem_problema FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS", "CASE", "WHEN", "THEN", "ELSE", "END"],
    funcoes_disponiveis: ["COUNT(*)", "COUNT(DISTINCT )", "ROUND()", "MIN()", "MAX()"],
    operadores_disponiveis: ["*", "/", "-", ">", "<"],
    valores_disponiveis: ["100.0", "1", "0", "'Sim'", "'Não'"],
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO 16 — SQL AVANÇADO JUNIOR: PADRÕES PROFISSIONAIS (jr-121 a jr-135)
  // "O código que você escreve diz muito sobre você"
  // ═══════════════════════════════════════════════════════════════

  {
    id: "jr-121",
    nivel: "junior",
    numero: 121,
    titulo: "Predicados SARG-able — Performance Básica",
    secao: "curriculo",
    demanda:
      "Lucas Oliveira explica um conceito de performance que separa bons de ótimos analistas: 'Um predicado SARG-able é aquele que o banco consegue usar um índice para resolver. WHERE UPPER(nome) = X não é SARG-able, mas WHERE nome = X é. Demonstra: traz produtos da marca Apple sem transformar a coluna com funções no WHERE — use valor literal já no case correto.'",
    dica: "WHERE marca = 'Apple' é SARG-able. WHERE LOWER(marca) = 'apple' NÃO é — força leitura de toda a tabela. Prefira sempre predicados diretos na coluna.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, marca, preco FROM produtos WHERE marca = 'Apple' ORDER BY preco DESC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY"],
    operadores_disponiveis: ["=", ">", "<"],
    valores_disponiveis: ["'Apple'", "DESC"],
    ordem_importa: true,
  },

  {
    id: "jr-122",
    nivel: "junior",
    numero: 122,
    titulo: "Comentários SQL — Código Legível",
    secao: "curriculo",
    demanda:
      "Lucas Oliveira insiste numa boa prática: 'SQL é lido por outros humanos. Comentários explicam o porquê, não o quê. Escreve a query de relatório de margem com comentários de linha (--) explicando cada seção: o SELECT, o WHERE e o ORDER BY. A query é: nome, margem_pct de produtos com margem > 30, ordenados por margem_pct decrescente.' Execute sem os comentários para validar.",
    dica: "-- texto de comentário ignora o resto da linha. /* texto */ é multi-linha. Use para explicar o propósito de filtros complexos.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, ROUND((preco - custo) / preco * 100, 1) AS margem_pct FROM produtos WHERE (preco - custo) / preco * 100 > 30 ORDER BY margem_pct DESC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "AS"],
    funcoes_disponiveis: ["ROUND()"],
    operadores_disponiveis: [">", "-", "/", "*"],
    valores_disponiveis: ["100", "30", "1", "DESC"],
    ordem_importa: true,
  },

  {
    id: "jr-123",
    nivel: "junior",
    numero: 123,
    titulo: "Alias Consistente — Boas Práticas",
    secao: "curriculo",
    demanda:
      "Ana Beatriz revisou o relatório e reclamou: 'As colunas calculadas precisam de nomes claros, não col1 ou expr. Reescreve: traz nome, marca, preco como preco_venda, custo como preco_custo, (preco-custo) como margem_bruta e ROUND((preco-custo)/preco*100,1) como margem_pct. Nomes claros facilitam a leitura por qualquer pessoa do time.'",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, marca, preco AS preco_venda, custo AS preco_custo, preco - custo AS margem_bruta, ROUND((preco - custo) / preco * 100, 1) AS margem_pct FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["ROUND()"],
    operadores_disponiveis: ["-", "/", "*"],
    valores_disponiveis: ["100", "1"],
  },

  {
    id: "jr-124",
    nivel: "junior",
    numero: 124,
    titulo: "Lógica de Três Valores — TRUE, FALSE, UNKNOWN",
    secao: "curriculo",
    demanda:
      "Lucas Oliveira te ensina sobre a lógica SQL que causa bugs silenciosos: 'Em SQL existem 3 valores lógicos: TRUE, FALSE e UNKNOWN (quando envolve NULL). NULL AND TRUE = UNKNOWN, não FALSE. Por isso WHERE col = NULL nunca funciona. Demonstra: tente WHERE cor = NULL e WHERE cor IS NULL e compare os resultados.' Escreva a versão correta.",
    dica: "WHERE cor = NULL sempre retorna 0 linhas (UNKNOWN). WHERE cor IS NULL retorna os nulos corretamente. É a diferença entre uma query com bug e uma correta.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, cor FROM produtos WHERE cor IS NULL",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "IS NULL", "IS NOT NULL"],
  },

  {
    id: "jr-125",
    nivel: "junior",
    numero: 125,
    titulo: "Coerção de Tipos — String vs Número",
    secao: "curriculo",
    demanda:
      "Lucas Oliveira alerta: 'Um bug clássico: comparar número com string. Se estoque for INT e você comparar com estoque > \"30\" (string), o SQLite faz coerção implícita e pode dar resultado errado em outros bancos. Sempre use o tipo correto. Demonstra a forma CORRETA: traz nome e estoque dos produtos com estoque > 30 (número, sem aspas).'",
    dica: "Números não levam aspas: WHERE estoque > 30. Strings levam aspas simples: WHERE marca = 'Apple'. Misturar os dois causa coerção implícita — funciona no SQLite mas falha em outros bancos.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, estoque FROM produtos WHERE estoque > 30 ORDER BY estoque DESC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY"],
    operadores_disponiveis: [">", "<", ">=", "<=", "="],
    valores_disponiveis: ["30", "DESC"],
    ordem_importa: true,
  },

  {
    id: "jr-126",
    nivel: "junior",
    numero: 126,
    titulo: "Evitando DISTINCT Desnecessário",
    secao: "curriculo",
    demanda:
      "Lucas Oliveira explica uma otimização comum: 'DISTINCT tem custo de performance — ele força uma ordenação e deduplicação. Só use quando realmente necessário. Demonstra ambos os casos: (1) SELECT DISTINCT categoria FROM produtos — aqui faz sentido pois categoria se repete. (2) SELECT DISTINCT id FROM produtos — aqui é desnecessário pois id já é único.' Escreva o caso (1).",
    tabelas: ["produtos"],
    gabarito: "SELECT DISTINCT categoria FROM produtos ORDER BY categoria",
    keywords_disponiveis: ["SELECT", "FROM", "DISTINCT", "ORDER BY"],
    ordem_importa: true,
  },

  {
    id: "jr-127",
    nivel: "junior",
    numero: 127,
    titulo: "Filtrando Antes de Agregar",
    secao: "curriculo",
    demanda:
      "Lucas Oliveira te explica a regra de ouro: 'WHERE filtra ANTES da agregação, portanto é mais eficiente. Demonstra: soma o custo*estoque (capital_imobilizado) apenas dos produtos da categoria Notebooks. Usar WHERE é mais eficiente que calcular tudo e depois filtrar (que seria HAVING, e vem no Pleno).'",
    tabelas: ["produtos"],
    gabarito: "SELECT SUM(custo * estoque) AS capital_notebooks FROM produtos WHERE categoria = 'Notebooks'",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AS"],
    funcoes_disponiveis: ["SUM()", "COUNT(*)", "AVG()", "MAX()", "MIN()"],
    operadores_disponiveis: ["*", "="],
    valores_disponiveis: ["'Notebooks'"],
  },

  {
    id: "jr-128",
    nivel: "junior",
    numero: 128,
    titulo: "EXISTS vs IN — Entendendo a Diferença",
    secao: "curriculo",
    demanda:
      "Lucas Oliveira explica: 'EXISTS e IN fazem coisas similares mas com performance diferente para grandes datasets. Para uma tabela pequena a diferença é mínima, mas o conceito é importante. Demonstra o padrão EXISTS: traz os produtos que têm pelo menos um produto da mesma categoria com preço acima de R$5.000 — usando EXISTS com subquery.'",
    dica: "WHERE EXISTS (SELECT 1 FROM tabela_interna WHERE condição correlacionada). O SELECT 1 é convencional — o EXISTS só verifica se a subquery retorna alguma linha.",
    tabelas: ["produtos"],
    gabarito: "SELECT p1.nome, p1.categoria, p1.preco FROM produtos p1 WHERE EXISTS (SELECT 1 FROM produtos p2 WHERE p2.categoria = p1.categoria AND p2.preco > 5000 AND p2.id != p1.id)",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AND", "AS"],
    operadores_disponiveis: [">", "=", "!="],
    valores_disponiveis: ["5000", "1"],
  },

  {
    id: "jr-129",
    nivel: "junior",
    numero: 129,
    titulo: "Self-Reference — Comparando com a Mesma Tabela",
    secao: "curriculo",
    demanda:
      "Lucas Oliveira mostra um padrão avançado: 'Às vezes você precisa comparar uma linha com outras linhas da mesma tabela. Traz os produtos que são mais baratos que ALGUM produto Apple (ou seja, preco < MIN preço Apple). Use subquery. Isso é self-reference pattern.'",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco FROM produtos WHERE preco < (SELECT MIN(preco) FROM produtos WHERE marca = 'Apple') ORDER BY preco ASC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY"],
    funcoes_disponiveis: ["MIN()", "MAX()", "AVG()"],
    operadores_disponiveis: ["<", "="],
    valores_disponiveis: ["'Apple'", "ASC"],
    ordem_importa: true,
  },

  {
    id: "jr-130",
    nivel: "junior",
    numero: 130,
    titulo: "Paginação Profissional com OFFSET",
    secao: "curriculo",
    demanda:
      "Lucas Oliveira explica a paginação como é feita em APIs reais: 'Em sistemas de produção, você recebe page_number e page_size. OFFSET = (page - 1) × page_size. Para a página 3 com page_size 5: OFFSET = (3-1)×5 = 10. Traz os produtos da página 3 (size 5) ordenados por preco DESC. Demonstra o cálculo na query com LIMIT e OFFSET.'",
    dica: "LIMIT 5 OFFSET 10 retorna os registros 11 a 15 na ordem especificada.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco FROM produtos ORDER BY preco DESC LIMIT 5 OFFSET 10",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "LIMIT"],
    valores_disponiveis: ["5", "10", "OFFSET", "DESC"],
    ordem_importa: true,
  },

  {
    id: "jr-131",
    nivel: "junior",
    numero: 131,
    titulo: "CASE WHEN Aninhado",
    secao: "curriculo",
    demanda:
      "Camila Torres precisa de uma segmentação complexa para o CRM: 'Cria uma coluna perfil_produto com lógica em dois níveis: se for da Apple, verifica se é Entrada (<=R$3.000) ou Premium (>R$3.000). Se for Samsung, verifica se é Budget (<=R$2.000) ou Flagship (>R$2.000). Para outras marcas, retorna Outros. Traz nome, marca e perfil_produto.'",
    dica: "CASE pode ser aninhado: CASE WHEN ... THEN (CASE WHEN ... THEN ... END) ELSE ... END. Mantenha a indentação clara.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, marca, CASE WHEN marca = 'Apple' THEN CASE WHEN preco <= 3000 THEN 'Apple Entrada' ELSE 'Apple Premium' END WHEN marca = 'Samsung' THEN CASE WHEN preco <= 2000 THEN 'Samsung Budget' ELSE 'Samsung Flagship' END ELSE 'Outros' END AS perfil_produto FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS", "CASE", "WHEN", "THEN", "ELSE", "END"],
    operadores_disponiveis: ["=", "<=", ">"],
    valores_disponiveis: ["'Apple'", "'Samsung'", "3000", "2000", "'Apple Entrada'", "'Apple Premium'", "'Samsung Budget'", "'Samsung Flagship'", "'Outros'"],
  },

  {
    id: "jr-132",
    nivel: "junior",
    numero: 132,
    titulo: "Contagem Condicional com CASE",
    secao: "curriculo",
    demanda:
      "Rafael Drummond quer um pivot simples sem GROUP BY: 'Em uma linha, me diz: quantos produtos são de Smartphones, quantos de Notebooks, e quantos são de outras categorias. Use COUNT(CASE WHEN...) para cada contagem. Aliases: total_smartphones, total_notebooks, total_outros.' Esse padrão de conditional count é muito comum em relatórios.",
    dica: "COUNT(CASE WHEN condição THEN 1 END) conta apenas as linhas onde a condição é verdadeira. Os NULLs (casos false) são ignorados pelo COUNT.",
    tabelas: ["produtos"],
    gabarito: "SELECT COUNT(CASE WHEN categoria = 'Smartphones' THEN 1 END) AS total_smartphones, COUNT(CASE WHEN categoria = 'Notebooks' THEN 1 END) AS total_notebooks, COUNT(CASE WHEN categoria NOT IN ('Smartphones', 'Notebooks') THEN 1 END) AS total_outros FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS", "CASE", "WHEN", "THEN", "END"],
    funcoes_disponiveis: ["COUNT(*)", "COUNT(DISTINCT )", "SUM()"],
    operadores_disponiveis: ["=", "NOT", "IN"],
    valores_disponiveis: ["'Smartphones'", "'Notebooks'", "1"],
  },

  {
    id: "jr-133",
    nivel: "junior",
    numero: 133,
    titulo: "Máximo e Mínimo com Condição",
    secao: "curriculo",
    demanda:
      "Beatriz Melo precisa de métricas por segmento para a reunião de vendas: 'Me traz em uma linha: o produto mais barato que é Apple (min_apple), o mais caro que é Apple (max_apple), e o preço médio dos não-Apple (media_outros). Sem GROUP BY — tudo em uma linha.'",
    dica: "Combine MIN/MAX/AVG com CASE WHEN dentro delas: MIN(CASE WHEN marca = 'Apple' THEN preco END) ignora os não-Apple no cálculo.",
    tabelas: ["produtos"],
    gabarito: "SELECT MIN(CASE WHEN marca = 'Apple' THEN preco END) AS min_apple, MAX(CASE WHEN marca = 'Apple' THEN preco END) AS max_apple, ROUND(AVG(CASE WHEN marca != 'Apple' THEN preco END), 2) AS media_outros FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS", "CASE", "WHEN", "THEN", "END"],
    funcoes_disponiveis: ["MIN()", "MAX()", "AVG()", "ROUND()"],
    operadores_disponiveis: ["=", "!="],
    valores_disponiveis: ["'Apple'", "2"],
  },

  {
    id: "jr-134",
    nivel: "junior",
    numero: 134,
    titulo: "Diferença em Dias Entre Datas",
    secao: "curriculo",
    demanda:
      "Priya Nair quer calcular a idade de cada produto no catálogo com precisão: 'Usa julianday('2026-01-01') como data de referência. Traz nome, lancamento, e dias_no_catalogo arredondado para inteiro. Também mostra meses_no_catalogo (divide por 30.44 — média de dias por mês) arredondado para 1 casa.' Esse cálculo é frequente em análises de produto.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, lancamento, ROUND(julianday('2026-01-01') - julianday(lancamento)) AS dias_no_catalogo, ROUND((julianday('2026-01-01') - julianday(lancamento)) / 30.44, 1) AS meses_no_catalogo FROM produtos ORDER BY dias_no_catalogo DESC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "AS"],
    funcoes_disponiveis: ["STRFTIME()", "DATE()", "ROUND()"],
    operadores_disponiveis: ["-", "/"],
    valores_disponiveis: ["'2026-01-01'", "30.44", "1", "DESC"],
    ordem_importa: true,
  },

  {
    id: "jr-135",
    nivel: "junior",
    numero: 135,
    titulo: "Período de Garantia e Vencimento",
    secao: "curriculo",
    demanda:
      "O sistema de pós-venda precisa calcular datas de expiração. Diego Mendes pede: 'Para cada produto, calcula: data_garantia_1ano (1 ano após lançamento), data_garantia_2anos (2 anos) e uma coluna garantia_vigente: Sim se a garantia de 2 anos ainda está dentro de 2026-12-31, Não caso contrário. Traz nome, lancamento, data_garantia_2anos e garantia_vigente.'",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, lancamento, date(lancamento, '+2 years') AS data_garantia_2anos, CASE WHEN date(lancamento, '+2 years') >= '2026-12-31' THEN 'Sim' ELSE 'Não' END AS garantia_vigente FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS", "CASE", "WHEN", "THEN", "ELSE", "END"],
    funcoes_disponiveis: ["DATE()", "STRFTIME()"],
    operadores_disponiveis: [">="],
    valores_disponiveis: ["'+2 years'", "'+1 year'", "'2026-12-31'", "'Sim'", "'Não'"],
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO 17 — ANÁLISE EXPLORATÓRIA E DASHBOARD PREP (jr-136 a jr-150)
  // "Preparar dados para visualização é uma habilidade core do analista"
  // ═══════════════════════════════════════════════════════════════

  {
    id: "jr-136",
    nivel: "junior",
    numero: 136,
    titulo: "Frequência de Lançamentos por Ano",
    secao: "curriculo",
    demanda:
      "Priya Nair quer uma distribuição de lançamentos por ano para o gráfico de roadmap: 'Traz ano (extraído com strftime) e total de produtos lançados naquele ano, sem GROUP BY — use COUNT com CASE. Anos que quero: 2022, 2023, 2024, 2025. Aliases: lancamentos_2022, lancamentos_2023, etc.'",
    tabelas: ["produtos"],
    gabarito: "SELECT COUNT(CASE WHEN strftime('%Y', lancamento) = '2022' THEN 1 END) AS lancamentos_2022, COUNT(CASE WHEN strftime('%Y', lancamento) = '2023' THEN 1 END) AS lancamentos_2023, COUNT(CASE WHEN strftime('%Y', lancamento) = '2024' THEN 1 END) AS lancamentos_2024, COUNT(CASE WHEN strftime('%Y', lancamento) = '2025' THEN 1 END) AS lancamentos_2025 FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS", "CASE", "WHEN", "THEN", "END"],
    funcoes_disponiveis: ["COUNT(*)", "STRFTIME()", "COUNT(DISTINCT )"],
    operadores_disponiveis: ["="],
    valores_disponiveis: ["'%Y'", "'2022'", "'2023'", "'2024'", "'2025'", "1"],
  },

  {
    id: "jr-137",
    nivel: "junior",
    numero: 137,
    titulo: "Preparando Dados para Gráfico de Barras",
    secao: "curriculo",
    demanda:
      "Lucas Oliveira está montando um dashboard e precisa dos dados no formato certo: 'Para o gráfico de barras de estoque por categoria, preciso de: categoria (único), total_unidades (SUM de estoque), e uma coluna nivel_estoque: Alto se > 200, Médio se 100-200, Baixo se < 100. Sem GROUP BY. Filtra por categoria Perifericos, Audio e Wearables.' Com WHERE e CASE você consegue.",
    tabelas: ["produtos"],
    gabarito: "SELECT 'Perifericos' AS categoria, SUM(CASE WHEN categoria = 'Perifericos' THEN estoque ELSE 0 END) AS total_unidades, CASE WHEN SUM(CASE WHEN categoria = 'Perifericos' THEN estoque ELSE 0 END) > 200 THEN 'Alto' WHEN SUM(CASE WHEN categoria = 'Perifericos' THEN estoque ELSE 0 END) >= 100 THEN 'Médio' ELSE 'Baixo' END AS nivel_estoque FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "AS", "CASE", "WHEN", "THEN", "ELSE", "END"],
    funcoes_disponiveis: ["SUM()", "COUNT(*)"],
    operadores_disponiveis: [">", ">=", "<", "="],
    valores_disponiveis: ["'Perifericos'", "200", "100", "0", "'Alto'", "'Médio'", "'Baixo'"],
  },

  {
    id: "jr-138",
    nivel: "junior",
    numero: 138,
    titulo: "Resumo Estatístico Completo",
    secao: "curriculo",
    demanda:
      "Rafael Drummond quer um resumo estatístico do portfólio para o board: 'Em uma query única: total SKUs, margem média (%), menor margem (%), maior margem (%), e desvio entre max e min (spread_margem). Tudo arredondado para 2 casas. Isso vai no executive summary.'",
    tabelas: ["produtos"],
    gabarito: "SELECT COUNT(*) AS total_skus, ROUND(AVG((preco - custo) / preco * 100), 2) AS margem_media_pct, ROUND(MIN((preco - custo) / preco * 100), 2) AS margem_min_pct, ROUND(MAX((preco - custo) / preco * 100), 2) AS margem_max_pct, ROUND(MAX((preco - custo) / preco * 100) - MIN((preco - custo) / preco * 100), 2) AS spread_margem FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS"],
    funcoes_disponiveis: ["COUNT(*)", "AVG()", "MIN()", "MAX()", "ROUND()"],
    operadores_disponiveis: ["-", "/", "*"],
    valores_disponiveis: ["100", "2"],
  },

  {
    id: "jr-139",
    nivel: "junior",
    numero: 139,
    titulo: "Distribuição de Estoque por Tercis",
    secao: "curriculo",
    demanda:
      "Diego Mendes quer entender como o estoque está distribuído: 'Classifica cada produto em tercil de estoque: Baixo (estoque <= 30), Médio (31-90), Alto (>90). Traz nome, estoque, tercil_estoque e o capital_imobilizado (custo × estoque). Ordena por tercil_estoque ASC e depois capital_imobilizado DESC.'",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, estoque, CASE WHEN estoque <= 30 THEN 'Baixo' WHEN estoque <= 90 THEN 'Médio' ELSE 'Alto' END AS tercil_estoque, custo * estoque AS capital_imobilizado FROM produtos ORDER BY tercil_estoque ASC, capital_imobilizado DESC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "AS", "CASE", "WHEN", "THEN", "ELSE", "END"],
    operadores_disponiveis: ["<=", ">", "*", "ASC", "DESC"],
    valores_disponiveis: ["30", "90", "'Baixo'", "'Médio'", "'Alto'"],
    ordem_importa: true,
  },

  {
    id: "jr-140",
    nivel: "junior",
    numero: 140,
    titulo: "Série Temporal Mensal de Lançamentos",
    secao: "curriculo",
    demanda:
      "Priya Nair precisa de dados para o gráfico de linha de lançamentos mensais: 'Traz o mês/ano de cada lançamento no formato YYYY-MM (strftime) e o nome do produto. Isso vai alimentar o tooltip do gráfico. Filtra apenas 2024 em diante. Ordena por data.'",
    tabelas: ["produtos"],
    gabarito: "SELECT strftime('%Y-%m', lancamento) AS mes_lancamento, nome FROM produtos WHERE lancamento >= '2024-01-01' ORDER BY lancamento ASC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "AS"],
    funcoes_disponiveis: ["STRFTIME()", "DATE()"],
    operadores_disponiveis: [">="],
    valores_disponiveis: ["'%Y-%m'", "'2024-01-01'", "ASC"],
    ordem_importa: true,
  },

  {
    id: "jr-141",
    nivel: "junior",
    numero: 141,
    titulo: "Top-N por Subgrupo com Subquery",
    secao: "curriculo",
    demanda:
      "Beatriz Melo quer o produto mais caro de CADA categoria para colocar em destaque: 'Para Smartphones, Notebooks e Tablets: qual o produto mais caro de cada? Usa subqueries para cada categoria. Traz categoria, nome e preco em 3 linhas.' Esse é um padrão top-1-por-grupo sem GROUP BY.",
    tabelas: ["produtos"],
    gabarito: "SELECT * FROM (SELECT 'Smartphones' AS categoria, nome, preco FROM produtos WHERE categoria = 'Smartphones' ORDER BY preco DESC LIMIT 1) UNION ALL SELECT * FROM (SELECT 'Notebooks', nome, preco FROM produtos WHERE categoria = 'Notebooks' ORDER BY preco DESC LIMIT 1) UNION ALL SELECT * FROM (SELECT 'Tablets', nome, preco FROM produtos WHERE categoria = 'Tablets' ORDER BY preco DESC LIMIT 1)",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "LIMIT", "UNION ALL", "AS"],
    operadores_disponiveis: ["=", "DESC"],
    valores_disponiveis: ["'Smartphones'", "'Notebooks'", "'Tablets'", "1"],
    ordem_importa: false,
  },

  {
    id: "jr-142",
    nivel: "junior",
    numero: 142,
    titulo: "Flag de Produto Recomendado",
    secao: "curriculo",
    demanda:
      "O algoritmo de recomendação da DataCo usa critérios simples: um produto é 'Recomendado' se tiver margem > 35%, estoque > 40 e estiver com desconto ativo. Priya Nair pede: 'Gera a coluna recomendado (Sim/Não) para todos os produtos. Mostra nome, margem_pct, estoque, desconto_pct e recomendado. Ordena por recomendado DESC, margem_pct DESC.'",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, ROUND((preco - custo) / preco * 100, 1) AS margem_pct, estoque, desconto_pct, CASE WHEN (preco - custo) / preco * 100 > 35 AND estoque > 40 AND desconto_pct IS NOT NULL THEN 'Sim' ELSE 'Não' END AS recomendado FROM produtos ORDER BY recomendado DESC, (preco - custo) / preco * 100 DESC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "AS", "AND", "IS NOT NULL", "CASE", "WHEN", "THEN", "ELSE", "END"],
    funcoes_disponiveis: ["ROUND()", "COALESCE()"],
    operadores_disponiveis: [">", "-", "/", "*", "DESC"],
    valores_disponiveis: ["35", "40", "100", "1", "'Sim'", "'Não'"],
    ordem_importa: true,
  },

  {
    id: "jr-143",
    nivel: "junior",
    numero: 143,
    titulo: "Relatório de Sazonalidade de Lançamentos",
    secao: "curriculo",
    demanda:
      "Priya Nair quer entender em qual trimestre a DataCo lança mais produtos: 'Para cada produto, cria trimestre_lancamento: Q1 (jan-mar), Q2 (abr-jun), Q3 (jul-set), Q4 (out-dez). Use strftime('%m') para extrair o mês. Traz nome, lancamento e trimestre_lancamento. Ordena por lancamento.'",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, lancamento, CASE WHEN CAST(strftime('%m', lancamento) AS INTEGER) BETWEEN 1 AND 3 THEN 'Q1' WHEN CAST(strftime('%m', lancamento) AS INTEGER) BETWEEN 4 AND 6 THEN 'Q2' WHEN CAST(strftime('%m', lancamento) AS INTEGER) BETWEEN 7 AND 9 THEN 'Q3' ELSE 'Q4' END AS trimestre_lancamento FROM produtos ORDER BY lancamento ASC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "AS", "CASE", "WHEN", "THEN", "ELSE", "END", "BETWEEN", "AND"],
    funcoes_disponiveis: ["STRFTIME()", "CAST( AS )"],
    operadores_disponiveis: ["=", "BETWEEN"],
    valores_disponiveis: ["'%m'", "1", "3", "4", "6", "7", "9", "INTEGER", "'Q1'", "'Q2'", "'Q3'", "'Q4'", "ASC"],
    ordem_importa: true,
  },

  {
    id: "jr-144",
    nivel: "junior",
    numero: 144,
    titulo: "Análise de Concentração de Receita",
    secao: "curriculo",
    demanda:
      "Rafael Drummond quer aplicar a lei de Pareto: 'Os 6 produtos mais caros representam mais de 80% do valor potencial de receita? Calcula a receita potencial de cada produto (preco × estoque) e a receita potencial dos TOP 6. Compara com a total. Traz os 6 mais caros com nome, preco, estoque e receita_potencial ordenados por receita_potencial desc.'",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco, estoque, preco * estoque AS receita_potencial FROM produtos ORDER BY receita_potencial DESC LIMIT 6",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "LIMIT", "AS"],
    operadores_disponiveis: ["*", "DESC"],
    valores_disponiveis: ["6", "DESC"],
    ordem_importa: true,
  },

  {
    id: "jr-145",
    nivel: "junior",
    numero: 145,
    titulo: "Detecção de Lacunas no Catálogo",
    secao: "curriculo",
    demanda:
      "Priya Nair quer identificar oportunidades de produto: 'Mostre as categorias onde NÃO temos nenhum produto com preço abaixo de R$1.000 — são lacunas no segmento de entrada. Usa NOT EXISTS ou subquery. Traz categoria_sem_opcao_entrada.' Identificar o que NÃO está nos dados é tão importante quanto o que está.",
    tabelas: ["produtos"],
    gabarito: "SELECT DISTINCT categoria FROM produtos p1 WHERE NOT EXISTS (SELECT 1 FROM produtos p2 WHERE p2.categoria = p1.categoria AND p2.preco < 1000) ORDER BY categoria",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "DISTINCT", "ORDER BY"],
    operadores_disponiveis: ["<", "="],
    valores_disponiveis: ["1000", "1"],
    ordem_importa: true,
  },

  {
    id: "jr-146",
    nivel: "junior",
    numero: 146,
    titulo: "Segmentação RFM Simplificada — Recência",
    secao: "curriculo",
    demanda:
      "Lucas Oliveira introduz o conceito de RFM (Recência, Frequência, Monetário) — base de toda análise de clientes: 'Para produtos, a recência é o tempo desde o lançamento. Classifica: lançado nos últimos 365 dias de 2026-01-01 é Recente, nos últimos 730 dias é Médio, senão é Antigo. Traz nome, lancamento, dias_desde_lancamento e segmento_recencia.'",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, lancamento, ROUND(julianday('2026-01-01') - julianday(lancamento)) AS dias_desde_lancamento, CASE WHEN julianday('2026-01-01') - julianday(lancamento) <= 365 THEN 'Recente' WHEN julianday('2026-01-01') - julianday(lancamento) <= 730 THEN 'Médio' ELSE 'Antigo' END AS segmento_recencia FROM produtos ORDER BY dias_desde_lancamento ASC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "AS", "CASE", "WHEN", "THEN", "ELSE", "END"],
    funcoes_disponiveis: ["ROUND()", "STRFTIME()", "DATE()"],
    operadores_disponiveis: ["-", "<=", ">"],
    valores_disponiveis: ["'2026-01-01'", "365", "730", "'Recente'", "'Médio'", "'Antigo'", "ASC"],
    ordem_importa: true,
  },

  {
    id: "jr-147",
    nivel: "junior",
    numero: 147,
    titulo: "Preparando Dados para BI — Dimensão de Produto",
    secao: "curriculo",
    demanda:
      "Lucas Oliveira te explica o conceito de dimensão no modelo dimensional (base de todo Data Warehouse): 'Uma dimensão de produto tem atributos descritivos. Cria a dimensão: id, nome, marca, categoria, faixa_preco (Entrada/Médio/Premium), segmento_margem (Baixa<30% / Média 30-50% / Alta>50%), tem_desconto (S/N) e lancamento_ano.' Esse é o tipo de query que alimenta um star schema.",
    tabelas: ["produtos"],
    gabarito: "SELECT id, nome, marca, categoria, CASE WHEN preco <= 2000 THEN 'Entrada' WHEN preco <= 7000 THEN 'Médio' ELSE 'Premium' END AS faixa_preco, CASE WHEN (preco - custo) / preco * 100 < 30 THEN 'Baixa' WHEN (preco - custo) / preco * 100 <= 50 THEN 'Média' ELSE 'Alta' END AS segmento_margem, CASE WHEN desconto_pct IS NOT NULL THEN 'S' ELSE 'N' END AS tem_desconto, strftime('%Y', lancamento) AS lancamento_ano FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS", "CASE", "WHEN", "THEN", "ELSE", "END", "IS NOT NULL", "IS NULL"],
    funcoes_disponiveis: ["STRFTIME()", "ROUND()", "COALESCE()"],
    operadores_disponiveis: ["<=", "<", ">", "-", "/", "*"],
    valores_disponiveis: ["2000", "7000", "30", "50", "100", "'%Y'", "'Entrada'", "'Médio'", "'Premium'", "'Baixa'", "'Média'", "'Alta'", "'S'", "'N'"],
  },

  {
    id: "jr-148",
    nivel: "junior",
    numero: 148,
    titulo: "Query de Curadoria para Recomendação",
    secao: "curriculo",
    demanda:
      "O algoritmo de recomendação precisa de produtos para cada segmento de cliente. Camila Torres pede: 'Para cliente de alto valor (orçamento > R$8.000): 3 produtos mais caros. Para cliente de médio valor (R$3.000-8.000): 3 produtos na faixa. Para baixo valor (<R$3.000): 3 mais baratos. Usa UNION ALL para montar as 3 seções com coluna segmento_cliente.'",
    tabelas: ["produtos"],
    gabarito: "SELECT * FROM (SELECT 'Alto Valor' AS segmento_cliente, nome, preco FROM produtos WHERE preco > 8000 ORDER BY preco DESC LIMIT 3) UNION ALL SELECT * FROM (SELECT 'Médio Valor', nome, preco FROM produtos WHERE preco BETWEEN 3000 AND 8000 ORDER BY preco DESC LIMIT 3) UNION ALL SELECT * FROM (SELECT 'Baixo Valor', nome, preco FROM produtos WHERE preco < 3000 ORDER BY preco ASC LIMIT 3)",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "LIMIT", "UNION ALL", "BETWEEN", "AND", "AS"],
    operadores_disponiveis: [">", "<", "=", "BETWEEN", "DESC", "ASC"],
    valores_disponiveis: ["'Alto Valor'", "'Médio Valor'", "'Baixo Valor'", "8000", "3000", "3"],
    ordem_importa: false,
  },

  {
    id: "jr-149",
    nivel: "junior",
    numero: 149,
    titulo: "Query de Monitoramento de SLA",
    secao: "curriculo",
    demanda:
      "Diego Mendes quer um painel de monitoramento para garantir que os produtos recentes estão sendo precificados corretamente: 'Traz produtos lançados nos últimos 2 anos (após 2024-01-01) que não têm desconto configurado E têm margem abaixo de 25%. São candidatos urgentes para precificação. Mostra nome, lancamento, margem_pct e status = Atenção.' Monitoramento proativo é o diferencial do analista sênior — mas você já está praticando agora.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, lancamento, ROUND((preco - custo) / preco * 100, 1) AS margem_pct, 'Atenção' AS status FROM produtos WHERE lancamento >= '2024-01-01' AND desconto_pct IS NULL AND (preco - custo) / preco * 100 < 25 ORDER BY margem_pct ASC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "AS", "AND", "IS NULL"],
    funcoes_disponiveis: ["ROUND()", "STRFTIME()"],
    operadores_disponiveis: [">=", "<", "-", "/", "*"],
    valores_disponiveis: ["'2024-01-01'", "25", "100", "1", "'Atenção'", "ASC"],
    ordem_importa: true,
  },

  {
    id: "jr-150",
    nivel: "junior",
    numero: 150,
    titulo: "Dashboard Completo — Exercício Final do Currículo",
    secao: "curriculo",
    demanda:
      "Ana Beatriz olha para você e sorri: 'Você chegou ao último exercício do currículo. Para finalizar, me dá o relatório mais completo que você já produziu aqui: nome, marca, categoria, preco_venda, margem_pct (1 casa), faixa_preco, segmento_estoque, dias_no_catalogo e se é Recomendado (margem>35% + estoque>40 + desconto ativo). Ordena por recomendado DESC, margem_pct DESC. Isso é o que um analista Júnior foda das galáxias entrega.' Mostre o que aprendeu.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, marca, categoria, preco AS preco_venda, ROUND((preco - custo) / preco * 100, 1) AS margem_pct, CASE WHEN preco <= 2000 THEN 'Entrada' WHEN preco <= 7000 THEN 'Médio' ELSE 'Premium' END AS faixa_preco, CASE WHEN estoque < 25 THEN 'Crítico' WHEN estoque <= 80 THEN 'Normal' ELSE 'Abundante' END AS segmento_estoque, ROUND(julianday('2026-01-01') - julianday(lancamento)) AS dias_no_catalogo, CASE WHEN (preco - custo) / preco * 100 > 35 AND estoque > 40 AND desconto_pct IS NOT NULL THEN 'Sim' ELSE 'Não' END AS recomendado FROM produtos ORDER BY recomendado DESC, (preco - custo) / preco * 100 DESC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "AS", "AND", "IS NOT NULL", "CASE", "WHEN", "THEN", "ELSE", "END"],
    funcoes_disponiveis: ["ROUND()", "COALESCE()", "STRFTIME()", "COUNT(*)", "SUM()"],
    operadores_disponiveis: ["-", "/", "*", ">", "<=", "<", "DESC", "ASC"],
    valores_disponiveis: ["2000", "7000", "25", "80", "35", "40", "100", "1", "'2026-01-01'", "'Entrada'", "'Médio'", "'Premium'", "'Crítico'", "'Normal'", "'Abundante'", "'Sim'", "'Não'"],
    ordem_importa: true,
  },

  // ═══════════════════════════════════════════════════════════════
  // BLOCO 14 (NOVO REFORÇO) — jr-151 a jr-200
  // Exercícios multi-conceito sem dica. 50 total com os 15 anteriores.
  // ═══════════════════════════════════════════════════════════════

  {
    id: "jr-151",
    nivel: "junior",
    numero: 151,
    secao: "reforco",
    titulo: "ROI de Estoque por Categoria",
    demanda: "Rafael Drummond quer saber qual categoria tem o maior capital imobilizado total. Traz categoria, capital_total (SUM de custo*estoque por categoria via SUM+CASE), e o ticket_medio (AVG de preco). Ordena por capital_total DESC.",
    tabelas: ["produtos"],
    gabarito: "SELECT categoria, SUM(custo * estoque) AS capital_total, ROUND(AVG(preco), 2) AS ticket_medio FROM produtos GROUP BY categoria ORDER BY capital_total DESC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "AS", "AND", "CASE", "WHEN", "THEN", "ELSE", "END", "IS NULL", "IS NOT NULL", "BETWEEN", "IN", "WHERE", "DISTINCT", "LIMIT", "NOT"],
    funcoes_disponiveis: ["SUM()", "AVG()", "COUNT(*)", "MIN()", "MAX()", "ROUND()", "COALESCE()", "CASE", "UPPER()", "LOWER()", "STRFTIME()"],
    operadores_disponiveis: ["*", "-", "/", ">", "<", "=", ">=", "<=", "DESC", "ASC"],
    ordem_importa: true,
  },

  {
    id: "jr-152",
    nivel: "junior",
    numero: 152,
    secao: "reforco",
    titulo: "Top 3 de Cada Categoria",
    demanda: "Beatriz Melo quer os 3 produtos mais baratos de Smartphones, Notebooks e Wearables — em uma query com UNION ALL. Traz segmento, nome e preco. Ordena dentro de cada segmento por preco ASC.",
    tabelas: ["produtos"],
    gabarito: "SELECT * FROM (SELECT 'Smartphones' AS segmento, nome, preco FROM produtos WHERE categoria = 'Smartphones' ORDER BY preco ASC LIMIT 3) UNION ALL SELECT * FROM (SELECT 'Notebooks', nome, preco FROM produtos WHERE categoria = 'Notebooks' ORDER BY preco ASC LIMIT 3) UNION ALL SELECT * FROM (SELECT 'Wearables', nome, preco FROM produtos WHERE categoria = 'Wearables' ORDER BY preco ASC LIMIT 3)",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "LIMIT", "UNION ALL", "AS", "AND", "CASE", "WHEN", "THEN", "ELSE", "END", "IS NULL", "IN", "BETWEEN", "NOT", "DISTINCT"],
    funcoes_disponiveis: ["COUNT(*)", "SUM()", "AVG()", "MIN()", "MAX()", "ROUND()", "UPPER()", "LOWER()", "COALESCE()"],
    operadores_disponiveis: ["=", ">", "<", ">=", "<=", "-", "*", "/", "ASC", "DESC"],
    ordem_importa: false,
  },

  {
    id: "jr-153",
    nivel: "junior",
    numero: 153,
    secao: "reforco",
    titulo: "Produtos com Nome mais Longo por Categoria",
    demanda: "Priya Nair quer saber qual produto tem o nome mais longo em cada categoria. Traz categoria e max_length_nome (MAX do LENGTH). Sem GROUP BY — use SUM+CASE por categoria para Smartphones, Notebooks, Audio, Tablets.",
    tabelas: ["produtos"],
    gabarito: "SELECT MAX(CASE WHEN categoria = 'Smartphones' THEN LENGTH(nome) END) AS max_len_smartphones, MAX(CASE WHEN categoria = 'Notebooks' THEN LENGTH(nome) END) AS max_len_notebooks, MAX(CASE WHEN categoria = 'Audio' THEN LENGTH(nome) END) AS max_len_audio, MAX(CASE WHEN categoria = 'Tablets' THEN LENGTH(nome) END) AS max_len_tablets FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS", "CASE", "WHEN", "THEN", "END", "WHERE", "AND", "ORDER BY", "IS NULL", "IS NOT NULL"],
    funcoes_disponiveis: ["MAX()", "MIN()", "LENGTH()", "COUNT(*)", "SUM()", "AVG()", "ROUND()"],
    operadores_disponiveis: ["=", ">", "<"],
    valores_disponiveis: ["'Smartphones'", "'Notebooks'", "'Audio'", "'Tablets'"],
  },

  {
    id: "jr-154",
    nivel: "junior",
    numero: 154,
    secao: "reforco",
    titulo: "Eficiência de Promoção vs Margem",
    demanda: "Rafael Drummond quer comparar o desconto com a margem antes e depois: traz nome, margem_original_pct (sem desconto), margem_com_desconto_pct (com desconto aplicado), e coluna risco: Alto se margem_com_desconto_pct < 20, Médio se entre 20-30, Baixo se >= 30. Filtra só produtos com desconto. Ordena por risco ASC.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, ROUND((preco - custo) / preco * 100, 1) AS margem_original_pct, ROUND((preco * (1 - desconto_pct / 100.0) - custo) / (preco * (1 - desconto_pct / 100.0)) * 100, 1) AS margem_com_desconto_pct, CASE WHEN (preco * (1 - desconto_pct / 100.0) - custo) / (preco * (1 - desconto_pct / 100.0)) * 100 < 20 THEN 'Alto' WHEN (preco * (1 - desconto_pct / 100.0) - custo) / (preco * (1 - desconto_pct / 100.0)) * 100 < 30 THEN 'Médio' ELSE 'Baixo' END AS risco FROM produtos WHERE desconto_pct IS NOT NULL ORDER BY risco ASC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "AS", "IS NOT NULL", "AND", "CASE", "WHEN", "THEN", "ELSE", "END"],
    funcoes_disponiveis: ["ROUND()", "COALESCE()", "ABS()"],
    operadores_disponiveis: ["-", "/", "*", "<", ">=", "=", "ASC"],
    valores_disponiveis: ["100.0", "1", "20", "30", "100", "'Alto'", "'Médio'", "'Baixo'"],
    ordem_importa: true,
  },

  {
    id: "jr-155",
    nivel: "junior",
    numero: 155,
    secao: "reforco",
    titulo: "Produtos Apple Sem Promoção, Acima da Média",
    demanda: "Camila Torres quer atacar um segmento específico: 'Apple, sem desconto, acima da média geral de preço'. Traz nome e preco. Ordena por preco DESC.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco FROM produtos WHERE marca = 'Apple' AND desconto_pct IS NULL AND preco > (SELECT AVG(preco) FROM produtos) ORDER BY preco DESC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "AS", "AND", "IS NULL", "IS NOT NULL", "OR", "NOT", "LIKE", "IN", "BETWEEN", "CASE", "WHEN", "THEN", "ELSE", "END", "LIMIT", "DISTINCT"],
    funcoes_disponiveis: ["AVG()", "COUNT(*)", "SUM()", "MIN()", "MAX()", "ROUND()", "UPPER()", "LOWER()", "COALESCE()", "STRFTIME()"],
    operadores_disponiveis: ["=", ">", "<", ">=", "<=", "!=", "DESC", "ASC"],
    valores_disponiveis: ["'Apple'"],
    ordem_importa: true,
  },

  {
    id: "jr-156",
    nivel: "junior",
    numero: 156,
    secao: "reforco",
    titulo: "Cadastro Incompleto — Múltiplos Campos",
    demanda: "Lucas Oliveira pede um relatório de qualidade: quais produtos têm MAIS DE 1 campo crítico nulo (entre cor e desconto_pct)? Traz nome e campos_nulos (quantidade de nulos). Ordena por campos_nulos DESC.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, (CASE WHEN cor IS NULL THEN 1 ELSE 0 END) + (CASE WHEN desconto_pct IS NULL THEN 1 ELSE 0 END) AS campos_nulos FROM produtos WHERE (CASE WHEN cor IS NULL THEN 1 ELSE 0 END) + (CASE WHEN desconto_pct IS NULL THEN 1 ELSE 0 END) > 1 ORDER BY campos_nulos DESC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "AS", "AND", "OR", "IS NULL", "IS NOT NULL", "CASE", "WHEN", "THEN", "ELSE", "END", "IN", "BETWEEN"],
    funcoes_disponiveis: ["COUNT(*)", "SUM()", "AVG()", "COALESCE()", "ROUND()"],
    operadores_disponiveis: ["+", ">", "=", "DESC"],
    valores_disponiveis: ["1", "0", "DESC"],
    ordem_importa: true,
  },

  {
    id: "jr-157",
    nivel: "junior",
    numero: 157,
    secao: "reforco",
    titulo: "Relatório de Lançamentos por Semestre",
    demanda: "Priya Nair precisa de um relatório de lançamentos por semestre para o board. Em uma linha: total_1S_2024 (jan-jun 2024), total_2S_2024 (jul-dez 2024), total_1S_2025 (jan-jun 2025), total_2S_2025 (jul-dez 2025).",
    tabelas: ["produtos"],
    gabarito: "SELECT COUNT(CASE WHEN lancamento BETWEEN '2024-01-01' AND '2024-06-30' THEN 1 END) AS total_1S_2024, COUNT(CASE WHEN lancamento BETWEEN '2024-07-01' AND '2024-12-31' THEN 1 END) AS total_2S_2024, COUNT(CASE WHEN lancamento BETWEEN '2025-01-01' AND '2025-06-30' THEN 1 END) AS total_1S_2025, COUNT(CASE WHEN lancamento BETWEEN '2025-07-01' AND '2025-12-31' THEN 1 END) AS total_2S_2025 FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS", "WHERE", "AND", "BETWEEN", "CASE", "WHEN", "THEN", "END", "IS NULL", "ORDER BY"],
    funcoes_disponiveis: ["COUNT(*)", "COUNT(DISTINCT )", "SUM()", "STRFTIME()"],
    operadores_disponiveis: ["=", "BETWEEN", "AND"],
    valores_disponiveis: ["'2024-01-01'", "'2024-06-30'", "'2024-07-01'", "'2024-12-31'", "'2025-01-01'", "'2025-06-30'", "'2025-07-01'", "'2025-12-31'", "1"],
  },

  {
    id: "jr-158",
    nivel: "junior",
    numero: 158,
    secao: "reforco",
    titulo: "Produtos Abaixo e Acima da Mediana de Preço",
    demanda: "Lucas Oliveira mostra um truque: você pode aproximar a mediana com LIMIT/OFFSET. O produto mediano de 30 produtos está na posição 15 (LIMIT 1 OFFSET 14). Traz o nome e preco do produto mediano — o 15º mais barato.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco FROM produtos ORDER BY preco ASC LIMIT 1 OFFSET 14",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "LIMIT", "AS", "WHERE", "CASE", "WHEN", "THEN", "ELSE", "END", "AND", "IS NULL", "IS NOT NULL"],
    funcoes_disponiveis: ["AVG()", "MIN()", "MAX()", "COUNT(*)", "ROUND()"],
    operadores_disponiveis: ["ASC", "DESC", "=", ">", "<"],
    valores_disponiveis: ["1", "14", "OFFSET", "ASC"],
    ordem_importa: true,
  },

  {
    id: "jr-159",
    nivel: "junior",
    numero: 159,
    secao: "reforco",
    titulo: "Heatmap de Categorias × Marcas",
    demanda: "Priya Nair quer um heatmap de presença de marcas por categoria. Traz 1 linha: Apple em Smartphones (tem_apple_smartph), Apple em Notebooks (tem_apple_noteb), Samsung em Smartphones (tem_samsung_smartph), Samsung em Wearables (tem_samsung_wear). Valor 1 se existe, 0 se não.",
    tabelas: ["produtos"],
    gabarito: "SELECT CASE WHEN COUNT(CASE WHEN marca = 'Apple' AND categoria = 'Smartphones' THEN 1 END) > 0 THEN 1 ELSE 0 END AS tem_apple_smartph, CASE WHEN COUNT(CASE WHEN marca = 'Apple' AND categoria = 'Notebooks' THEN 1 END) > 0 THEN 1 ELSE 0 END AS tem_apple_noteb, CASE WHEN COUNT(CASE WHEN marca = 'Samsung' AND categoria = 'Smartphones' THEN 1 END) > 0 THEN 1 ELSE 0 END AS tem_samsung_smartph, CASE WHEN COUNT(CASE WHEN marca = 'Samsung' AND categoria = 'Wearables' THEN 1 END) > 0 THEN 1 ELSE 0 END AS tem_samsung_wear FROM produtos",
    keywords_disponiveis: ["SELECT", "FROM", "AS", "CASE", "WHEN", "THEN", "ELSE", "END", "AND", "WHERE", "IS NULL", "IS NOT NULL"],
    funcoes_disponiveis: ["COUNT(*)", "SUM()", "MAX()", "MIN()"],
    operadores_disponiveis: ["=", ">", "AND"],
    valores_disponiveis: ["'Apple'", "'Samsung'", "'Smartphones'", "'Notebooks'", "'Wearables'", "0", "1"],
  },

  {
    id: "jr-160",
    nivel: "junior",
    numero: 160,
    secao: "reforco",
    titulo: "Semáforo de Estoque",
    demanda: "Diego Mendes quer um semáforo de estoque: Verde (>80), Amarelo (30-80), Vermelho (<30). Traz nome, estoque, semaforo e dias_reposicao estimados (estoque / 5 = dias até zerar assumindo venda de 5/dia). Ordena por semaforo Vermelho primeiro.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, estoque, CASE WHEN estoque > 80 THEN 'Verde' WHEN estoque >= 30 THEN 'Amarelo' ELSE 'Vermelho' END AS semaforo, ROUND(estoque / 5.0) AS dias_reposicao FROM produtos ORDER BY CASE WHEN estoque > 80 THEN 3 WHEN estoque >= 30 THEN 2 ELSE 1 END ASC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "AS", "CASE", "WHEN", "THEN", "ELSE", "END", "AND", "WHERE", "IS NULL", "IS NOT NULL", "IN", "BETWEEN"],
    funcoes_disponiveis: ["ROUND()", "COUNT(*)", "SUM()", "AVG()"],
    operadores_disponiveis: [">", ">=", "<", "/", "ASC", "DESC"],
    valores_disponiveis: ["80", "30", "5.0", "1", "2", "3", "'Verde'", "'Amarelo'", "'Vermelho'"],
    ordem_importa: true,
  },

  {
    id: "jr-161",
    nivel: "junior",
    numero: 161,
    secao: "reforco",
    titulo: "Produto com Melhor Custo-Benefício",
    demanda: "Camila Torres quer recomendar o melhor custo-benefício: o produto com maior relação estoque/preco (mais unidades disponíveis por real investido). Traz nome e custo_beneficio (estoque/preco arredondado em 4 casas). Top 5, ordenados do melhor para o pior.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, ROUND(CAST(estoque AS REAL) / preco, 4) AS custo_beneficio FROM produtos ORDER BY custo_beneficio DESC LIMIT 5",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "LIMIT", "AS", "WHERE", "AND", "CASE", "WHEN", "THEN", "ELSE", "END", "IS NULL", "IS NOT NULL"],
    funcoes_disponiveis: ["ROUND()", "CAST( AS )", "COUNT(*)", "SUM()", "AVG()"],
    operadores_disponiveis: ["/", "DESC"],
    valores_disponiveis: ["4", "5", "REAL", "DESC"],
    ordem_importa: true,
  },

  {
    id: "jr-162",
    nivel: "junior",
    numero: 162,
    secao: "reforco",
    titulo: "Detectando Produtos Clones de Nome",
    demanda: "Priya Nair suspeita de duplicatas: produtos com mesmo prefixo de 10 caracteres no nome podem ser variações mal cadastradas. Traz os prefixos únicos (SUBSTR(nome,1,10)) e COUNT de produtos com esse prefixo, filtrando apenas onde COUNT > 1. Ordena por COUNT DESC.",
    tabelas: ["produtos"],
    gabarito: "SELECT SUBSTR(nome, 1, 10) AS prefixo_nome, COUNT(*) AS qtd_produtos FROM produtos GROUP BY SUBSTR(nome, 1, 10) HAVING COUNT(*) > 1 ORDER BY qtd_produtos DESC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "AS", "WHERE", "AND", "CASE", "WHEN", "THEN", "ELSE", "END", "IS NULL", "IS NOT NULL", "IN", "BETWEEN", "DISTINCT", "LIMIT"],
    funcoes_disponiveis: ["SUBSTR()", "COUNT(*)", "COUNT(DISTINCT )", "LENGTH()", "UPPER()", "LOWER()", "TRIM()"],
    operadores_disponiveis: [">", "=", "<", "DESC"],
    valores_disponiveis: ["1", "10", "DESC"],
    ordem_importa: true,
  },

  {
    id: "jr-163",
    nivel: "junior",
    numero: 163,
    secao: "reforco",
    titulo: "Análise de Concentração de Marca",
    demanda: "Rafael quer saber a participação de cada marca no total de produtos. Calcula pct_catalogo por marca: COUNT(marca) / COUNT(*) TOTAL * 100. Ordena por pct decrescente.",
    tabelas: ["produtos"],
    gabarito: "SELECT marca, COUNT(*) AS total, ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM produtos), 1) AS pct_catalogo FROM produtos GROUP BY marca ORDER BY pct_catalogo DESC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "AS", "WHERE", "AND", "CASE", "WHEN", "THEN", "ELSE", "END", "IS NULL", "IS NOT NULL", "DISTINCT", "LIMIT", "IN", "BETWEEN"],
    funcoes_disponiveis: ["COUNT(*)", "COUNT(DISTINCT )", "ROUND()", "SUM()", "AVG()"],
    operadores_disponiveis: ["*", "/", "=", "DESC"],
    valores_disponiveis: ["100.0", "1", "DESC"],
    ordem_importa: true,
  },

  {
    id: "jr-164",
    nivel: "junior",
    numero: 164,
    secao: "reforco",
    titulo: "Produtos Lançados em Setembro (Mês Apple)",
    demanda: "Priya Nair quer saber quais produtos foram lançados em setembro — mês historicamente de lançamentos Apple. Traz nome, marca e lancamento dos produtos lançados em qualquer setembro (mês = 09). Ordena por lancamento.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, marca, lancamento FROM produtos WHERE strftime('%m', lancamento) = '09' ORDER BY lancamento ASC",
    keywords_disponiveis: ["SELECT", "FROM", "WHERE", "ORDER BY", "AS", "AND", "OR", "NOT", "LIKE", "IN", "BETWEEN", "IS NULL", "IS NOT NULL", "CASE", "WHEN", "THEN", "ELSE", "END"],
    funcoes_disponiveis: ["STRFTIME()", "DATE()", "ROUND()", "LENGTH()", "UPPER()"],
    operadores_disponiveis: ["=", "ASC", "DESC"],
    valores_disponiveis: ["'%m'", "'09'", "'%Y'", "ASC"],
    ordem_importa: true,
  },

  {
    id: "jr-165",
    nivel: "junior",
    numero: 165,
    secao: "reforco",
    titulo: "Relatório de Saúde Financeira Completo",
    demanda: "Rafael Drummond quer o relatório de saúde financeira definitivo: para cada produto mostra nome, preco_venda, preco_custo, margem_bruta, margem_pct (1 casa), capital_imobilizado (custo*estoque), flag_saudavel (Sim se margem_pct>30 E capital<500000, Não caso contrário). Ordena por flag_saudavel DESC, margem_pct DESC.",
    tabelas: ["produtos"],
    gabarito: "SELECT nome, preco AS preco_venda, custo AS preco_custo, preco - custo AS margem_bruta, ROUND((preco - custo) / preco * 100, 1) AS margem_pct, custo * estoque AS capital_imobilizado, CASE WHEN (preco - custo) / preco * 100 > 30 AND custo * estoque < 500000 THEN 'Sim' ELSE 'Não' END AS flag_saudavel FROM produtos ORDER BY flag_saudavel DESC, (preco - custo) / preco * 100 DESC",
    keywords_disponiveis: ["SELECT", "FROM", "ORDER BY", "AS", "AND", "CASE", "WHEN", "THEN", "ELSE", "END", "WHERE", "IS NULL", "IS NOT NULL", "OR", "NOT", "IN", "BETWEEN"],
    funcoes_disponiveis: ["ROUND()", "COALESCE()", "COUNT(*)", "SUM()", "AVG()"],
    operadores_disponiveis: ["-", "*", "/", ">", "<", "=", "DESC"],
    valores_disponiveis: ["30", "500000", "100", "1", "'Sim'", "'Não'", "DESC"],
    ordem_importa: true,
  },
];
