import type { Nivel, ProgressoUsuario } from "./types";

const KEY = "sqlninja_progress";

const NIVEL_PREFIX: Record<Nivel, string> = {
  junior: "jr-",
  pleno: "pl-",
  senior: "sr-",
  especialista: "es-",
  ninja: "nj-",
};

function defaultProgress(): ProgressoUsuario {
  return { exerciciosConcluidos: [], nivelAtual: "junior" };
}

export function getProgress(): ProgressoUsuario {
  if (typeof window === "undefined") return defaultProgress();
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ProgressoUsuario) : defaultProgress();
  } catch {
    return defaultProgress();
  }
}

export function markCompleted(id: string): ProgressoUsuario {
  const p = getProgress();
  if (!p.exerciciosConcluidos.includes(id)) {
    p.exerciciosConcluidos.push(id);
  }
  localStorage.setItem(KEY, JSON.stringify(p));
  return p;
}

export function isCompleted(id: string): boolean {
  return getProgress().exerciciosConcluidos.includes(id);
}

export function countCompleted(nivel: Nivel): number {
  const p = getProgress();
  const prefix = NIVEL_PREFIX[nivel];
  return p.exerciciosConcluidos.filter((id) => id.startsWith(prefix)).length;
}

export function setCurrentLevel(nivel: Nivel): void {
  const p = getProgress();
  p.nivelAtual = nivel;
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function getNivelPrefix(nivel: Nivel): string {
  return NIVEL_PREFIX[nivel];
}
