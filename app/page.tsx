// @ts-nocheck
"use client";

import Link from "next/link";
import { Bot, Sparkles, FileText, BrainCircuit, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
      <nav className="relative z-10 border-b border-slate-800/70 bg-slate-950/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/20">
              <BrainCircuit className="text-white w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-white">StudyFlow AI</h1>
              <p className="text-xs text-slate-500 md:text-sm">Platform pembelajaran AI yang modern.</p>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:opacity-95"
          >
            Masuk / Login
          </Link>
        </div>
      </nav>

      <main className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-indigo-600/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 pt-12 md:pt-20 pb-20 md:pb-28 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-300 text-xs md:text-sm font-semibold mb-6 md:mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Asisten Belajar Cerdas Generasi Baru</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Belajar lebih cerdas,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300"> bukan lebih keras</span>.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-sm md:text-lg text-slate-400 leading-relaxed">
              Tingkatkan produktivitas belajarmu dengan AI. Rangkum materi panjang dalam hitungan detik, diskusikan tugas dengan tutor cerdas, dan simpan catatanmu dengan aman.
            </p>
            <Link
              href="/dashboard"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-sm md:text-base font-semibold text-white shadow-xl shadow-indigo-500/30 transition hover:shadow-2xl hover:-translate-y-0.5"
            >
              Mulai Sekarang Gratis
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            <div className="rounded-[28px] border border-slate-800/80 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-lg transition hover:-translate-y-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-500/10 mb-5">
                <Bot className="w-6 h-6 text-indigo-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Tutor AI 24/7</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Punya PR rumit atau materi yang sulit dipahami? Tanyakan langsung pada asisten AI yang siap membantu kapan saja.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-800/80 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-lg transition hover:-translate-y-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-purple-500/10 mb-5">
                <Sparkles className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Magic Summarizer</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Ubah materi panjang menjadi poin ringkas yang jelas, padat, dan mudah diingat.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-800/80 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-lg transition hover:-translate-y-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-500/10 mb-5">
                <FileText className="w-6 h-6 text-sky-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Catatan Cloud</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Tulis dan simpan catatan belajarmu secara otomatis, aman, dan dapat diakses kapan saja.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800/70 py-8 text-center text-slate-500 text-xs md:text-sm">
        <p>© {new Date().getFullYear()} StudyFlow AI. Dibangun dengan penuh semangat.</p>
      </footer>
    </div>
  );
}