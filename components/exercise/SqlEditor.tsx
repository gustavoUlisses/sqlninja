"use client";

import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import { Play, Trash2 } from "lucide-react";

interface SqlEditorProps {
  value: string;
  onChange: (val: string) => void;
  onExecute: () => void;
  onClear: () => void;
  onSemicolon: () => void;
  isLoading?: boolean;
}

const editorTheme = EditorView.theme({
  "&": { height: "100%", minHeight: "160px", background: "transparent" },
  ".cm-editor": { background: "transparent" },
  ".cm-scroller": { overflow: "auto", fontFamily: "var(--font-geist-mono)", fontSize: "13px" },
  ".cm-content": { padding: "12px" },
  ".cm-gutters": { background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.06)" },
  ".cm-lineNumbers .cm-gutterElement": { color: "rgba(255,255,255,0.2)" },
});

export function SqlEditor({ value, onChange, onExecute, onClear, onSemicolon, isLoading }: SqlEditorProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      onExecute();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex-1 rounded-lg overflow-hidden border border-white/8 bg-white/3"
        onKeyDown={handleKeyDown}
      >
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
        <p className="text-xs text-white/20">
          <kbd className="px-1.5 py-0.5 bg-white/6 rounded text-white/30 text-xs font-mono">Ctrl+Enter</kbd>
          {" "}para executar
        </p>
        <div className="flex gap-2">
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 px-3 py-1.5 rounded-lg border border-white/8 hover:bg-white/4 transition-colors"
          >
            <Trash2 className="w-3 h-3" />
            Limpar
          </button>
          <button
            onClick={onSemicolon}
            title="Inserir ponto e vírgula"
            className="text-xs font-mono font-bold text-white/40 hover:text-white/80 px-3 py-1.5 rounded-lg border border-white/8 hover:bg-white/4 transition-colors"
          >
            ;
          </button>
          <button
            onClick={onExecute}
            disabled={isLoading || !value.trim()}
            className="flex items-center gap-1.5 text-xs font-semibold bg-white text-black px-4 py-1.5 rounded-lg hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Play className="w-3 h-3" />
            {isLoading ? "Executando…" : "Executar"}
          </button>
        </div>
      </div>
    </div>
  );
}
