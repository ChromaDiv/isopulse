// ============================================================
// IsoPulse — ISO 9001 Clause Matrix & Risk Register
// ============================================================

import React from 'react';
import ClauseMatrixClient from '@/components/clause-matrix/ClauseMatrixClient';
import RiskRegisterTable from '@/components/clause-matrix/RiskRegisterTable';
import { getRiskRegister, getClauseImplementations } from '@/lib/data/queries';

export const dynamic = 'force-dynamic';

export default async function ClauseMatrixPage() {
  const [risks, implementations] = await Promise.all([
    getRiskRegister(),
    getClauseImplementations(),
  ]);

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-sans">
          ISO 9001:2015 Clause Implementation Matrix
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Interactive requirement tracker and operational risk registry (Clauses 4 to 10)
        </p>
      </div>

      {/* Clause Tracker Split Layout */}
      <div className="animate-fade-in">
        <ClauseMatrixClient initialImplementations={implementations} />
      </div>

      {/* Risk Register Table */}
      <div className="animate-fade-in pt-4">
        <RiskRegisterTable risks={risks} />
      </div>
    </div>
  );
}
