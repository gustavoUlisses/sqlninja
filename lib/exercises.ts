import type { Exercicio, Nivel } from "./types";
import juniorData from "@/data/junior.json";
import plenoData from "@/data/pleno.json";
import seniorData from "@/data/senior.json";
import especialistaData from "@/data/especialista.json";
import ninjaData from "@/data/ninja.json";

const DATA: Record<Nivel, Exercicio[]> = {
  junior: juniorData as Exercicio[],
  pleno: plenoData as Exercicio[],
  senior: seniorData as Exercicio[],
  especialista: especialistaData as Exercicio[],
  ninja: ninjaData as Exercicio[],
};

export function getExerciciosByNivel(nivel: Nivel): Exercicio[] {
  return DATA[nivel] ?? [];
}

export function getExercicioById(nivel: Nivel, id: string): Exercicio | null {
  return DATA[nivel]?.find((e) => e.id === id) ?? null;
}

export function getAdjacentIds(
  nivel: Nivel,
  currentId: string
): { prev: string | null; next: string | null } {
  const all = DATA[nivel] ?? [];
  const idx = all.findIndex((e) => e.id === currentId);
  return {
    prev: idx > 0 ? all[idx - 1].id : null,
    next: idx < all.length - 1 ? all[idx + 1].id : null,
  };
}
