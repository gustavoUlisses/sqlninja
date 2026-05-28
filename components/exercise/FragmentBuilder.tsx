"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TabelaSchema } from "@/lib/types";

interface FragmentBuilderProps {
  schema: TabelaSchema[];
  keywords: string[];
  funcoes?: string[];
  operadores?: string[];
  valores?: string[];
  onInsert: (fragment: string) => void;
}

const ALL_CLAUSES = [
  "SELECT", "FROM", "WHERE", "GROUP BY", "HAVING",
  "ORDER BY", "LIMIT", "DISTINCT", "JOIN", "LEFT JOIN",
  "INNER JOIN", "ON", "AS", "WITH", "CASE WHEN", "THEN", "ELSE", "END",
];

const ALL_FUNCTIONS = [
  "COUNT(*)", "COUNT(DISTINCT )", "SUM()", "AVG()", "MAX()", "MIN()",
  "ROUND()", "COALESCE()", "NULLIF()", "CAST( AS )",
  "DATE()", "STRFTIME()", "SUBSTR()", "LENGTH()", "UPPER()", "LOWER()",
  "ROW_NUMBER()", "RANK()", "DENSE_RANK()", "LAG()", "LEAD()",
  "PARTITION BY", "OVER()", "FILTER(WHERE )",
];

const ALL_OPERATORS = [
  "=", "!=", ">", "<", ">=", "<=",
  "AND", "OR", "NOT", "IN", "NOT IN",
  "LIKE", "NOT LIKE", "BETWEEN", "IS NULL", "IS NOT NULL",
  "EXISTS", "ASC", "DESC", "THEN", "ELSE",
];

function ClauseButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 rounded border border-white/10 bg-white/3 text-xs font-mono font-semibold text-white/70 hover:bg-white/8 hover:text-white hover:border-white/25 transition-colors cursor-pointer"
    >
      {label}
    </button>
  );
}

function ColTag({ label, onClick, muted }: { label: string; onClick: () => void; muted?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer hover:bg-white/6 ${
        muted ? "text-white/35" : "text-white/70 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function SmallTag({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 rounded border border-white/10 bg-white/3 text-xs font-mono text-white/60 hover:bg-white/8 hover:text-white hover:border-white/25 transition-colors cursor-pointer"
    >
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
  // Clauses available for this exercise (from JSON), fallback to all
  const clauses = keywords.length > 0 ? keywords : ALL_CLAUSES;
  const fns = funcoes && funcoes.length > 0 ? funcoes : ALL_FUNCTIONS;
  const ops = operadores && operadores.length > 0 ? operadores : ALL_OPERATORS;

  return (
    <div className="border border-white/8 rounded-lg bg-[#1e1f29] overflow-hidden">
      <Tabs defaultValue="tabela">
        <TabsList className="w-full bg-[#191a24] rounded-none border-b border-white/8 h-9 px-2 gap-1 justify-start">
          <TabsTrigger
            value="tabela"
            className="text-xs px-3 h-7 rounded data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/40 hover:text-white/70 transition-colors"
          >
            Tabela
          </TabsTrigger>
          <TabsTrigger
            value="keywords"
            className="text-xs px-3 h-7 rounded data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/40 hover:text-white/70 transition-colors"
          >
            Keywords
          </TabsTrigger>
          <TabsTrigger
            value="filtros"
            className="text-xs px-3 h-7 rounded data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/40 hover:text-white/70 transition-colors"
          >
            Filtros & Valores
          </TabsTrigger>
        </TabsList>

        {/* Tab: Tabela — 2 colunas: cláusulas + schema */}
        <TabsContent value="tabela" className="mt-0">
          <div className="flex gap-0 min-h-[140px]">
            {/* Left: clause keywords */}
            <div className="w-36 shrink-0 border-r border-white/8 p-2 space-y-1">
              {clauses.map((kw) => (
                <ClauseButton
                  key={kw}
                  label={kw}
                  onClick={() => onInsert(kw)}
                />
              ))}
            </div>

            {/* Right: table schema */}
            <div className="flex-1 overflow-y-auto max-h-52">
              {schema.map((table) => (
                <div key={table.nome}>
                  {/* Table header row */}
                  <div className="flex items-center border-b border-white/8 bg-white/3">
                    <button
                      onClick={() => onInsert("* ")}
                      className="px-3 py-2 text-xs font-mono font-bold text-white/50 hover:text-white transition-colors border-r border-white/8"
                    >
                      *
                    </button>
                    <button
                      onClick={() => onInsert(`${table.nome} `)}
                      className="flex-1 px-3 py-2 text-xs font-mono font-semibold text-white/70 hover:text-white text-left transition-colors"
                    >
                      {table.nome}
                    </button>
                  </div>
                  {/* Columns */}
                  <div className="divide-y divide-white/4">
                    {table.colunas.map((col) => (
                      <ColTag
                        key={col.nome}
                        label={col.nome}
                        onClick={() => onInsert(`${col.nome} `)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Tab: Keywords — funções SQL */}
        <TabsContent value="keywords" className="mt-0 p-3">
          <div className="flex flex-wrap gap-1.5">
            {fns.map((fn) => (
              <SmallTag key={fn} label={fn} onClick={() => onInsert(fn)} />
            ))}
          </div>
        </TabsContent>

        {/* Tab: Filtros & Valores */}
        <TabsContent value="filtros" className="mt-0 p-3 space-y-3">
          <div>
            <p className="text-xs text-white/25 uppercase tracking-widest mb-2">Operadores</p>
            <div className="flex flex-wrap gap-1.5">
              {ops.map((op) => (
                <SmallTag key={op} label={op} onClick={() => onInsert(` ${op} `)} />
              ))}
            </div>
          </div>
          {valores && valores.length > 0 && (
            <div>
              <p className="text-xs text-white/25 uppercase tracking-widest mb-2">Valores</p>
              <div className="flex flex-wrap gap-1.5">
                {valores.map((v) => (
                  <SmallTag key={v} label={v} onClick={() => onInsert(v)} />
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
