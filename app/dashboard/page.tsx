// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase/config"; 
import { onAuthStateChanged } from "firebase/auth";
import { Sparkles, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const [userName, setUserName] = useState("Pelajar");
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName) {
        const firstName = user.displayName.split(" ")[0]; 
        setUserName(firstName);
      } else {
        setUserName("Pelajar");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSendChat = (e: any) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    console.log("Mengirim:", chatInput);
    alert(`Pertanyaan dikirim: ${chatInput}\n(Sistem AI sedang diintegrasikan)`);
    setChatInput("");
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* DEKORASI CAHAYA (Aura AI di tengah) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* KONTEN UTAMA DI TENGAH LAYAR */}
      <div className="w-full max-w-3xl flex flex-col items-center text-center relative z-10 -mt-20">
        
        {/* Ikon Sparkles */}
        <div className="w-16 h-16 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
          <Sparkles className="w-8 h-8 text-indigo-400" />
        </div>

        {/* Teks Sapaan */}
        <h1 className="text-3xl md:text-5xl font-medium text-white mb-10 tracking-tight">
          Halo, <span className="text-indigo-400 font-semibold">{userName}</span>.<br />
          Apa yang ingin kamu pelajari hari ini?
        </h1>

        {/* Kotak Input Raksasa */}
        <form onSubmit={handleSendChat} className="w-full relative group">
          {/* Efek Glow pada Kotak Input */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-700"></div>
          
          <div className="relative flex items-center bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-700/50 p-2 shadow-2xl">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Tanya soal, ringkas materi, atau minta ide tugas..." 
              className="flex-1 bg-transparent border-none text-white px-6 py-4 outline-none text-base md:text-lg placeholder:text-slate-500"
            />
            <button 
              type="submit" 
              className={`p-4 rounded-2xl transition-all flex items-center justify-center ${chatInput.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-105' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
              disabled={!chatInput.trim()}
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </form>

        {/* Saran Pertanyaan Cepat (Opsional, biar tidak terlalu kosong) */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <button onClick={() => setChatInput("Jelaskan konsep matriks dalam matematika")} className="px-4 py-2 bg-slate-900/60 border border-slate-800 rounded-full text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            Jelaskan konsep matriks
          </button>
          <button onClick={() => setChatInput("Bantu saya membuat kerangka esai sejarah")} className="px-4 py-2 bg-slate-900/60 border border-slate-800 rounded-full text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            Ide esai sejarah
          </button>
        </div>

      </div>
    </div>
  );
}