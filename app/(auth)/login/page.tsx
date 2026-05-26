"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BrainCircuit, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { user, loginWithGoogle } = useAuth();
  const router = useRouter();

  // Jika user sudah terdeteksi login, otomatis lempar ke halaman dashboard
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 md:p-6 relative overflow-hidden">
      
      {/* Efek Cahaya Neon di Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 bg-indigo-600/20 rounded-full blur-[100px] md:blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/3 w-48 md:w-72 h-48 md:h-72 bg-purple-600/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>

      {/* Kartu Login Glassmorphism */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl text-center z-10"
      >
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="w-10 md:w-12 h-10 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <BrainCircuit className="w-5 md:w-6 h-5 md:h-6 text-white" />
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">Selamat Datang di StudyFlow</h2>
        <p className="text-slate-400 text-xs md:text-sm mb-6 md:mb-8">Masuk untuk mengakses semua fitur AI belajarmu.</p>

        {/* Tombol Login Google */}
        <button
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-2 md:gap-3 px-4 md:px-5 py-3 md:py-3.5 rounded-lg md:rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm md:text-base shadow-md transition-all transform active:scale-[0.98]"
        >
          <Globe className="w-4 md:w-5 h-4 md:h-5 text-red-500 fill-red-500" />
          <span>Masuk dengan Google</span>
        </button>

        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-slate-800/60 text-xs text-slate-500">
          Dengan masuk, kamu menyetujui Ketentuan Layanan dan Kebijakan Privasi StudyFlow AI.
        </div>
      </motion.div>

    </div>
  );
}