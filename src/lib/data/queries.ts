// ============================================================
// IsoPulse — Data Fetching Layer
// Server-side queries with mock-data and local JSON DB fallback
// ============================================================

import { createClient } from '@/lib/supabase/server';
import { readMockDB, isSupabaseConfigured } from '@/lib/mock-db-helper';
import {
  mockDashboardStats,
  mockComplianceHealth,
  mockAuditTrend,
  mockActivity,
  mockUpcomingAudits,
  mockCAPAs,
  mockRisks,
} from '@/lib/mock-data';
import type {
  DashboardStats,
  ComplianceHealth,
  AuditTrendPoint,
  ActivityItem,
  Audit,
  CAPAAction,
  RiskRegisterEntry,
  AuditItem,
  ClauseImplementation,
} from '@/lib/types';
import { getAllSubClauses } from '@/lib/iso9001Data';

// ================================================================
// DASHBOARD QUERIES
// ================================================================

export async function getDashboardStats(): Promise<DashboardStats> {
  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      const activeAudits = db.audits.filter((a) => ['Scheduled', 'In Progress'].includes(a.status)).length;
      const openNCRs = db.audit_items.filter((i) => i.status === 'Non-Conformant').length;
      const overdueCAPAs = db.capa_actions.filter((c) => 
        ['Open', 'In Progress'].includes(c.status) && 
        new Date(c.due_date).getTime() < new Date().setHours(0, 0, 0, 0)
      ).length;

      return {
        activeAudits,
        openNCRs,
        overdueCAPAs,
        calibrationAlerts: 3, // Mock calibration equipment status
        activeAuditsTrend: 12.5,
        openNCRsTrend: -8.3,
        overdueCAPAsTrend: 25.0,
        calibrationAlertsTrend: 0,
      };
    } catch {
      return mockDashboardStats;
    }
  }

  try {
    const supabase = await createClient();

    const [auditsRes, ncrRes, capaRes] = await Promise.all([
      supabase
        .from('audits')
        .select('id', { count: 'exact' })
        .in('status', ['Scheduled', 'In Progress']),
      supabase
        .from('audit_items')
        .select('id', { count: 'exact' })
        .eq('status', 'Non-Conformant'),
      supabase
        .from('capa_actions')
        .select('id, due_date', { count: 'exact' })
        .in('status', ['Open', 'In Progress'])
        .lt('due_date', new Date().toISOString().split('T')[0]),
    ]);

    return {
      activeAudits: auditsRes.count ?? 0,
      openNCRs: ncrRes.count ?? 0,
      overdueCAPAs: capaRes.count ?? 0,
      calibrationAlerts: 3,
      activeAuditsTrend: 12.5,
      openNCRsTrend: -8.3,
      overdueCAPAsTrend: 25.0,
      calibrationAlertsTrend: 0,
    };
  } catch {
    return mockDashboardStats;
  }
}

export async function getComplianceHealth(): Promise<ComplianceHealth> {
  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      const items = db.audit_items.filter((i) => i.status !== 'Pending');

      if (!items || items.length === 0) {
        // If no items generated yet, fall back to showing a stable baseline
        return mockComplianceHealth;
      }

      const conformant = items.filter((i) => i.status === 'Conformant').length;
      const nonConformant = items.filter((i) => i.status === 'Non-Conformant').length;
      const ofi = items.filter((i) => i.status === 'OFI').length;
      const total = items.length;
      const score = total > 0 ? Math.round((conformant / total) * 1000) / 10 : 0;

      return { score, conformant, nonConformant, ofi, total };
    } catch {
      return mockComplianceHealth;
    }
  }

  try {
    const supabase = await createClient();
    const { data: items } = await supabase
      .from('audit_items')
      .select('status')
      .neq('status', 'Pending');

    if (!items || items.length === 0) return mockComplianceHealth;

    const conformant = items.filter((i) => i.status === 'Conformant').length;
    const nonConformant = items.filter((i) => i.status === 'Non-Conformant').length;
    const ofi = items.filter((i) => i.status === 'OFI').length;
    const total = items.length;
    const score = total > 0 ? Math.round((conformant / total) * 1000) / 10 : 0;

    return { score, conformant, nonConformant, ofi, total };
  } catch {
    return mockComplianceHealth;
  }
}

