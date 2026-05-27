// @ts-nocheck
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "AI Tutor", href: "/dashboard/chat", icon: MessageSquare },
    { name: "Scanner Tugas", href: "/dashboard/scanner", icon: Camera },
    { name: "IT Debugger", href: "/dashboard/debugger", icon: Terminal },
    { name: "Catatan", href: "/dashboard/notes", icon: FileText },
    { name: "Rangkuman", href: "/dashboard/summary", icon: Sparkles },
  ];

  return (
    <aside className={`bg-slate-950/95 ${isCollapsed ? "w-20" : "w-64"} h-screen flex flex-col shadow-2xl shadow-slate-950/40 transition-all duration-300 relative z-20`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3.5 top-8 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-transform hover:scale-110 z-30"
        aria-label="Perkecil sidebar"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800/70">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <BrainCircuit className="text-white w-6 h-6" />
        </div>
        <div className={`transition-all duration-300 overflow-hidden ${isCollapsed ? "w-0 opacity-0" : "w-full opacity-100"}`}>
          <p className="text-sm font-semibold text-white">StudyFlow</p>
          <p className="text-xs text-slate-400">Dashboardmu</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              title={isCollapsed ? item.name : undefined}
              className={`flex items-center gap-3 rounded-2xl transition-all duration-300 ${isActive ? "bg-indigo-600/20 text-indigo-100 shadow-sm shadow-indigo-500/20" : "text-slate-300 hover:bg-slate-800 hover:text-white"} ${isCollapsed ? "justify-center p-3" : "px-4 py-3"}`}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-indigo-300" : "text-slate-400"}`} />
              <span className={`text-sm font-medium transition-all duration-300 overflow-hidden ${isCollapsed ? "w-0 opacity-0" : "w-full opacity-100"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800/70 p-4 space-y-3">
        <button
          onClick={() => document.documentElement.classList.toggle("dark")}
          className={`flex items-center gap-3 w-full rounded-2xl px-4 py-3 text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-100 transition ${isCollapsed ? "justify-center" : "justify-start"}`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900/70 text-indigo-300">
            <Sun className="w-4 h-4 dark:hidden" />
            <Moon className="w-4 h-4 hidden dark:block" />
          </span>
          <span className={`font-medium ${isCollapsed ? "sr-only" : ""}`}>Ubah Tema</span>
        </button>

        <button
          onClick={() => logout()}
          className={`flex items-center gap-3 w-full rounded-2xl px-4 py-3 text-slate-300 hover:bg-red-500/10 hover:text-red-200 transition ${isCollapsed ? "justify-center" : "justify-start"}`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900/70 text-red-400">
            <LogOut className="w-4 h-4" />
          </span>
          <span className={`font-medium ${isCollapsed ? "sr-only" : ""}`}>Keluar</span>
        </button>
      </div>
    </aside>
  );
}