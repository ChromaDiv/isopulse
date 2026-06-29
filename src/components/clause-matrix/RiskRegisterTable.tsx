// ============================================================
// IsoPulse — RiskRegisterTable Component
// Lists all operational risks, scores, and mitigation plans
// ============================================================

'use client';

import React, { useState } from 'react';
import type { RiskRegisterEntry } from '@/lib/types';
import Badge from '@/components/ui/Badge';
import { Plus, Trash2, Edit3, ShieldAlert, ArrowUpDown } from 'lucide-react';
import RiskFormModal from './RiskFormModal';
import { deleteRisk } from '@/lib/actions/risk-actions';

interface RiskRegisterTableProps {
  risks: RiskRegisterEntry[];
}

export default function RiskRegisterTable({ risks }: RiskRegisterTableProps) {
  const [selectedRisk, setSelectedRisk] = useState<RiskRegisterEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortField, setSortField] = useState<keyof RiskRegisterEntry>('risk_score');
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (field: keyof RiskRegisterEntry) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sortedRisks = [...risks].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];

    if (aVal === undefined) return 1;
    if (bVal === undefined) return -1;

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortAsc ? aVal - bVal : bVal - aVal;
    }
    return sortAsc
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const getRiskScoreColor = (score: number) => {
    if (score >= 15) return 'bg-rose-50 text-rose-700 border border-rose-200';
    if (score >= 8) return 'bg-amber-50 text-amber-700 border border-amber-200';
    return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this risk entry?')) {
      const res = await deleteRisk(id);
      if (res?.error) {
        alert(`Error: ${res.error}`);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5 border-b border-slate-100">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Clause 6.1 Risk & Opportunities Register</h3>
          <p className="text-xs text-slate-500 mt-1">
            Systematic assessment of organizational risks (Risk Score = Likelihood × Impact)
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedRisk(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Log Operational Risk
        </button>
      </div>

      {sortedRisks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ShieldAlert className="w-10 h-10 text-slate-300 mb-3" />
          <p className="text-sm font-medium text-slate-800">No operational risks logged</p>
          <p className="text-xs text-slate-500 max-w-sm mt-1">
            Start logging and evaluating risks to maintain compliance with Clause 6.1.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop/Tablet Landscape Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm table-auto border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-3 cursor-pointer select-none" onClick={() => handleSort('description')}>
                    <div className="flex items-center gap-1">Description <ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                  <th className="px-6 py-3 cursor-pointer select-none" onClick={() => handleSort('clause')}>
                    <div className="flex items-center gap-1">Clause <ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                  <th className="px-6 py-3 cursor-pointer select-none text-center" onClick={() => handleSort('likelihood')}>
                    <div className="flex items-center justify-center gap-1">L <ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                  <th className="px-6 py-3 cursor-pointer select-none text-center" onClick={() => handleSort('impact')}>
                    <div className="flex items-center justify-center gap-1">I <ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                  <th className="px-6 py-3 cursor-pointer select-none text-center" onClick={() => handleSort('risk_score')}>
                    <div className="flex items-center justify-center gap-1">Score <ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                  <th className="px-6 py-3">Mitigation Plan & Owner</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedRisks.map((risk) => {
                  const score = risk.risk_score || (risk.likelihood * risk.impact);
                  return (
                    <tr key={risk.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-4.5 max-w-xs font-medium text-slate-800 break-words whitespace-normal">
                        {risk.description}
                      </td>
                      <td className="px-6 py-4.5">
                        <span className="inline-flex px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                          Clause {risk.clause}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 text-center text-slate-600 font-medium">
                        {risk.likelihood}
                      </td>
                      <td className="px-6 py-4.5 text-center text-slate-600 font-medium">
                        {risk.impact}
                      </td>
                      <td className="px-6 py-4.5 text-center">
                        <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold ${getRiskScoreColor(score)}`}>
                          {score}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 max-w-sm break-words whitespace-normal">
                        <div className="text-slate-700 text-xs leading-relaxed">
                          {risk.mitigation_plan || <span className="text-slate-400 italic">No plan documented</span>}
                        </div>
                        {risk.owner && (
                          <div className="text-[10px] text-slate-400 mt-1 font-medium">
                            Owner: {risk.owner}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4.5">
                        <Badge
                          variant={
                            risk.status === 'Mitigated'
                              ? 'conformant'
                              : risk.status === 'Accepted'
                              ? 'ofi'
                              : 'open'
                          }
                        >
                          {risk.status || 'Active'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedRisk(risk);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(risk.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Portrait Card List View */}
          <div className="block md:hidden divide-y divide-slate-100">
            {sortedRisks.map((risk) => {
              const score = risk.risk_score || (risk.likelihood * risk.impact);
              return (
                <div key={risk.id} className="p-5 space-y-4 hover:bg-slate-50/20 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="inline-flex px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                        Clause {risk.clause}
                      </span>
                      <h4 className="font-semibold text-slate-900 text-sm leading-snug break-words">
                        {risk.description}
                      </h4>
                    </div>
                    <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold ${getRiskScoreColor(score)} flex-shrink-0`}>
                      Score: {score}
                    </span>
                  </div>

                  <div className="bg-slate-50/60 rounded-xl p-3 border border-slate-100 text-xs space-y-1.5">
                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Mitigation Plan & Owner</p>
                    <p className="text-slate-700 leading-relaxed break-words">
                      {risk.mitigation_plan || <span className="text-slate-400 italic">No plan documented</span>}
                    </p>
                    {risk.owner && (
                      <p className="text-[10px] text-slate-400 mt-2 font-medium">
                        Owner: <span className="text-slate-600">{risk.owner}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-1">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>L: <strong className="text-slate-700">{risk.likelihood}</strong></span>
                      <span>I: <strong className="text-slate-700">{risk.impact}</strong></span>
                      <Badge
                        variant={
                          risk.status === 'Mitigated'
                            ? 'conformant'
                            : risk.status === 'Accepted'
                            ? 'ofi'
                            : 'open'
                        }
                      >
                        {risk.status || 'Active'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-lg border border-slate-200/30">
                      <button
                        onClick={() => {
                          setSelectedRisk(risk);
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(risk.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {isModalOpen && (
        <RiskFormModal
          key={selectedRisk?.id || 'new'}
          risk={selectedRisk}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
