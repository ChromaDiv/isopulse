// ============================================================
// IsoPulse — AppShell Layout
// Responsive shell: fixed sidebar (desktop) + drawer (mobile)
// ============================================================

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import { X } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Desktop Sidebar — hidden on mobile */}
      <aside className="hidden lg:flex lg:flex-shrink-0 lg:w-[272px]">
        <Sidebar />
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden drawer-overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-[280px] lg:hidden
          transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="relative h-full">
          <Sidebar onClose={closeMenu} />
          {/* Close button - Only visible when menu is open */}
          {mobileMenuOpen && (
            <button
              onClick={closeMenu}
              className="absolute top-4 right-[-44px] flex items-center justify-center w-9 h-9 rounded-full bg-white/90 shadow-lg text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <MobileHeader onMenuToggle={toggleMenu} />
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
