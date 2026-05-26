"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Sparkles,
  Camera,
  Terminal,
  LogOut,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
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
  const { isMobile, isTablet, isDesktop, isMounted } = useDeviceType();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);

  // Kontrol visibility berdasarkan device type
  useEffect(() => {
    if (isMobile) {
      setShouldShow(isOpen !== false);
    } else {
      setShouldShow(true);
    }
  }, [isOpen, isMobile]);

  if (!isMounted) {
    return null;
  }

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "AI Tutor", href: "/dashboard/chat", icon: MessageSquare },
    { name: "Scanner Tugas", href: "/dashboard/scanner", icon: Camera },
    { name: "IT Debugger", href: "/dashboard/debugger", icon: Terminal },
    { name: "Catatan", href: "/dashboard/notes", icon: FileText },
    { name: "Rangkuman", href: "/dashboard/summary", icon: Sparkles },
  ];

  const sidebarClasses = `
    ${isMobile ? "fixed" : "relative"} 
    ${isMobile && !shouldShow ? "-translate-x-full" : "translate-x-0"}
    ${isCollapsed && !isMobile ? "w-20" : isMobile ? "w-64" : "w-64"}
    bg-slate-900 
    h-screen 
    flex flex-col 
    shadow-2xl 
    transition-all 
    duration-300 
    relative 
    z-50
    ${isMobile ? "top-0 left-0" : ""}
  `;

  const handleMenuItemClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && shouldShow && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <div className={sidebarClasses}>
        {/* Close button for mobile */}
        {isMobile && (
          <button
            onClick={onClose}
            className="absolute -right-10 top-4 p-2 text-slate-400 hover:text-slate-100 md:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Collapse button for desktop */}
        {!isMobile && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3.5 top-8 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-transform hover:scale-110 z-30"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        )}

        {/* Header */}
        <div className="flex items-center h-24 px-5">
          <div className="w-10 h-10 shrink-0 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <BrainCircuit className="text-white w-6 h-6" />
          </div>
          <span
            className={`text-xl font-bold text-slate-100 ml-3 whitespace-nowrap transition-all duration-300 overflow-hidden ${
              isCollapsed && !isMobile
                ? "w-0 opacity-0"
                : "w-32 opacity-100"
            }`}
          >
            StudyFlow
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                title={isCollapsed && !isMobile ? item.name : ""}
                onClick={handleMenuItemClick}
                className={`flex items-center rounded-xl transition-all group ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/40"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                } ${
                  isCollapsed && !isMobile
                    ? "justify-center p-3"
                    : "px-4 py-3"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 shrink-0 ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 group-hover:text-slate-100"
                  }`}
                />
                <span
                  className={`ml-3 whitespace-nowrap transition-all duration-300 overflow-hidden ${
                    isCollapsed && !isMobile
                      ? "w-0 opacity-0"
                      : "w-40 opacity-100"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom buttons */}
        <div className="p-3 mb-4 space-y-2">
          <button
            onClick={() =>
              document.documentElement.classList.toggle("dark")
            }
            title={isCollapsed && !isMobile ? "Ubah Tema" : ""}
            className={`flex w-full items-center text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-xl transition-all ${
              isCollapsed && !isMobile
                ? "justify-center p-3"
                : "px-4 py-3"
            }`}
          >
            <Sun className="w-5 h-5 shrink-0 dark:hidden" />
            <Moon className="w-5 h-5 shrink-0 hidden dark:block" />
            <span
              className={`ml-3 whitespace-nowrap font-medium transition-all duration-300 overflow-hidden text-left ${
                isCollapsed && !isMobile
                  ? "w-0 opacity-0"
                  : "w-40 opacity-100"
              }`}
            >
              Ubah Tema
            </span>
          </button>

          <button
            onClick={() => logout()}
            title={isCollapsed && !isMobile ? "Keluar" : ""}
            className={`flex w-full items-center text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all ${
              isCollapsed && !isMobile
                ? "justify-center p-3"
                : "px-4 py-3"
            }`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span
              className={`ml-3 whitespace-nowrap font-medium transition-all duration-300 overflow-hidden text-left ${
                isCollapsed && !isMobile
                  ? "w-0 opacity-0"
                  : "w-40 opacity-100"
              }`}
            >
              Keluar
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
