// @ts-nocheck
import { Sparkles, Send, Mic, Bot, User } from "lucide-react";
// Ini dia mesin yang baru saja kita buat! Pastikan path-nya benar
import MathRenderer from "@/components/MathRenderer"; 

export default function AITutorPage() {
  // Ini contoh jawaban AI yang penuh dengan kode matematika (menggunakan soal pisangmu tadi)
  const contohJawabanAI = `
Tentu! Ini adalah soal peluang kejadian saling bebas, karena pengambilan di sisir I tidak mempengaruhi sisir II.

**1. Peluang Sisir I (ambil 2 matang dari 8 matang):**
$$P_1 = \\frac{C(8, 2)}{C(15, 2)} = \\frac{\\frac{8 \\times 7}{2 \\times 1}}{\\frac{15 \\times 14}{2 \\times 1}} = \\frac{28}{105} = \\frac{4}{15}$$

**2. Peluang Sisir II (ambil 2 matang dari 4 matang):**
$$P_2 = \\frac{C(4, 2)}{C(16, 2)} = \\frac{6}{120} = \\frac{1}{20}$$

**3. Peluang Total:**
$$P = P_1 \\times P_2 = \\frac{4}{15} \\times \\frac{1}{20} = \\frac{4}{300} = \\frac{1}{75}$$

Jadi, peluang semua pisang yang terambil matang adalah **1/75**.
  `;

  return (
    <div className="min-h-screen w-full bg-transparent p-6 md:p-10 flex flex-col relative overflow-hidden">
      
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

      {/* CHAT AREA */}
      <div className="flex-1 bg-slate-900/50 border border-slate-800/60 rounded-[2rem] p-6 mb-6 overflow-y-auto flex flex-col gap-6 relative z-10">
        
        {/* Bubble Chat User */}
        <div className="flex gap-4 self-end max-w-[80%]">
          <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-sm shadow-md">
            <p className="text-sm">Tolong bantu kerjakan soal peluang pisang mentah dan matang ini beserta rumusnya ya.</p>
          </div>
          <div className="w-10 h-10 bg-slate-700 rounded-full flex shrink-0 items-center justify-center">
            <User className="w-5 h-5 text-slate-300" />
          </div>
        </div>

        {/* Bubble Chat AI (DI SINI MESINNYA BEKERJA!) */}
        <div className="flex gap-4 self-start max-w-[90%]">
          <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-full flex shrink-0 items-center justify-center">
            <Bot className="w-5 h-5 text-blue-400" />
          </div>
          <div className="bg-slate-800 border border-slate-700/50 p-5 rounded-2xl rounded-tl-sm shadow-md">
            {/* KITA PANGGIL KOMPONEN MATHRENDERER DI SINI */}
            <MathRenderer content={contohJawabanAI} />
          </div>
        </div>

      </div>

      {/* INPUT AREA */}
      <div className="bg-[#151515]/80 backdrop-blur-md shadow-2xl rounded-[1.75rem] p-2 border border-slate-800/80 relative z-10">
        <div className="flex items-center gap-3 bg-slate-900/50 rounded-2xl p-2 pl-5 pr-2">
          <input 
            type="text" 
            placeholder='Ketik soalmu di sini...'
            className="flex-1 bg-transparent outline-none text-sm text-slate-200 placeholder-slate-500"
            readOnly
          />
          <div className="flex items-center gap-1">
            <button className="p-2.5 text-slate-400 hover:text-slate-200 transition-colors">
              <Mic className="w-4 h-4" />
            </button>
            <button className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-500 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}