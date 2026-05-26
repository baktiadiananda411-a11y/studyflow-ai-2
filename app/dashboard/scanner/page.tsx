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
    <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 h-[calc(100vh-6rem)]">
      
      {/* Kolom Kiri */}
      <div className="flex-1 flex flex-col bg-slate-900 p-6 rounded-2xl shadow-xl overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 text-slate-100">
          <Camera className="text-indigo-500" />
          Scanner Tugas
        </h1>
        <p className="text-slate-400 text-sm mb-6">
          Unggah beberapa foto soal atau halaman buku sekaligus (Stack).
        </p>
        
        {/* Area Upload (Klik untuk tambah foto terus) */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-950/50 mb-4"
        >
          <Upload className="w-8 h-8 mb-2 text-slate-400" />
          <span className="text-slate-400 font-medium">Klik di sini untuk tambah foto</span>
          
          <input 
            type="file" 
            accept="image/*" 
            multiple // Atribut ajaib biar bisa pilih banyak foto sekaligus!
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            className="hidden" 
          />
        </div>

        {/* Galeri Foto yang di-Stack */}
        {images.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-4 mb-2 scrollbar-thin scrollbar-thumb-slate-700">
            {images.map((img, index) => (
              <div key={index} className="relative shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`Preview ${index}`} className="h-24 w-24 object-cover rounded-xl border border-slate-700" />
                <button 
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Opsional: Tambahkan perintah (misal: 'Jawab soal nomor 2 saja')"
          className="w-full bg-slate-950 text-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-6 shadow-inner"
        />
        
        <button
          onClick={handleAnalyze}
          disabled={isLoading || images.length === 0}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-900/20 mt-auto"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          {isLoading ? "Sedang Menganalisis Semua Foto..." : `Analisis ${images.length} Gambar`}
        </button>
      </div>

      {/* Kolom Kanan */}
      <div className="flex-1 flex flex-col bg-slate-900 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-slate-100 pb-2 border-b border-slate-800">
          Hasil Pemindaian
        </h2>
        <div className="flex-1 overflow-y-auto bg-slate-950/50 rounded-xl p-6 prose prose-invert prose-indigo max-w-none">
          {answer ? (
            <div className="whitespace-pre-wrap text-slate-300 leading-relaxed">
              {answer}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
              <ImageIcon className="w-12 h-12 mb-3" />
              <p>Jawaban dari tumpukan fotomu akan muncul di sini</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}