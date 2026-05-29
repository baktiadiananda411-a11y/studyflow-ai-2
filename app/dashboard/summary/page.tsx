// @ts-nocheck
"use client";

import { useState } from "react";
import { FileText, Sparkles, Copy, Check, AlignLeft, ArrowRight } from "lucide-react";

export default function SummaryPage() {
  const [inputText, setInputText] = useState("");
  const [summaryResult, setSummaryResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Simulasi proses merangkum (Nanti kita ganti dengan API Gemini)
  const handleSummarize = () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setSummaryResult(null);

    // Simulasi loading 2.5 detik
    setTimeout(() => {
      setSummaryResult(
        "**Ringkasan Materi:**\n\n• Teks yang kamu masukkan sedang disimulasikan oleh sistem.\n• Nanti di sini akan muncul poin-poin penting dari artikel atau materi pelajaranmu.\n• Fitur ini akan membuang kalimat bertele-tele dan mengambil inti utamanya saja.\n\n*Catatan: Ini masih mode simulasi tampilan UI.*"
      );
      setIsLoading(false);
    }, 2500);
  };

  const handleCopy = () => {
    if (summaryResult) {
      navigator.clipboard.writeText(summaryResult);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-950 p-6 md:p-8 overflow-y-auto relative">
      
      {/* HEADER */}
      <div className="mb-8 flex items-center gap-4 relative z-10">
        <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20 shadow-lg">
          <AlignLeft className="w-7 h-7 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">AI Summarizer</h1>
          <p className="text-slate-400 mt-1">Paste teks panjangmu di sini, biar AI yang merangkum inti poinnya.</p>
        </div>
      </div>

      {/* GRID KIRI (INPUT) & KANAN (HASIL) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 h-full min-h-[550px] relative z-10">
        
        {/* KOLOM KIRI: INPUT TEKS */}
        <div className="flex flex-col h-full bg-slate-900/60 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" /> Teks Asli
            </h3>
            <span className="text-xs font-medium text-slate-500 bg-slate-800 px-3 py-1 rounded-full">
              {inputText.length} Karakter
            </span>
          </div>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste materi sejarah, artikel, cerita, atau teks apa saja yang panjang di sini..."
            className="flex-1 w-full bg-transparent border-none outline-none text-slate-300 placeholder-slate-600 resize-none text-base leading-relaxed"
          ></textarea>

          <div className="mt-4 pt-4 border-t border-slate-800">
            <button
              onClick={handleSummarize}
              disabled={!inputText.trim() || isLoading}
              className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-medium transition-all ${
                !inputText.trim() || isLoading
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5"
              }`}
            >
              {isLoading ? (
                <><Sparkles className="w-5 h-5 animate-spin" /> Menganalisis Teks...</>
              ) : (
                <>Rangkum Sekarang <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </div>
        </div>

        {/* KOLOM KANAN: HASIL RANGKUMAN */}
        <div className="flex flex-col h-full bg-slate-900/60 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" /> Hasil Rangkuman
            </h3>
            
            {/* Tombol Copy (Hanya muncul jika ada hasil) */}
            {summaryResult && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors"
              >
                {isCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {isCopied ? "Tersalin!" : "Copy Teks"}
              </button>
            )}
          </div>
          
          <div className="flex-1 w-full bg-slate-950/50 rounded-2xl border border-slate-800/80 p-5 overflow-y-auto">
            {isLoading ? (
              // Animasi Loading
              <div className="h-full flex flex-col items-center justify-center text-indigo-400 space-y-4">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <p className="font-medium animate-pulse">Menyaring informasi penting...</p>
              </div>
            ) : summaryResult ? (
              // Menampilkan Hasil
              <div className="text-slate-200 whitespace-pre-wrap leading-relaxed text-base">
                {summaryResult}
              </div>
            ) : (
              // State Awal (Kosong)
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center">
                <AlignLeft className="w-16 h-16 mb-4 opacity-30" />
                <p>Hasil rangkumanmu akan muncul di sini.<br/>Tulisan panjang akan disulap jadi poin-poin padat!</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}