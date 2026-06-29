-- ============================================================
-- IsoPulse — Database Schema
-- ISO 9001:2015 Quality Management System
-- Supabase PostgreSQL
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE audit_status AS ENUM ('Scheduled', 'In Progress', 'Completed');
CREATE TYPE audit_item_status AS ENUM ('Pending', 'Conformant', 'Non-Conformant', 'OFI');
CREATE TYPE capa_status AS ENUM ('Open', 'In Progress', 'Verification', 'Closed');
CREATE TYPE risk_status AS ENUM ('Active', 'Mitigated', 'Accepted');

-- ============================================================
-- AUDITS TABLE (Clause 9.2 Internal Audit)
-- ============================================================

CREATE TABLE audits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  clause_targeted TEXT NOT NULL,
  department TEXT NOT NULL,
  auditor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  auditor_name TEXT,
  scheduled_date DATE NOT NULL,
  status audit_status DEFAULT 'Scheduled' NOT NULL,
  score NUMERIC(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for common queries
CREATE INDEX idx_audits_status ON audits(status);
CREATE INDEX idx_audits_scheduled_date ON audits(scheduled_date);
CREATE INDEX idx_audits_department ON audits(department);

-- ============================================================
-- AUDIT ITEMS TABLE (Individual audit checklist questions)
-- ============================================================

CREATE TABLE audit_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  audit_id UUID REFERENCES audits(id) ON DELETE CASCADE NOT NULL,
  question TEXT NOT NULL,
  status audit_item_status DEFAULT 'Pending' NOT NULL,
  evidence_notes TEXT,
  evidence_file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for efficient audit item lookups
CREATE INDEX idx_audit_items_audit_id ON audit_items(audit_id);
CREATE INDEX idx_audit_items_status ON audit_items(status);

-- ============================================================
-- CAPA ACTIONS TABLE (Clause 10 Improvement)
-- ============================================================

CREATE TABLE capa_actions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  finding_id TEXT NOT NULL,
  title TEXT,
  description TEXT,
  root_cause TEXT,
  corrective_action TEXT,
  assigned_to TEXT NOT NULL,
  due_date DATE NOT NULL,
  status capa_status DEFAULT 'Open' NOT NULL,
  -- 5 Whys methodology fields
  why_1 TEXT,
  why_2 TEXT,
  why_3 TEXT,
  why_4 TEXT,
  why_5 TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for CAPA queries
CREATE INDEX idx_capa_status ON capa_actions(status);
CREATE INDEX idx_capa_due_date ON capa_actions(due_date);
CREATE INDEX idx_capa_assigned_to ON capa_actions(assigned_to);

-- ============================================================
-- RISK REGISTER TABLE (Clause 6.1)
-- ============================================================

CREATE TABLE risk_register (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  description TEXT NOT NULL,
  clause TEXT NOT NULL,
  likelihood INTEGER NOT NULL CHECK (likelihood BETWEEN 1 AND 5),
  impact INTEGER NOT NULL CHECK (impact BETWEEN 1 AND 5),
  risk_score INTEGER GENERATED ALWAYS AS (likelihood * impact) STORED,
  mitigation_plan TEXT,
  owner TEXT,
  status risk_status DEFAULT 'Active' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for risk queries
CREATE INDEX idx_risk_status ON risk_register(status);
CREATE INDEX idx_risk_score ON risk_register(risk_score);

-- ============================================================
-- AUTO-UPDATE TIMESTAMPS
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_audits_updated_at
  BEFORE UPDATE ON audits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_capa_updated_at
  BEFORE UPDATE ON capa_actions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_risk_updated_at
  BEFORE UPDATE ON risk_register
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ROW LEVEL SECURITY (scaffolded, policies disabled for dev)
-- ============================================================

ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE capa_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_register ENABLE ROW LEVEL SECURITY;

-- Dev-mode: allow all authenticated users full access
-- Replace with granular policies for production
CREATE POLICY "Allow all for authenticated users" ON audits
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON audit_items
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON capa_actions
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all for authenticated users" ON risk_register
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- CLAUSE IMPLEMENTATIONS TABLE (Clause Matrix Tracking)
-- ============================================================

CREATE TABLE clause_implementations (
  clause_id TEXT PRIMARY KEY,
  status TEXT CHECK (status IN ('Not Started', 'In Progress', 'Fully Implemented')) DEFAULT 'Not Started' NOT NULL,
  evidence_notes TEXT,
  evidence_file_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for clause implementations
CREATE INDEX idx_clause_implementations_status ON clause_implementations(status);

-- Auto-update updated_at for clause_implementations
CREATE TRIGGER update_clause_implementations_updated_at
  BEFORE UPDATE ON clause_implementations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE clause_implementations ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users full access in dev mode
CREATE POLICY "Allow all for authenticated users" ON clause_implementations
  FOR ALL USING (auth.role() = 'authenticated');

