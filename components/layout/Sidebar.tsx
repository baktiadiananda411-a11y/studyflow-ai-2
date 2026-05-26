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
  Sun, // Tambahan
  Moon // Tambahan
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
    <div 
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-slate-900 h-screen flex flex-col shadow-2xl transition-all duration-300 relative z-20`}
    >
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3.5 top-8 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-transform hover:scale-110 z-30"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      <div className="flex items-center h-24 px-5">
        <div className="w-10 h-10 shrink-0 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <BrainCircuit className="text-white w-6 h-6" />
        </div>
        <span 
          className={`text-xl font-bold text-slate-100 ml-3 whitespace-nowrap transition-all duration-300 overflow-hidden ${
            isCollapsed ? "w-0 opacity-0" : "w-32 opacity-100"
          }`}
        >
          StudyFlow
        </span>
      </div>

      <nav className="flex-1 space-y-2 px-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              title={isCollapsed ? item.name : ""}
              className={`flex items-center rounded-xl transition-all group ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/40"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              } ${isCollapsed ? "justify-center p-3" : "px-4 py-3"}`}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-100"}`} />
              <span 
                className={`ml-3 whitespace-nowrap transition-all duration-300 overflow-hidden ${
                  isCollapsed ? "w-0 opacity-0" : "w-40 opacity-100"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Area Tombol Tema & Logout */}
      <div className="p-3 mb-4 space-y-2">
        {/* Tombol Ubah Tema */}
        <button
          onClick={() => document.documentElement.classList.toggle("dark")}
          title={isCollapsed ? "Ubah Tema" : ""}
          className={`flex w-full items-center text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-xl transition-all ${
            isCollapsed ? "justify-center p-3" : "px-4 py-3"
          }`}
        >
          <Sun className="w-5 h-5 shrink-0 dark:hidden" />
          <Moon className="w-5 h-5 shrink-0 hidden dark:block" />
          <span 
            className={`ml-3 whitespace-nowrap font-medium transition-all duration-300 overflow-hidden text-left ${
              isCollapsed ? "w-0 opacity-0" : "w-40 opacity-100"
            }`}
          >
            Ubah Tema
          </span>
        </button>

        {/* Tombol Logout */}
        <button
          onClick={() => logout()}
          title={isCollapsed ? "Keluar" : ""}
          className={`flex w-full items-center text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all ${
            isCollapsed ? "justify-center p-3" : "px-4 py-3"
          }`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span 
            className={`ml-3 whitespace-nowrap font-medium transition-all duration-300 overflow-hidden text-left ${
              isCollapsed ? "w-0 opacity-0" : "w-40 opacity-100"
            }`}
          >
            Keluar
          </span>
        </button>
      </div>
    </div>
  );
}