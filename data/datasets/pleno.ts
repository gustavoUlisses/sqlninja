import type { Dataset } from "@/lib/types";

/**
 * Dataset compartilhado por TODOS os exercícios do nível PLENO.
 *
 * Universo: DataCo — e-commerce brasileiro de eletrônicos, 2026.
 *
 * Tabelas:
 *   produtos    — reaproveitado do Júnior (catálogo de 30 produtos)
 *   clientes    — 25 clientes B2C e B2B de diferentes regiões do Brasil
 *   pedidos     — 50 pedidos em 2025-2026 com statuses variados
 *   itens_pedido — 120 itens (média 2.4 itens/pedido)
 *   vendedores  — 8 vendedores em 4 regiões
 *
 * Dados projetados para exercitar:
 *   - GROUP BY + COUNT/SUM/AVG/MIN/MAX por categoria, cliente, mês, região
 *   - HAVING para filtrar grupos (clientes com >3 pedidos, categorias com GMV>X)
 *   - INNER JOIN (pedidos ↔ clientes, itens ↔ pedidos ↔ produtos)
 *   - LEFT JOIN (clientes sem pedidos, produtos nunca vendidos)
 *   - Subqueries (clientes acima da média, produtos mais vendidos que X)
 *   - Análises de e-commerce: LTV, AOV, GMV, repeat-purchase, cohort
 */

