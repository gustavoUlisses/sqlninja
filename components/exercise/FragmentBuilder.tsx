"use client";

import { useState } from "react";
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

const TAG_STYLES: Record<string, string> = {
  SELECT: "bg-blue-500/20 text-blue-300 border-blue-500/40 hover:bg-blue-500/30",
  FROM: "bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30",
  WHERE: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40 hover:bg-yellow-500/30",
  "GROUP BY": "bg-orange-500/20 text-orange-300 border-orange-500/40 hover:bg-orange-500/30",
  HAVING: "bg-red-500/20 text-red-300 border-red-500/40 hover:bg-red-500/30",
  "ORDER BY": "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30",
  LIMIT: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30",
  DISTINCT: "bg-pink-500/20 text-pink-300 border-pink-500/40 hover:bg-pink-500/30",
  JOIN: "bg-teal-500/20 text-teal-300 border-teal-500/40 hover:bg-teal-500/30",
  "LEFT JOIN": "bg-teal-500/20 text-teal-300 border-teal-500/40 hover:bg-teal-500/30",
  "INNER JOIN": "bg-teal-500/20 text-teal-300 border-teal-500/40 hover:bg-teal-500/30",
  ON: "bg-teal-500/20 text-teal-300 border-teal-500/40 hover:bg-teal-500/30",
  AS: "bg-zinc-500/20 text-zinc-300 border-zinc-500/40 hover:bg-zinc-500/30",
  AND: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40 hover:bg-yellow-500/30",
  OR: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40 hover:bg-yellow-500/30",
  NOT: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40 hover:bg-yellow-500/30",
  LIKE: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40 hover:bg-yellow-500/30",
  IN: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40 hover:bg-yellow-500/30",
  BETWEEN: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40 hover:bg-yellow-500/30",
  "IS NULL": "bg-yellow-500/20 text-yellow-300 border-yellow-500/40 hover:bg-yellow-500/30",
  "IS NOT NULL": "bg-yellow-500/20 text-yellow-300 border-yellow-500/40 hover:bg-yellow-500/30",
  WITH: "bg-violet-500/20 text-violet-300 border-violet-500/40 hover:bg-violet-500/30",
  "CASE WHEN": "bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30",
  THEN: "bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30",
  ELSE: "bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30",
  END: "bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30",
};

const DEFAULT_STYLE =
  "bg-zinc-700/50 text-zinc-300 border-zinc-600/40 hover:bg-zinc-700/80";

function Tag({
  label,
  onClick,
  style,
}: {
  label: string;
  onClick: () => void;
  style?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 rounded border text-xs font-mono font-medium transition-colors cursor-pointer ${
        style ?? DEFAULT_STYLE
      }`}
    >
      {label}
    </button>
  );
}

export function FragmentBuilder({
  schema,
  keywords,
  funcoes = [],
  operadores = [],
  valores = [],
  onInsert,
}: FragmentBuilderProps) {
  const defaultFuncoes = funcoes.length > 0
    ? funcoes
    : ["COUNT(*)", "SUM()", "AVG()", "MAX()", "MIN()", "COUNT(DISTINCT )"];

  const defaultOperadores = operadores.length > 0
    ? operadores
    : ["=", "!=", ">", "<", ">=", "<=", "LIKE", "IN", "BETWEEN", "AND", "OR", "NOT"];

  return (
    <div className="border border-zinc-700 rounded-lg bg-zinc-900/50 p-3">
      <Tabs defaultValue="keywords">
        <TabsList className="bg-zinc-800 h-8 mb-3">
          <TabsTrigger value="keywords" className="text-xs h-6 px-3">
            Cláusulas
          </TabsTrigger>
          <TabsTrigger value="colunas" className="text-xs h-6 px-3">
            Tabelas
          </TabsTrigger>
          <TabsTrigger value="funcoes" className="text-xs h-6 px-3">
            Funções
          </TabsTrigger>
          <TabsTrigger value="operadores" className="text-xs h-6 px-3">
            Operadores
          </TabsTrigger>
          {valores.length > 0 && (
            <TabsTrigger value="valores" className="text-xs h-6 px-3">
              Valores
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="keywords" className="mt-0">
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((kw) => (
              <Tag
                key={kw}
                label={kw}
                style={TAG_STYLES[kw]}
                onClick={() => onInsert(` ${kw} `)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="colunas" className="mt-0 space-y-2">
          {schema.map((table) => (
            <div key={table.nome}>
              <p className="text-xs text-zinc-400 font-mono mb-1.5">
                <span className="text-purple-400">{table.nome}</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Tag
                  label={`${table.nome}.*`}
                  onClick={() => onInsert(`${table.nome}.* `)}
                />
                {table.colunas.map((col) => (
                  <Tag
                    key={col.nome}
                    label={col.nome}
                    style="bg-zinc-700/50 text-zinc-200 border-zinc-600/40 hover:bg-zinc-700/80"
                    onClick={() => onInsert(`${col.nome} `)}
                  />
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="funcoes" className="mt-0">
          <div className="flex flex-wrap gap-1.5">
            {defaultFuncoes.map((fn) => (
              <Tag
                key={fn}
                label={fn}
                style="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
                onClick={() => onInsert(`${fn}`)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="operadores" className="mt-0">
          <div className="flex flex-wrap gap-1.5">
            {defaultOperadores.map((op) => (
              <Tag
                key={op}
                label={op}
                style={TAG_STYLES[op] ?? DEFAULT_STYLE}
                onClick={() => onInsert(` ${op} `)}
              />
            ))}
          </div>
        </TabsContent>

        {valores.length > 0 && (
          <TabsContent value="valores" className="mt-0">
            <div className="flex flex-wrap gap-1.5">
              {valores.map((v) => (
                <Tag
                  key={v}
                  label={v}
                  style="bg-zinc-600/50 text-zinc-200 border-zinc-500/40 hover:bg-zinc-600/80"
                  onClick={() => onInsert(`${v}`)}
                />
              ))}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
