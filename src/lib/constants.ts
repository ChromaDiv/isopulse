// ============================================================
// IsoPulse — Constants
// ISO 9001:2015 Clause Definitions, Enums, and Configuration
// ============================================================

export const ISO_CLAUSES = {
  '4': {
    title: 'Context of the Organization',
    subclauses: {
      '4.1': 'Understanding the Organization and its Context',
      '4.2': 'Understanding the Needs and Expectations of Interested Parties',
      '4.3': 'Determining the Scope of the QMS',
      '4.4': 'Quality Management System and its Processes',
    },
  },
  '5': {
    title: 'Leadership',
    subclauses: {
      '5.1': 'Leadership and Commitment',
      '5.2': 'Quality Policy',
      '5.3': 'Organizational Roles, Responsibilities and Authorities',
    },
  },
  '6': {
    title: 'Planning',
    subclauses: {
      '6.1': 'Actions to Address Risks and Opportunities',
      '6.2': 'Quality Objectives and Planning to Achieve Them',
      '6.3': 'Planning of Changes',
    },
  },
  '7': {
    title: 'Support',
    subclauses: {
      '7.1': 'Resources',
      '7.2': 'Competence',
      '7.3': 'Awareness',
      '7.4': 'Communication',
      '7.5': 'Documented Information',
    },
  },
  '8': {
    title: 'Operation',
    subclauses: {
      '8.1': 'Operational Planning and Control',
      '8.2': 'Requirements for Products and Services',
      '8.3': 'Design and Development',
      '8.4': 'Control of Externally Provided Processes, Products and Services',
      '8.5': 'Production and Service Provision',
      '8.6': 'Release of Products and Services',
      '8.7': 'Control of Nonconforming Outputs',
    },
  },
  '9': {
    title: 'Performance Evaluation',
    subclauses: {
      '9.1': 'Monitoring, Measurement, Analysis and Evaluation',
      '9.2': 'Internal Audit',
      '9.3': 'Management Review',
    },
  },
  '10': {
    title: 'Improvement',
    subclauses: {
      '10.1': 'General',
      '10.2': 'Nonconformity and Corrective Action',
      '10.3': 'Continual Improvement',
    },
  },
} as const;

export const DEPARTMENTS = [
  'Procurement',
  'Logistics',
  'Production',
  'Quality Assurance',
  'Human Resources',
  'Engineering',
  'Sales',
] as const;

export const AUDIT_STATUSES = ['Scheduled', 'In Progress', 'Completed'] as const;

export const AUDIT_ITEM_STATUSES = ['Pending', 'Conformant', 'Non-Conformant', 'OFI'] as const;

export const CAPA_STATUSES = ['Open', 'In Progress', 'Verification', 'Closed'] as const;

export const RISK_LIKELIHOOD_LABELS: Record<number, string> = {
  1: 'Rare',
  2: 'Unlikely',
  3: 'Possible',
  4: 'Likely',
  5: 'Almost Certain',
};

export const RISK_IMPACT_LABELS: Record<number, string> = {
  1: 'Negligible',
  2: 'Minor',
  3: 'Moderate',
  4: 'Major',
  5: 'Catastrophic',
};

export const APP_NAME = 'IsoPulse';
export const APP_TAGLINE = 'ISO 9001:2015 Quality Management System';
