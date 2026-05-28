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

/** Seção à qual o exercício pertence (para agrupamento na lista). */
export type SecaoExercicio = "curriculo" | "reforco" | "entrevista" | "certificado";

/** Definição de exercício no formato compacto (dataset compartilhado). */
export interface ExercicioRaw {
  id: string;
  nivel: Nivel;
  numero: number;
  titulo: string;
  demanda: string;
  dica?: string;
  secao: SecaoExercicio;
  /** Nomes das tabelas usadas, em ordem. Resolvidos via dataset do nível. */
  tabelas: string[];
  /** Query gabarito — usada para gerar expected_result automaticamente. */
  gabarito: string;
  /** Se true, a ordem das linhas precisa bater. Default: false. */
  ordem_importa?: boolean;
  /** Cláusulas SQL disponíveis no FragmentBuilder. */
  keywords_disponiveis: string[];
  funcoes_disponiveis?: string[];
  operadores_disponiveis?: string[];
  valores_disponiveis?: string[];
}

/** Exercício resolvido — schema + gabarito prontos para o client. */
export interface Exercicio {
  id: string;
  nivel: Nivel;
  numero: number;
  titulo: string;
  demanda: string;
  dica?: string;
  secao: SecaoExercicio;
  schema: TabelaSchema[];
  /** Query SQL de referência — executada no client para gerar expected_result. */
  gabarito: string;
  ordem_importa?: boolean;
  keywords_disponiveis: string[];
  funcoes_disponiveis?: string[];
  operadores_disponiveis?: string[];
  valores_disponiveis?: string[];
}

/** Dataset compartilhado por nível: mapa de nome → TabelaSchema. */
export type Dataset = Record<string, TabelaSchema>;

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
