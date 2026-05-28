// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import { auth } from "@/lib/firebase/config"; 
import { onAuthStateChanged } from "firebase/auth";
import { Sparkles, ArrowRight, Bot } from "lucide-react";
import MathRenderer from "@/components/MathRenderer"; 

export default function DashboardPage() {
  const [userName, setUserName] = useState("Pelajar");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
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

  const handleSendChat = async (e: any) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;
    
    const userText = chatInput;
    
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setChatInput(""); 
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();

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
    // min-h-[calc(100vh-76px)] untuk memastikan tingginya mentok sampai bawah layar (dikurangi tinggi header HP)
    <div className="flex flex-col min-h-[calc(100vh-76px)] md:min-h-screen w-full bg-slate-950 relative">
      
      {/* DEKORASI CAHAYA (Di-fix posisinya agar tidak ikut scroll) */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* 1. AREA PESAN (Flex-1 akan otomatis mengisi ruang kosong dan mendorong input ke bawah) */}
      <div className="flex-1 w-full px-4 py-6 md:px-8 z-10 flex flex-col">
        <div className="max-w-3xl mx-auto w-full flex flex-col justify-end min-h-full">
          
          {messages.length === 0 ? (
            // TAMPILAN AWAL (Tengah Layar)
            <div className="m-auto flex flex-col items-center text-center py-20">
              <div className="w-16 h-16 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
                <Sparkles className="w-8 h-8 text-indigo-400" />
              </div>
              <h1 className="text-3xl md:text-5xl font-medium text-white mb-10 tracking-tight">
                Halo, <span className="text-indigo-400 font-semibold">{userName}</span>.<br />
                Apa yang ingin kamu pelajari?
              </h1>
              
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <button onClick={() => setChatInput("Jelaskan rumus Matriks")} className="px-5 py-2.5 bg-slate-900/80 border border-slate-800 rounded-full text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
                  Rumus Matriks
                </button>
                <button onClick={() => setChatInput("Bantu kerjakan tugas Kalkulus ini")} className="px-5 py-2.5 bg-slate-900/80 border border-slate-800 rounded-full text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
                  Tugas Kalkulus
                </button>
              </div>
            </div>
          ) : (
            // TAMPILAN MODE CHAT
            <div className="space-y-6 pb-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex w-full gap-3 md:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  
                  {/* Ikon Profil AI */}
                  {msg.role === "ai" && (
                    <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-slate-900 border border-slate-700">
                      <Bot className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />
                    </div>
                  )}

                  {/* Balon Pesan: Lebar maksimal menyesuaikan teks */}
                  <div className={`p-4 rounded-[1.5rem] text-sm md:text-base break-words w-fit max-w-[85%] md:max-w-[80%] ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-transparent text-slate-200'}`}>
                    {msg.role === "user" ? (
                      msg.content
                    ) : (
                      <div className="overflow-x-auto text-slate-300">
                        <MathRenderer content={msg.content} />
                      </div>
                    )}
                  </div>

                </div>
              ))}

              {/* Indikator Loading */}
              {isLoading && (
                <div className="flex w-full gap-3 md:gap-4 justify-start mt-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-slate-900 border border-slate-700">
                    <Bot className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />
                  </div>
                  <div className="py-4 text-sm text-slate-500 font-medium animate-pulse">
                    Sedang berpikir...
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>
      </div>

      {/* 2. AREA INPUT (Menggunakan sticky bottom-0 ala ChatGPT) */}
      <div className="sticky bottom-0 w-full bg-slate-950 pt-2 pb-6 px-4 md:px-8 z-20">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSendChat} className="relative group">
            {/* Input Bar Bergaya Elegan */}
            <div className="relative flex items-center bg-slate-800/80 rounded-[2rem] border border-slate-700/50 p-2 shadow-xl focus-within:bg-slate-800 transition-colors">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={isLoading}
                placeholder={isLoading ? 'Tunggu sebentar...' : 'Tanya apa saja...'} 
                className="flex-1 bg-transparent border-none text-white px-5 py-3 outline-none text-base placeholder:text-slate-400 disabled:opacity-50"
              />
              <button 
                type="submit" 
                className={`w-10 h-10 rounded-full transition-all flex items-center justify-center shrink-0 ${chatInput.trim() && !isLoading ? 'bg-white text-slate-900 hover:bg-slate-200' : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'}`}
                disabled={!chatInput.trim() || isLoading}
              >
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>
          </form>
          <p className="text-center text-[11px] text-slate-500 mt-3 hidden md:block">
            AI dapat membuat kesalahan. Harap periksa kembali informasi penting.
          </p>
        </div>
      </div>

    </div>
  );
}