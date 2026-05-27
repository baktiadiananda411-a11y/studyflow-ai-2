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

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);

  if (loading || !isMounted) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 px-4">
        <BrainCircuit className="w-10 h-10 text-indigo-500 animate-pulse" />
        <p className="text-slate-400 font-medium animate-pulse">Memuat data belajarmu...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col md:flex-row">
      <MobileHeader onMenuClick={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
      <ResponsiveSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="flex-1 overflow-y-auto bg-slate-950">
        <div className="min-h-screen max-w-7xl mx-auto px-4 py-5 md:px-6 md:py-6 lg:px-8 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
