// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, BookOpen, Bot, User, Menu, LogIn, LogOut } from "lucide-react";
// Import sistem Autentikasi Firebase
import { auth } from "@/lib/firebase/config";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // State untuk melacak apakah ada user yang sedang login
  const [user, setUser] = useState<any>(null);

  // Mendeteksi status login secara real-time
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fungsi untuk memunculkan Pop-up Login Google
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Gagal login:", error);
    }
  };

  // Fungsi untuk Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      
      {/* 1. HEADER KHUSUS HP */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950 z-20 sticky top-0">
        <h1 className="text-white font-bold text-lg">StudyFlow</h1>
        <div className="flex items-center gap-4">
          {/* Tombol Login/Logout mini di header HP */}
          {!user ? (
            <button onClick={handleLogin} className="text-blue-400 hover:text-blue-300">
              <LogIn className="w-5 h-5" />
            </button>
          ) : (
            <button onClick={handleLogout} className="text-red-400 hover:text-red-300">
              <LogOut className="w-5 h-5" />
            </button>
          )}
          <button className="text-slate-400 p-1 hover:text-white transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* 2. SIDEBAR KHUSUS LAPTOP/TABLET */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 p-6 z-20 sticky top-0 h-screen">
        <h1 className="text-white font-bold text-2xl mb-10 px-3">StudyFlow</h1>
        
        <nav className="flex flex-col gap-2 flex-1">
          <Link href="/dashboard" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 p-3 rounded-xl transition-all">
            <Home className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/dashboard/tugas" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 p-3 rounded-xl transition-all">
            <BookOpen className="w-5 h-5" /> Tugas
          </Link>
          <Link href="/dashboard/chat" className="flex items-center gap-3 text-indigo-400 bg-indigo-500/10 p-3 rounded-xl transition-all font-medium">
            <Bot className="w-5 h-5" /> AI Tutor
          </Link>
        </nav>

        {/* AREA BAWAH SIDEBAR (Profil & Login/Logout) */}
        <div className="mt-auto border-t border-slate-800 pt-4 flex flex-col gap-2">
          <Link href="/dashboard/profil" className="flex items-center gap-3 text-slate-400 hover:text-white p-3 rounded-xl transition-all">
            <User className="w-5 h-5" /> Profil
          </Link>
          
          {/* Logika Tombol Login/Logout */}
          {!user ? (
            <button 
              onClick={handleLogin} 
              className="flex items-center gap-3 text-slate-900 bg-white hover:bg-slate-200 p-3 rounded-xl transition-all font-bold mt-2"
            >
              <LogIn className="w-5 h-5" /> Login Google
            </button>
          ) : (
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 p-3 rounded-xl transition-all font-medium mt-2"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          )}
        </div>
      </aside>

      {/* 3. AREA KONTEN UTAMA */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0 h-screen">
        {children} 
      </main>

      {/* 4. MENU BAWAH KHUSUS HP */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 flex justify-around items-center p-3 z-50 pb-safe">
        <Link href="/dashboard" className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-white">
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/dashboard/tugas" className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-white">
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] font-medium">Tugas</span>
        </Link>
        <Link href="/dashboard/chat" className="flex flex-col items-center gap-1.5 text-indigo-400">
          <Bot className="w-5 h-5" />
          <span className="text-[10px] font-medium">AI Tutor</span>
        </Link>
        <Link href="/dashboard/profil" className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-white">
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">Profil</span>
        </Link>
      </nav>

    </div>
  );
}