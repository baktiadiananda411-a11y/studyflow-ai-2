import Link from "next/link";
import { Bot, Sparkles, FileText, BrainCircuit, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      
      {/* Navbar / Header */}
      <nav className="container mx-auto px-4 md:px-6 py-4 md:py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 md:w-10 h-8 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <BrainCircuit className="text-white w-5 md:w-6 h-5 md:h-6" />
          </div>
          <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200 truncate">
            StudyFlow AI
          </span>
        </div>
        <div>
          <Link 
            href="/dashboard" 
            className="px-4 md:px-6 py-2 md:py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-xs md:text-sm font-medium transition-all shadow-xl"
          >
            Masuk / Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 md:px-6 pt-12 md:pt-20 pb-20 md:pb-32 flex flex-col items-center text-center relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-96 lg:w-[600px] h-64 md:h-96 lg:h-[600px] bg-indigo-600/20 rounded-full blur-[80px] md:blur-[100px] lg:blur-[120px] -z-10 pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-xs md:text-sm font-medium mb-6 md:mb-8 animate-fade-in-up">
          <Sparkles className="w-3 md:w-4 h-3 md:h-4" />
          <span>Asisten Belajar Cerdas Generasi Baru</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 max-w-4xl leading-tight">
          Belajar Lebih Cerdas, <br className="hidden md:block" />
          Bukan Lebih Keras.
        </h1>
        
        <p className="text-sm md:text-lg lg:text-xl text-slate-400 mb-6 md:mb-10 max-w-2xl leading-relaxed px-2">
          Tingkatkan produktivitas belajarmu dengan AI. Rangkum materi panjang dalam hitungan detik, diskusikan tugas dengan tutor cerdas, dan simpan catatanmu dengan aman.
        </p>
        
        <Link 
          href="/dashboard"
          className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-white font-bold text-sm md:text-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all hover:-translate-y-1 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2 justify-center">
            Mulai Sekarang Gratis
            <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </Link>
      </main>

      {/* Features Section */}
      <section className="bg-slate-950 relative z-10 pb-16 md:pb-32">
        <div className="container mx-auto px-4 md:px-6 -mt-8 md:-mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            
            <div className="bg-slate-900/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl md:rounded-3xl transition-colors group">
              <div className="w-12 md:w-14 h-12 md:h-14 bg-indigo-500/10 rounded-lg md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-6 md:w-7 h-6 md:h-7 text-indigo-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-2 md:mb-3">Tutor AI 24/7</h3>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                Punya PR rumit atau materi yang sulit dipahami? Tanyakan langsung pada asisten AI yang siap membantu menjawab dan menjelaskan kapan saja.
              </p>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl md:rounded-3xl transition-colors group">
              <div className="w-12 md:w-14 h-12 md:h-14 bg-purple-500/10 rounded-lg md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 md:w-7 h-6 md:h-7 text-purple-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-2 md:mb-3">Magic Summarizer</h3>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                Ubah modul teks yang panjang dan membosankan menjadi poin-poin ringkasan yang padat, jelas, dan sangat mudah untuk dipelajari.
              </p>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl md:rounded-3xl transition-colors group">
              <div className="w-12 md:w-14 h-12 md:h-14 bg-blue-500/10 rounded-lg md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-6 md:w-7 h-6 md:h-7 text-blue-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-2 md:mb-3">Catatan Cloud</h3>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                Tulis dan simpan hasil belajarmu dengan aman. Tersinkronisasi ke database awan sehingga tidak akan pernah hilang.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 text-center text-slate-500 text-xs md:text-sm px-4">
        <p>© {new Date().getFullYear()} StudyFlow AI. Dibangun dengan penuh semangat.</p>
      </footer>
      
    </div>
  );
}