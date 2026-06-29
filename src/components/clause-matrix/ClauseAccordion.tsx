// ============================================================
// IsoPulse — ClauseAccordion Component
// Expandable sections for each ISO 9001 clause group
// ============================================================

'use client';

import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, Circle, AlertTriangle } from 'lucide-react';
import { ISO_CLAUSES } from '@/lib/constants';
import type { ClauseImplementation } from '@/lib/types';

interface ClauseAccordionProps {
  clauseKey: string;
  implementations: ClauseImplementation[];
  selectedSubclauseId: string | null;
  onSelectSubclause: (id: string) => void;
}

const statusConfig = {
  'Fully Implemented': { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Implemented' },
  'In Progress': { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', label: 'In Progress' },
  'Not Started': { icon: Circle, color: 'text-slate-400', bg: 'bg-slate-50', label: 'Not Started' },
};

export default function ClauseAccordion({
  clauseKey,
  implementations,
  selectedSubclauseId,
  onSelectSubclause,
}: ClauseAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const clause = ISO_CLAUSES[clauseKey as keyof typeof ISO_CLAUSES];
  if (!clause) return null;

  const subclauses = Object.entries(clause.subclauses);
  const total = subclauses.length;

  const getSubclauseStatus = (subKey: string) => {
    const impl = implementations.find((i) => i.clause_id === subKey);
    return impl?.status || 'Not Started';
  };

  const implemented = subclauses.filter(([key]) => getSubclauseStatus(key) === 'Fully Implemented').length;
  const inProgress = subclauses.filter(([key]) => getSubclauseStatus(key) === 'In Progress').length;
  const progress = total > 0 ? Math.round((implemented / total) * 100) : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-200">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 px-5 py-4 sm:px-6 text-left hover:bg-slate-50/30 transition-colors"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 font-bold text-sm flex-shrink-0">
          {clauseKey}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-900">{clause.title}</h3>
          <div className="flex items-center gap-3 mt-1.5">
            {/* Progress bar */}
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-48">
              <div
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-indigo-500 to-emerald-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-slate-500 font-medium flex-shrink-0">
              {implemented}/{total} implemented
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {inProgress > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
              {inProgress} in progress
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="border-t border-slate-100 divide-y divide-slate-50 animate-fade-in">
          {subclauses.map(([key, title]) => {
            const status = getSubclauseStatus(key);
            const config = statusConfig[status];
            const StatusIcon = config.icon;
            const isSelected = selectedSubclauseId === key;

            return (
              <button
                key={key}
                onClick={() => onSelectSubclause(key)}
                className={`w-full flex items-center gap-3 px-5 py-3 sm:px-6 text-left hover:bg-indigo-50/20 transition-all ${
                  isSelected ? 'bg-indigo-50/40 border-r-2 border-indigo-500' : ''
                }`}
              >
                <div className={`flex items-center justify-center w-7 h-7 rounded-md ${config.bg}`}>
                  <StatusIcon className={`w-3.5 h-3.5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-slate-800 font-medium truncate">
                    <span className="font-bold text-slate-400 mr-1.5">{key}</span>
                    {title}
                  </p>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${config.bg} ${config.color} border border-current/10 flex-shrink-0`}>
                  {config.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