const SEED = `
-- ── PRODUTOS (reaproveitado do Júnior) ─────────────────────────────────────
CREATE TABLE produtos (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  marca TEXT NOT NULL,
  categoria TEXT NOT NULL,
  cor TEXT,
  preco REAL NOT NULL,
  custo REAL NOT NULL,
  estoque INTEGER NOT NULL,
  desconto_pct INTEGER,
  lancamento TEXT
);
INSERT INTO produtos VALUES
  (1,  'iPhone 16 Pro 256GB',        'Apple',     'Smartphones',  'Titanio Preto',  9499.99,6800.00, 45,10, '2025-09-20'),
  (2,  'iPhone 16 256GB',            'Apple',     'Smartphones',  'Branco',         7299.99,5100.00, 82,NULL,'2025-09-20'),
  (3,  'Galaxy S25 Ultra 512GB',     'Samsung',   'Smartphones',  'Titanio Cinza',  9899.00,6500.00, 31,15, '2025-02-07'),
  (4,  'Galaxy S25 256GB',           'Samsung',   'Smartphones',  'Azul',           7299.00,4900.00, 62,5,  '2025-02-07'),
  (5,  'Galaxy A55 5G',              'Samsung',   'Smartphones',  'Preto',          2499.00,1400.00,154,20, '2024-03-12'),
  (6,  'Moto G75 5G',                'Motorola',  'Smartphones',  NULL,             2199.00,1200.00,198,12, '2024-09-10'),
  (7,  'Pixel 9 Pro',                'Google',    'Smartphones',  NULL,             8499.00,5800.00, 18,NULL,'2024-08-13'),
  (8,  'MacBook Air M3 13"',         'Apple',     'Notebooks',    'Cinza Espacial',11999.00,8200.00, 27,8,  '2024-03-08'),
  (9,  'MacBook Pro M4 14"',         'Apple',     'Notebooks',    NULL,            18499.00,12500.00,14,NULL,'2025-11-08'),
  (10, 'Notebook Dell Inspiron 15',  'Dell',      'Notebooks',    'Preto',          4299.99,2800.00, 56,15, '2025-01-15'),
  (11, 'Notebook Lenovo IdeaPad 5',  'Lenovo',    'Notebooks',    NULL,             3899.00,2500.00, 73,18, '2024-10-22'),
  (12, 'Notebook Acer Aspire 5',     'Acer',      'Notebooks',    'Prata',          3299.00,2100.00, 91,22, '2025-03-04'),
  (13, 'iPad Air M2 11"',            'Apple',     'Tablets',      'Estelar',        5399.99,3700.00, 41,NULL,'2024-05-15'),
  (14, 'iPad Pro M4 11"',            'Apple',     'Tablets',      'Prateado',       9999.00,6900.00, 19,5,  '2024-05-15'),
  (15, 'Galaxy Tab S10+',            'Samsung',   'Tablets',      NULL,             6799.00,4500.00, 33,10, '2024-10-03'),
  (16, 'AirPods Pro 2',              'Apple',     'Audio',        'Branco',         2199.99,1300.00, 94,NULL,'2024-09-23'),
  (17, 'AirPods 4',                  'Apple',     'Audio',        'Branco',         1499.00, 950.00,128,10, '2024-09-23'),
  (18, 'Galaxy Buds3 Pro',           'Samsung',   'Audio',        NULL,             1899.00,1100.00, 67,15, '2024-07-24'),
  (19, 'Sony WH-1000XM5',            'Sony',      'Audio',        'Preto',          2899.00,1850.00, 29,NULL,'2022-05-12'),
  (20, 'JBL Tune 770NC',             'JBL',       'Audio',        'Preto',           899.00, 520.00,215,25, '2024-01-09'),
  (21, 'Monitor LG 27" 4K',          'LG',        'Monitores',    'Preto',          2899.00,1900.00, 42,12, '2024-04-18'),
  (22, 'Monitor Dell P2723QE 27"',   'Dell',      'Monitores',    NULL,             3499.00,2400.00, 35,NULL,'2024-02-11'),
  (23, 'Monitor Samsung Odyssey G7', 'Samsung',   'Monitores',    'Branco',         4299.00,2800.00, 21,8,  '2024-06-25'),
  (24, 'Mouse Logitech MX Master 3S','Logitech',  'Perifericos',  'Grafite',         649.99, 380.00,173,NULL,'2022-06-14'),
  (25, 'Teclado Keychron K2 V2',     'Keychron',  'Perifericos',  'Cinza',           799.99, 450.00,112,10, '2023-08-22'),
  (26, 'Teclado Logitech MX Keys',   'Logitech',  'Perifericos',  'Grafite',         949.00, 580.00, 88,NULL,'2022-09-01'),
  (27, 'Mouse Razer DeathAdder V3',  'Razer',     'Perifericos',  'Preto',           499.00, 290.00,156,15, '2023-11-10'),
  (28, 'Apple Watch Series 10 GPS',  'Apple',     'Wearables',    'Prateado',       3899.00,2600.00, 38,NULL,'2024-09-20'),
  (29, 'Galaxy Watch 7',             'Samsung',   'Wearables',    'Verde',          2599.00,1700.00, 54,12, '2024-07-24'),
  (30, 'Garmin Forerunner 165',      'Garmin',    'Wearables',    'Preto',          2199.00,1450.00, 47,NULL,'2024-03-19');

-- ── CLIENTES ────────────────────────────────────────────────────────────────
CREATE TABLE clientes (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  cidade TEXT NOT NULL,
  uf TEXT NOT NULL,
  segmento TEXT NOT NULL,   -- 'B2C' ou 'B2B'
  data_cadastro TEXT NOT NULL,
  ativo INTEGER NOT NULL    -- 1=ativo, 0=inativo
);
INSERT INTO clientes VALUES
  (1,  'Lucas Ferreira',      'lucas.ferreira@email.com',    'São Paulo',       'SP','B2C','2024-01-15',1),
  (2,  'Ana Clara Souza',     'ana.souza@email.com',         'Rio de Janeiro',  'RJ','B2C','2024-02-03',1),
  (3,  'TechCorp Ltda',       'compras@techcorp.com.br',     'Belo Horizonte',  'MG','B2B','2024-01-20',1),
  (4,  'Mariana Lima',        'mariana.lima@email.com',      'Curitiba',        'PR','B2C','2024-03-11',1),
  (5,  'Carlos Mendes',       'carlos.mendes@email.com',     'Brasília',        'DF','B2C','2024-04-05',1),
  (6,  'InfoSul Distribuidora','compras@infosul.com.br',     'Porto Alegre',    'RS','B2B','2024-02-14',1),
  (7,  'Juliana Costa',       'juliana.costa@email.com',     'Salvador',        'BA','B2C','2024-05-20',1),
  (8,  'Roberto Alves',       'roberto.alves@email.com',     'Fortaleza',       'CE','B2C','2024-06-08',1),
  (9,  'Inovatech ME',        'contato@inovatech.com.br',    'São Paulo',       'SP','B2B','2024-03-25',1),
  (10, 'Fernanda Gomes',      'fernanda.gomes@email.com',    'Recife',          'PE','B2C','2024-07-14',1),
  (11, 'Diego Rocha',         'diego.rocha@email.com',       'Manaus',          'AM','B2C','2024-08-02',1),
  (12, 'Patricia Santos',     'patricia.santos@email.com',   'São Paulo',       'SP','B2C','2024-09-17',1),
  (13, 'Digital Office SA',   'ti@digitaloffice.com.br',     'Campinas',        'SP','B2B','2024-04-10',1),
  (14, 'Rafael Borges',       'rafael.borges@email.com',     'Goiânia',         'GO','B2C','2024-10-05',1),
  (15, 'Camila Teixeira',     'camila.teixeira@email.com',   'Florianópolis',   'SC','B2C','2024-11-22',1),
  (16, 'Gustavo Nunes',       'gustavo.nunes@email.com',     'Belém',           'PA','B2C','2025-01-09',1),
  (17, 'MegaTech Importações','importacao@megatech.com.br',  'Santos',          'SP','B2B','2025-01-18',1),
  (18, 'Isabela Moraes',      'isabela.moraes@email.com',    'Natal',           'RN','B2C','2025-02-27',1),
  (19, 'Henrique Carvalho',   'henrique.c@email.com',        'São Paulo',       'SP','B2C','2025-03-15',1),
  (20, 'Breno Martins',       'breno.martins@email.com',     'Vitória',         'ES','B2C','2025-04-03',0),
  (21, 'Nexus Soluções',      'compras@nexus.com.br',        'Rio de Janeiro',  'RJ','B2B','2025-04-20',1),
  (22, 'Larissa Cunha',       'larissa.cunha@email.com',     'Maceió',          'AL','B2C','2025-05-11',1),
  (23, 'Thiago Barbosa',      'thiago.barbosa@email.com',    'São Paulo',       'SP','B2C','2025-06-08',1),
  (24, 'Amanda Rezende',      'amanda.rezende@email.com',    'Uberlândia',      'MG','B2C','2025-07-19',1),
  (25, 'Prime Tech Comércio', 'pedidos@primetech.com.br',    'Curitiba',        'PR','B2B','2025-08-01',1);

-- ── VENDEDORES ───────────────────────────────────────────────────────────────
CREATE TABLE vendedores (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  regiao TEXT NOT NULL,
  meta_mensal REAL NOT NULL,
  data_admissao TEXT NOT NULL
);
INSERT INTO vendedores VALUES
  (1, 'Bruno Almeida',    'Sudeste',    80000.00, '2022-03-01'),
  (2, 'Carla Dias',       'Sudeste',    80000.00, '2022-07-15'),
  (3, 'Felipe Nascimento','Sul',        60000.00, '2023-01-10'),
  (4, 'Renata Oliveira',  'Sul',        60000.00, '2023-06-20'),
  (5, 'André Pereira',    'Nordeste',   55000.00, '2023-09-05'),
  (6, 'Sônia Vasconcelos','Nordeste',   55000.00, '2024-02-14'),
  (7, 'Tiago Freitas',    'Norte/CO',   50000.00, '2024-05-01'),
  (8, 'Mônica Leal',      'Norte/CO',   50000.00, '2024-11-11');

-- ── PEDIDOS ──────────────────────────────────────────────────────────────────
CREATE TABLE pedidos (
  id INTEGER PRIMARY KEY,
  cliente_id INTEGER NOT NULL,
  vendedor_id INTEGER,        -- NULL = venda direta pelo site
  data_pedido TEXT NOT NULL,
  status TEXT NOT NULL,       -- 'entregue','enviado','processando','cancelado'
  valor_total REAL NOT NULL,
  forma_pagamento TEXT NOT NULL,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  FOREIGN KEY (vendedor_id) REFERENCES vendedores(id)
);
INSERT INTO pedidos VALUES
  (1,  1, 1,    '2025-01-08','entregue',   9499.99,'pix'),
  (2,  2, NULL, '2025-01-15','entregue',   2199.99,'credito'),
  (3,  3, 2,    '2025-01-20','entregue',  31497.00,'boleto'),
  (4,  1, 1,    '2025-02-03','entregue',   1499.00,'pix'),
  (5,  4, 3,    '2025-02-10','entregue',   7299.99,'credito'),
  (6,  5, NULL, '2025-02-18','entregue',   2899.00,'pix'),
  (7,  6, 2,    '2025-02-25','entregue',  18498.00,'boleto'),
  (8,  3, 2,    '2025-03-05','entregue',  24997.00,'boleto'),
  (9,  7, 5,    '2025-03-12','entregue',    899.00,'pix'),
  (10, 2, NULL, '2025-03-20','entregue',   4299.99,'credito'),
  (11, 8, 5,    '2025-03-28','entregue',   2499.00,'pix'),
  (12, 9, 1,    '2025-04-04','entregue',  12598.99,'pix'),
  (13, 1, 1,    '2025-04-10','entregue',  11999.00,'credito'),
  (14, 10,5,    '2025-04-17','entregue',   1899.00,'pix'),
  (15, 4, 3,    '2025-04-22','entregue',   3299.00,'credito'),
  (16, 11,7,    '2025-05-02','entregue',   2599.00,'pix'),
  (17, 5, NULL, '2025-05-09','entregue',   9899.00,'credito'),
  (18, 12,1,    '2025-05-15','entregue',   4299.99,'pix'),
  (19, 13,2,    '2025-05-22','entregue',  39498.00,'boleto'),
  (20, 6, 2,    '2025-06-01','entregue',  17998.00,'boleto'),
  (21, 8, 5,    '2025-06-08','entregue',   2199.00,'pix'),
  (22, 14,7,    '2025-06-15','entregue',   3899.00,'credito'),
  (23, 2, NULL, '2025-06-20','entregue',   2899.00,'pix'),
  (24, 15,4,    '2025-06-27','entregue',   5399.99,'credito'),
  (25, 9, 1,    '2025-07-03','entregue',   7299.00,'pix'),
  (26, 1, 1,    '2025-07-10','entregue',   2199.99,'credito'),
  (27, 3, 2,    '2025-07-18','entregue',  42498.00,'boleto'),
  (28, 16,7,    '2025-07-25','entregue',   2199.00,'pix'),
  (29, 17,1,    '2025-08-01','entregue',  56997.00,'boleto'),
  (30, 12,1,    '2025-08-08','entregue',   9499.99,'pix'),
  (31, 5, NULL, '2025-08-15','entregue',   1499.00,'credito'),
  (32, 18,6,    '2025-08-22','entregue',   2499.00,'pix'),
  (33, 7, 5,    '2025-09-04','entregue',   3299.00,'credito'),
  (34, 19,1,    '2025-09-11','entregue',  18498.99,'credito'),
  (35, 4, 3,    '2025-09-19','entregue',   2599.00,'pix'),
  (36, 13,2,    '2025-10-01','entregue',  27798.00,'boleto'),
  (37, 20,7,    '2025-10-09','cancelado',  4299.99,'credito'),
  (38, 11,7,    '2025-10-16','entregue',    649.99,'pix'),
  (39, 21,2,    '2025-10-24','entregue',  23797.00,'boleto'),
  (40, 2, NULL, '2025-11-02','entregue',   1499.00,'pix'),
  (41, 22,6,    '2025-11-10','entregue',    799.99,'pix'),
  (42, 15,4,    '2025-11-18','entregue',   9999.00,'credito'),
  (43, 23,1,    '2025-11-25','enviado',    7299.99,'credito'),
  (44, 6, 2,    '2025-12-03','entregue',  35997.00,'boleto'),
  (45, 9, 1,    '2025-12-10','entregue',  11999.00,'pix'),
  (46, 24,4,    '2025-12-17','enviado',    3899.00,'credito'),
  (47, 1, 1,    '2026-01-08','entregue',  18499.00,'pix'),
  (48, 25,3,    '2026-01-15','entregue',  47997.00,'boleto'),
  (49, 19,1,    '2026-01-22','processando',9499.99,'credito'),
  (50, 3, 2,    '2026-02-01','enviado',   29997.00,'boleto');

-- ── ITENS_PEDIDO ─────────────────────────────────────────────────────────────
CREATE TABLE itens_pedido (
  id INTEGER PRIMARY KEY,
  pedido_id INTEGER NOT NULL,
  produto_id INTEGER NOT NULL,
  quantidade INTEGER NOT NULL,
  preco_unit REAL NOT NULL,
  desconto_pct INTEGER,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  FOREIGN KEY (produto_id) REFERENCES produtos(id)
);
INSERT INTO itens_pedido VALUES
  -- Pedido 1 (Lucas, pix, iPhone 16 Pro)
  (1,  1,  1, 1, 9499.99, 10),
  -- Pedido 2 (Ana, AirPods Pro 2)
  (2,  2,  16,1, 2199.99, NULL),
  -- Pedido 3 (TechCorp, 3 iPhones)
  (3,  3,  1, 2, 9499.99, 10),
  (4,  3,  2, 1, 7299.99, 5),
  -- Pedido 4 (Lucas, AirPods 4)
  (5,  4,  17,1, 1499.00, 10),
  -- Pedido 5 (Mariana, Galaxy S25)
  (6,  5,  4, 1, 7299.99, 5),
  -- Pedido 6 (Carlos, Sony WH)
  (7,  6,  19,1, 2899.00, NULL),
  -- Pedido 7 (InfoSul, 2 MacBook Air)
  (8,  7,  8, 2,11999.00, 8),
  -- Pedido 8 (TechCorp, iPhones + Galaxy)
  (9,  8,  1, 1, 9499.99, 10),
  (10, 8,  3, 1, 9899.00, 15),
  (11, 8,  4, 1, 7299.00, 5),
  -- Pedido 9 (Juliana, JBL)
  (12, 9,  20,1,  899.00, 25),
  -- Pedido 10 (Ana, Dell Notebook)
  (13,10,  10,1, 4299.99, 15),
  -- Pedido 11 (Roberto, Galaxy A55)
  (14,11,  5, 1, 2499.00, 20),
  -- Pedido 12 (Inovatech, iPhone + AirPods)
  (15,12,  1, 1, 9499.99, 10),
  (16,12,  16,1, 2199.99, NULL),
  -- Pedido 13 (Lucas, MacBook Air)
  (17,13,  8, 1,11999.00, 8),
  -- Pedido 14 (Fernanda, Galaxy Buds3)
  (18,14,  18,1, 1899.00, 15),
  -- Pedido 15 (Mariana, Acer Notebook)
  (19,15,  12,1, 3299.00, 22),
  -- Pedido 16 (Diego, Galaxy Watch)
  (20,16,  29,1, 2599.00, 12),
  -- Pedido 17 (Carlos, Galaxy S25 Ultra)
  (21,17,  3, 1, 9899.00, 15),
  -- Pedido 18 (Patricia, Dell Notebook)
  (22,18,  10,1, 4299.99, 15),
  -- Pedido 19 (Digital Office, 3 Notebooks)
  (23,19,  8, 2,11999.00, 8),
  (24,19,  10,1, 4299.99, 15),
  (25,19,  11,1, 3899.00, 18),
  -- Pedido 20 (InfoSul, MacBook Pro + MacBook Air)
  (26,20,  9, 1,18499.00, NULL),
  (27,20,  8, 1,11999.00, 8),
  -- Pedido 21 (Roberto, Moto G75)
  (28,21,  6, 1, 2199.00, 12),
  -- Pedido 22 (Rafael, Apple Watch)
  (29,22,  28,1, 3899.00, NULL),
  -- Pedido 23 (Ana, Sony WH)
  (30,23,  19,1, 2899.00, NULL),
  -- Pedido 24 (Camila, iPad Air)
  (31,24,  13,1, 5399.99, NULL),
  -- Pedido 25 (Inovatech, Galaxy S25)
  (32,25,  4, 1, 7299.00, 5),
  -- Pedido 26 (Lucas, AirPods Pro 2)
  (33,26,  16,1, 2199.99, NULL),
  -- Pedido 27 (TechCorp, 3 MacBook Air + 2 iPhones)
  (34,27,  8, 3,11999.00, 8),
  (35,27,  1, 2, 9499.99, 10),
  -- Pedido 28 (Gustavo, Moto G75)
  (36,28,  6, 1, 2199.00, 12),
  -- Pedido 29 (MegaTech, 3 MacBook Pro + Monitores)
  (37,29,  9, 3,18499.00, NULL),
  (38,29,  21,1, 2899.00, 12),
  -- Pedido 30 (Patricia, iPhone 16 Pro)
  (39,30,  1, 1, 9499.99, 10),
  -- Pedido 31 (Carlos, AirPods 4)
  (40,31,  17,1, 1499.00, 10),
  -- Pedido 32 (Isabela, Galaxy A55)
  (41,32,  5, 1, 2499.00, 20),
  -- Pedido 33 (Juliana, Acer Notebook)
  (42,33,  12,1, 3299.00, 22),
  -- Pedido 34 (Henrique, MacBook Air + AirPods Pro)
  (43,34,  8, 1,11999.00, 8),
  (44,34,  16,1, 2199.99, NULL),
  (45,34,  17,1, 1499.00, 10),
  -- Pedido 35 (Mariana, Galaxy Watch)
  (46,35,  29,1, 2599.00, 12),
  -- Pedido 36 (Digital Office, Notebooks + Monitores)
  (47,36,  8, 2,11999.00, 8),
  (48,36,  21,1, 2899.00, 12),
  -- Pedido 37 (Breno, CANCELADO — Dell Notebook)
  (49,37,  10,1, 4299.99, 15),
  -- Pedido 38 (Diego, Mouse Logitech)
  (50,38,  24,1,  649.99, NULL),
  -- Pedido 39 (Nexus, MacBook Air + Galaxy + iPhone)
  (51,39,  8, 2,11999.00, 8),
  (52,39,  4, 1, 7299.00, 5),
  -- Pedido 40 (Ana, AirPods 4)
  (53,40,  17,1, 1499.00, 10),
  -- Pedido 41 (Larissa, Teclado Keychron)
  (54,41,  25,1,  799.99, 10),
  -- Pedido 42 (Camila, iPad Pro)
  (55,42,  14,1, 9999.00, 5),
  -- Pedido 43 (Thiago, Galaxy S25)
  (56,43,  4, 1, 7299.99, 5),
  -- Pedido 44 (InfoSul, MacBook Pro + 2 iPhones + Monitor)
  (57,44,  9, 1,18499.00, NULL),
  (58,44,  1, 2, 9499.99, 10),
  (59,44,  23,1, 4299.00, 8),
  -- Pedido 45 (Inovatech, MacBook Air + Galaxy Tab)
  (60,45,  8, 1,11999.00, 8),
  -- Pedido 46 (Amanda, Apple Watch)
  (61,46,  28,1, 3899.00, NULL),
  -- Pedido 47 (Lucas, MacBook Pro)
  (62,47,  9, 1,18499.00, NULL),
  -- Pedido 48 (Prime Tech, 3 MacBook Air + 3 iPhones)
  (63,48,  8, 3,11999.00, 8),
  (64,48,  1, 3, 9499.99, 10),
  -- Pedido 49 (Henrique, iPhone 16 Pro)
  (65,49,  1, 1, 9499.99, 10),
  -- Pedido 50 (TechCorp, Galaxy + Notebooks)
  (66,50,  3, 1, 9899.00, 15),
  (67,50,  10,2, 4299.99, 15),
  (68,50,  11,1, 3899.00, 18);
`.trim();

