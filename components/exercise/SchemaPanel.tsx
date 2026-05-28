import type { TabelaSchema } from "@/lib/types";
import { Database } from "lucide-react";

interface SchemaPanelProps {
  schema: TabelaSchema[];
}

export function SchemaPanel({ schema }: SchemaPanelProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs text-zinc-400 font-semibold uppercase tracking-wider">
        <Database className="w-3.5 h-3.5" />
        Schema
      </div>
      {schema.map((table) => (
        <div
          key={table.nome}
          className="rounded-lg border border-zinc-700/60 overflow-hidden"
        >
          <div className="bg-zinc-800/80 px-3 py-2 flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-purple-300">
              {table.nome}
            </span>
          </div>
          <div className="divide-y divide-zinc-800">
            {table.colunas.map((col) => (
              <div
                key={col.nome}
                className="flex items-center justify-between px-3 py-1.5"
              >
                <span className="text-xs font-mono text-zinc-200">{col.nome}</span>
                <span className="text-xs font-mono text-zinc-500">{col.tipo}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
