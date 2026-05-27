// @ts-nocheck
import { 
  Layers, 
  Slack, 
  Calendar, 
  Mic, 
  Send, 
  Search, 
  Image as ImageIcon, 
  Sparkles, 
  Plus, 
  MoreHorizontal 
} from "lucide-react";

export default function DashboardPage() {
  const subjectCards = [
    {
      title: "Kalkulus Lanjut",
      desc: "Selesaikan modul integral, tonton video pembahasan, dan kerjakan kuis hari ini.",
      icon: Layers,
      color: "bg-orange-500/10",
      iconColor: "text-orange-500",
      footer: "Tenggat: Besok"
    },
    {
      title: "Produk Kreatif",
      desc: "Lengkapi proposal ide bisnis, buat presentasi, dan siap-siap pitching bisnis plan.",
      icon: Slack,
      color: "bg-blue-500/10",
      iconColor: "text-blue-500",
      footer: "Progres: 78%"
    },
    {
      title: "Bahasa Jawa",
      desc: "Review ulang kosa kata krama inggil dan pelajari geguritan terbaru untuk ujian.",
      icon: Calendar,
      color: "bg-green-500/10",
      iconColor: "text-green-500",
      footer: "Status: Santai"
    }
  ];

  return (
    // bg-transparent agar mengikuti warna gelap dari layout utama (bg-slate-950)
    <div className="min-h-screen w-full bg-transparent p-6 md:p-10 lg:p-14 flex flex-col relative overflow-x-hidden">
      
      {/* DECORATION GRADIENT (Pencahayaan bias halus) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

      {/* TOP NAVIGATION / HEADER */}
      <div className="flex justify-between items-center mb-16">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold tracking-widest uppercase">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>StudyFlow Assistant v2.6</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <span className="hover:text-white cursor-pointer transition-colors">Daily Nivtio</span>
          <button className="flex items-center gap-2 bg-white text-slate-950 px-5 py-2 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-all">
            <Plus className="w-4 h-4" strokeWidth={3} />
            Upgrade
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="max-w-4xl mb-16 relative">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.1]">
          Halo Bakti, Siap <br />
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">
            Mencapai Target Besar?
          </span>
        </h1>

        {/* AI CHAT BUBBLE (Animated) */}
        <div className="absolute -top-12 right-0 md:right-10 lg:-right-10 hidden sm:flex flex-col items-center group">
          <div className="bg-slate-800 shadow-xl border border-slate-700 rounded-2xl px-5 py-3 mb-3 text-[13px] font-semibold text-slate-300 relative transform group-hover:-translate-y-1 transition-transform">
            Hei Bakti! 👋 <br /> Butuh bantuan belajar?
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 border-r border-b border-slate-700 rotate-45"></div>
          </div>
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-3xl shadow-inner border-2 border-slate-700">
            🤖
          </div>
        </div>
      </div>

      {/* SUBJECT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-auto">
        {subjectCards.map((card, index) => (
          <div 
            key={index} 
            className="group bg-slate-900/50 p-8 md:p-10 rounded-[2.5rem] border border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 transition-all duration-500 flex flex-col"
          >
            <div className="flex justify-between items-start mb-8">
              <div className={`w-14 h-14 ${card.color} rounded-[1.2rem] flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-500`}>
                <card.icon className={`w-7 h-7 ${card.iconColor}`} strokeWidth={1.5} />
              </div>
              <button className="text-slate-500 hover:text-white transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
            <p className="text-slate-400 text-[15px] leading-relaxed mb-10">
              {card.desc}
            </p>

            <div className="mt-auto flex items-center justify-between">
              <span className="text-[13px] font-bold text-slate-500 uppercase tracking-widest">{card.footer}</span>
              <div className="w-8 h-8 rounded-full border-2 border-slate-700 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-slate-900 group-hover:border-white transition-all duration-300 cursor-pointer">
                <Plus className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FLOATING AI PROMPT INPUT (Paling Bawah) */}
      <div className="mt-16 w-full max-w-4xl mx-auto">
        <div className="bg-slate-900 shadow-2xl rounded-[2rem] p-3 border border-slate-800">
          
          <div className="flex items-center gap-2 px-5 py-2 mb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-[11px] font-black text-slate-500 tracking-[0.2em] uppercase">
              <Sparkles className="w-3 h-3 text-blue-500" />
              Powered by StudyFlow AI
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/50 rounded-[1.5rem] p-3 pl-6 pr-3 border border-transparent focus-within:border-slate-700 focus-within:bg-slate-950 transition-all">
            <span className="text-slate-500 text-xl font-light">+</span>
            <input 
              type="text" 
              placeholder='Contoh: "Ringkaskan konsep limit dalam kalkulus..."'
              className="flex-1 bg-transparent outline-none text-[15px] text-slate-200 placeholder-slate-500 font-medium"
            />
            <div className="flex items-center gap-1.5">
              <button className="p-2.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-xl transition-all">
                <Mic className="w-5 h-5" />
              </button>
              <button className="bg-blue-600 text-white p-3 rounded-2xl hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* QUICK ACTION CHIPS */}
          <div className="flex flex-wrap items-center gap-3 mt-4 px-3 pb-2">
            <button className="group flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl text-[12px] font-bold text-slate-400 hover:bg-blue-500/20 hover:text-blue-400 transition-all">
              <Search className="w-3.5 h-3.5" /> Deep Research
            </button>
            <button className="group flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl text-[12px] font-bold text-slate-400 hover:bg-purple-500/20 hover:text-purple-400 transition-all">
              <ImageIcon className="w-3.5 h-3.5" /> Make an Image
            </button>
            <button className="group flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl text-[12px] font-bold text-slate-400 hover:bg-orange-500/20 hover:text-orange-400 transition-all">
              <Search className="w-3.5 h-3.5" /> Search
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}