// ============================================================
// IsoPulse — Sidebar Navigation
// Fixed desktop sidebar with brand, nav links, and user section
// ============================================================

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ClipboardCheck,
  ListChecks,
  ShieldAlert,
  AlertTriangle,
  Settings,
  HelpCircle,
  Activity,
  LogOut,
} from 'lucide-react';
import { signOut } from '@/lib/actions/auth-actions';

const navigation = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Clause Matrix', href: '/clause-matrix', icon: ListChecks },
  { label: 'Audit Planner', href: '/audits', icon: ClipboardCheck },
  { label: 'CAPA Center', href: '/capa', icon: ShieldAlert },
  { label: 'Risk Register', href: '/risk-register', icon: AlertTriangle },
];

const secondaryNav = [
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Help & Docs', href: '/help', icon: HelpCircle },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/80">
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-500 shadow-sm shadow-indigo-200">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight">IsoPulse</h1>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">ISO 9001 QMS</p>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          Modules
        </p>
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`
                group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${active
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100/50'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }
              `}
            >
              <Icon
                className={`w-[18px] h-[18px] transition-colors duration-200 ${
                  active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              />
              {item.label}
              {active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
              )}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="pt-4 pb-2">
          <div className="border-t border-slate-100" />
        </div>

        <p className="px-3 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          System
        </p>
        {secondaryNav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`
                group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${active
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }
              `}
            >
              <Icon
                className={`w-[18px] h-[18px] transition-colors duration-200 ${
                  active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="px-4 py-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xs font-bold">
            QM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">Quality Manager</p>
            <p className="text-xs text-slate-400 truncate">admin@isopulse.io</p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
