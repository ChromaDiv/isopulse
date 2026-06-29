// ============================================================
// IsoPulse — Risk Register Server Actions
// ============================================================

'use server';

import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured, readMockDB, writeMockDB } from '@/lib/mock-db-helper';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

export async function createRisk(formData: FormData) {
  const description = formData.get('description') as string;
  const clause = formData.get('clause') as string;
  const likelihood = parseInt(formData.get('likelihood') as string, 10);
  const impact = parseInt(formData.get('impact') as string, 10);
  const mitigation_plan = formData.get('mitigation_plan') as string;
  const owner = formData.get('owner') as string;

  if (!description || !clause || !likelihood || !impact) {
    return { error: 'Description, clause, likelihood, and impact are required.' };
  }

  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      const newRisk = {
        id: crypto.randomUUID(),
        description,
        clause,
        likelihood,
        impact,
        risk_score: likelihood * impact,
        mitigation_plan: mitigation_plan || null,
        owner: owner || null,
        status: 'Active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      db.risk_register.unshift(newRisk);
      writeMockDB(db);
      revalidatePath('/clause-matrix');
      revalidatePath('/risk-register');
      return { success: true };
    } catch (err: any) {
      return { error: err.message || 'Failed to save mock risk.' };
    }
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from('risk_register').insert({
      description,
      clause,
      likelihood,
      impact,
      mitigation_plan: mitigation_plan || null,
      owner: owner || null,
      status: 'Active',
    });

    if (error) return { error: error.message };

    revalidatePath('/clause-matrix');
    revalidatePath('/risk-register');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Supabase risk creation failed.' };
  }
}

export async function updateRisk(id: string, formData: FormData) {
  const description = formData.get('description') as string;
  const clause = formData.get('clause') as string;
  const likelihood = parseInt(formData.get('likelihood') as string, 10);
  const impact = parseInt(formData.get('impact') as string, 10);
  const mitigation_plan = formData.get('mitigation_plan') as string;
  const owner = formData.get('owner') as string;
  const status = formData.get('status') as string;

  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      const idx = db.risk_register.findIndex((r) => r.id === id);
      if (idx > -1) {
        db.risk_register[idx] = {
          ...db.risk_register[idx],
          description,
          clause,
          likelihood,
          impact,
          risk_score: likelihood * impact,
          mitigation_plan: mitigation_plan || null,
          owner: owner || null,
          status: (status as any) || 'Active',
          updated_at: new Date().toISOString(),
        };
        writeMockDB(db);
      }
      revalidatePath('/clause-matrix');
      revalidatePath('/risk-register');
      return { success: true };
    } catch (err: any) {
      return { error: err.message || 'Failed to update mock risk.' };
    }
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('risk_register')
      .update({
        description,
        clause,
        likelihood,
        impact,
        mitigation_plan: mitigation_plan || null,
        owner: owner || null,
        status: status || 'Active',
      })
      .eq('id', id);

    if (error) return { error: error.message };

    revalidatePath('/clause-matrix');
    revalidatePath('/risk-register');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Supabase risk update failed.' };
  }
}

export async function deleteRisk(id: string) {
  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      db.risk_register = db.risk_register.filter((r) => r.id !== id);
      writeMockDB(db);
      revalidatePath('/clause-matrix');
      revalidatePath('/risk-register');
      return { success: true };
    } catch (err: any) {
      return { error: err.message || 'Failed to delete mock risk.' };
    }
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from('risk_register').delete().eq('id', id);

    if (error) return { error: error.message };

    revalidatePath('/clause-matrix');
    revalidatePath('/risk-register');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Supabase risk deletion failed.' };
  }
}
