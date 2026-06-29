// ============================================================
// IsoPulse — Local JSON Mock Database Helper
// Persistent local storage fallback when Supabase is offline
// ============================================================

import fs from 'fs';
import path from 'path';

const MOCK_DB_FILE = path.join(process.cwd(), 'src/lib/mock-db.json');

import { mockUpcomingAudits, mockCAPAs, mockRisks } from './mock-data';

export interface MockDBData {
  clause_implementations: any[];
  audits: any[];
  audit_items: any[];
  capa_actions: any[];
  risk_register: any[];
}

export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

function getInitialData(): MockDBData {
  return {
    clause_implementations: [],
    audits: mockUpcomingAudits || [],
    audit_items: [],
    capa_actions: mockCAPAs || [],
    risk_register: mockRisks || [],
  };
}

export function readMockDB(): MockDBData {
  try {
    // If the file does not exist, initialize it
    if (!fs.existsSync(MOCK_DB_FILE)) {
      const initial = getInitialData();
      fs.writeFileSync(MOCK_DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const content = fs.readFileSync(MOCK_DB_FILE, 'utf-8');
    if (!content.trim()) {
      return getInitialData();
    }
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading mock db file, returning empty state', err);
    return getInitialData();
  }
}

export function writeMockDB(data: MockDBData) {
  try {
    const dir = path.dirname(MOCK_DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(MOCK_DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing mock db file', err);
  }
}
