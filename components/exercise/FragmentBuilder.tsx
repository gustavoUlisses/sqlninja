"use client";

import { useState } from "react";
import { Database, FunctionSquare, Sliders } from "lucide-react";
import { TokenButton } from "./TokenButton";
import type { TabelaSchema } from "@/lib/types";

interface FragmentBuilderProps {
  schema: TabelaSchema[];
  keywords: string[];
  funcoes?: string[];
  operadores?: string[];
  valores?: string[];
  onInsert: (fragment: string) => void;
}

const CLAUSE_ORDER = [
  "SELECT", "SELECT DISTINCT", "DISTINCT",
  "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT",
  "JOIN", "INNER JOIN", "LEFT JOIN", "ON", "AS",
  "WITH", "UNION", "UNION ALL",
  "CASE", "WHEN", "THEN", "ELSE", "END",
];

const DEFAULT_FUNCTIONS = [
  "COUNT(*)", "COUNT(DISTINCT )", "SUM()", "AVG()", "MAX()", "MIN()",
];

const DEFAULT_OPERATORS = [
  "=", "!=", ">", "<", ">=", "<=",
  "AND", "OR", "NOT",
  "IN", "NOT IN", "LIKE", "NOT LIKE", "BETWEEN",
  "IS NULL", "IS NOT NULL",
];

const STRUCTURAL_CLAUSES = new Set([
  "SELECT", "SELECT DISTINCT", "DISTINCT",
  "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT",
  "JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "ON", "AS",
  "WITH", "UNION", "UNION ALL",
  "CASE", "WHEN", "THEN", "ELSE", "END",
]);

type TabId = "tabela" | "funcoes" | "filtros";

