// @ts-nocheck
"use client";

import { useState } from "react";
import { Sparkles, Send, Mic, Bot, User } from "lucide-react";
// Menggunakan jalur import manual agar Vercel kamu tidak error
import MathRenderer from "../../../components/MathRenderer"; 

export default function AITutorPage() {
  // State untuk menyimpan daftar chat
  const [messages, setMessages] = useState([
    { 
      role: "ai", 
      content: "Halo Bakti! 👋 Aku AI Tutor. Coba tanyakan soal matematika, nanti aku jawab pakai rumus yang rapi!" 
    }
  ]);
  
  // State untuk menyimpan teks yang sedang diketik
  const [inputValue, setInputValue] = useState("");

  // Fungsi saat tombol kirim ditekan
  const handleSend = () => {
    if (!inputValue.trim()) return; // Jangan kirim kalau kosong

    // 1. Munculkan pesan dari User (Bakti)
    const newMessages = [...messages, { role: "user", content: inputValue }];
    setMessages(newMessages);
    setInputValue(""); // Kosongkan kolom ketik

    // 2. Simulasi AI sedang "berpikir" lalu membalas (setelah jeda 1 detik)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { 
          role: "ai", 
          content: "Ini contoh simulasi jawaban dengan rumus ya:\n\n$$P = \\frac{C(8, 2)}{C(15, 2)} = \\frac{28}{105} = \\frac{4}{15}$$\n\nNanti kalau sudah disambung ke AI sungguhan, jawabannya akan menyesuaikan pertanyaanmu!" 
        }
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 p-6 flex flex-col relative overflow-hidden">
      
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">AI Tutor</h1>
          <p className="text-sm text-slate-400">Tanyakan soal matematika, fisika, atau apapun.</p>
        </div>
      </div>

      {/* CHAT AREA (Sekarang dinamis sesuai data state) */}
      <div className="flex-1 bg-slate-900/50 border border-slate-800/60 rounded-[2rem] p-6 mb-6 overflow-y-auto flex flex-col gap-6 relative z-10">
        
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex gap-4 max-w-[90%] md:max-w-[80%] ${msg.role === "user" ? "self-end flex-row-reverse" : "self-start"}`}
          >
            {/* Ikon Profil */}
            <div className={`w-10 h-10 rounded-full flex shrink-0 items-center justify-center ${msg.role === "user" ? "bg-slate-700" : "bg-slate-800 border border-slate-700"}`}>
              {msg.role === "user" ? <User className="w-5 h-5 text-slate-300" /> : <Bot className="w-5 h-5 text-blue-400" />}
            </div>

            {/* Bubble Chat */}
            <div className={`p-5 shadow-md ${
              msg.role === "user" 
                ? "bg-blue-600 text-white rounded-2xl rounded-tr-sm" 
                : "bg-slate-800 border border-slate-700/50 rounded-2xl rounded-tl-sm"
            }`}>
              {msg.role === "user" ? (
                // Teks biasa untuk user
                <p className="text-sm">{msg.content}</p>
              ) : (
                // Mesin rumus khusus untuk AI
                <MathRenderer content={msg.content} />
              )}
            </div>
          </div>
        ))}

      </div>

      {/* INPUT AREA (Sekarang bisa diketik!) */}
      <div className="bg-[#151515]/80 backdrop-blur-md shadow-2xl rounded-[1.75rem] p-2 border border-slate-800/80 relative z-10">
        <div className="flex items-center gap-3 bg-slate-900/50 rounded-2xl p-2 pl-5 pr-2 border border-transparent focus-within:border-slate-700 transition-all">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder='Ketik soalmu di sini lalu tekan Enter...'
            className="flex-1 bg-transparent outline-none text-sm text-slate-200 placeholder-slate-500"
          />
          <div className="flex items-center gap-1">
            <button className="p-2.5 text-slate-400 hover:text-slate-200 transition-colors">
              <Mic className="w-4 h-4" />
            </button>
            <button 
              onClick={handleSend}
              className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}