// ============================================================
// IsoPulse — Clause Implementation Server Actions
// ============================================================

'use server';

import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured, readMockDB, writeMockDB } from '@/lib/mock-db-helper';
import { revalidatePath } from 'next/cache';

export async function upsertClauseImplementation(
  clauseId: string,
  status: 'Not Started' | 'In Progress' | 'Fully Implemented',
  evidenceNotes: string | null,
  evidenceFileUrl: string | null
) {
  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      const existingIdx = db.clause_implementations.findIndex((impl) => impl.clause_id === clauseId);
      
      const updatedRow = {
        clause_id: clauseId,
        status,
        evidence_notes: evidenceNotes || null,
        evidence_file_url: evidenceFileUrl || null,
        updated_at: new Date().toISOString(),
      };

      if (existingIdx > -1) {
        db.clause_implementations[existingIdx] = updatedRow;
      } else {
        db.clause_implementations.push(updatedRow);
      }

      writeMockDB(db);
      revalidatePath('/clause-matrix');
      return { success: true };
    } catch (err: any) {
      return { error: err.message || 'Failed to save mock clause implementation.' };
    }
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase.from('clause_implementations').upsert({
      clause_id: clauseId,
      status,
      evidence_notes: evidenceNotes || null,
      evidence_file_url: evidenceFileUrl || null,
    }, {
      onConflict: 'clause_id'
    });

    if (error) {
      return { error: error.message };
    }

    revalidatePath('/clause-matrix');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Supabase upsert failed.' };
  }
}
