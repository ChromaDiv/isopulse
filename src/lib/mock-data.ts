// ============================================================
// IsoPulse — Mock Data
// Realistic sample data for dashboard and module development
// ============================================================

import type {
  Audit,
  CAPAAction,
  RiskRegisterEntry,
  DashboardStats,
  ComplianceHealth,
  AuditTrendPoint,
  ActivityItem,
} from './types';

// ----- Dashboard Stats -----

export const mockDashboardStats: DashboardStats = {
  activeAudits: 4,
  openNCRs: 7,
  overdueCAPAs: 2,
  calibrationAlerts: 3,
  activeAuditsTrend: 12.5,
  openNCRsTrend: -8.3,
  overdueCAPAsTrend: 25.0,
  calibrationAlertsTrend: 0,
};

// ----- Compliance Health -----

export const mockComplianceHealth: ComplianceHealth = {
  score: 87.4,
  conformant: 142,
  nonConformant: 12,
  ofi: 9,
  total: 163,
};

// ----- Audit Trend (Last 6 months) -----

export const mockAuditTrend: AuditTrendPoint[] = [
  { month: 'Jan', score: 78, auditsCompleted: 3 },
  { month: 'Feb', score: 82, auditsCompleted: 2 },
  { month: 'Mar', score: 79, auditsCompleted: 4 },
  { month: 'Apr', score: 85, auditsCompleted: 3 },
  { month: 'May', score: 88, auditsCompleted: 5 },
  { month: 'Jun', score: 87, auditsCompleted: 4 },
];

// ----- Recent Activity -----

export const mockActivity: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'audit_completed',
    title: 'Production Line Audit Completed',
    description: 'Internal audit of Production Dept. scored 92% — 2 OFIs identified.',
    timestamp: '2026-06-28T14:30:00Z',
  },
  {
    id: 'act-2',
    type: 'ncr_raised',
    title: 'NCR #2024-037 Raised',
    description: 'Non-conformance in Supplier Qualification records (Clause 8.4).',
    timestamp: '2026-06-27T09:15:00Z',
  },
  {
    id: 'act-3',
    type: 'capa_closed',
    title: 'CAPA-019 Verified & Closed',
    description: 'Corrective action for calibration drift in CMM equipment verified effective.',
    timestamp: '2026-06-26T16:45:00Z',
  },
  {
    id: 'act-4',
    type: 'capa_opened',
    title: 'CAPA-021 Initiated',
    description: 'Root cause analysis started for recurring packaging defect in Logistics.',
    timestamp: '2026-06-25T11:00:00Z',
  },
  {
    id: 'act-5',
    type: 'risk_updated',
    title: 'Risk Register Updated',
    description: 'Supply chain disruption risk (R-008) likelihood upgraded from 3 to 4.',
    timestamp: '2026-06-24T08:30:00Z',
  },
];

// ----- Upcoming Audits -----

export const mockUpcomingAudits: Audit[] = [
  {
    id: 'aud-1',
    title: 'Procurement Process Review',
    clause_targeted: '8.4',
    department: 'Procurement',
    auditor_id: 'usr-1',
    auditor_name: 'Sarah Chen',
    scheduled_date: '2026-07-05',
    status: 'Scheduled',
  },
  {
    id: 'aud-2',
    title: 'Document Control Assessment',
    clause_targeted: '7.5',
    department: 'Quality Assurance',
    auditor_id: 'usr-2',
    auditor_name: 'James Rivera',
    scheduled_date: '2026-07-08',
    status: 'Scheduled',
  },
  {
    id: 'aud-3',
    title: 'Warehouse Operations Audit',
    clause_targeted: '8.5',
    department: 'Logistics',
    auditor_id: 'usr-3',
    auditor_name: 'Amira Patel',
    scheduled_date: '2026-07-12',
    status: 'Scheduled',
  },
  {
    id: 'aud-4',
    title: 'Training Records Compliance',
    clause_targeted: '7.2',
    department: 'Human Resources',
    auditor_id: 'usr-1',
    auditor_name: 'Sarah Chen',
    scheduled_date: '2026-07-15',
    status: 'In Progress',
  },
  {
    id: 'aud-5',
    title: 'Management Review Prep',
    clause_targeted: '9.3',
    department: 'Quality Assurance',
    auditor_id: 'usr-2',
    auditor_name: 'James Rivera',
    scheduled_date: '2026-07-20',
    status: 'Scheduled',
  },
];

