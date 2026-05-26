"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, ChevronRight, SquareTerminal } from "lucide-react";

interface Log {
  role: "user" | "ai";
  content: string;
}

export default function DebuggerPage() {
  const [logs, setLogs] = useState<Log[]>([
    { role: "ai", content: "StudyFlow OS [Version 1.0.0]\nRoot access granted. Ready to debug your code, fix Linux errors, or configure networks." }
  ]);
  const [input, setInput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs, isExecuting]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isExecuting) return;

    const command = input;
    setInput("");
    setLogs((prev) => [...prev, { role: "user", content: command }]);
    setIsExecuting(true);

    try {
      const res = await fetch("/api/debugger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: command }),
      });

      const data = await res.json();
      setLogs((prev) => [...prev, { role: "ai", content: data.reply || "Error fetching response." }]);
    } catch (error) {
      setLogs((prev) => [...prev, { role: "ai", content: "System Failure: Cannot connect to host." }]);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)] flex flex-col bg-black rounded-lg md:rounded-xl border border-slate-800 shadow-2xl overflow-hidden font-mono">
      
      {/* Terminal Header */}
      <div className="bg-slate-900 flex items-center justify-between px-3 md:px-4 py-2 border-b border-slate-800">
        <div className="flex items-center gap-2 text-slate-400">
          <SquareTerminal className="w-3 md:w-4 h-3 md:h-4" />
          <span className="text-xs md:text-xs tracking-wider truncate">root@studyflow-sys:~</span>
        </div>
        <div className="flex gap-1 md:gap-2">
          <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-red-500/80"></div>
          <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-green-500/80"></div>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-2 md:space-y-4 bg-black/95">
        {logs.map((log, index) => (
          <div key={index} className="flex flex-col gap-1 text-xs md:text-sm">
            {log.role === "user" ? (
              <div className="flex items-start gap-2 text-emerald-400">
                <span className="shrink-0">$</span>
                <span className="break-all font-semibold">{log.content}</span>
              </div>
            ) : (
              <div className="text-slate-300 whitespace-pre-wrap ml-2 md:ml-4 opacity-90 max-w-none break-words text-xs md:text-sm">
                {log.content}
              </div>
            )}
          </div>
        ))}
        {isExecuting && (
          <div className="flex items-center gap-2 text-emerald-400 animate-pulse text-xs md:text-sm">
            <span className="shrink-0">$</span>
            <span>Processing...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Terminal Input Line */}
      <div className="p-2 md:p-4 bg-black border-t border-slate-900">
        <form onSubmit={handleCommand} className="flex items-center gap-1 md:gap-2 text-emerald-400 text-xs md:text-sm">
          <ChevronRight className="w-4 md:w-5 h-4 md:h-5 shrink-0" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik error kodingan..."
            disabled={isExecuting}
            className="flex-1 bg-transparent text-emerald-400 focus:outline-none placeholder:text-emerald-900/50 text-xs md:text-sm"
            autoFocus
          />
        </form>
      </div>

    </div>
  );
}