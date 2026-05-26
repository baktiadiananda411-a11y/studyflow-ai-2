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
    <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 h-[calc(100vh-6rem)]">
      
      {/* Kolom Kiri: Input Teks (Tanpa Garis) */}
      <div className="flex-1 flex flex-col bg-slate-900 p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 text-slate-100">
          <BookOpen className="text-indigo-500" />
          Rangkuman Materi
        </h1>
        <p className="text-slate-400 text-sm mb-4">
          Paste artikel, materi pelajaran, atau teks panjang ke sini. AI akan merangkum poin-poin pentingnya untukmu.
        </p>
        
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste teks panjangmu di sini..."
          className="flex-1 w-full bg-slate-950 text-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none shadow-inner mb-4"
        />
        
        <button
          onClick={handleSummarize}
          disabled={isLoading || !inputText.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-900/20"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          {isLoading ? "Sedang Merangkum..." : "Rangkum Sekarang"}
        </button>
      </div>

      {/* Kolom Kanan: Hasil Rangkuman (Tanpa Garis) */}
      <div className="flex-1 flex flex-col bg-slate-900 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-slate-100 pb-2">
          Hasil Rangkuman
        </h2>
        <div className="flex-1 overflow-y-auto bg-slate-950/50 rounded-xl p-6 prose prose-invert prose-indigo max-w-none">
          {summary ? (
            <div className="whitespace-pre-wrap text-slate-300 leading-relaxed">
              {summary}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
              <Sparkles className="w-12 h-12 mb-3" />
              <p>Hasil rangkuman akan muncul di sini</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}