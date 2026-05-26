"use client";

import { BrainCircuit, Menu, X } from "lucide-react";
import { useState } from "react";

interface MobileHeaderProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
}

export default function MobileHeader({
  onMenuClick,
  isMenuOpen,
}: MobileHeaderProps) {
  return (
    <div className="md:hidden bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3 h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <BrainCircuit className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-slate-100">StudyFlow</span>
        </div>

        {/* Menu Button */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}
