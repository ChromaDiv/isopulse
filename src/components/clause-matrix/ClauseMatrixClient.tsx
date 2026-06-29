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

      {/* Detail & Evidence Log Pane (Right) */}
      <div className="lg:col-span-5 lg:sticky lg:top-6">
        <div className="pb-2">
          <h2 className="text-base font-semibold text-slate-900">Clause Details & Evidence</h2>
        </div>
        <ClauseDetailPane
          subclauseId={selectedSubclauseId}
          initialImplementation={currentImplementation}
          onSaveSuccess={handleSaveSuccess}
        />
      </div>
    </div>
  );
}
