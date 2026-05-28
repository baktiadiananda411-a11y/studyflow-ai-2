// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import { auth } from "@/lib/firebase/config"; 
import { onAuthStateChanged } from "firebase/auth";
import { Sparkles, ArrowRight, Bot } from "lucide-react";

export default function DashboardPage() {
  const [userName, setUserName] = useState("Pelajar");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  
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

  const handleSendChat = (e: any) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // 1. Masukkan pesan dari User
    const newUserMessage = { role: "user", content: chatInput };
    setMessages((prev) => [...prev, newUserMessage]);
    setChatInput(""); 

    // Daftar balasan acak sementara
    const dummyResponses = [
      "Itu pertanyaan yang bagus! Sayangnya aku masih dalam tahap simulasi, jadi belum bisa mikir keras. 😅",
      "Hmm, coba aku ingat-ingat... Wah, memori AI-ku belum tersambung ke database utama nih!",
      "Menarik! Nanti kalau otak API-ku sudah dipasang, aku pasti bisa menjawabnya dengan mudah.",
      "Tunggu sebentar, aku sedang menganalisis... Error 404: Kepintaran AI belum di-deploy! 🤖",
      "Sabar ya, aku sedang disekolahkan. Nanti kalau sudah lulus, pertanyaan seperti ini mah gampang!"
    ];

    // 2. Simulasi balasan AI dengan jeda waktu
    setTimeout(() => {
      const randomReply = dummyResponses[Math.floor(Math.random() * dummyResponses.length)];
      
      const aiResponse = { 
        role: "ai", 
        content: randomReply
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000); 
  };

  return (
    // Struktur utama: flex-col dengan tinggi penuh, agar chat dan input terpisah rapi
    <div className="flex flex-col h-full w-full bg-slate-950 relative overflow-hidden">
      
      {/* DEKORASI CAHAYA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* 1. AREA PESAN (Bisa di-scroll, mengisi ruang kosong) */}
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
              <button onClick={() => setChatInput("Jelaskan konsep integral dengan sederhana")} className="px-4 py-2 bg-slate-900/60 border border-slate-800 rounded-full text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                Konsep Integral Kalkulus
              </button>
              <button onClick={() => setChatInput("Ide kerangka proposal kewirausahaan")} className="px-4 py-2 bg-slate-900/60 border border-slate-800 rounded-full text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                Ide Proposal Bisnis
              </button>
            </div>
          </div>
        ) : (
          // TAMPILAN MODE CHAT
          <div className="space-y-6 pb-4 mt-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                
                {/* Ikon Profil HANYA untuk AI, milik User Dihilangkan */}
                {msg.role === "ai" && (
                  <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-slate-800 border border-slate-700">
                    <Bot className="w-6 h-6 text-indigo-400" />
                  </div>
                )}

                {/* Balon Pesan */}
                <div className={`p-4 rounded-2xl text-sm md:text-base leading-relaxed ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-800/80 border border-slate-700/50 text-slate-200 rounded-bl-none'}`}>
                  {msg.content}
                </div>

              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* 2. AREA INPUT (Dikunci di paling bawah, tidak ikut scroll) */}
      <div className="shrink-0 w-full max-w-3xl mx-auto p-4 md:pb-8 z-20 bg-slate-950">
        <form onSubmit={handleSendChat} className="relative group">
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
        <p className="text-center text-xs text-slate-500 mt-3 hidden md:block">
          AI dapat membuat kesalahan. Harap periksa kembali informasi penting.
        </p>
      </div>

    </div>
  );
}