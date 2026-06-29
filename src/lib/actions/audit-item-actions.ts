// ============================================================
// IsoPulse — Audit Item Server Actions
// ============================================================

'use server';

import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured, readMockDB, writeMockDB } from '@/lib/mock-db-helper';
import { revalidatePath } from 'next/cache';

export async function updateAuditItemStatus(
  itemId: string,
  auditId: string,
  status: 'Pending' | 'Conformant' | 'Non-Conformant' | 'OFI'
) {
  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      const idx = db.audit_items.findIndex((item) => item.id === itemId);
      if (idx > -1) {
        db.audit_items[idx].status = status;
        writeMockDB(db);
      }
      revalidatePath(`/audits/${auditId}`);
      return { success: true };
    } catch (err: any) {
      return { error: err.message || 'Failed to update mock item status.' };
    }
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('audit_items')
      .update({ status })
      .eq('id', itemId);

    if (error) return { error: error.message };

    revalidatePath(`/audits/${auditId}`);
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Supabase item status update failed.' };
  }
}

export async function updateAuditItemEvidence(
  itemId: string,
  auditId: string,
  evidenceNotes: string
) {
  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      const idx = db.audit_items.findIndex((item) => item.id === itemId);
      if (idx > -1) {
        db.audit_items[idx].evidence_notes = evidenceNotes;
        writeMockDB(db);
      }
      revalidatePath(`/audits/${auditId}`);
      return { success: true };
    } catch (err: any) {
      return { error: err.message || 'Failed to update mock item evidence.' };
    }
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('audit_items')
      .update({ evidence_notes: evidenceNotes })
      .eq('id', itemId);

    if (error) return { error: error.message };

    revalidatePath(`/audits/${auditId}`);
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Supabase item evidence update failed.' };
  }
}

export async function uploadEvidence(
  itemId: string,
  auditId: string,
  formData: FormData
) {
  const file = formData.get('file') as File;
  if (!file) return { error: 'No file provided.' };

  const fileExt = file.name.split('.').pop();
  const fakeUrl = `/scratch/mock-evidence-${Date.now()}.${fileExt}`;

  if (!isSupabaseConfigured()) {
    try {
      const db = readMockDB();
      const idx = db.audit_items.findIndex((item) => item.id === itemId);
      if (idx > -1) {
        db.audit_items[idx].evidence_file_url = fakeUrl;
        writeMockDB(db);
      }
      revalidatePath(`/audits/${auditId}`);
      return { success: true, url: fakeUrl };
    } catch (err: any) {
      return { error: err.message || 'Failed to save mock file upload.' };
    }
  }

  try {
    const supabase = await createClient();
    const fileName = `${auditId}/${itemId}-${Date.now()}.${fileExt}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('audit-evidence')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) return { error: uploadError.message };

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('audit-evidence')
      .getPublicUrl(fileName);

    // Update audit item with file URL
    const { error: updateError } = await supabase
      .from('audit_items')
      .update({ evidence_file_url: urlData.publicUrl })
      .eq('id', itemId);

    if (updateError) return { error: updateError.message };

    revalidatePath(`/audits/${auditId}`);
    return { success: true, url: urlData.publicUrl };
  } catch (err: any) {
    return { error: err.message || 'Supabase upload failed.' };
  }
}
