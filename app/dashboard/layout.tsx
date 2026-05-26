"use client";

import ResponsiveSidebar from "@/components/layout/ResponsiveSidebar";
import MobileHeader from "@/components/layout/MobileHeader";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BrainCircuit } from "lucide-react";
import { useDeviceType } from "@/hooks/useDeviceType";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { isMobile, isMounted } = useDeviceType();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Efek penjaga pintu: kalau tidak ada user dan tidak sedang loading, tendang ke login!
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Tutup menu ketika screen resize ke desktop
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);

  // Tampilan layar loading sederhana saat mengecek status
  if (loading || !isMounted) {
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
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <MobileHeader onMenuClick={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />

      {/* Sidebar */}
      <ResponsiveSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}