export async function getAuditTrend(): Promise<AuditTrendPoint[]> {
  if (!isSupabaseConfigured()) return mockAuditTrend;

  try {
    const supabase = await createClient();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const { data: audits } = await supabase
      .from('audits')
      .select('score, scheduled_date')
      .eq('status', 'Completed')
      .gte('scheduled_date', sixMonthsAgo.toISOString().split('T')[0])
      .order('scheduled_date', { ascending: true });

    if (!audits || audits.length === 0) return mockAuditTrend;

    const monthMap = new Map<string, { scores: number[]; count: number }>();
    audits.forEach((a) => {
      const d = new Date(a.scheduled_date);
      const key = d.toLocaleString('en-US', { month: 'short' });
      const existing = monthMap.get(key) || { scores: [], count: 0 };
      existing.scores.push(a.score ?? 0);
      existing.count++;
      monthMap.set(key, existing);
    });

    return Array.from(monthMap.entries()).map(([month, data]) => ({
      month,
      score: Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length),
      auditsCompleted: data.count,
    }));
  } catch {
    return mockAuditTrend;
  }
}

export async function getRecentActivity(): Promise<ActivityItem[]> {
  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      const activities: ActivityItem[] = [];

      db.audits.filter((a) => a.status === 'Completed').slice(0, 3).forEach((a) => {
        activities.push({
          id: `audit-${a.id}`,
          type: 'audit_completed',
          title: `${a.title} Completed`,
          description: `Internal audit scored ${a.score ?? 'N/A'}%.`,
          timestamp: new Date().toISOString(),
        });
      });

      db.capa_actions.slice(0, 3).forEach((c) => {
        activities.push({
          id: `capa-${c.id}`,
          type: c.status === 'Closed' ? 'capa_closed' : 'capa_opened',
          title: `${c.title || 'CAPA'} — ${c.status}`,
          description: `CAPA status updated to ${c.status}.`,
          timestamp: new Date().toISOString(),
        });
      });

      if (activities.length === 0) return mockActivity;
      return activities.slice(0, 5);
    } catch {
      return mockActivity;
    }
  }

  try {
    const supabase = await createClient();
    const activities: ActivityItem[] = [];

    const { data: completedAudits } = await supabase
      .from('audits')
      .select('id, title, score, updated_at')
      .eq('status', 'Completed')
      .order('updated_at', { ascending: false })
      .limit(3);

    completedAudits?.forEach((a) => {
      activities.push({
        id: `audit-${a.id}`,
        type: 'audit_completed',
        title: `${a.title} Completed`,
        description: `Internal audit scored ${a.score ?? 'N/A'}%.`,
        timestamp: a.updated_at,
      });
    });

    const { data: recentCapas } = await supabase
      .from('capa_actions')
      .select('id, title, status, updated_at')
      .order('updated_at', { ascending: false })
      .limit(3);

    recentCapas?.forEach((c) => {
      activities.push({
        id: `capa-${c.id}`,
        type: c.status === 'Closed' ? 'capa_closed' : 'capa_opened',
        title: `${c.title ?? 'CAPA'} — ${c.status}`,
        description: `CAPA status updated to ${c.status}.`,
        timestamp: c.updated_at,
      });
    });

    if (activities.length === 0) return mockActivity;

    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);
  } catch {
    return mockActivity;
  }
}

export async function getUpcomingAudits(): Promise<Audit[]> {
  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      const upcoming = db.audits
        .filter((a) => ['Scheduled', 'In Progress'].includes(a.status))
        .sort((a, b) => new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime())
        .slice(0, 5);
      return upcoming as Audit[];
    } catch {
      return mockUpcomingAudits;
    }
  }

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('audits')
      .select('*')
      .in('status', ['Scheduled', 'In Progress'])
      .order('scheduled_date', { ascending: true })
      .limit(5);

    if (!data || data.length === 0) return mockUpcomingAudits;
    return data as Audit[];
  } catch {
    return mockUpcomingAudits;
  }
}

