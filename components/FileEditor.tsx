import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

interface FileEditorProps {
  filename: string;
  content: string;
  language?: string;
  onChange?: (content: string) => void;
  readOnly?: boolean;
}

export default function FileEditor({
  filename,
  content,
  language,
  onChange,
  readOnly = false,
}: FileEditorProps) {
  const [value, setValue] = useState(content);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const detectLanguage = (filename: string): string => {
    const ext = filename.split(".").pop()?.toLowerCase() || "";
    const map: Record<string, string> = {
      ts: "typescript",
      tsx: "typescript",
      js: "javascript",
      jsx: "javascript",
      py: "python",
      json: "json",
      html: "html",
      css: "css",
      md: "markdown",
    };
    return map[ext] || "plaintext";
  };

  if (!mounted) return <div className="w-full h-full bg-slate-950">Loading...</div>;

  return (
    <div className="w-full h-full flex flex-col bg-slate-950">
      <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-sm text-slate-400">
        {filename}
      </div>
      <Editor
        height="100%"
        defaultLanguage={language || detectLanguage(filename)}
        value={value}
        onChange={(val) => {
          const newVal = val || "";
          setValue(newVal);
          onChange?.(newVal);
        }}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 12,
          readOnly,
          automaticLayout: true,
        }}
      />
    </div>
  );
}