// ============================================================
// IsoPulse — ClauseDetailPane Component
// Interactive details and status editor for selected sub-clause
// ============================================================

'use client';

import React, { useState } from 'react';
import { getSubClauseById } from '@/lib/iso9001Data';
import { upsertClauseImplementation } from '@/lib/actions/clause-actions';
import type { ClauseImplementation } from '@/lib/types';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import Link from 'next/link';
import {
  BookOpen,
  Building2,
  HelpCircle,
  Link as LinkIcon,
  Save,
  Loader2,
  CheckCircle,
  FileCheck2,
  ChevronDown,
} from 'lucide-react';

interface ClauseDetailPaneProps {
  subclauseId: string | null;
  initialImplementation: ClauseImplementation | null;
  onSaveSuccess: () => void;
}

export default function ClauseDetailPane({
  subclauseId,
  initialImplementation,
  onSaveSuccess,
}: ClauseDetailPaneProps) {
  const [status, setStatus] = useState<'Not Started' | 'In Progress' | 'Fully Implemented'>(
    initialImplementation?.status || 'Not Started'
  );
  const [evidenceNotes, setEvidenceNotes] = useState(initialImplementation?.evidence_notes || '');
  const [evidenceFileUrl, setEvidenceFileUrl] = useState(initialImplementation?.evidence_file_url || '');
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showFullText, setShowFullText] = useState(false);

  if (!subclauseId) {
    return (
      <Card className="h-full flex items-center justify-center min-h-[450px]">
        <EmptyState
          icon={<BookOpen className="w-7 h-7 text-indigo-400" />}
          title="Select a Sub-clause"
          description="Click on any sub-clause in the directory accordion to view standard definitions, audit checklist templates, and upload compliance evidence."
        />
      </Card>
    );
  }

  const subclause = getSubClauseById(subclauseId);
  if (!subclause) {
    return (
      <Card className="h-full flex items-center justify-center min-h-[450px]">
        <p className="text-sm text-slate-500">Clause definition not found.</p>
      </Card>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await upsertClauseImplementation(
        subclauseId,
        status,
        evidenceNotes.trim() || null,
        evidenceFileUrl.trim() || null
      );

      if (res?.error) {
        setErrorMsg(res.error);
      } else {
        setSuccessMsg('Clause compliance status updated successfully.');
        onSaveSuccess();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadgeVariant = (s: typeof status) => {
    if (s === 'Fully Implemented') return 'conformant';
    if (s === 'In Progress') return 'ofi';
    return 'default';
  };

  return (
    <Card className="h-full flex flex-col justify-between" padding="lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">
                ISO 9001:{subclauseId}
              </span>
              <Badge variant={getStatusBadgeVariant(status)} dot>
                {status}
              </Badge>
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              {subclause.title}
            </h3>
          </div>
        </div>

        {/* Section: Standard Definition */}
        <div className="space-y-3">
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Standard Requirement
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/60 p-4 rounded-xl border border-slate-100">
              {subclause.definition}
            </p>
          </div>

          {/* Verbatim Collapsible Box */}
          <div className="border border-slate-150 rounded-xl overflow-hidden bg-slate-50/20">
            <button
              type="button"
              onClick={() => setShowFullText(!showFullText)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50/50 transition-colors cursor-pointer text-xs font-bold text-slate-700"
            >
              <span className="flex items-center gap-1.5">
                Official Verbatim Standard Text
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showFullText ? 'rotate-180' : ''}`} />
            </button>
            {showFullText && (
              <div className="px-4 pb-4 pt-1.5 border-t border-slate-100 bg-white space-y-3">
                <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line font-serif antialiased">
                  {subclause.fullRequirements}
                </p>
                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  <Link
                    href={`/help?clause=${subclause.id}`}
                    target="_blank"
                    className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1"
                  >
                    Open in Reference Manual →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section: Departments */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" />
            Commonly Audited Departments
          </h4>
          <div className="flex flex-wrap gap-2">
            {subclause.departments.map((dept) => (
              <span
                key={dept}
                className="text-xs px-2.5 py-1 bg-slate-100/80 text-slate-600 rounded-lg font-medium border border-slate-200/40"
              >
                {dept}
              </span>
            ))}
          </div>
        </div>

        {/* Section: Audit Questions */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            Example Audit Checklist Questions
          </h4>
          <ul className="space-y-2.5">
            {subclause.auditQuestions.map((q, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 font-bold text-[10px] flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="flex-1">{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSave} className="mt-8 pt-6 border-t border-slate-100 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
          <FileCheck2 className="w-3.5 h-3.5" />
          Conformance & Evidence Log
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Status Changer */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Implementation Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:outline-none"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Fully Implemented">Fully Implemented</option>
            </select>
          </div>

          {/* Evidence Link */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Evidence File / Document Link</label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="url"
                placeholder="https://company.sharepoint.com/qms/evidence"
                value={evidenceFileUrl}
                onChange={(e) => setEvidenceFileUrl(e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-lg pl-9 pr-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Evidence Notes */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Evidence Description & Compliance Notes</label>
          <textarea
            rows={3}
            placeholder="Describe the objective evidence, standard operating procedures, manuals, or records demonstrating conformance."
            value={evidenceNotes}
            onChange={(e) => setEvidenceNotes(e.target.value)}
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:outline-none placeholder:text-slate-400 resize-none"
          />
        </div>

        {/* Feedback Messages */}
        {successMsg && (
          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-xs font-medium">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="flex items-center gap-2 text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2 text-xs font-medium">
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </Card>
  );
}
