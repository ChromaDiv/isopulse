// ============================================================
// IsoPulse — Audit Server Actions
// ============================================================

'use server';

import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured, readMockDB, writeMockDB } from '@/lib/mock-db-helper';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

export async function createAudit(formData: FormData) {
  const title = formData.get('title') as string;
  const department = formData.get('department') as string;
  const clause_targeted = formData.get('clause_targeted') as string;
  const auditor_name = formData.get('auditor_name') as string;
  const scheduled_date = formData.get('scheduled_date') as string;
  const questionsRaw = formData.get('questions') as string;

  if (!title || !department || !clause_targeted || !scheduled_date) {
    return { error: 'Title, department, clause, and date are required.' };
  }

  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      const auditId = crypto.randomUUID();

      const newAudit = {
        id: auditId,
        title,
        department,
        clause_targeted,
        auditor_name: auditor_name || null,
        scheduled_date,
        status: 'Scheduled',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      db.audits.unshift(newAudit);

      if (questionsRaw) {
        const questions = JSON.parse(questionsRaw) as string[];
        questions.forEach((q) => {
          db.audit_items.push({
            id: crypto.randomUUID(),
            audit_id: auditId,
            question: q,
            status: 'Pending',
            evidence_notes: null,
            evidence_file_url: null,
            created_at: new Date().toISOString(),
          });
        });
      }

      writeMockDB(db);
      revalidatePath('/audits');
      revalidatePath('/');
      return { success: true, auditId };
    } catch (err: any) {
      return { error: err.message || 'Failed to create mock audit.' };
    }
  }

  try {
    const supabase = await createClient();

    // Create the audit
    const { data: audit, error: auditError } = await supabase
      .from('audits')
      .insert({
        title,
        department,
        clause_targeted,
        auditor_name: auditor_name || null,
        scheduled_date,
        status: 'Scheduled',
      })
      .select()
      .single();

    if (auditError) return { error: auditError.message };

    // Create audit items (checklist questions)
    if (questionsRaw) {
      const questions = JSON.parse(questionsRaw) as string[];
      if (questions.length > 0) {
        const items = questions.map((q) => ({
          audit_id: audit.id,
          question: q,
          status: 'Pending' as const,
        }));

        const { error: itemsError } = await supabase.from('audit_items').insert(items);
        if (itemsError) return { error: itemsError.message };
      }
    }

    revalidatePath('/audits');
    revalidatePath('/');
    return { success: true, auditId: audit.id };
  } catch (err: any) {
    return { error: err.message || 'Supabase audit creation failed.' };
  }
}

export async function updateAuditStatus(id: string, status: string) {
  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      const idx = db.audits.findIndex((a) => a.id === id);
      if (idx > -1) {
        const updateData: any = { status };
        if (status === 'Completed') {
          const items = db.audit_items.filter((i) => i.audit_id === id);
          if (items.length > 0) {
            const assessed = items.filter((i) => i.status !== 'Pending');
            const conformant = items.filter((i) => i.status === 'Conformant');
            if (assessed.length > 0) {
              updateData.score = Math.round((conformant.length / assessed.length) * 100 * 100) / 100;
            }
          }
        }
        db.audits[idx] = {
          ...db.audits[idx],
          ...updateData,
          updated_at: new Date().toISOString(),
        };
        writeMockDB(db);
      }
      revalidatePath('/audits');
      revalidatePath(`/audits/${id}`);
      revalidatePath('/');
      return { success: true };
    } catch (err: any) {
      return { error: err.message || 'Failed to update mock audit status.' };
    }
  }

  try {
    const supabase = await createClient();
    const updateData: Record<string, unknown> = { status };

    if (status === 'Completed') {
      const { data: items } = await supabase
        .from('audit_items')
        .select('status')
        .eq('audit_id', id);

      if (items && items.length > 0) {
        const assessed = items.filter((i) => i.status !== 'Pending');
        const conformant = items.filter((i) => i.status === 'Conformant');
        if (assessed.length > 0) {
          updateData.score = Math.round((conformant.length / assessed.length) * 100 * 100) / 100;
        }
      }
    }

    const { error } = await supabase.from('audits').update(updateData).eq('id', id);

    if (error) return { error: error.message };

    revalidatePath('/audits');
    revalidatePath(`/audits/${id}`);
    revalidatePath('/');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Supabase audit status update failed.' };
  }
}

export async function deleteAudit(id: string) {
  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      db.audits = db.audits.filter((a) => a.id !== id);
      db.audit_items = db.audit_items.filter((i) => i.audit_id !== id);
      writeMockDB(db);
      revalidatePath('/audits');
      revalidatePath('/');
      return { success: true };
    } catch (err: any) {
      return { error: err.message || 'Failed to delete mock audit.' };
    }
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from('audits').delete().eq('id', id);
    if (error) return { error: error.message };

    revalidatePath('/audits');
    revalidatePath('/');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Supabase audit deletion failed.' };
  }
}
