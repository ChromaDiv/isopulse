// ============================================================
// IsoPulse — AuditCard Component
// Visual summary of a single internal audit
// ============================================================

'use client';

import React from 'react';
import type { Audit } from '@/lib/types';
import Link from 'next/link';
import Badge, { statusToVariant } from '@/components/ui/Badge';
import { Calendar, User, ArrowRight, Activity, Percent } from 'lucide-react';

interface AuditCardProps {
  audit: Audit;
}

export default function AuditCard({ audit }: AuditCardProps) {
  const isCompleted = audit.status === 'Completed';

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      {/* Top Details */}
      <div className="p-5 flex-1 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
            Clause {audit.clause_targeted}
          </span>
          <Badge variant={statusToVariant(audit.status)} dot>
            {audit.status}
          </Badge>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 text-sm leading-tight line-clamp-1">
            {audit.title}
          </h4>
          <p className="text-xs text-slate-500 mt-1">Department: {audit.department}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{audit.scheduled_date}</span>
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <User className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{audit.auditor_name || 'Unassigned'}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
        {isCompleted && audit.score !== undefined ? (
          <div className="flex items-center gap-1 text-emerald-700 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
            <Percent className="w-3.5 h-3.5" />
            Score: {audit.score}%
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
            <Activity className="w-3.5 h-3.5 text-slate-400" />
            In Progress checklist
          </div>
        )}

        <Link
          href={`/audits/${audit.id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer"
        >
          {isCompleted ? 'View Details' : 'Run Audit'}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
