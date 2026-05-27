// @ts-nocheck
"use client";

import { useState } from "react";
import ResponsiveSidebar from "@/components/ResponsiveSidebar"; 
import MobileHeader from "@/components/MobileHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950 overflow-hidden">
      
      {/* Sidebar Canggih Kita */}
      <ResponsiveSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Area Konten Kanan */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        
        {/* Header khusus HP */}
        <MobileHeader 
          isMenuOpen={isMobileMenuOpen} 
          onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        />

        {/* Area Utama (Chat, Note, dll) */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}