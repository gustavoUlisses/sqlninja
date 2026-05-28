"use client";

import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import { Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SqlEditorProps {
  value: string;
  onChange: (val: string) => void;
  onExecute: () => void;
  onClear: () => void;
  isLoading?: boolean;
}

const editorTheme = EditorView.theme({
  "&": { height: "100%", minHeight: "160px" },
  ".cm-scroller": { overflow: "auto", fontFamily: "var(--font-geist-mono)" },
  ".cm-content": { padding: "12px" },
});

export function SqlEditor({ value, onChange, onExecute, onClear, isLoading }: SqlEditorProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      onExecute();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900" onKeyDown={handleKeyDown}>
        <CodeMirror
          value={value}
          onChange={onChange}
          extensions={[sql(), editorTheme]}
          theme={oneDark}
          placeholder="-- Digite sua query SQL aqui..."
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: true,
            autocompletion: true,
            foldGutter: false,
          }}
          className="h-full text-sm"
        />
      </div>

      <div className="flex items-center justify-between mt-3 gap-2">
        <p className="text-xs text-zinc-500">
          <kbd className="px-1 py-0.5 bg-zinc-800 rounded text-zinc-400 text-xs">Ctrl+Enter</kbd>
          {" "}para executar
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            className="text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-zinc-200"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1" />
            Limpar
          </Button>
          <Button
            size="sm"
            onClick={onExecute}
            disabled={isLoading || !value.trim()}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
          >
            <Play className="w-3.5 h-3.5 mr-1" />
            {isLoading ? "Executando..." : "Executar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
