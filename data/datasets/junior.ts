import type { Dataset } from "@/lib/types";

/**
 * Dataset compartilhado por TODOS os exercícios do nível JÚNIOR.
 *
 * Universo: DataCo — e-commerce brasileiro de eletrônicos, 2026.
 *
 * Para nível Júnior usamos APENAS uma tabela (`produtos`) para que o aluno
 * possa focar em filtros, ordenação, aliases e funções simples — sem se
 * preocupar com JOIN ainda.
 *
 * Dados desenhados para suportar exercícios de:
 * - Filtros numéricos (preco, estoque, custo, desconto_pct)
 * - Filtros de texto (nome, marca, categoria, cor, modelo)
 * - LIKE com padrões variados
 * - IN com listas curtas
 * - BETWEEN com intervalos
 * - IS NULL / IS NOT NULL (campos opcionais propositalmente nulos)
 * - ORDER BY múltiplas colunas
 * - LIMIT / OFFSET
 * - DISTINCT
 * - Aliases com AS
 * - Expressões aritméticas (margem = preco - custo)
 * - Funções de texto (UPPER, LOWER, LENGTH, SUBSTR, ||)
 * - Datas básicas com strftime() do SQLite
 */
export const DATASET_JUNIOR: Dataset = {
  produtos: {
    nome: "produtos",
    colunas: [
      { nome: "id", tipo: "INTEGER" },
      { nome: "nome", tipo: "TEXT" },
      { nome: "marca", tipo: "TEXT" },
      { nome: "categoria", tipo: "TEXT" },
      { nome: "cor", tipo: "TEXT" },
      { nome: "preco", tipo: "REAL" },
      { nome: "custo", tipo: "REAL" },
      { nome: "estoque", tipo: "INTEGER" },
      { nome: "desconto_pct", tipo: "INTEGER" },
      { nome: "lancamento", tipo: "TEXT" },
    ],
    seed: `
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
  (1,  'iPhone 16 Pro 256GB',       'Apple',     'Smartphones',    'Titanio Preto',  9499.99, 6800.00,  45, 10,  '2025-09-20'),
  (2,  'iPhone 16 256GB',           'Apple',     'Smartphones',    'Branco',         7299.99, 5100.00,  82, NULL,'2025-09-20'),
  (3,  'Galaxy S25 Ultra 512GB',    'Samsung',   'Smartphones',    'Titanio Cinza',  9899.00, 6500.00,  31, 15,  '2025-02-07'),
  (4,  'Galaxy S25 256GB',          'Samsung',   'Smartphones',    'Azul',           7299.00, 4900.00,  62, 5,   '2025-02-07'),
  (5,  'Galaxy A55 5G',             'Samsung',   'Smartphones',    'Preto',          2499.00, 1400.00, 154, 20,  '2024-03-12'),
  (6,  'Moto G75 5G',               'Motorola',  'Smartphones',    NULL,             2199.00, 1200.00, 198, 12,  '2024-09-10'),
  (7,  'Pixel 9 Pro',               'Google',    'Smartphones',    NULL,             8499.00, 5800.00,  18, NULL,'2024-08-13'),

  (8,  'MacBook Air M3 13"',        'Apple',     'Notebooks',      'Cinza Espacial', 11999.00,8200.00,  27, 8,   '2024-03-08'),
  (9,  'MacBook Pro M4 14"',        'Apple',     'Notebooks',      NULL,             18499.00,12500.00, 14, NULL,'2025-11-08'),
  (10, 'Notebook Dell Inspiron 15', 'Dell',      'Notebooks',      'Preto',          4299.99, 2800.00,  56, 15,  '2025-01-15'),
  (11, 'Notebook Lenovo IdeaPad 5', 'Lenovo',    'Notebooks',      NULL,             3899.00, 2500.00,  73, 18,  '2024-10-22'),
  (12, 'Notebook Acer Aspire 5',    'Acer',      'Notebooks',      'Prata',          3299.00, 2100.00,  91, 22,  '2025-03-04'),

  (13, 'iPad Air M2 11"',           'Apple',     'Tablets',        'Estelar',        5399.99, 3700.00,  41, NULL,'2024-05-15'),
  (14, 'iPad Pro M4 11"',           'Apple',     'Tablets',        'Prateado',       9999.00, 6900.00,  19, 5,   '2024-05-15'),
  (15, 'Galaxy Tab S10+',           'Samsung',   'Tablets',        NULL,             6799.00, 4500.00,  33, 10,  '2024-10-03'),

  (16, 'AirPods Pro 2',             'Apple',     'Audio',          'Branco',         2199.99, 1300.00,  94, NULL,'2024-09-23'),
  (17, 'AirPods 4',                 'Apple',     'Audio',          'Branco',         1499.00,  950.00, 128, 10,  '2024-09-23'),
  (18, 'Galaxy Buds3 Pro',          'Samsung',   'Audio',          NULL,             1899.00, 1100.00,  67, 15,  '2024-07-24'),
  (19, 'Sony WH-1000XM5',           'Sony',      'Audio',          'Preto',          2899.00, 1850.00,  29, NULL,'2022-05-12'),
  (20, 'JBL Tune 770NC',            'JBL',       'Audio',          'Preto',           899.00,  520.00, 215, 25,  '2024-01-09'),

  (21, 'Monitor LG 27" 4K',         'LG',        'Monitores',      'Preto',          2899.00, 1900.00,  42, 12,  '2024-04-18'),
  (22, 'Monitor Dell P2723QE 27"',  'Dell',      'Monitores',      NULL,             3499.00, 2400.00,  35, NULL,'2024-02-11'),
  (23, 'Monitor Samsung Odyssey G7','Samsung',   'Monitores',      'Branco',         4299.00, 2800.00,  21, 8,   '2024-06-25'),

  (24, 'Mouse Logitech MX Master 3S','Logitech', 'Perifericos',    'Grafite',         649.99,  380.00, 173, NULL,'2022-06-14'),
  (25, 'Teclado Keychron K2 V2',    'Keychron',  'Perifericos',    'Cinza',           799.99,  450.00, 112, 10,  '2023-08-22'),
  (26, 'Teclado Logitech MX Keys',  'Logitech',  'Perifericos',    'Grafite',         949.00,  580.00,  88, NULL,'2022-09-01'),
  (27, 'Mouse Razer DeathAdder V3', 'Razer',     'Perifericos',    'Preto',           499.00,  290.00, 156, 15,  '2023-11-10'),

  (28, 'Apple Watch Series 10 GPS', 'Apple',     'Wearables',      'Prateado',       3899.00, 2600.00,  38, NULL,'2024-09-20'),
  (29, 'Galaxy Watch 7',            'Samsung',   'Wearables',      'Verde',          2599.00, 1700.00,  54, 12,  '2024-07-24'),
  (30, 'Garmin Forerunner 165',     'Garmin',    'Wearables',      'Preto',          2199.00, 1450.00,  47, NULL,'2024-03-19');
`.trim(),
  },
};
