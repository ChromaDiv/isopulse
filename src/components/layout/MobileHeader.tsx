// ============================================================
// IsoPulse — Mobile Header
// Sticky top bar for mobile with hamburger trigger
// ============================================================

'use client';

import React from 'react';
import { Menu, Bell, Activity } from 'lucide-react';

interface MobileHeaderProps {
  onMenuToggle: () => void;
}

export default function MobileHeader({ onMenuToggle }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-14 px-4 bg-white/90 backdrop-blur-md border-b border-slate-200/80 lg:hidden">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-gradient-to-br from-indigo-600 to-indigo-500">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-slate-900 tracking-tight">IsoPulse</span>
        </div>
      </div>
      <button
        className="relative flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
      </button>
    </header>
  );
}
