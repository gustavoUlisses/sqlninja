import type { LevelInfo } from "./types";

export const LEVELS: LevelInfo[] = [
  {
    nivel: "junior",
    label: "Júnior",
    cargo: "Analista de Dados Júnior",
    descricao: "Fundamentos do SQL: SELECT, WHERE, ORDER BY, filtros básicos",
    total: 30,
    cor: "text-emerald-400",
    corBg: "bg-emerald-500/10 border-emerald-500/30",
  },
  {
    nivel: "pleno",
    label: "Pleno",
    cargo: "Analista de Dados Pleno",
    descricao: "Agregações, GROUP BY, HAVING e JOINs",
    total: 30,
    cor: "text-blue-400",
    corBg: "bg-blue-500/10 border-blue-500/30",
  },
  {
    nivel: "senior",
    label: "Sênior",
    cargo: "Analista de Dados Sênior",
    descricao: "JOINs complexos, subqueries, CASE WHEN e funções de data",
    total: 30,
    cor: "text-violet-400",
    corBg: "bg-violet-500/10 border-violet-500/30",
  },
  {
    nivel: "especialista",
    label: "Especialista",
    cargo: "Especialista em Dados",
    descricao: "CTEs, window functions, self JOINs e subqueries correlacionadas",
    total: 30,
    cor: "text-orange-400",
    corBg: "bg-orange-500/10 border-orange-500/30",
  },
  {
    nivel: "ninja",
    label: "Ninja",
    cargo: "SQL Ninja",
    descricao: "Desafios avançados: otimização, EXPLAIN, queries multi-step",
    total: 30,
    cor: "text-red-400",
    corBg: "bg-red-500/10 border-red-500/30",
  },
];

export function getLevelInfo(nivel: string): LevelInfo {
  return LEVELS.find((l) => l.nivel === nivel) ?? LEVELS[0];
}
