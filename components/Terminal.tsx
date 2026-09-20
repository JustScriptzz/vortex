import { useEffect, useRef, useState } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

interface TerminalProps {
  onCommand?: (command: string) => Promise<string>;
}

export default function TerminalComponent({ onCommand }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInstanceRef = useRef<Terminal | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!terminalRef.current || initialized) return;

    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: "#0f172a",
        foreground: "#e2e8f0",
        cursor: "#60a5fa",
      },
      fontSize: 12,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      lineHeight: 1.2,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    term.writeln("\\x1b[1;32mVortex Terminal v0.1\\x1b[0m");
    term.writeln("Type commands. Type 'clear' to clear screen.");
    term.write("$ ");

    let currentCommand = "";
    term.onData((data) => {
      if (data === "\r") {
        term.writeln("");
        const command = currentCommand.trim();
        if (command === "clear") term.clear();
        else if (command === "exit") term.writeln("Goodbye!");
        else if (command) term.writeln(`Command: ${command}`);
        currentCommand = "";
        term.write("$ ");
      } else if (data === "\u007F") {
        if (currentCommand.length > 0) {
          currentCommand = currentCommand.slice(0, -1);
          term.write("\b \b");
        }
      } else if (data >= String.fromCharCode(32)) {
        currentCommand += data;
        term.write(data);
      }
    });

    terminalInstanceRef.current = term;
    setInitialized(true);

    const handleResize = () => fitAddon.fit();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      term.dispose();
    };
  }, [initialized]);

  return (
    <div
      ref={terminalRef}
      className="w-full h-full bg-slate-950 overflow-hidden"
      style={{ fontSize: "12px", fontFamily: 'Menlo, Monaco, "Courier New", monospace' }}
    />
  );
}