// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { User, Mail, Shield, Bell, Smartphone, Github, Code, LogOut } from "lucide-react";

export default function ProfilPage() {
  const [user, setUser] = useState<any>(null);

  // State untuk sakelar (toggle) animasi UI saja
  const [waToggle, setWaToggle] = useState(true);
  const [devToggle, setDevToggle] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-950 px-6 py-8 md:px-10 md:py-12 lg:px-16 lg:py-14 text-white">
      
      <h1 className="text-3xl font-bold mb-10 text-white">Profil & Pengaturan</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI: KARTU AKUN GOOGLE */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/60 p-8 rounded-[2rem] border border-slate-800 flex flex-col items-center text-center shadow-lg">
            
            {/* Foto Profil */}
            <div className="w-32 h-32 rounded-full bg-slate-800 mb-6 overflow-hidden border-4 border-slate-700 shadow-xl flex items-center justify-center relative">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profil" className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-slate-500" />
              )}
              {/* Indikator Online */}
              <div className="absolute bottom-1 right-3 w-5 h-5 bg-green-500 border-4 border-slate-800 rounded-full"></div>
            </div>

            {/* Nama Akun Asli dari Google */}
            <h2 className="text-2xl font-bold mb-2 text-slate-100">
              {user?.displayName || "Nama Akun"}
            </h2>
            
            {/* Email Asli dari Google */}
            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm bg-slate-950/50 px-4 py-2 rounded-full w-full">
              <Mail className="w-4 h-4" />
              <span className="truncate">{user?.email || "Email belum terhubung"}</span>
            </div>

          </div>
        </div>

        {/* KOLOM KANAN: PENGATURAN (SETTINGS) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-slate-900/60 p-8 rounded-[2rem] border border-slate-800 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3 border-b border-slate-800 pb-4">
              <Shield className="w-6 h-6 text-indigo-400" /> 
              Pengaturan Akun & Preferensi
            </h3>
            
            <div className="space-y-4">
              
              {/* SETTING 1: Notifikasi WhatsApp */}
              <div className="flex items-center justify-between p-4 bg-slate-950/50 hover:bg-slate-800/50 transition-colors rounded-2xl border border-slate-800/60 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Smartphone className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-200 text-lg">Notifikasi WhatsApp</h4>
                    <p className="text-sm text-slate-400">Kirim pengingat tugas otomatis ke WA</p>
                  </div>
                </div>
                {/* Toggle Interaktif */}
                <div 
                  onClick={() => setWaToggle(!waToggle)}
                  className={`w-14 h-7 rounded-full p-1 cursor-pointer flex transition-colors duration-300 ${waToggle ? 'bg-indigo-500 justify-end' : 'bg-slate-700 justify-start'}`}
                >
                  <div className="w-5 h-5 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>

              {/* SETTING 2: Koneksi Akun GitHub */}
              <div className="flex items-center justify-between p-4 bg-slate-950/50 hover:bg-slate-800/50 transition-colors rounded-2xl border border-slate-800/60 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Github className="w-5 h-5 text-slate-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-200 text-lg">Hubungkan GitHub</h4>
                    <p className="text-sm text-slate-400">Sinkronisasi proyek dan tugas *coding*</p>
                  </div>
                </div>
                <button className="px-5 py-2 text-sm font-semibold bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors border border-slate-700">
                  Hubungkan
                </button>
              </div>

              {/* SETTING 3: Mode Pengembang */}
              <div className="flex items-center justify-between p-4 bg-slate-950/50 hover:bg-slate-800/50 transition-colors rounded-2xl border border-slate-800/60 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Code className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-200 text-lg">Developer Mode</h4>
                    <p className="text-sm text-slate-400">Akses log AI dan fitur eksperimental</p>
                  </div>
                </div>
                {/* Toggle Interaktif */}
                <div 
                  onClick={() => setDevToggle(!devToggle)}
                  className={`w-14 h-7 rounded-full p-1 cursor-pointer flex transition-colors duration-300 ${devToggle ? 'bg-orange-500 justify-end' : 'bg-slate-700 justify-start'}`}
                >
                  <div className="w-5 h-5 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}