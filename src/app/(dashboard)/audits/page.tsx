// ============================================================
// IsoPulse — Audit Management Dashboard
// ============================================================

import React from 'react';
import { getAudits } from '@/lib/data/queries';
import AuditCard from '@/components/audits/AuditCard';
import { ClipboardCheck } from 'lucide-react';
import AuditListClient from '@/components/audits/AuditListClient';

export const dynamic = 'force-dynamic';

export default async function AuditsPage() {
  const audits = await getAudits();

  // Aggregate stats
  const scheduledCount = audits.filter((a) => a.status === 'Scheduled').length;
  const inProgressCount = audits.filter((a) => a.status === 'In Progress').length;
  const completedCount = audits.filter((a) => a.status === 'Completed').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="animate-fade-in flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-sans">
            Internal Audit Planner
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Clause 9.2 Internal Audit — Plan, coordinate, and execute internal conformity assessments
          </p>
        </div>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-3 gap-4 animate-fade-in">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Scheduled</p>
          <p className="text-xl font-bold text-slate-800 mt-1">{scheduledCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm border-l-amber-400 border-l-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">In Progress</p>
          <p className="text-xl font-bold text-slate-800 mt-1">{inProgressCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm border-l-emerald-400 border-l-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed</p>
          <p className="text-xl font-bold text-slate-800 mt-1">{completedCount}</p>
        </div>
      </div>

      {/* Interactive List (Client filter component) */}
      <AuditListClient initialAudits={audits} />
    </div>
  );
}
