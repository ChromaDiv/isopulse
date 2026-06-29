// ============================================================
// IsoPulse — Badge Component
// Reusable status badge with variant styling
// ============================================================

import React from 'react';

type BadgeVariant =
  | 'conformant'
  | 'non-conformant'
  | 'ofi'
  | 'open'
  | 'in-progress'
  | 'verification'
  | 'closed'
  | 'scheduled'
  | 'completed'
  | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  conformant: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'non-conformant': 'bg-rose-50 text-rose-700 border border-rose-200',
  ofi: 'bg-amber-50 text-amber-700 border border-amber-200',
  open: 'bg-rose-50 text-rose-700 border border-rose-200',
  'in-progress': 'bg-blue-50 text-blue-700 border border-blue-200',
  verification: 'bg-violet-50 text-violet-700 border border-violet-200',
  closed: 'bg-slate-50 text-slate-600 border border-slate-200',
  scheduled: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
  completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  default: 'bg-slate-50 text-slate-600 border border-slate-200',
};

const dotStyles: Record<BadgeVariant, string> = {
  conformant: 'bg-emerald-500',
  'non-conformant': 'bg-rose-500',
  ofi: 'bg-amber-500',
  open: 'bg-rose-500',
  'in-progress': 'bg-blue-500',
  verification: 'bg-violet-500',
  closed: 'bg-slate-400',
  scheduled: 'bg-indigo-500',
  completed: 'bg-emerald-500',
  default: 'bg-slate-400',
};

export default function Badge({ variant = 'default', children, className = '', dot = false }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {dot && (
        <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[variant]}`} />
      )}
      {children}
    </span>
  );
}

/**
 * Helper to convert a status string to a badge variant
 */
export function statusToVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    'Conformant': 'conformant',
    'Non-Conformant': 'non-conformant',
    'OFI': 'ofi',
    'Open': 'open',
    'In Progress': 'in-progress',
    'Verification': 'verification',
    'Closed': 'closed',
    'Scheduled': 'scheduled',
    'Completed': 'completed',
    'Pending': 'default',
  };
  return map[status] || 'default';
}
