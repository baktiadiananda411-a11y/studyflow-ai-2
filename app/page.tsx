import Link from "next/link";
import { Bot, Sparkles, FileText, BrainCircuit, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      
      {/* Navbar / Header (Tanpa Garis) */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <BrainCircuit className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200">
            StudyFlow AI
          </span>
        </div>
        <div>
          <Link 
            href="/dashboard" 
            className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-sm font-medium transition-all shadow-xl"
          >
            Masuk / Login
          </Link>
        </div>
      </nav>

      {/* Hero Section (Tanpa Garis pada Label) */}
      <main className="container mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-8 animate-fade-in-up">
          <Sparkles className="w-4 h-4" />
          <span>Asisten Belajar Cerdas Generasi Baru</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
          Belajar Lebih Cerdas, <br className="hidden md:block" />
          Bukan Lebih Keras.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
          Tingkatkan produktivitas belajarmu dengan AI. Rangkum materi panjang dalam hitungan detik, diskusikan tugas dengan tutor cerdas, dan simpan catatanmu dengan aman.
        </p>
        
        <Link 
          href="/dashboard"
          className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-white font-bold text-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all hover:-translate-y-1 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Mulai Sekarang Gratis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </Link>
      </main>

      {/* Features Section (Tanpa Garis Kotak) */}
      <section className="bg-slate-950 relative z-10 pb-32">
        <div className="container mx-auto px-6 -mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-3xl transition-colors group">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">Tutor AI 24/7</h3>
              <p className="text-slate-400 leading-relaxed">
                Punya PR rumit atau materi yang sulit dipahami? Tanyakan langsung pada asisten AI yang siap membantu menjawab dan menjelaskan kapan saja.
              </p>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-3xl transition-colors group">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">Magic Summarizer</h3>
              <p className="text-slate-400 leading-relaxed">
                Ubah modul teks yang panjang dan membosankan menjadi poin-poin ringkasan yang padat, jelas, dan sangat mudah untuk dipelajari.
              </p>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-3xl transition-colors group">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">Catatan Cloud</h3>
              <p className="text-slate-400 leading-relaxed">
                Tulis dan simpan hasil belajarmu dengan aman. Tersinkronisasi ke database awan sehingga tidak akan pernah hilang.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer (Tanpa Garis Atas) */}
      <footer className="py-12 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} StudyFlow AI. Dibangun dengan penuh semangat.</p>
      </footer>
      
    </div>
  );
}