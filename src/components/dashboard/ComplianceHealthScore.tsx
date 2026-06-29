// ============================================================
// IsoPulse — ComplianceHealthScore Component
// Circular progress ring showing overall QMS compliance
// ============================================================

'use client';

import React from 'react';
import ProgressRing from '@/components/ui/ProgressRing';
import Card from '@/components/ui/Card';
import { ShieldCheck, AlertTriangle, Lightbulb, Target } from 'lucide-react';
import type { ComplianceHealth } from '@/lib/types';

interface ComplianceHealthScoreProps {
  health: ComplianceHealth;
}

export default function ComplianceHealthScore({ health }: ComplianceHealthScoreProps) {
  const breakdownItems = [
    {
      label: 'Conformant',
      count: health.conformant,
      icon: ShieldCheck,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
    },
    {
      label: 'Non-Conformant',
      count: health.nonConformant,
      icon: AlertTriangle,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-100',
    },
    {
      label: 'Opportunities',
      count: health.ofi,
      icon: Lightbulb,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
    },
    {
      label: 'Total Items',
      count: health.total,
      icon: Target,
      color: 'text-slate-600',
      bg: 'bg-slate-50',
      border: 'border-slate-100',
    },
  ];

  return (
    <Card className="animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Compliance Health</h3>
          <p className="text-xs text-slate-500">Overall QMS conformance rate</p>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <ProgressRing
          value={health.score}
          size={176}
          strokeWidth={12}
          label="Compliant"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        {breakdownItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg ${item.bg} border ${item.border}`}
            >
              <Icon className={`w-4 h-4 ${item.color} flex-shrink-0`} />
              <div className="min-w-0">
                <p className="text-base font-bold text-slate-900">{item.count}</p>
                <p className="text-[10px] text-slate-500 font-medium truncate">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
