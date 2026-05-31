// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, User, Menu, LogIn, LogOut, X, Scan, FileText } from "lucide-react";
import { auth } from "@/lib/firebase/config";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Gagal login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row relative">
      
      {/* HEADER KHUSUS HP */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950 z-30 sticky top-0">
        <h1 className="text-white font-bold text-lg">StudyFlow</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="text-slate-400 p-1 hover:text-white transition-colors"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* EFEK KACA GELAP */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar} 
        />
      )}

      {/* SIDEBAR DENGAN MENU LENGKAP */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-slate-900 border-r border-slate-800 p-6 z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h1 className="text-white font-bold text-2xl mb-10 px-3">StudyFlow</h1>
        
        <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
          <Link href="/dashboard" onClick={closeSidebar} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${pathname === '/dashboard' ? 'text-indigo-400 bg-indigo-500/10 font-medium' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}>
            <Home className="w-5 h-5" /> Dashboard AI
          </Link>
          
          <Link href="/dashboard/tugas" onClick={closeSidebar} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${pathname === '/dashboard/tugas' ? 'text-indigo-400 bg-indigo-500/10 font-medium' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}>
            <BookOpen className="w-5 h-5" /> Tugas
          </Link>

          <Link href="/dashboard/scanner" onClick={closeSidebar} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${pathname === '/dashboard/scanner' ? 'text-indigo-400 bg-indigo-500/10 font-medium' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}>
            <Scan className="w-5 h-5" /> Scanner Tugas
          </Link>
          
          <Link href="/dashboard/summary" onClick={closeSidebar} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${pathname === '/dashboard/summary' ? 'text-indigo-400 bg-indigo-500/10 font-medium' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}>
            <FileText className="w-5 h-5" /> Rangkuman
          </Link>
        </nav>

        {/* AREA BAWAH SIDEBAR */}
        <div className="mt-auto border-t border-slate-800 pt-4 flex flex-col gap-2">
          <Link href="/dashboard/profil" onClick={closeSidebar} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${pathname === '/dashboard/profil' ? 'text-indigo-400 bg-indigo-500/10 font-medium' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <User className="w-5 h-5" /> Profil
          </Link>
          
          {!user ? (
            <button 
              onClick={() => { handleLogin(); closeSidebar(); }} 
              className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800 p-3 rounded-xl transition-all w-full text-left"
            >
              <LogIn className="w-5 h-5" /> Login
            </button>
          ) : (
            <button 
              onClick={() => { handleLogout(); closeSidebar(); }} 
              className="flex items-center gap-3 text-slate-400 hover:text-red-400 hover:bg-slate-800 p-3 rounded-xl transition-all w-full text-left"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          )}
        </div>
      </aside>

      {/* AREA KONTEN UTAMA */}
      <main className="flex-1 overflow-y-auto h-screen relative z-10">
        {children} 
      </main>

    </div>
  );
}