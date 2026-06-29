// ============================================================
// IsoPulse — Risk Register Page
// ============================================================

import React from 'react';
import RiskRegisterTable from '@/components/clause-matrix/RiskRegisterTable';
import { getRiskRegister } from '@/lib/data/queries';

export const dynamic = 'force-dynamic';

export default async function RiskRegisterPage() {
  const risks = await getRiskRegister();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Risk & Opportunity Register
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Clause 6.1 Actions to address risks and opportunities — Risk ratings and mitigations
        </p>
      </div>

      <RiskRegisterTable risks={risks} />
    </div>
  );
}
