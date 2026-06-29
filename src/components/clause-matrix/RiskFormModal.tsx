// ============================================================
// IsoPulse — RiskFormModal Component
// Modal for adding or editing a risk entry
// ============================================================

'use client';

import React, { useState, useEffect } from 'react';
import type { RiskRegisterEntry, ISOClause } from '@/lib/types';
import { X, Save, AlertTriangle } from 'lucide-react';
import { createRisk, updateRisk } from '@/lib/actions/risk-actions';
import { ISO_CLAUSES } from '@/lib/constants';

interface RiskFormModalProps {
  risk?: RiskRegisterEntry | null;
  onClose: () => void;
}

export default function RiskFormModal({ risk, onClose }: RiskFormModalProps) {
  const [description, setDescription] = useState('');
  const [clause, setClause] = useState<ISOClause>('6.1');
  const [likelihood, setLikelihood] = useState<number>(3);
  const [impact, setImpact] = useState<number>(3);
  const [mitigationPlan, setMitigationPlan] = useState('');
  const [owner, setOwner] = useState('');
  const [status, setStatus] = useState<'Active' | 'Mitigated' | 'Accepted'>('Active');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (risk) {
      setDescription(risk.description || '');
      setClause(risk.clause || '6.1');
      setLikelihood(risk.likelihood || 3);
      setImpact(risk.impact || 3);
      setMitigationPlan(risk.mitigation_plan || '');
      setOwner(risk.owner || '');
      setStatus(risk.status || 'Active');
    }
  }, [risk]);

  const score = likelihood * impact;

  const getScoreInfo = (s: number) => {
    if (s >= 15) return { color: 'text-rose-600 bg-rose-50 border-rose-200', label: 'High Critical Risk' };
    if (s >= 8) return { color: 'text-amber-600 bg-amber-50 border-amber-200', label: 'Medium Risk' };
    return { color: 'text-emerald-600 bg-emerald-50 border-emerald-200', label: 'Low Acceptable Risk' };
  };

  const scoreInfo = getScoreInfo(score);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('description', description);
    formData.append('clause', clause);
    formData.append('likelihood', String(likelihood));
    formData.append('impact', String(impact));
    formData.append('mitigation_plan', mitigationPlan);
    formData.append('owner', owner);
    formData.append('status', status);

    try {
      let res;
      if (risk) {
        res = await updateRisk(risk.id, formData);
      } else {
        res = await createRisk(formData);
      }

      if (res?.error) {
        setError(res.error);
      } else {
        onClose();
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900 text-sm">
            {risk ? 'Edit Operational Risk' : 'Log Operational Risk'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Scrollable body */}
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            {error && (
              <div className="flex items-center gap-2 p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Risk Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={2}
                placeholder="Identify potential failure point, e.g. Single source for critical electronic parts."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 placeholder:text-slate-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Targeted ISO Clause
                </label>
                <select
                  value={clause}
                  onChange={(e) => setClause(e.target.value as ISOClause)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
                >
                  {Object.entries(ISO_CLAUSES).flatMap(([k, section]) =>
                    Object.keys(section.subclauses).map((subKey) => (
                      <option key={subKey} value={subKey}>
                        Clause {subKey} ({section.title.split(' ')[0]})
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
                >
                  <option value="Active">Active</option>
                  <option value="Mitigated">Mitigated</option>
                  <option value="Accepted">Accepted</option>
                </select>
              </div>
            </div>

            {/* Matrix Parameters (Likelihood & Impact) */}
            <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Likelihood ({likelihood})
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={likelihood}
                  onChange={(e) => setLikelihood(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[9px] text-slate-400 mt-1 font-semibold">
                  <span>Rare</span>
                  <span>Almost Certain</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Impact ({impact})
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={impact}
                  onChange={(e) => setImpact(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[9px] text-slate-400 mt-1 font-semibold">
                  <span>Minor</span>
                  <span>Catastrophic</span>
                </div>
              </div>
            </div>

            {/* Risk Score Summary */}
            <div className={`flex items-center justify-between px-4 py-3 rounded-lg border ${scoreInfo.color}`}>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">Computed Risk Score</p>
                <p className="text-xs font-medium mt-0.5">{scoreInfo.label}</p>
              </div>
              <span className="text-2xl font-black">{score}</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Mitigation Plan
              </label>
              <textarea
                value={mitigationPlan}
                onChange={(e) => setMitigationPlan(e.target.value)}
                rows={3}
                placeholder="Describe actions taken or to be taken to eliminate or reduce the likelihood or impact of this risk."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Risk Owner
              </label>
              <input
                type="text"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="e.g. Lead Procurement Engineer"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
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
              {risk ? 'Update Risk' : 'Save Risk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
