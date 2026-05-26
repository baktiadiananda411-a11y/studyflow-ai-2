"use client";

import { useState, useRef } from "react";
import { Camera, Upload, Sparkles, Loader2, ImageIcon, X } from "lucide-react";

export default function ScannerPage() {
  const [images, setImages] = useState<string[]>([]); // Sekarang berupa Array
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fungsi untuk memproses banyak gambar sekaligus
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
    
    // Reset input supaya bisa milih foto yang sama lagi kalau dihapus
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleAnalyze = async () => {
    if (images.length === 0) return;
    
    setIsLoading(true);
    try {
      const res = await fetch("/api/vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images, prompt }), // Kirim array gambar
      });

      const data = await res.json();
      if (data.answer) {
        setAnswer(data.answer);
      } else {
        setAnswer("Terjadi kesalahan. Coba kurangi jumlah gambar ya.");
      }
    } catch (error) {
      console.error("Error:", error);
      setAnswer("Gagal terhubung ke server AI.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-3 md:gap-6 h-auto lg:h-[calc(100vh-6rem)]">
      
      {/* Kolom Kiri */}
      <div className="flex-1 flex flex-col bg-slate-900 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl overflow-y-auto">
        <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 flex items-center gap-2 text-slate-100">
          <Camera className="text-indigo-500 w-5 md:w-6 h-5 md:h-6" />
          Scanner Tugas
        </h1>
        <p className="text-slate-400 text-xs md:text-sm mb-4 md:mb-6">
          Unggah beberapa foto soal atau halaman buku sekaligus (Stack).
        </p>
        
        {/* Area Upload (Klik untuk tambah foto terus) */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-lg md:rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-950/50 mb-4"
        >
          <Upload className="w-6 md:w-8 h-6 md:h-8 mb-2 text-slate-400" />
          <span className="text-slate-400 font-medium text-sm md:text-base text-center">Klik di sini untuk tambah foto</span>
          
          <input 
            type="file" 
            accept="image/*" 
            multiple
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            className="hidden" 
          />
        </div>

        {/* Galeri Foto yang di-Stack */}
        {images.length > 0 && (
          <div className="flex gap-2 md:gap-3 overflow-x-auto pb-3 md:pb-4 mb-3 md:mb-2 scrollbar-thin scrollbar-thumb-slate-700">
            {images.map((img, index) => (
              <div key={index} className="relative shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`Preview ${index}`} className="h-20 md:h-24 w-20 md:w-24 object-cover rounded-lg md:rounded-xl border border-slate-700" />
                <button 
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X className="w-3 md:w-4 h-3 md:h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Opsional: Tambahkan perintah"
          className="w-full bg-slate-950 text-slate-200 rounded-lg md:rounded-xl p-3 md:p-4 text-sm md:text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4 md:mb-6 shadow-inner"
        />
        
        <button
          onClick={handleAnalyze}
          disabled={isLoading || images.length === 0}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium py-2 md:py-3 rounded-lg md:rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-900/20 mt-auto text-sm md:text-base"
        >
          {isLoading ? <Loader2 className="w-4 md:w-5 h-4 md:h-5 animate-spin" /> : <Sparkles className="w-4 md:w-5 h-4 md:h-5" />}
          {isLoading ? "Sedang Menganalisis..." : `Analisis ${images.length} Gambar`}
        </button>
      </div>

      {/* Kolom Kanan */}
      <div className="flex-1 flex flex-col bg-slate-900 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl min-h-96">
        <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-slate-100 pb-2 border-b border-slate-800">
          Hasil Pemindaian
        </h2>
        <div className="flex-1 overflow-y-auto bg-slate-950/50 rounded-lg md:rounded-xl p-4 md:p-6 prose prose-invert prose-indigo max-w-none text-sm md:text-base">
          {answer ? (
            <div className="whitespace-pre-wrap text-slate-300 leading-relaxed">
              {answer}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
              <ImageIcon className="w-8 md:w-12 h-8 md:h-12 mb-2 md:mb-3" />
              <p className="text-xs md:text-sm text-center">Jawaban dari tumpukan fotomu akan muncul di sini</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}