// @ts-nocheck
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import {
  Home,
  MessageSquare,
  Camera,
  Terminal,
  FileText,
  Sparkles,
  Settings,
  ArrowRight,
  ArrowLeft,
  Sun,
  Moon,
  LogOut,
  X,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useDeviceType } from "@/hooks/useDeviceType";

interface ResponsiveSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ResponsiveSidebar({
  isOpen = true,
  onClose,
}: ResponsiveSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { isMobile, isMounted } = useDeviceType();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    if (isMobile) {
      setShouldShow(isOpen !== false);
    } else {
      setShouldShow(true);
    }
  }, [isOpen, isMobile]);

  if (!isMounted) return null;

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "AI Tutor", href: "/dashboard/chat", icon: MessageSquare },
    { name: "Scanner Tugas", href: "/dashboard/scanner", icon: Camera },
    { name: "IT Debugger", href: "/dashboard/debugger", icon: Terminal },
    { name: "Catatan", href: "/dashboard/notes", icon: FileText },
    { name: "Rangkuman", href: "/dashboard/summary", icon: Sparkles },
  ];

  // Ukuran lebar sidebar (mirip referensi)
  const widthClass = isMobile ? "w-72" : isCollapsed ? "w-20" : "w-64";
  
  // Background menggunakan warna yang lebih solid dan gelap (#121212)
  const sidebarClasses = `
    ${isMobile ? "fixed inset-y-0 left-0" : "relative"}
    ${isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"}
    ${widthClass}
    bg-[#121212] 
    h-screen
    flex flex-col
    shadow-2xl
    transition-all duration-300 ease-in-out
    z-50
    border-r border-white/5
  `;

  return (
    <>
      {/* Overlay Gelap untuk Mode HP */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      <aside className={sidebarClasses}>
        {/* Tombol Silang (Hanya HP) */}
        {isMobile && (
          <button
            onClick={onClose}
            className="absolute -right-12 top-6 p-2 rounded-xl bg-[#121212] text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* LOGO AREA */}
        <div className="flex items-center gap-3 px-5 py-6">
          <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center shrink-0">
            {/* Ikon Petir / S (mirip referensimu) */}
            <Sparkles className="text-white w-5 h-5" /> 
          </div>
          <div className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${isCollapsed && !isMobile ? "w-0 opacity-0" : "w-full opacity-100"}`}>
            <p className="text-base font-bold text-white tracking-wide">StudyFlow</p>
          </div>
        </div>

        {/* MAIN MENU */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                title={isCollapsed && !isMobile ? item.name : undefined}
                onClick={() => isMobile && onClose && onClose()}
                className={`flex items-center gap-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-[#2A2A2A] text-white" // Warna aktif abu-abu elegan
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                } ${isCollapsed && !isMobile ? "justify-center p-3" : "px-3 py-2.5"}`}
              >
                <item.icon className={`w-[22px] h-[22px] shrink-0 ${isActive ? "text-blue-400" : ""}`} strokeWidth={1.5} />
                <span className={`text-sm font-medium transition-all duration-300 overflow-hidden whitespace-nowrap ${isCollapsed && !isMobile ? "w-0 opacity-0" : "w-full opacity-100"}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* BOTTOM AREA (Theme, Logout, Toggle) */}
        <div className="px-3 pb-6 space-y-1">
          {/* Settings / Theme */}
          <button
            onClick={() => document.documentElement.classList.toggle("dark")}
            className={`flex items-center gap-3 w-full rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all duration-200 ${isCollapsed && !isMobile ? "justify-center p-3" : "px-3 py-2.5"}`}
            title="Ubah Tema"
          >
            <Settings className="w-[22px] h-[22px] shrink-0" strokeWidth={1.5} />
            <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 overflow-hidden ${isCollapsed && !isMobile ? "w-0 opacity-0" : "w-full opacity-100"}`}>
              Pengaturan
            </span>
          </button>

          {/* Logout */}
          <button
            onClick={() => logout()}
            className={`flex items-center gap-3 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 ${isCollapsed && !isMobile ? "justify-center p-3" : "px-3 py-2.5"}`}
            title="Keluar"
          >
            <LogOut className="w-[22px] h-[22px] shrink-0" strokeWidth={1.5} />
            <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 overflow-hidden ${isCollapsed && !isMobile ? "w-0 opacity-0" : "w-full opacity-100"}`}>
              Keluar
            </span>
          </button>

          {/* Collapse Toggle (Di Pindah ke Bawah!) */}
          {!isMobile && (
            <div className="pt-4 mt-2 border-t border-white/5">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={`flex items-center w-full rounded-xl text-slate-500 hover:text-slate-300 transition-colors ${isCollapsed ? "justify-center" : "justify-start px-3"}`}
                aria-label="Toggle sidebar"
              >
                {isCollapsed ? (
                  <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                ) : (
                  <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
                )}
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}