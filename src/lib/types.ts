// ============================================================
// IsoPulse — Type Definitions
// ISO 9001:2015 Quality Management System
// ============================================================

// ----- Enums -----

export type AuditStatus = 'Scheduled' | 'In Progress' | 'Completed';

export type AuditItemStatus = 'Pending' | 'Conformant' | 'Non-Conformant' | 'OFI';

export type CAPAStatus = 'Open' | 'In Progress' | 'Verification' | 'Closed';

export type RiskLikelihood = 1 | 2 | 3 | 4 | 5;

export type RiskImpact = 1 | 2 | 3 | 4 | 5;

export type Department =
  | 'Procurement'
  | 'Logistics'
  | 'Production'
  | 'Quality Assurance'
  | 'Human Resources'
  | 'Engineering'
  | 'Sales';

export type ISOClause =
  | '4'
  | '4.1'
  | '4.2'
  | '4.3'
  | '4.4'
  | '5'
  | '5.1'
  | '5.2'
  | '5.3'
  | '6'
  | '6.1'
  | '6.2'
  | '6.3'
  | '7'
  | '7.1'
  | '7.2'
  | '7.3'
  | '7.4'
  | '7.5'
  | '8'
  | '8.1'
  | '8.2'
  | '8.3'
  | '8.4'
  | '8.5'
  | '8.6'
  | '8.7'
  | '9'
  | '9.1'
  | '9.2'
  | '9.3'
  | '10'
  | '10.1'
  | '10.2'
  | '10.3';

export interface ClauseImplementation {
  clause_id: string;
  status: 'Not Started' | 'In Progress' | 'Fully Implemented';
  evidence_notes: string | null;
  evidence_file_url: string | null;
  updated_at?: string;
}

// ----- Database Models -----

export interface Audit {
  id: string;
  title: string;
  clause_targeted: ISOClause;
  department: Department;
  auditor_id: string;
  auditor_name?: string;
  scheduled_date: string;
  status: AuditStatus;
  score?: number;
  created_at?: string;
  updated_at?: string;
}

export interface AuditItem {
  id: string;
  audit_id: string;
  question: string;
  status: AuditItemStatus;
  evidence_notes: string | null;
  evidence_file_url: string | null;
  created_at?: string;
}

export interface CAPAAction {
  id: string;
  finding_id: string;
  title?: string;
  description?: string;
  root_cause: string;
  corrective_action: string;
  assigned_to: string;
  due_date: string;
  status: CAPAStatus;
  why_1?: string;
  why_2?: string;
  why_3?: string;
  why_4?: string;
  why_5?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RiskRegisterEntry {
  id: string;
  description: string;
  clause: ISOClause;
  likelihood: RiskLikelihood;
  impact: RiskImpact;
  risk_score?: number;
  mitigation_plan: string;
  owner?: string;
  status?: 'Active' | 'Mitigated' | 'Accepted';
  created_at?: string;
  updated_at?: string;
}

// ----- Dashboard Types -----

export interface DashboardStats {
  activeAudits: number;
  openNCRs: number;
  overdueCAPAs: number;
  calibrationAlerts: number;
  activeAuditsTrend: number;
  openNCRsTrend: number;
  overdueCAPAsTrend: number;
  calibrationAlertsTrend: number;
}

export interface ComplianceHealth {
  score: number;
  conformant: number;
  nonConformant: number;
  ofi: number;
  total: number;
}

export interface AuditTrendPoint {
  month: string;
  score: number;
  auditsCompleted: number;
}

export interface ActivityItem {
  id: string;
  type: 'audit_completed' | 'ncr_raised' | 'capa_closed' | 'capa_opened' | 'risk_updated';
  title: string;
  description: string;
  timestamp: string;
  status?: string;
}

// ----- Navigation -----

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}
