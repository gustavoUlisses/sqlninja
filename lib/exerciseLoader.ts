import type { Dataset, Exercicio, ExercicioRaw, TabelaSchema } from "./types";

export function resolveSchema(raw: ExercicioRaw, dataset: Dataset): TabelaSchema[] {
  return raw.tabelas.map((nome) => {
    const tabela = dataset[nome];
    if (!tabela) {
      throw new Error(
        `Tabela "${nome}" não encontrada no dataset (exercício ${raw.id})`
      );
    }
    return tabela;
  });
}

/** Converte um ExercicioRaw + Dataset em Exercicio pronto para o client. */
export function makeExercicio(raw: ExercicioRaw, dataset: Dataset): Exercicio {
  return {
    id: raw.id,
    nivel: raw.nivel,
    numero: raw.numero,
    titulo: raw.titulo,
    demanda: raw.demanda,
    dica: raw.dica,
    secao: raw.secao,
    schema: resolveSchema(raw, dataset),
    gabarito: raw.gabarito,
    ordem_importa: raw.ordem_importa,
    keywords_disponiveis: raw.keywords_disponiveis,
    funcoes_disponiveis: raw.funcoes_disponiveis,
    operadores_disponiveis: raw.operadores_disponiveis,
    valores_disponiveis: raw.valores_disponiveis,
  };
}
