// ============================================================
// IsoPulse — LiveAuditInterface Component
// Core runtime checklist engine for conducting audits on the floor
// ============================================================

'use client';

import React, { useState, useTransition } from 'react';
import type { Audit, AuditItem } from '@/lib/types';
import Badge, { statusToVariant } from '@/components/ui/Badge';
import { ChevronLeft, Check, MessageSquare, ShieldAlert, CheckCircle, Percent, ChevronDown, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getSubClauseById } from '@/lib/iso9001Data';
import { updateAuditItemStatus, updateAuditItemEvidence } from '@/lib/actions/audit-item-actions';
import { updateAuditStatus } from '@/lib/actions/audit-actions';
import EvidenceUploader from './EvidenceUploader';
import Card from '@/components/ui/Card';

interface LiveAuditInterfaceProps {
  audit: Audit;
  initialItems: AuditItem[];
}

export default function LiveAuditInterface({ audit, initialItems }: LiveAuditInterfaceProps) {
  const [items, setItems] = useState<AuditItem[]>(initialItems);
  const [evidenceNotes, setEvidenceNotes] = useState<Record<string, string>>(
    initialItems.reduce((acc, item) => ({ ...acc, [item.id]: item.evidence_notes || '' }), {})
  );
  const [isPending, startTransition] = useTransition();
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [isMobileListOpen, setIsMobileListOpen] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);

  const totalQuestions = items.length;
  const completedQuestions = items.filter((item) => item.status !== 'Pending').length;
  const progressPercent = totalQuestions > 0 ? Math.round((completedQuestions / totalQuestions) * 100) : 0;

  const handleStatusToggle = async (itemId: string, status: AuditItem['status']) => {
    // Optimistic Update
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, status } : i))
    );

    try {
      await updateAuditItemStatus(itemId, audit.id, status);
    } catch (err) {
      console.error('Failed to update item status', err);
    }
  };

  const handleSaveNotes = async (itemId: string) => {
    const notes = evidenceNotes[itemId];
    try {
      await updateAuditItemEvidence(itemId, audit.id, notes);
    } catch (err) {
      console.error('Failed to update evidence notes', err);
    }
  };

  const handleUploadSuccess = (itemId: string, url: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, evidence_file_url: url } : i))
    );
  };

  const handleCompleteAudit = () => {
    startTransition(async () => {
      const res = await updateAuditStatus(audit.id, 'Completed');
      if (res?.error) {
        alert(res.error);
      } else {
        window.location.href = '/audits';
      }
    });
  };

  // If there are no questions logged yet
  if (totalQuestions === 0) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-xl p-12 text-center max-w-lg mx-auto flex flex-col items-center">
        <ShieldAlert className="w-12 h-12 text-amber-500 mb-3" />
        <h3 className="text-base font-semibold text-slate-900">Checklist Empty</h3>
        <p className="text-xs text-slate-500 max-w-sm mt-1 mb-6">
          This audit does not contain any checklist items. Add verification questions to start assessing compliance.
        </p>
        <Link
          href="/audits"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow transition-colors cursor-pointer"
        >
          Back to Planner
        </Link>
      </div>
    );
  }

  const currentItem = items[activeQuestionIdx];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Navigator */}
      <div className="flex items-center justify-between">
        <Link
          href="/audits"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Audit Dashboard
        </Link>
        <Badge variant={statusToVariant(audit.status)} dot>
          {audit.status}
        </Badge>
      </div>

      {/* Progress Header */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-sans leading-tight">
            {audit.title}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Department: <span className="font-semibold text-slate-700">{audit.department}</span> · Targeted ISO Clause:{' '}
            <span className="font-semibold text-slate-700">{audit.clause_targeted}</span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-slate-600">Audit Completion Progress</span>
            <span className="text-indigo-600 font-bold">{progressPercent}% ({completedQuestions}/{totalQuestions})</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ISO 9001 Guidance Panel */}
      {(() => {
        const subclauseInfo = getSubClauseById(audit.clause_targeted);
        if (!subclauseInfo) return null;
        return (
          <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs animate-fade-in">
            <button
              type="button"
              onClick={() => setShowGuidance(!showGuidance)}
              className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-slate-50/50 transition-colors cursor-pointer text-xs font-bold text-slate-700"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                ISO 9001 Reference & Guidance — Clause {audit.clause_targeted}
              </span>
              <ChevronDown className={`w-4.5 h-4.5 text-slate-400 transition-transform ${showGuidance ? 'rotate-180' : ''}`} />
            </button>
            {showGuidance && (
              <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/10 space-y-4 text-xs">
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-wider block">Official Requirements Context</span>
                  <p className="text-slate-700 leading-relaxed font-serif text-[11px] whitespace-pre-line antialiased">
                    {subclauseInfo.fullRequirements}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100/60">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mr-1">Target Departments:</span>
                  {subclauseInfo.departments.map((d) => (
                    <span key={d} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200/40">
                      {d}
                    </span>
                  ))}
                  <Link
                    href={`/help?clause=${subclauseInfo.id}`}
                    target="_blank"
                    className="ml-auto text-[10px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1"
                  >
                    Open Reference Manual
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* Main Execution Engine (Mobile/Tablet Responsive Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigation Sidebar List - Hidden on mobile, visible on desktop */}
        <div className="hidden md:block md:col-span-1 space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Checklist Items</h3>
          <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
            {items.map((item, idx) => {
              const isActive = idx === activeQuestionIdx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveQuestionIdx(idx)}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50/50 border-indigo-200 text-indigo-900 font-semibold shadow-sm'
                      : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-500 font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 leading-relaxed">{item.question}</p>
                      {item.status !== 'Pending' && (
                        <span className="mt-1.5 inline-block">
                          <Badge variant={statusToVariant(item.status)} className="text-[9px] px-1.5 py-0">
                            {item.status}
                          </Badge>
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Active Assessment Pane */}
        <div className="md:col-span-2 space-y-4">
          <Card className="flex flex-col h-full min-h-[350px]">
            {/* Card Question Header */}
            <div className="border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                  <span>Assessment Area {activeQuestionIdx + 1} of {totalQuestions}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileListOpen(true)}
                  className="md:hidden text-[10px] font-bold text-indigo-700 bg-indigo-55/10 border border-indigo-100/50 px-2 py-0.5 rounded-md hover:bg-indigo-100/50 transition-colors"
                >
                  View Checklist
                </button>
              </div>
              <h3 className="font-semibold text-slate-800 text-sm leading-relaxed">
                {currentItem.question}
              </h3>
            </div>

            {/* Assessment Options */}
            <div className="space-y-4 flex-1">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Compliance Status
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleStatusToggle(currentItem.id, 'Conformant')}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      currentItem.status === 'Conformant'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    Conformant
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStatusToggle(currentItem.id, 'Non-Conformant')}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      currentItem.status === 'Non-Conformant'
                        ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    NCR
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStatusToggle(currentItem.id, 'OFI')}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      currentItem.status === 'OFI'
                        ? 'bg-amber-50 border-amber-300 text-amber-700 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    OFI
                  </button>
                </div>
              </div>

              {/* Evidence inputs */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Auditor Finding / Evidence Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter objective evidence observations, records verified, personnel interviewed, and system metrics..."
                    value={evidenceNotes[currentItem.id]}
                    onChange={(e) =>
                      setEvidenceNotes({ ...evidenceNotes, [currentItem.id]: e.target.value })
                    }
                    onBlur={() => handleSaveNotes(currentItem.id)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 placeholder:text-slate-400 leading-relaxed"
                  />
                </div>

                <EvidenceUploader
                  itemId={currentItem.id}
                  auditId={audit.id}
                  currentFileUrl={currentItem.evidence_file_url}
                  onUploadSuccess={(url) => handleUploadSuccess(currentItem.id, url)}
                />
              </div>
            </div>

            {/* Quick buttons */}
            <div className="flex justify-between border-t border-slate-100 pt-4 mt-6">
              <button
                type="button"
                disabled={activeQuestionIdx === 0}
                onClick={() => setActiveQuestionIdx((prev) => prev - 1)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors disabled:opacity-40 cursor-pointer"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={activeQuestionIdx === totalQuestions - 1}
                onClick={() => setActiveQuestionIdx((prev) => prev + 1)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors disabled:opacity-40 cursor-pointer"
              >
                Next
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile Checklist Drawer Overlay */}
      {isMobileListOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          {/* Backdrop */}
          <div className="absolute inset-0 -z-10" onClick={() => setIsMobileListOpen(false)} />
          
          <div className="bg-white rounded-t-2xl shadow-xl max-h-[75vh] overflow-y-auto flex flex-col transform transition-transform duration-300 animate-slide-up">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Checklist Items</h3>
              <button
                onClick={() => setIsMobileListOpen(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
            
            <div className="p-5 space-y-2 overflow-y-auto">
              {items.map((item, idx) => {
                const isActive = idx === activeQuestionIdx;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveQuestionIdx(idx);
                      setIsMobileListOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-50/50 border-indigo-200 text-indigo-900 font-semibold shadow-sm'
                        : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-500 font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 leading-relaxed">{item.question}</p>
                        {item.status !== 'Pending' && (
                          <span className="mt-1.5 inline-block">
                            <Badge variant={statusToVariant(item.status)} className="text-[9px] px-1.5 py-0">
                              {item.status}
                            </Badge>
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Completion CTA */}
      {completedQuestions === totalQuestions && audit.status !== 'Completed' && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in shadow-sm shadow-indigo-100/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 leading-tight">All Checklist Items Evaluated</p>
              <p className="text-xs text-slate-600 mt-0.5">Submit audit checklist responses to calculate conformity rate score.</p>
            </div>
          </div>
          <button
            onClick={handleCompleteAudit}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer disabled:opacity-60"
          >
            {isPending ? (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Percent className="w-3.5 h-3.5" />
                Submit & Complete Audit
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
