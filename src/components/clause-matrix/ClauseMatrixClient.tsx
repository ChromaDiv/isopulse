// ============================================================
// IsoPulse — ClauseMatrixClient Component
// Client-side state manager for split accordion and details layout
// ============================================================

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ClauseImplementation } from '@/lib/types';
import ClauseAccordion from './ClauseAccordion';
import ClauseDetailPane from './ClauseDetailPane';

interface ClauseMatrixClientProps {
  initialImplementations: ClauseImplementation[];
}

export default function ClauseMatrixClient({ initialImplementations }: ClauseMatrixClientProps) {
  const [selectedSubclauseId, setSelectedSubclauseId] = useState<string | null>(null);
  const router = useRouter();

  // Find implementation record for selected sub-clause
  const currentImplementation = selectedSubclauseId
    ? initialImplementations.find((impl) => impl.clause_id === selectedSubclauseId) || null
    : null;

  const handleSaveSuccess = () => {
    // Refresh Next.js server components state
    router.refresh();
  };

  const mainClauses = ['4', '5', '6', '7', '8', '9', '10'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Accordion Directory (Left) */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center justify-between pb-2">
          <h2 className="text-base font-semibold text-slate-900">Standard Clauses directory</h2>
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200/50 uppercase tracking-wider">
            Clauses 4 to 10
          </span>
        </div>
        <div className="space-y-3">
          {mainClauses.map((clauseKey) => {
            // Filter implementations that belong to this main clause (e.g. clause_id starts with '4.')
            const clauseImpls = initialImplementations.filter((impl) =>
              impl.clause_id.startsWith(`${clauseKey}.`)
            );

            return (
              <ClauseAccordion
                key={clauseKey}
                clauseKey={clauseKey}
                implementations={clauseImpls}
                selectedSubclauseId={selectedSubclauseId}
                onSelectSubclause={setSelectedSubclauseId}
              />
            );
          })}
        </div>
      </div>

      {/* Detail & Evidence Log Pane (Right) - Desktop/Tablet Landscape View */}
      <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-6">
        <div className="pb-2">
          <h2 className="text-base font-semibold text-slate-900">Clause Details & Evidence</h2>
        </div>
        <ClauseDetailPane
          subclauseId={selectedSubclauseId}
          initialImplementation={currentImplementation}
          onSaveSuccess={handleSaveSuccess}
        />
      </div>

      {/* Mobile/Tablet Portrait Detail View - Drawer Overlay */}
      {selectedSubclauseId && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          {/* Backdrop click close */}
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedSubclauseId(null)} />
          
          <div className="bg-white rounded-t-2xl shadow-xl max-h-[85vh] overflow-y-auto flex flex-col transform transition-transform duration-300 animate-slide-up">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Clause Details & Evidence</h3>
              <button
                onClick={() => setSelectedSubclauseId(null)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto">
              <ClauseDetailPane
                subclauseId={selectedSubclauseId}
                initialImplementation={currentImplementation}
                onSaveSuccess={() => {
                  handleSaveSuccess();
                  setSelectedSubclauseId(null); // Close drawer after save on mobile for cleaner UX
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
