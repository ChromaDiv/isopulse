// ============================================================
// IsoPulse — AuditListClient Component
// Client logic for filtering internal audits and opening create modal
// ============================================================

'use client';

import React, { useState } from 'react';
import type { Audit } from '@/lib/types';
import AuditCard from './AuditCard';
import CreateAuditModal from './CreateAuditModal';
import { Plus, ClipboardCheck, Search } from 'lucide-react';

interface AuditListClientProps {
  initialAudits: Audit[];
}

type FilterStatus = 'All' | 'Scheduled' | 'In Progress' | 'Completed';

export default function AuditListClient({ initialAudits }: AuditListClientProps) {
  const [filter, setFilter] = useState<FilterStatus>('All');
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredAudits = initialAudits.filter((audit) => {
    const matchesStatus = filter === 'All' || audit.status === filter;
    const matchesSearch =
      audit.title.toLowerCase().includes(search.toLowerCase()) ||
      audit.department.toLowerCase().includes(search.toLowerCase()) ||
      audit.clause_targeted.includes(search);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, dept, or clause..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 placeholder:text-slate-400 transition-shadow"
          />
        </div>

        {/* Filters and CTA */}
        <div className="flex items-center justify-between md:justify-end gap-3 flex-wrap">
          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-semibold">
            {(['All', 'Scheduled', 'In Progress', 'Completed'] as FilterStatus[]).map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  filter === st ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Schedule Audit
          </button>
        </div>
      </div>

      {/* Grid */}
      {filteredAudits.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200/80 p-12 text-center flex flex-col items-center">
          <ClipboardCheck className="w-12 h-12 text-slate-300 mb-3" />
          <p className="text-sm font-semibold text-slate-800">No audits found</p>
          <p className="text-xs text-slate-500 mt-1 max-w-xs">
            Try adjusting your search criteria or schedule a new internal audit to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredAudits.map((audit) => (
            <AuditCard key={audit.id} audit={audit} />
          ))}
        </div>
      )}

      {/* Create Modal */}
      {isCreateOpen && (
        <CreateAuditModal onClose={() => setIsCreateOpen(false)} />
      )}
    </div>
  );
}
