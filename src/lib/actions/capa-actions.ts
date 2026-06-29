// ============================================================
// IsoPulse — CAPA Server Actions
// ============================================================

'use server';

import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured, readMockDB, writeMockDB } from '@/lib/mock-db-helper';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

export async function createCAPA(formData: FormData) {
  const finding_id = formData.get('finding_id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const root_cause = formData.get('root_cause') as string;
  const corrective_action = formData.get('corrective_action') as string;
  const assigned_to = formData.get('assigned_to') as string;
  const due_date = formData.get('due_date') as string;

  if (!finding_id || !assigned_to || !due_date) {
    return { error: 'Finding ID, assigned to, and due date are required.' };
  }

  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      const newCAPA = {
        id: crypto.randomUUID(),
        finding_id,
        title: title || null,
        description: description || null,
        root_cause: root_cause || null,
        corrective_action: corrective_action || null,
        assigned_to,
        due_date,
        status: 'Open',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      db.capa_actions.unshift(newCAPA);
      writeMockDB(db);
      revalidatePath('/capa');
      revalidatePath('/');
      return { success: true };
    } catch (err: any) {
      return { error: err.message || 'Failed to create mock CAPA.' };
    }
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from('capa_actions').insert({
      finding_id,
      title: title || null,
      description: description || null,
      root_cause: root_cause || null,
      corrective_action: corrective_action || null,
      assigned_to,
      due_date,
      status: 'Open',
    });

    if (error) return { error: error.message };

    revalidatePath('/capa');
    revalidatePath('/');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Supabase CAPA creation failed.' };
  }
}

export async function updateCAPAStatus(id: string, status: string) {
  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      const idx = db.capa_actions.findIndex((c) => c.id === id);
      if (idx > -1) {
        db.capa_actions[idx].status = status;
        db.capa_actions[idx].updated_at = new Date().toISOString();
        writeMockDB(db);
      }
      revalidatePath('/capa');
      revalidatePath('/');
      return { success: true };
    } catch (err: any) {
      return { error: err.message || 'Failed to update mock CAPA status.' };
    }
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('capa_actions')
      .update({ status })
      .eq('id', id);

    if (error) return { error: error.message };

    revalidatePath('/capa');
    revalidatePath('/');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Supabase CAPA status update failed.' };
  }
}

export async function updateCAPA(id: string, formData: FormData) {
  const updates: Record<string, unknown> = {};
  const fields = [
    'title', 'description', 'root_cause', 'corrective_action',
    'assigned_to', 'due_date', 'status', 'finding_id',
    'why_1', 'why_2', 'why_3', 'why_4', 'why_5',
  ];

  fields.forEach((field) => {
    const val = formData.get(field);
    if (val !== null) updates[field] = val as string;
  });

  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      const idx = db.capa_actions.findIndex((c) => c.id === id);
      if (idx > -1) {
        db.capa_actions[idx] = {
          ...db.capa_actions[idx],
          ...updates,
          updated_at: new Date().toISOString(),
        };
        writeMockDB(db);
      }
      revalidatePath('/capa');
      revalidatePath('/');
      return { success: true };
    } catch (err: any) {
      return { error: err.message || 'Failed to update mock CAPA.' };
    }
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('capa_actions')
      .update(updates)
      .eq('id', id);

    if (error) return { error: error.message };

    revalidatePath('/capa');
    revalidatePath('/');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Supabase CAPA update failed.' };
  }
}

export async function deleteCAPA(id: string) {
  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      db.capa_actions = db.capa_actions.filter((c) => c.id !== id);
      writeMockDB(db);
      revalidatePath('/capa');
      revalidatePath('/');
      return { success: true };
    } catch (err: any) {
      return { error: err.message || 'Failed to delete mock CAPA.' };
    }
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from('capa_actions').delete().eq('id', id);
    if (error) return { error: error.message };

    revalidatePath('/capa');
    revalidatePath('/');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Supabase CAPA deletion failed.' };
  }
}