function TabPill({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 h-7 rounded-md text-xs font-medium transition-all duration-150 cursor-pointer outline-none ${
        active
          ? "bg-white/[0.08] text-white"
          : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
      }`}
    >
      <span className={active ? "text-white/80" : "text-white/30"}>{icon}</span>
      {label}
    </button>
  );
}

export function FragmentBuilder({
  schema,
  keywords,
  funcoes,
  operadores,
  valores,
  onInsert,
}: FragmentBuilderProps) {
  const [tab, setTab] = useState<TabId>("tabela");

  // Separa keywords do JSON em cláusulas vs operadores
  const clausesFromExercise: string[] = [];
  const operatorsFromKeywords: string[] = [];
  for (const kw of keywords) {
    if (STRUCTURAL_CLAUSES.has(kw)) clausesFromExercise.push(kw);
    else operatorsFromKeywords.push(kw);
  }

  const clauses =
    clausesFromExercise.length > 0
      ? clausesFromExercise
      : ["SELECT", "FROM", "WHERE", "ORDER BY", "LIMIT"];
  const orderedClauses = CLAUSE_ORDER.filter((c) => clauses.includes(c));

  const fns = funcoes && funcoes.length > 0 ? funcoes : DEFAULT_FUNCTIONS;
  const opsFromExercise = operadores && operadores.length > 0 ? operadores : [];
  const allOps = Array.from(new Set([...operatorsFromKeywords, ...opsFromExercise]));
  const ops = allOps.length > 0 ? allOps : DEFAULT_OPERATORS;

  return (
    <div className="rounded-xl border border-white/10 bg-gradient-to-b from-zinc-950 to-zinc-900/60 overflow-hidden shadow-lg shadow-black/20">
      {/* Tabs */}
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-white/8 bg-black/40">
        <TabPill
          active={tab === "tabela"}
          onClick={() => setTab("tabela")}
          icon={<Database className="w-3 h-3" />}
          label="Tabela"
        />
        <TabPill
          active={tab === "funcoes"}
          onClick={() => setTab("funcoes")}
          icon={<FunctionSquare className="w-3 h-3" />}
          label="Funções"
        />
        <TabPill
          active={tab === "filtros"}
          onClick={() => setTab("filtros")}
          icon={<Sliders className="w-3 h-3" />}
          label="Filtros & Valores"
        />
      </div>

      {/* Content */}
      <div className="min-h-[150px]">
        {tab === "tabela" && (
          <div className="flex">
            {/* Esquerda: cláusulas */}
            <div className="w-40 shrink-0 border-r border-white/8 p-2 space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-white/25 font-medium px-1 mb-1.5">
                Cláusulas
              </p>
              {orderedClauses.map((kw) => (
                <TokenButton
                  key={kw}
                  label={kw}
                  token={kw}
                  variant="clause"
                  onClick={() => onInsert(kw)}
                />
              ))}
            </div>

            {/* Direita: schema */}
            <div className="flex-1 max-h-64 overflow-y-auto">
              <p className="text-[10px] uppercase tracking-widest text-white/25 font-medium px-3 pt-2 pb-1.5">
                Schema
              </p>
              {schema.map((table) => (
                <div key={table.nome} className="mb-1">
                  <div className="flex items-stretch border-y border-white/8 bg-white/[0.03]">
                    <TokenButton
                      label="*"
                      token="*"
                      variant="punct"
                      className="!w-10 !h-auto !rounded-none border-0 border-r border-white/8 !bg-transparent text-[#f1fa8c]/80 hover:!bg-[#f1fa8c]/10"
                      onClick={() => onInsert("*")}
                    />
                    <TokenButton
                      label={table.nome}
                      variant="schema-header"
                      description={`Tabela: ${table.nome} (${table.colunas.length} colunas). Clique para inserir o nome.`}
                      onClick={() => onInsert(table.nome)}
                    />
                  </div>
                  <div>
                    {table.colunas.map((col) => (
                      <div
                        key={col.nome}
                        className="flex items-center justify-between border-b border-white/[0.04] last:border-0 group hover:bg-white/[0.03]"
                      >
                        <TokenButton
                          label={col.nome}
                          variant="schema"
                          description={`${col.nome} · ${col.tipo}`}
                          onClick={() => onInsert(col.nome)}
                        />
                        <span className="text-[10px] font-mono text-white/20 pr-3 group-hover:text-white/35">
                          {col.tipo}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "funcoes" && (
          <div className="p-4">
            <p className="text-[10px] uppercase tracking-widest text-white/25 font-medium mb-2.5">
              Agregação & Texto
            </p>
            <div className="flex flex-wrap gap-1.5">
              {fns.map((fn) => (
                <TokenButton
                  key={fn}
                  label={fn}
                  token={fn}
                  variant="tag"
                  onClick={() => onInsert(fn)}
                  className="hover:!text-[#50fa7b] hover:!border-[#50fa7b]/40 hover:!bg-[#50fa7b]/8"
                />
              ))}
            </div>
          </div>
        )}

        {tab === "filtros" && (
          <div className="p-4 space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/25 font-medium mb-2.5">
                Operadores
              </p>
              <div className="flex flex-wrap gap-1.5">
                {ops.map((op) => (
                  <TokenButton
                    key={op}
                    label={op}
                    token={op}
                    variant="tag"
                    onClick={() => onInsert(op)}
                    className="hover:!text-[#ff79c6] hover:!border-[#ff79c6]/40 hover:!bg-[#ff79c6]/8"
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/25 font-medium mb-2.5">
                Pontuação
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["(", ")", ","].map((p) => (
                  <TokenButton
                    key={p}
                    label={p}
                    token={p}
                    variant="punct"
                    onClick={() => onInsert(p)}
                    className="hover:!text-[#f1fa8c] hover:!border-[#f1fa8c]/40 hover:!bg-[#f1fa8c]/8"
                  />
                ))}
              </div>
            </div>

            {valores && valores.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/25 font-medium mb-2.5">
                  Valores deste exercício
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {valores.map((v) => (
                    <TokenButton
                      key={v}
                      label={v}
                      variant="tag"
                      description={`Valor sugerido: ${v}`}
                      onClick={() => onInsert(v)}
                      className="hover:!text-[#8be9fd] hover:!border-[#8be9fd]/40 hover:!bg-[#8be9fd]/8"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
