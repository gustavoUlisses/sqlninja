import type { LevelInfo } from "./types";

export const LEVELS: LevelInfo[] = [
  {
    nivel: "junior",
    label: "Júnior",
    cargo: "Analista de Dados Júnior",
    descricao: "SELECT, WHERE, LIKE, IN, BETWEEN, ORDER BY, CASE WHEN, agregação, datas + simulado de entrevista",
    total: 90,
    cor: "text-white",
    corBg: "bg-white/5 border-white/10",
  },
  {
    nivel: "pleno",
    label: "Pleno",
    cargo: "Analista de Dados Pleno",
    descricao: "GROUP BY, HAVING, funções de agregação, JOINs",
    total: 30,
    cor: "text-white",
    corBg: "bg-white/5 border-white/10",
  },
  {
    nivel: "senior",
    label: "Sênior",
    cargo: "Analista de Dados Sênior",
    descricao: "JOINs complexos, subqueries, CASE WHEN, funções de data",
    total: 30,
    cor: "text-white",
    corBg: "bg-white/5 border-white/10",
  },
  {
    nivel: "especialista",
    label: "Especialista",
    cargo: "Especialista em Dados",
    descricao: "CTEs, window functions, self JOINs, subqueries correlacionadas",
    total: 30,
    cor: "text-white",
    corBg: "bg-white/5 border-white/10",
  },
  {
    nivel: "ninja",
    label: "Ninja",
    cargo: "SQL Ninja",
    descricao: "Otimização, EXPLAIN, análises avançadas multi-step",
    total: 30,
    cor: "text-white",
    corBg: "bg-white/5 border-white/10",
  },
];

export function getLevelInfo(nivel: string): LevelInfo {
  return LEVELS.find((l) => l.nivel === nivel) ?? LEVELS[0];
}