// ================================================================
// MODULE QUERIES
// ================================================================

export async function getAudits(): Promise<Audit[]> {
  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      return db.audits.sort((a, b) => new Date(b.scheduled_date).getTime() - new Date(a.scheduled_date).getTime()) as Audit[];
    } catch {
      return mockUpcomingAudits;
    }
  }

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('audits')
      .select('*')
      .order('scheduled_date', { ascending: false });

    if (!data || data.length === 0) return mockUpcomingAudits;
    return data as Audit[];
  } catch {
    return mockUpcomingAudits;
  }
}

export async function getAuditById(id: string): Promise<{ audit: Audit; items: AuditItem[] } | null> {
  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      const audit = db.audits.find((a) => a.id === id);
      if (!audit) return null;
      const items = db.audit_items.filter((i) => i.audit_id === id);
      return {
        audit: audit as Audit,
        items: items as AuditItem[],
      };
    } catch {
      return null;
    }
  }

  try {
    const supabase = await createClient();
    const [auditRes, itemsRes] = await Promise.all([
      supabase.from('audits').select('*').eq('id', id).single(),
      supabase.from('audit_items').select('*').eq('audit_id', id).order('created_at', { ascending: true }),
    ]);

    if (!auditRes.data) return null;
    return {
      audit: auditRes.data as Audit,
      items: (itemsRes.data ?? []) as AuditItem[],
    };
  } catch {
    return null;
  }
}

export async function getCAPAActions(): Promise<CAPAAction[]> {
  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      return db.capa_actions as CAPAAction[];
    } catch {
      return mockCAPAs;
    }
  }

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('capa_actions')
      .select('*')
      .order('created_at', { ascending: false });

    if (!data || data.length === 0) return mockCAPAs;
    return data as CAPAAction[];
  } catch {
    return mockCAPAs;
  }
}

export async function getRiskRegister(): Promise<RiskRegisterEntry[]> {
  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      return db.risk_register as RiskRegisterEntry[];
    } catch {
      return mockRisks;
    }
  }

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('risk_register')
      .select('*')
      .order('risk_score', { ascending: false });

    if (!data || data.length === 0) return mockRisks;
    return data as RiskRegisterEntry[];
  } catch {
    return mockRisks;
  }
}

export async function getClauseImplementations(): Promise<ClauseImplementation[]> {
  let dbImplementations: any[] = [];

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data } = await supabase.from('clause_implementations').select('*');
      if (data) dbImplementations = data;
    } catch (err) {
      console.warn('Failed to fetch clause implementations from Supabase, falling back to local file', err);
    }
  }

  // Fallback to local DB if Supabase yields no records or is offline
  if (dbImplementations.length === 0) {
    try {
      const db = readMockDB();
      dbImplementations = db.clause_implementations || [];
    } catch {
      dbImplementations = [];
    }
  }

  const masterList = getAllSubClauses();
  const dbMap = new Map<string, ClauseImplementation>();
  dbImplementations.forEach((row: any) => {
    dbMap.set(row.clause_id, row as ClauseImplementation);
  });

  return masterList.map((sub) => {
    const existing = dbMap.get(sub.id);
    if (existing) return existing;

    // Seed defaults in-memory if not customized
    let status: 'Not Started' | 'In Progress' | 'Fully Implemented' = 'Not Started';
    const key = sub.id;
    if (['4.1', '4.2', '4.4', '5.1', '5.2', '7.1', '7.3', '7.4', '8.1', '8.2', '8.4', '8.5', '8.6', '9.1', '9.3', '10.1'].includes(key)) {
      status = 'Fully Implemented';
    } else if (['4.3', '5.3', '6.1', '7.2', '7.5', '8.3', '8.7', '9.2', '10.2'].includes(key)) {
      status = 'In Progress';
    }

    return {
      clause_id: sub.id,
      status,
      evidence_notes: status === 'Fully Implemented' ? `Documented compliance procedures for Clause ${sub.id} reviewed and active.` : null,
      evidence_file_url: null,
    };
  });
}
