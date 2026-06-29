// ============================================================
// IsoPulse — Help & Documentation Page
// ============================================================

import React from 'react';
import Card from '@/components/ui/Card';
import { ISO_9001_2015_MASTER } from '@/lib/iso9001Data';
import {
  HelpCircle,
  BookOpen,
  ClipboardCheck,
  ShieldAlert,
  ArrowRight,
  ChevronRight,
  Bookmark,
} from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-sans">
            Help & Documentation
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Learn standard workflows, audit methodology, and reference ISO 9001:2015 QMS requirements
          </p>
        </div>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
        <Card padding="md" className="flex flex-col justify-between" hover>
          <div>
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 mb-4">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-2">Clause Matrix Guide</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Track the implementation progress of standard requirements. Review sub-clause definitions and map documented compliance evidence in one matrix directory.
            </p>
          </div>
          <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
            Explore Matrix
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Card>

        <Card padding="md" className="flex flex-col justify-between" hover>
          <div>
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 mb-4">
              <ClipboardCheck className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-2">Smart Audit Planner</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Schedule internal audits targeting specific QMS clauses. Live Audit Mode populates pre-built standard questions and logs conformant, non-conformant, or OFI results.
            </p>
          </div>
          <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
            Schedule Audit
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Card>

        <Card padding="md" className="flex flex-col justify-between" hover>
          <div>
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-rose-50 text-rose-600 mb-4">
              <ShieldAlert className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-2">CAPA Command Center</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Log corrective actions stemming from audit findings. Use the guided "5 Whys" root cause analysis panel to systematically eliminate failures and prevent recurrence.
            </p>
          </div>
          <div className="text-xs font-semibold text-rose-600 flex items-center gap-1">
            Open Kanban Board
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Card>
      </div>

      {/* ISO 9001 Reference Sections */}
      <div className="space-y-4 animate-fade-in">
        <h3 className="text-base font-semibold text-slate-900">ISO 9001:2015 Clause Reference Manual</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(ISO_9001_2015_MASTER).map(([key, clause]) => (
            <Card key={key} padding="md" className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                  Clause {key}
                </span>
                <h4 className="text-sm font-bold text-slate-800 truncate">{clause.title}</h4>
              </div>
              
              <div className="space-y-1.5">
                {Object.values(clause.subclauses).map((sub) => (
                  <div key={sub.id} className="flex items-start gap-2 text-xs text-slate-500 hover:text-slate-700">
                    <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-indigo-500 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-700 mr-1">{sub.id}</span>
                      {sub.title}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
