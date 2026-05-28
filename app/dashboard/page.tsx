// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import { auth } from "@/lib/firebase/config"; 
import { onAuthStateChanged } from "firebase/auth";
import { Sparkles, ArrowRight, Bot, User as UserIcon } from "lucide-react";

export default function DashboardPage() {
  const [userName, setUserName] = useState("Pelajar");
  const [userPhoto, setUserPhoto] = useState(null);
  
  // State untuk menyimpan teks input dan daftar percakapan
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  
  // Referensi untuk fitur auto-scroll ke bawah saat ada pesan baru
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName) {
        setUserName(user.displayName.split(" ")[0]);
        setUserPhoto(user.photoURL);
      } else {
        setUserName("Pelajar");
        setUserPhoto(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Efek untuk scroll ke bawah otomatis setiap kali array 'messages' bertambah
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendChat = (e: any) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // 1. Masukkan pesan dari kamu (User) ke layar
    const newUserMessage = { role: "user", content: chatInput };
    setMessages((prev) => [...prev, newUserMessage]);
    setChatInput(""); // Kosongkan kolom input

    // 2. Simulasi balasan dari AI (Nanti kita ganti dengan API asli)
    setTimeout(() => {
      const aiResponse = { 
        role: "ai", 
        content: "Halo! Ini adalah balasan simulasi dari StudyFlow AI. Nanti kita akan hubungkan aku dengan 'otak' aslinya (API) agar bisa menjawab pertanyaan sekolahmu beneran!" 
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000); // Jeda 1 detik seolah-olah AI sedang berpikir
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 relative overflow-hidden">
      
      {/* DEKORASI CAHAYA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* AREA KONTEN (Menyesuaikan apakah ada pesan atau masih kosong) */}
      <div className={`flex-1 w-full max-w-4xl mx-auto flex flex-col relative z-10 transition-all duration-500 ${messages.length === 0 ? 'justify-center p-6' : 'justify-start pt-6 pb-32 px-4 md:px-8 overflow-y-auto'}`}>
        
        {/* TAMPILAN AWAL (Jika belum ada percakapan) */}
        {messages.length === 0 ? (
          <div className="flex flex-col items-center text-center -mt-20">
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
          
          /* TAMPILAN MODE CHAT (Jika sudah ada pesan) */
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                
                {/* Avatar */}
                <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-slate-800 border border-slate-700">
                  {msg.role === "user" ? (
                    userPhoto ? <img src={userPhoto} alt="User" className="w-full h-full object-cover" /> : <UserIcon className="w-6 h-6 text-slate-400" />
                  ) : (
                    <Bot className="w-6 h-6 text-indigo-400" />
                  )}
                </div>

                {/* Balon Pesan */}
                <div className={`p-4 rounded-2xl text-sm md:text-base leading-relaxed ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800/80 border border-slate-700/50 text-slate-200 rounded-tl-none'}`}>
                  {msg.content}
                </div>

              </div>
            ))}
            {/* Jangkar untuk auto-scroll */}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* KOTAK INPUT CHAT (Sticky di bawah) */}
      <div className={`w-full absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent pt-10 pb-6 px-4 z-20 flex justify-center transition-all duration-500 ${messages.length === 0 ? 'relative pb-0 bg-none pt-0' : ''}`}>
        <div className="w-full max-w-3xl">
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
          
          <p className="text-center text-xs text-slate-500 mt-4 hidden md:block">
            AI dapat membuat kesalahan. Harap periksa kembali informasi penting.
          </p>
        </div>
      </div>

    </div>
  );
}