// ----- CAPA Actions -----

export const mockCAPAs: CAPAAction[] = [
  {
    id: 'capa-1',
    finding_id: 'ncr-2024-033',
    title: 'Supplier Qualification Gap',
    description: 'Missing approved supplier list documentation for 3 critical vendors.',
    root_cause: 'Outdated supplier onboarding procedure not aligned with ISO 8.4 requirements.',
    corrective_action: 'Revise supplier qualification procedure and re-evaluate all active suppliers.',
    assigned_to: 'Sarah Chen',
    due_date: '2026-07-10',
    status: 'In Progress',
    why_1: 'Why were supplier records incomplete?',
    why_2: 'Why was the onboarding checklist not followed?',
    why_3: 'Why was the checklist outdated?',
    why_4: 'Why was it not reviewed during last management review?',
    why_5: 'Why is there no scheduled review cycle for procedures?',
  },
  {
    id: 'capa-2',
    finding_id: 'ncr-2024-035',
    title: 'Calibration Schedule Drift',
    description: 'CMM equipment calibration overdue by 15 days.',
    root_cause: 'Manual tracking spreadsheet not flagging upcoming due dates.',
    corrective_action: 'Implement automated calibration tracking with email alerts.',
    assigned_to: 'James Rivera',
    due_date: '2026-07-05',
    status: 'Open',
  },
  {
    id: 'capa-3',
    finding_id: 'ncr-2024-030',
    title: 'Packaging Defect Recurrence',
    description: 'Repeated packaging integrity failures in shipping department.',
    root_cause: 'Inadequate training on revised packaging specifications.',
    corrective_action: 'Conduct refresher training and update work instructions.',
    assigned_to: 'Amira Patel',
    due_date: '2026-06-28',
    status: 'Verification',
  },
  {
    id: 'capa-4',
    finding_id: 'ncr-2024-028',
    title: 'Customer Complaint Response Delay',
    description: 'Average complaint resolution time exceeded 10-day target.',
    root_cause: 'No escalation mechanism for complaints older than 5 days.',
    corrective_action: 'Implement automated escalation workflow with assigned owners.',
    assigned_to: 'Sarah Chen',
    due_date: '2026-06-20',
    status: 'Closed',
  },
];

// ----- Risk Register -----

export const mockRisks: RiskRegisterEntry[] = [
  {
    id: 'risk-1',
    description: 'Single-source dependency for critical raw materials.',
    clause: '8.4',
    likelihood: 4,
    impact: 5,
    risk_score: 20,
    mitigation_plan: 'Qualify secondary suppliers; maintain 30-day safety stock.',
    owner: 'Procurement Lead',
    status: 'Active',
  },
  {
    id: 'risk-2',
    description: 'Key personnel turnover affecting process knowledge.',
    clause: '7.2',
    likelihood: 3,
    impact: 4,
    risk_score: 12,
    mitigation_plan: 'Cross-training program; updated work instructions and SOPs.',
    owner: 'HR Manager',
    status: 'Active',
  },
  {
    id: 'risk-3',
    description: 'Regulatory changes impacting product specifications.',
    clause: '4.1',
    likelihood: 2,
    impact: 4,
    risk_score: 8,
    mitigation_plan: 'Regulatory monitoring service; quarterly compliance review.',
    owner: 'Quality Manager',
    status: 'Mitigated',
  },
  {
    id: 'risk-4',
    description: 'Inadequate server infrastructure for QMS documentation.',
    clause: '7.5',
    likelihood: 2,
    impact: 3,
    risk_score: 6,
    mitigation_plan: 'Cloud migration planned; daily backups in place.',
    owner: 'IT Manager',
    status: 'Mitigated',
  },
];
