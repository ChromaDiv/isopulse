// ============================================================
// IsoPulse — Live Audit Execution Room
// ============================================================

import React from 'react';
import { getAuditById } from '@/lib/data/queries';
import LiveAuditInterface from '@/components/audits/LiveAuditInterface';
import { notFound } from 'next/navigation';

interface AuditExecutionPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export default async function AuditExecutionPage({ params }: AuditExecutionPageProps) {
  const resolvedParams = await params;
  const data = await getAuditById(resolvedParams.id);

  if (!data) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <LiveAuditInterface audit={data.audit} initialItems={data.items} />
    </div>
  );
}
