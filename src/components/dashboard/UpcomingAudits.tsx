// ============================================================
// IsoPulse — UpcomingAudits Component
// Beautiful card containers of next scheduled internal audits
// ============================================================

'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Badge, { statusToVariant } from '@/components/ui/Badge';
import { Calendar, ArrowRight } from 'lucide-react';
import type { Audit } from '@/lib/types';

interface UpcomingAuditsProps {
  audits: Audit[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getDaysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  const diffMs = target.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export default function UpcomingAudits({ audits }: UpcomingAuditsProps) {
  return (
    <Card padding="none" className="animate-fade-in flex flex-col h-full bg-white border border-slate-200/80 rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8.5 h-8.5 rounded-lg bg-indigo-50 text-indigo-600">
            <Calendar className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 leading-tight">Upcoming Audits</h3>
            <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Next scheduled internal assessments</p>
          </div>
        </div>
        <button className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
          View all <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Cards Stack */}
      <div className="p-5 space-y-4 overflow-y-auto flex-1 max-h-[460px]">
        {audits.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
            <Calendar className="w-8 h-8 text-slate-400 mb-2" />
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">No Audits Scheduled</p>
          </div>
        ) : (
          audits.map((audit, index) => {
            const daysUntil = getDaysUntil(audit.scheduled_date);
            return (
              <div
                key={audit.id}
                className="group border border-slate-100 hover:border-indigo-100 hover:shadow-xs rounded-xl p-4 bg-slate-50/20 hover:bg-indigo-50/5 transition-all duration-200 animate-fade-in"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* Header info */}
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="inline-flex px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100/50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
                    Clause {audit.clause_targeted}
                  </span>
                  <Badge variant={statusToVariant(audit.status)} dot>
                    {audit.status}
                  </Badge>
                </div>

                {/* Audit Title */}
                <h4 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-indigo-900 transition-colors">
                  {audit.title}
                </h4>

                {/* Grid details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-3.5 pt-3 border-t border-slate-100/80 text-xs text-slate-500">
                  {/* Department */}
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Department</span>
                    <span className="font-semibold text-slate-700">{audit.department}</span>
                  </div>

                  {/* Auditor */}
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Auditor</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
                        {audit.auditor_name?.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-slate-700 truncate">{audit.auditor_name}</span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Schedule Date</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="font-medium text-slate-700">{formatDate(audit.scheduled_date)}</span>
                      {daysUntil > 0 && (
                        <span className="text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded-md font-bold ml-1.5 flex-shrink-0">
                          In {daysUntil}d
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}
