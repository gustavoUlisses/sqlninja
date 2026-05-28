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

function Tag({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 rounded border border-white/10 bg-white/4 text-xs font-mono text-white/60 hover:bg-white/8 hover:text-white/90 hover:border-white/20 transition-colors cursor-pointer"
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
    <div className="border border-white/8 rounded-lg bg-white/2 p-3">
      <Tabs defaultValue="keywords">
        <TabsList className="bg-white/4 h-7 mb-3 gap-0.5">
          <TabsTrigger value="keywords" className="text-xs h-5.5 px-3 data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/40">
            Cláusulas
          </TabsTrigger>
          <TabsTrigger value="colunas" className="text-xs h-5.5 px-3 data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/40">
            Tabelas
          </TabsTrigger>
          <TabsTrigger value="funcoes" className="text-xs h-5.5 px-3 data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/40">
            Funções
          </TabsTrigger>
          <TabsTrigger value="operadores" className="text-xs h-5.5 px-3 data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/40">
            Operadores
          </TabsTrigger>
          {valores.length > 0 && (
            <TabsTrigger value="valores" className="text-xs h-5.5 px-3 data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/40">
              Valores
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="keywords" className="mt-0">
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((kw) => (
              <Tag key={kw} label={kw} onClick={() => onInsert(` ${kw} `)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="colunas" className="mt-0 space-y-2">
          {schema.map((table) => (
            <div key={table.nome}>
              <p className="text-xs text-white/25 font-mono mb-1.5">{table.nome}</p>
              <div className="flex flex-wrap gap-1.5">
                <Tag label={`${table.nome}.*`} onClick={() => onInsert(`${table.nome}.* `)} />
                {table.colunas.map((col) => (
                  <Tag key={col.nome} label={col.nome} onClick={() => onInsert(`${col.nome} `)} />
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="funcoes" className="mt-0">
          <div className="flex flex-wrap gap-1.5">
            {defaultFuncoes.map((fn) => (
              <Tag key={fn} label={fn} onClick={() => onInsert(`${fn}`)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="operadores" className="mt-0">
          <div className="flex flex-wrap gap-1.5">
            {defaultOperadores.map((op) => (
              <Tag key={op} label={op} onClick={() => onInsert(` ${op} `)} />
            ))}
          </div>
        </TabsContent>

        {valores.length > 0 && (
          <TabsContent value="valores" className="mt-0">
            <div className="flex flex-wrap gap-1.5">
              {valores.map((v) => (
                <Tag key={v} label={v} onClick={() => onInsert(`${v}`)} />
              ))}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
