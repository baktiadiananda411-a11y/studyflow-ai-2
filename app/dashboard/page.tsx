// @ts-nocheck
"use client";

import { 
  Layers, 
  Lightbulb, 
  Calendar, 
  Sparkles, 
  Plus, 
  MoreHorizontal 
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen w-full bg-slate-950 px-6 py-8 md:px-10 md:py-12 lg:px-16 lg:py-14 flex flex-col relative overflow-hidden">
      
      {/* DEKORASI BACKGROUND */}
      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 -left-20 w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* HEADER AREA */}
      <div className="flex justify-between items-center mb-14 lg:mb-20 relative z-10">
        <div className="flex items-center gap-2.5 text-slate-400 text-xs font-bold tracking-[0.15em] uppercase">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>StudyFlow Assistant v2.6</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <span className="cursor-pointer hover:text-slate-200 transition-colors">Daily Notification</span>
          <button className="flex items-center gap-2 bg-slate-100 text-slate-900 px-5 py-2.5 rounded-full font-bold shadow-lg hover:bg-white transition-all">
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            Upgrade
          </button>
        </div>
      </div>

      {/* HERO GREETING AREA */}
      <div className="max-w-3xl mb-16 relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.15]">
          Halo Bakti, Siap <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-slate-500">
            Mencapai Target?
          </span>
        </h1>
      </div>

      {/* GRID MATA PELAJARAN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pb-12 relative z-10">
        
        {/* KARTU 1: Kalkulus */}
        <div className="bg-slate-900/40 p-7 lg:p-9 rounded-[2rem] border border-slate-800/60 hover:bg-slate-800/50 transition-all flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center">
              <Layers className="w-6 h-6 text-orange-400" strokeWidth={1.5} />
            </div>
            <MoreHorizontal className="w-5 h-5 text-slate-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mb-3">Kalkulus Lanjut</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Selesaikan modul integral dan tonton video pembahasan hari ini.
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tenggat: Besok</span>
            <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-700 transition-all cursor-pointer">
              <Plus className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* KARTU 2: Produk Kreatif */}
        <div className="bg-slate-900/40 p-7 lg:p-9 rounded-[2rem] border border-slate-800/60 hover:bg-slate-800/50 transition-all flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-blue-400" strokeWidth={1.5} />
            </div>
            <MoreHorizontal className="w-5 h-5 text-slate-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mb-3">Produk Kreatif</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Lengkapi proposal ide bisnis dan buat presentasi pitching.
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Progres: 78%</span>
            <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-700 transition-all cursor-pointer">
              <Plus className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* KARTU 3: Bahasa Jawa */}
        <div className="bg-slate-900/40 p-7 lg:p-9 rounded-[2rem] border border-slate-800/60 hover:bg-slate-800/50 transition-all flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-400" strokeWidth={1.5} />
            </div>
            <MoreHorizontal className="w-5 h-5 text-slate-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mb-3">Bahasa Jawa</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Review kosa kata krama inggil dan pelajari geguritan terbaru.
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status: Santai</span>
            <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-700 transition-all cursor-pointer">
              <Plus className="w-4 h-4" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}