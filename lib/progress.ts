import type { Nivel, ProgressoUsuario } from "./types";

const KEY = "sqlninja_progress";

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
  return p.exerciciosConcluidos.filter((id) => id.startsWith(nivel.slice(0, 2))).length;
}

export function setCurrentLevel(nivel: Nivel): void {
  const p = getProgress();
  p.nivelAtual = nivel;
  localStorage.setItem(KEY, JSON.stringify(p));
}
