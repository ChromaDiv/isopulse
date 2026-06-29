// ============================================================
// IsoPulse — EmptyState Component
// Beautiful empty state for clean onboarding
// ============================================================

import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-slate-100 mb-5">
        {icon || <Inbox className="w-7 h-7 text-indigo-400" />}
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm leading-relaxed mb-6">{description}</p>
      {action && (
        action.href ? (
          <a
            href={action.href}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium
                       hover:bg-indigo-700 transition-colors duration-200 shadow-sm shadow-indigo-200"
          >
            {action.label}
          </a>
        ) : (
          <button
            onClick={action.onClick}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium
                       hover:bg-indigo-700 transition-colors duration-200 shadow-sm shadow-indigo-200"
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
}
