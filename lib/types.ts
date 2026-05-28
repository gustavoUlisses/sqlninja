export type Nivel = "junior" | "pleno" | "senior" | "especialista" | "ninja";

export interface ColunaSchema {
  nome: string;
  tipo: string;
}

export interface TabelaSchema {
  nome: string;
  colunas: ColunaSchema[];
  seed: string;
}

export interface Exercicio {
  id: string;
  nivel: Nivel;
  numero: number;
  titulo: string;
  demanda: string;
  dica?: string;
  schema: TabelaSchema[];
  expected_result: Row[];
  /** Se true, a ordem das linhas precisa bater (use para exercícios com ORDER BY). Default: false. */
  ordem_importa?: boolean;
  keywords_disponiveis: string[];
  funcoes_disponiveis?: string[];
  operadores_disponiveis?: string[];
  valores_disponiveis?: string[];
}

export type Row = Record<string, string | number | null>;

export interface QueryResult {
  columns: string[];
  rows: Row[];
}

export interface QueryError {
  message: string;
}

export type QueryOutput =
  | { ok: true; result: QueryResult }
  | { ok: false; error: string };

export interface LevelInfo {
  nivel: Nivel;
  label: string;
  cargo: string;
  descricao: string;
  total: number;
  cor: string;
  corBg: string;
}

export interface ProgressoUsuario {
  exerciciosConcluidos: string[];
  nivelAtual: Nivel;
}
