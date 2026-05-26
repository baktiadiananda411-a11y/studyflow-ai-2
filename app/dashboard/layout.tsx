"use client";

import Sidebar from "@/components/layout/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BrainCircuit } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Efek penjaga pintu: kalau tidak ada user dan tidak sedang loading, tendang ke login!
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Tampilan layar loading sederhana saat mengecek status
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <BrainCircuit className="w-10 h-10 text-indigo-500 animate-pulse" />
        <p className="text-slate-400 font-medium animate-pulse">Memuat data belajarmu...</p>
      </div>
    );
  }

  // Mencegah konten berkedip sebelum sempat ditendang ke halaman login
  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}