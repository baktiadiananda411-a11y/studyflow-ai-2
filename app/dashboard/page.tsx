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
    // PERBAIKAN 1: Menggunakan absolute inset-0 agar layar terkunci seukuran layar HP/Laptop, tidak bisa melompat.
    <div className="absolute inset-0 flex flex-col bg-slate-950 overflow-hidden">
      
      {/* DEKORASI CAHAYA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* AREA PESAN (Bisa di-scroll) */}
      <div className="flex-1 overflow-y-auto w-full px-4 py-6 md:px-8 z-10 flex flex-col scroll-smooth">
        <div className="max-w-4xl mx-auto w-full flex flex-col min-h-full">
          
          {messages.length === 0 ? (
            // TAMPILAN AWAL
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
            // PERBAIKAN 2: Menggunakan justify-end agar pesan mulai menumpuk dari bawah secara rapi
            <div className="space-y-6 pb-4 flex flex-col justify-end min-h-full">
              {messages.map((msg, index) => (
                // PERBAIKAN 3: flex w-full dengan justify-end/start agar tidak melar seukuran layar
                <div key={index} className={`flex w-full gap-3 md:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  
                  {/* Ikon Profil AI */}
                  {msg.role === "ai" && (
                    <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-slate-800 border border-slate-700">
                      <Bot className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />
                    </div>
                  )}

                  {/* Balon Pesan: w-fit dan break-words memastikan lebar kotak menyesuaikan teks */}
                  <div className={`p-4 rounded-2xl text-sm md:text-base break-words w-fit max-w-[85%] md:max-w-[75%] shadow-md ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-none'}`}>
                    {msg.role === "user" ? (
                      msg.content
                    ) : (
                      <div className="overflow-x-auto">
                        <MathRenderer content={msg.content} />
                      </div>
                    )}
                  </div>

                </div>
              ))}

              {/* Indikator Loading */}
              {isLoading && (
                <div className="flex w-full gap-3 md:gap-4 justify-start">
                  <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-slate-800 border border-slate-700">
                    <Bot className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />
                  </div>
                  <div className="p-4 rounded-2xl text-sm bg-slate-800 border border-slate-700 text-slate-400 rounded-bl-none w-fit animate-pulse">
                    AI sedang berpikir...
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>
      </div>

      {/* AREA INPUT (Terkunci mati) */}
      <div className="shrink-0 w-full bg-slate-950 p-4 md:px-8 border-t border-slate-800/50 z-20">
        <div className="max-w-4xl mx-auto">
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

    </div>
  );
}