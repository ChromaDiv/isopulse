// ============================================================
// IsoPulse — CAPADetailDrawer Component
// Slide-out drawer displaying full CAPA details and 5 Whys
// ============================================================

'use client';

import React, { useState, useEffect } from 'react';
import type { CAPAAction } from '@/lib/types';
import { X, Save, AlertCircle, Trash2, ArrowRight } from 'lucide-react';
import Badge, { statusToVariant } from '@/components/ui/Badge';
import { updateCAPA, deleteCAPA } from '@/lib/actions/capa-actions';
import FiveWhysAnalysis from './FiveWhysAnalysis';

interface CAPADetailDrawerProps {
  capa: CAPAAction;
  onClose: () => void;
}

export default function CAPADetailDrawer({ capa, onClose }: CAPADetailDrawerProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rootCause, setRootCause] = useState('');
  const [correctiveAction, setCorrectiveAction] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const [why1, setWhy1] = useState('');
  const [why2, setWhy2] = useState('');
  const [why3, setWhy3] = useState('');
  const [why4, setWhy4] = useState('');
  const [why5, setWhy5] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(capa.title || '');
    setDescription(capa.description || '');
    setRootCause(capa.root_cause || '');
    setCorrectiveAction(capa.corrective_action || '');
    setAssignedTo(capa.assigned_to || '');
    setDueDate(capa.due_date || '');
    setStatus(capa.status || 'Open');
    setWhy1(capa.why_1 || '');
    setWhy2(capa.why_2 || '');
    setWhy3(capa.why_3 || '');
    setWhy4(capa.why_4 || '');
    setWhy5(capa.why_5 || '');
  }, [capa]);

  const handleWhyChange = (field: string, val: string) => {
    if (field === 'why_1') setWhy1(val);
    if (field === 'why_2') setWhy2(val);
    if (field === 'why_3') setWhy3(val);
    if (field === 'why_4') setWhy4(val);
    if (field === 'why_5') setWhy5(val);

    // Auto-update root cause output area when Why 5 changes
    if (field === 'why_5') {
      setRootCause(val);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('root_cause', rootCause);
    formData.append('corrective_action', correctiveAction);
    formData.append('assigned_to', assignedTo);
    formData.append('due_date', dueDate);
    formData.append('status', status);
    formData.append('why_1', why1);
    formData.append('why_2', why2);
    formData.append('why_3', why3);
    formData.append('why_4', why4);
    formData.append('why_5', why5);

    try {
      const res = await updateCAPA(capa.id, formData);
      if (res?.error) {
        setError(res.error);
      } else {
        onClose();
      }
    } catch (err: any) {
      setError(err?.message || 'Error updating CAPA action.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this CAPA action?')) {
      try {
        const res = await deleteCAPA(capa.id);
        if (res?.error) {
          setError(res.error);
        } else {
          onClose();
        }
      } catch (err: any) {
        setError(err?.message || 'Error deleting CAPA action.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="w-full max-w-lg bg-white h-screen border-l border-slate-200/80 shadow-2xl flex flex-col animate-slide-in-left">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {capa.finding_id}
              </span>
              <Badge variant={statusToVariant(status)} dot>
                {status}
              </Badge>
            </div>
            <h3 className="font-bold text-slate-900 text-sm mt-1">CAPA Command Details</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                CAPA Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 placeholder:text-slate-400 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Description of Non-Conformance
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 placeholder:text-slate-400 leading-normal"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Assigned Owner
                </label>
                <input
                  type="text"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Resolution Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Action Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Verification">Verification Pending</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Embedded 5 Whys Root Cause Analysis */}
            <div className="border-t border-slate-100 pt-5">
              <FiveWhysAnalysis
                why1={why1}
                why2={why2}
                why3={why3}
                why4={why4}
                why5={why5}
                onChange={handleWhyChange}
              />
            </div>

            {/* Root Cause Conclusion Summary */}
            <div className="border-t border-slate-100 pt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Documented Root Cause Output
                </label>
                <textarea
                  value={rootCause}
                  onChange={(e) => setRootCause(e.target.value)}
                  rows={2}
                  placeholder="Summarize root cause conclusion (auto-updated by Why 5)."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 placeholder:text-slate-400 leading-normal"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Permanent Corrective & Preventive Action Plan
                </label>
                <textarea
                  value={correctiveAction}
                  onChange={(e) => setCorrectiveAction(e.target.value)}
                  rows={3}
                  placeholder="Define permanent corrective modifications to procedures, training updates, or structural changes to prevent recurrence..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 placeholder:text-slate-400 leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center px-6 py-4.5 border-t border-slate-100 bg-slate-50 flex-shrink-0">
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-1 px-3 py-2 border border-slate-200 text-xs font-semibold text-rose-600 bg-white hover:bg-rose-50 hover:border-rose-100 rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete CAPA
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
