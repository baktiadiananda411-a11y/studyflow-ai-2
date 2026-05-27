// @ts-nocheck
"use client";

import { useState } from "react";
import { Sparkles, Send, Mic, Bot, User } from "lucide-react";
import MathRenderer from "../../../components/MathRenderer"; 

export default function AITutorPage() {
  const [messages, setMessages] = useState([
    { 
      role: "ai", 
      content: "Halo! 👋 Aku AI Tutor universal untuk StudyFlow. Tanyakan materi apa saja (matematika, coding, sejarah, dll), aku siap membantu dengan rumus yang rapi!" 
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State baru untuk efek loading

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    // 1. Tampilkan pesan ketikan user ke layar
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInputValue("");
    setIsLoading(true);

    try {
      // 2. Kirim pesan ke API Route /api/chat yang kita buat tadi
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (data.text) {
        // 3. Tampilkan jawaban asli dari Gemini ke layar chat
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
    <div className="min-h-screen w-full bg-slate-950 p-6 flex flex-col relative overflow-hidden">
      
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">AI Tutor Universal</h1>
          <p className="text-sm text-slate-400">Tanyakan apa saja, mulai dari matematika hingga pengetahuan umum.</p>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 bg-slate-900/50 border border-slate-800/60 rounded-[2rem] p-6 mb-6 overflow-y-auto flex flex-col gap-6 relative z-10">
        
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex gap-4 max-w-[90%] md:max-w-[80%] ${msg.role === "user" ? "self-end flex-row-reverse" : "self-start"}`}
          >
            <div className={`w-10 h-10 rounded-full flex shrink-0 items-center justify-center ${msg.role === "user" ? "bg-slate-700" : "bg-slate-800 border border-slate-700"}`}>
              {msg.role === "user" ? <User className="w-5 h-5 text-slate-300" /> : <Bot className="w-5 h-5 text-blue-400" />}
            </div>

            <div className={`p-5 shadow-md ${
              msg.role === "user" 
                ? "bg-blue-600 text-white rounded-2xl rounded-tr-sm" 
                : "bg-slate-800 border border-slate-700/50 rounded-2xl rounded-tl-sm"
            }`}>
              {msg.role === "user" ? (
                <p className="text-sm">{msg.content}</p>
              ) : (
                <MathRenderer content={msg.content} />
              )}
            </div>
          </div>
        ))}

        {/* Indikator Loading saat AI sedang mengetik */}
        {isLoading && (
          <div className="flex gap-4 self-start animate-pulse">
            <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-blue-400" />
            </div>
            <div className="bg-slate-800 border border-slate-700/50 p-4 rounded-2xl rounded-tl-sm text-sm text-slate-400">
              AI sedang berpikir dan merapikan rumus...
            </div>
          </div>
        )}

      </div>

      {/* INPUT AREA */}
      <div className="bg-[#151515]/80 backdrop-blur-md shadow-2xl rounded-[1.75rem] p-2 border border-slate-800/80 relative z-10">
        <div className="flex items-center gap-3 bg-slate-900/50 rounded-2xl p-2 pl-5 pr-2 border border-transparent focus-within:border-slate-700 transition-all">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
            placeholder={isLoading ? 'Tunggu sebentar...' : 'Ketik soal atau pertanyaanmu di sini...'}
            className="flex-1 bg-transparent outline-none text-sm text-slate-200 placeholder-slate-500 disabled:opacity-50"
          />
          <div className="flex items-center gap-1">
            <button className="p-2.5 text-slate-400 hover:text-slate-200 transition-colors" disabled={isLoading}>
              <Mic className="w-4 h-4" />
            </button>
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}