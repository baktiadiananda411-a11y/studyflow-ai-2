// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import { auth } from "@/lib/firebase/config"; 
import { onAuthStateChanged } from "firebase/auth";
import { Sparkles, ArrowRight, Bot } from "lucide-react";
// Pastikan import MathRenderer ini jalurnya (path) sudah sesuai dengan lokasi filemu!
import MathRenderer from "../../../components/MathRenderer"; 

export default function DashboardPage() {
  const [userName, setUserName] = useState("Pelajar");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State untuk efek loading
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName) {
        setUserName(user.displayName.split(" ")[0]);
      } else {
        setUserName("Pelajar");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // FUNGSI CHAT ASLI (Diambil dari AI Tutor-mu)
  const handleSendChat = async (e: any) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;
    
    const userText = chatInput;
    
    // 1. Tampilkan pesan User
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setChatInput(""); 
    setIsLoading(true);

    try {
      // 2. Panggil API AI Tutor-mu
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();

      // 3. Tampilkan jawaban asli dari Gemini ke layar chat
      if (data.text) {
        setMessages((prev) => [...prev, { role: "ai", content: data.text }]);
      } else {
        setMessages((prev) => [...prev, { role: "ai", content: "Maaf, ada kendala saat memproses jawaban." }]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "ai", content: "Koneksi ke server AI terputus." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-950 relative overflow-hidden">
      
      {/* DEKORASI CAHAYA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* AREA PESAN */}
      <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto px-4 py-8 md:px-8 z-10 flex flex-col">
        
        {messages.length === 0 ? (
          // TAMPILAN AWAL (Tengah layar)
          <div className="m-auto flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
              <Sparkles className="w-8 h-8 text-indigo-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-medium text-white mb-10 tracking-tight">
              Halo, <span className="text-indigo-400 font-semibold">{userName}</span>.<br />
              Apa yang ingin kamu pelajari hari ini?
            </h1>
            
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <button onClick={() => setChatInput("Jelaskan rumus Matriks")} className="px-4 py-2 bg-slate-900/60 border border-slate-800 rounded-full text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                Rumus Matriks
              </button>
              <button onClick={() => setChatInput("Bantu kerjakan tugas Kalkulus ini")} className="px-4 py-2 bg-slate-900/60 border border-slate-800 rounded-full text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                Tugas Kalkulus
              </button>
            </div>
          </div>
        ) : (
          // TAMPILAN MODE CHAT
          <div className="space-y-6 pb-4 mt-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-4 max-w-[90%] md:max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                
                {/* Ikon Profil HANYA untuk AI */}
                {msg.role === "ai" && (
                  <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-slate-800 border border-slate-700">
                    <Bot className="w-6 h-6 text-indigo-400" />
                  </div>
                )}

                {/* Balon Pesan (Menggunakan MathRenderer untuk AI) */}
                <div className={`p-4 rounded-2xl text-sm md:text-base leading-relaxed ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-800/80 border border-slate-700/50 text-slate-200 rounded-bl-none overflow-x-auto'}`}>
                  {msg.role === "user" ? (
                    msg.content
                  ) : (
                    // Memanggil MathRenderer untuk balasan AI agar rumus matematika rapi
                    <MathRenderer content={msg.content} />
                  )}
                </div>

              </div>
            ))}

            {/* Indikator Loading */}
            {isLoading && (
              <div className="flex gap-4 self-start animate-pulse max-w-[85%]">
                <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-slate-800 border border-slate-700">
                  <Bot className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="p-4 rounded-2xl text-sm bg-slate-800/80 border border-slate-700/50 text-slate-400 rounded-bl-none">
                  AI sedang berpikir...
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* AREA INPUT */}
      <div className="shrink-0 w-full max-w-3xl mx-auto p-4 md:pb-8 z-20 bg-slate-950">
        <form onSubmit={handleSendChat} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-700"></div>
          
          <div className="relative flex items-center bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-700/50 p-2 shadow-2xl">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              disabled={isLoading}
              placeholder={isLoading ? 'Tunggu sebentar...' : 'Tanya soal matematika, sejarah, atau materi lainnya...'} 
              className="flex-1 bg-transparent border-none text-white px-6 py-4 outline-none text-base md:text-lg placeholder:text-slate-500 disabled:opacity-50"
            />
            <button 
              type="submit" 
              className={`p-4 rounded-2xl transition-all flex items-center justify-center ${chatInput.trim() && !isLoading ? 'bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-105' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
              disabled={!chatInput.trim() || isLoading}
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </form>
        <p className="text-center text-xs text-slate-500 mt-3 hidden md:block">
          AI dapat membuat kesalahan. Harap periksa kembali informasi penting.
        </p>
      </div>

    </div>
  );
}