// @ts-nocheck
import { Sparkles, Send, Mic, Bot, User } from "lucide-react";
import MathRenderer from "@/components/MathRenderer";

export default function AITutorPage() {
  const sampleMath = "Hasil peluangnya adalah $P = \\frac{1}{75}$";

  return (
    <div className="min-h-screen w-full bg-slate-950 p-6 flex flex-col">
      <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-[2rem] p-6 mb-6 overflow-y-auto">
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-blue-400" />
          </div>
          <div className="bg-slate-800 p-5 rounded-2xl">
            {/* Mesin Matematika dipanggil di sini */}
            <MathRenderer content={sampleMath} />
          </div>
        </div>
      </div>
      {/* Input Area */}
      <div className="bg-slate-900 p-2 rounded-2xl flex gap-2">
        <input className="flex-1 bg-transparent p-2 text-white outline-none" placeholder="Tanya soal..." />
        <button className="bg-blue-600 p-2 rounded-xl text-white"><Send size={20}/></button>
      </div>
    </div>
  );
}