"use client";

import { useState } from "react";
import { BookOpen, Sparkles, Loader2 } from "lucide-react";

export default function SummaryPage() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await res.json();
      if (data.summary) {
        setSummary(data.summary);
      }
    } catch (error) {
      console.error("Error:", error);
      setSummary("Terjadi kesalahan saat merangkum materi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-3 md:gap-6 h-auto lg:h-[calc(100vh-6rem)]">
      
      {/* Kolom Kiri: Input Teks */}
      <div className="flex-1 flex flex-col bg-slate-900 p-4 md:p-6 rounded-lg md:rounded-2xl shadow-xl">
        <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 flex items-center gap-2 md:gap-3 text-slate-100">
          <BookOpen className="text-indigo-500 w-5 md:w-6 h-5 md:h-6" />
          Rangkuman Materi
        </h1>
        <p className="text-slate-400 text-xs md:text-sm mb-3 md:mb-4">
          Paste artikel, materi pelajaran, atau teks panjang ke sini. AI akan merangkum poin-poin pentingnya untukmu.
        </p>
        
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste teks panjangmu di sini..."
          className="flex-1 w-full bg-slate-950 text-slate-200 rounded-lg md:rounded-xl p-3 md:p-4 text-sm md:text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none shadow-inner mb-3 md:mb-4 min-h-[150px] md:min-h-[200px]"
        />
        
        <button
          onClick={handleSummarize}
          disabled={isLoading || !inputText.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium py-2 md:py-3 rounded-lg md:rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-900/20 text-sm md:text-base"
        >
          {isLoading ? <Loader2 className="w-4 md:w-5 h-4 md:h-5 animate-spin" /> : <Sparkles className="w-4 md:w-5 h-4 md:h-5" />}
          {isLoading ? "Sedang Merangkum..." : "Rangkum Sekarang"}
        </button>
      </div>

      {/* Kolom Kanan: Hasil Rangkuman */}
      <div className="flex-1 flex flex-col bg-slate-900 p-4 md:p-6 rounded-lg md:rounded-2xl shadow-xl min-h-64 lg:min-h-auto">
        <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-slate-100 pb-2 border-b border-slate-800">
          Hasil Rangkuman
        </h2>
        <div className="flex-1 overflow-y-auto bg-slate-950/50 rounded-lg md:rounded-xl p-3 md:p-6 prose prose-invert prose-indigo max-w-none text-sm md:text-base">
          {summary ? (
            <div className="whitespace-pre-wrap text-slate-300 leading-relaxed break-words">
              {summary}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
              <Sparkles className="w-8 md:w-12 h-8 md:h-12 mb-2 md:mb-3" />
              <p className="text-xs md:text-sm text-center">Hasil rangkuman akan muncul di sini</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}