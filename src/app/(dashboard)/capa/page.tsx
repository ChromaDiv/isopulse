// ============================================================
// IsoPulse — CAPA Command Center
// ============================================================

import React from 'react';
import { getCAPAActions } from '@/lib/data/queries';
import CAPAKanbanBoard from '@/components/capa/CAPAKanbanBoard';

export const dynamic = 'force-dynamic';

export default async function CAPAPage() {
  const capas = await getCAPAActions();

  // Aggregate stats
  const total = capas.length;
  const openCount = capas.filter((c) => c.status === 'Open').length;
  const inProgressCount = capas.filter((c) => c.status === 'In Progress').length;
  const verificationCount = capas.filter((c) => c.status === 'Verification').length;
  const closedCount = capas.filter((c) => c.status === 'Closed').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="animate-fade-in flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-sans">
            CAPA Command Center
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Clause 10 Improvement — Corrective and Preventive Actions stemming from Audit Non-Conformances
          </p>
        </div>
      </div>

      {/* Aggregate Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 animate-fade-in">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Actions</p>
          <p className="text-lg font-bold text-slate-800 mt-1">{total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm border-t-rose-500 border-t-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Open</p>
          <p className="text-lg font-bold text-slate-800 mt-1">{openCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm border-t-blue-500 border-t-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">In Progress</p>
          <p className="text-lg font-bold text-slate-800 mt-1">{inProgressCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm border-t-violet-500 border-t-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verification</p>
          <p className="text-lg font-bold text-slate-800 mt-1">{verificationCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm border-t-emerald-500 border-t-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Closed</p>
          <p className="text-lg font-bold text-slate-800 mt-1">{closedCount}</p>
        </div>
      </div>

      {/* Kanban Board */}
      <CAPAKanbanBoard initialCapas={capas} />
    </div>
  );
}