// ── Helpers para definir colunas ──────────────────────────────────────────────

function col(nome: string, tipo: string) {
  return { nome, tipo };
}

export const DATASET_PLENO: Dataset = {
  produtos: {
    nome: "produtos",
    colunas: [
      col("id","INTEGER"), col("nome","TEXT"), col("marca","TEXT"),
      col("categoria","TEXT"), col("cor","TEXT"), col("preco","REAL"),
      col("custo","REAL"), col("estoque","INTEGER"), col("desconto_pct","INTEGER"),
      col("lancamento","TEXT"),
    ],
    seed: SEED,
  },
  clientes: {
    nome: "clientes",
    colunas: [
      col("id","INTEGER"), col("nome","TEXT"), col("email","TEXT"),
      col("cidade","TEXT"), col("uf","TEXT"), col("segmento","TEXT"),
      col("data_cadastro","TEXT"), col("ativo","INTEGER"),
    ],
    seed: SEED,
  },
  vendedores: {
    nome: "vendedores",
    colunas: [
      col("id","INTEGER"), col("nome","TEXT"), col("regiao","TEXT"),
      col("meta_mensal","REAL"), col("data_admissao","TEXT"),
    ],
    seed: SEED,
  },
  pedidos: {
    nome: "pedidos",
    colunas: [
      col("id","INTEGER"), col("cliente_id","INTEGER"), col("vendedor_id","INTEGER"),
      col("data_pedido","TEXT"), col("status","TEXT"), col("valor_total","REAL"),
      col("forma_pagamento","TEXT"),
    ],
    seed: SEED,
  },
  itens_pedido: {
    nome: "itens_pedido",
    colunas: [
      col("id","INTEGER"), col("pedido_id","INTEGER"), col("produto_id","INTEGER"),
      col("quantidade","INTEGER"), col("preco_unit","REAL"), col("desconto_pct","INTEGER"),
    ],
    seed: SEED,
  },
};
