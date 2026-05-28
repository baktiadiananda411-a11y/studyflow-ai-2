// @ts-nocheck
"use client";

import { useState } from "react";
import { UploadCloud, Camera, FileText, ScanLine, X, Bot, Sparkles } from "lucide-react";
import MathRenderer from "@/components/MathRenderer"; 

export default function ScannerPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); // Menyimpan file asli
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  // Mengubah gambar menjadi format Base64 yang bisa dibaca API
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          // Membuang awalan "data:image/jpeg;base64," agar tersisa kode murninya saja
          resolve(reader.result.split(',')[1]); 
        }
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setScanResult(null); 
    }
  };

  const handleScanStart = async () => {
    if (!imageFile) return;
    setIsScanning(true);
    setScanResult(null);
    
    try {
      const base64Data = await fileToBase64(imageFile);
      
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          imageBase64: base64Data,
          mimeType: imageFile.type 
        }),
      });

      const data = await response.json();

      if (data.text) {
        setScanResult(data.text);
      } else {
        setScanResult("Gagal mendapatkan jawaban dari AI.");
      }
    } catch (error) {
      console.error("Scanning error:", error);
      setScanResult("Koneksi ke server AI terputus atau terjadi error.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setImageFile(null);
    setScanResult(null);
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-950 p-6 md:p-8 overflow-y-auto">
      
      <div className="mb-8 flex items-center gap-4">
        <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20 shadow-lg">
          <ScanLine className="w-7 h-7 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Scanner Tugas AI</h1>
          <p className="text-slate-400 mt-1">Upload foto soalmu, AI akan membaca dan menyelesaikannya.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full min-h-[500px]">
        
        {/* KOLOM KIRI: UPLOAD */}
        <div className="flex flex-col gap-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col h-full relative overflow-hidden group">
            
            {!selectedImage ? (
              <label className="flex flex-col items-center justify-center h-full min-h-[300px] border-2 border-dashed border-slate-700/50 rounded-2xl bg-slate-800/20 hover:bg-slate-800/50 hover:border-indigo-500/50 transition-all cursor-pointer">
                <UploadCloud className="w-12 h-12 text-slate-500 mb-4 group-hover:text-indigo-400 transition-colors" />
                <span className="text-lg font-medium text-slate-300">Klik atau Tarik Foto Kesini</span>
                <span className="text-sm text-slate-500 mt-2">Mendukung JPG, PNG, atau HEIC</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                
                <div className="mt-6 flex items-center gap-2 text-sm px-4 py-2 bg-slate-950 rounded-full border border-slate-800 text-slate-400">
                  <Camera className="w-4 h-4" /> Atau gunakan kamera HP
                </div>
              </label>
            ) : (
              <div className="flex flex-col h-full">
                <div className="relative flex-1 w-full rounded-2xl overflow-hidden border border-slate-700/50 bg-black/50 flex items-center justify-center">
                  <img src={selectedImage} alt="Pratinjau Tugas" className="max-h-full max-w-full object-contain" />
                  
                  {isScanning && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,1)] animate-[scan_2s_ease-in-out_infinite]"></div>
                  )}
                </div>
                
                <div className="mt-4 flex gap-3">
                  <button onClick={handleClear} className="px-5 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors flex items-center justify-center">
                    <X className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleScanStart}
                    disabled={isScanning || !!scanResult}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${isScanning || scanResult ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20'}`}
                  >
                    {isScanning ? (
                      <><Sparkles className="w-5 h-5 animate-pulse" /> AI Sedang Menganalisis...</>
                    ) : scanResult ? (
                      "Analisis Selesai"
                    ) : (
                      <><ScanLine className="w-5 h-5" /> Mulai Scan Soal</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* KOLOM KANAN: HASIL */}
        <div className="flex flex-col gap-4 h-full">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col h-full">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-4">
              <FileText className="w-5 h-5 text-indigo-400" /> Ekstraksi Teks & Jawaban
            </h3>
            
            <div className="flex-1 bg-slate-950/50 rounded-2xl border border-slate-800 p-5 overflow-y-auto">
              {!selectedImage ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500">
                  <Bot className="w-12 h-12 mb-4 opacity-50" />
                  <p>Menunggu foto soal diunggah...</p>
                </div>
              ) : isScanning ? (
                <div className="h-full flex flex-col items-center justify-center text-indigo-400">
                  <Sparkles className="w-10 h-10 mb-4 animate-spin" />
                  <p className="animate-pulse">Membaca dan mencari jawaban...</p>
                </div>
              ) : scanResult ? (
                <div className="text-slate-200">
                  <MathRenderer content={scanResult} />
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <p>Foto siap. Tekan tombol "Mulai Scan Soal".</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(300px); }
        }
      `}} />
    </div>
  );
}