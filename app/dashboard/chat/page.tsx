"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Mic, MicOff } from "lucide-react";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Halo! Aku asisten belajarmu. Ada yang ingin didiskusikan?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fungsi Voice-to-Text
  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser kamu tidak mendukung fitur suara.");

    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID';

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      recognition.onresult = (event: any) => {
        setInput(event.results[0][0].transcript);
        setIsListening(false);
      };
      recognition.onend = () => setIsListening(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput(""); 
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", content: data.reply || "Maaf, aku sedang pusing." }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", content: "Terjadi kesalahan koneksi." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-6rem)] flex flex-col bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">
      
      {/* Header */}
      <div className="bg-slate-950 p-6 flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center">
          <Bot className="w-7 h-7 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            Tutor AI <Sparkles className="w-4 h-4 text-amber-400" />
          </h1>
          <p className="text-sm text-slate-400">Selalu online untuk membantumu</p>
        </div>
      </div>

      {/* Area Chat */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-purple-600" : "bg-slate-800"}`}>
              {msg.role === "user" ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-indigo-400" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === "user" ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-200"}`}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="bg-slate-800 rounded-2xl p-5 flex gap-1.5 items-center h-12">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Form Input */}
      <div className="p-4 bg-slate-950">
        <form onSubmit={handleSend} className="flex gap-3 max-w-4xl mx-auto">
          <button
            type="button"
            onClick={toggleListening}
            className={`p-4 rounded-full transition-all ${isListening ? "bg-red-500 animate-pulse text-white" : "bg-slate-800 hover:bg-slate-700 text-slate-300"}`}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik atau bicara..."
            disabled={isLoading}
            className="flex-1 bg-slate-900 text-slate-100 rounded-full px-6 py-4 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button type="submit" disabled={!input.trim()} className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center">
            <Send className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
}