import type { Dataset, Exercicio, ExercicioRaw, Nivel } from "./types";
import { makeExercicio } from "./exerciseLoader";

import { DATASET_JUNIOR } from "@/data/datasets/junior";
import { EXERCICIOS_JUNIOR } from "@/data/exercicios/junior";

const RAW: Record<Nivel, ExercicioRaw[]> = {
  junior: EXERCICIOS_JUNIOR,
  pleno: [],
  senior: [],
  especialista: [],
  ninja: [],
};

const DATASETS: Record<Nivel, Dataset> = {
  junior: DATASET_JUNIOR,
  pleno: {},
  senior: {},
  especialista: {},
  ninja: {},
};

export function getExerciciosByNivel(nivel: Nivel): Exercicio[] {
  const raws = RAW[nivel] ?? [];
  const ds = DATASETS[nivel] ?? {};
  return raws.map((raw) => makeExercicio(raw, ds));
}

export function getExercicioById(nivel: Nivel, id: string): Exercicio | null {
  const all = getExerciciosByNivel(nivel);
  return all.find((e) => e.id === id) ?? null;
}

export function getExercicioRawById(
  nivel: Nivel,
  id: string
): { raw: ExercicioRaw; dataset: Dataset } | null {
  const raw = (RAW[nivel] ?? []).find((e) => e.id === id);
  if (!raw) return null;
  return { raw, dataset: DATASETS[nivel] };
}

export function getAdjacentIds(
  nivel: Nivel,
  currentId: string
): { prev: string | null; next: string | null } {
  const all = RAW[nivel] ?? [];
  const idx = all.findIndex((e) => e.id === currentId);
  return {
    prev: idx > 0 ? all[idx - 1].id : null,
    next: idx < all.length - 1 ? all[idx + 1].id : null,
  };
}
