// ============================================================
// IsoPulse — UpcomingAudits Component
// Table of next scheduled internal audits
// ============================================================

'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Badge, { statusToVariant } from '@/components/ui/Badge';
import { Calendar, ArrowRight } from 'lucide-react';
import type { Audit } from '@/lib/types';

interface UpcomingAuditsProps {
  audits: Audit[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getDaysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  const diffMs = target.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export default function UpcomingAudits({ audits }: UpcomingAuditsProps) {
  return (
    <Card padding="none" className="animate-fade-in">
      <div className="flex items-center justify-between px-5 pt-5 pb-4 sm:px-6 sm:pt-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50">
            <Calendar className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Upcoming Audits</h3>
            <p className="text-xs text-slate-500">Next scheduled internal audits</p>
          </div>
        </div>
        <button className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
          View all <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-t border-slate-100">
              <th className="px-6 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Audit
              </th>
              <th className="px-6 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Auditor
              </th>
              <th className="px-6 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {audits.map((audit, index) => {
              const daysUntil = getDaysUntil(audit.scheduled_date);
              return (
                <tr
                  key={audit.id}
                  className="hover:bg-slate-50/60 transition-colors duration-150 animate-fade-in"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <td className="px-6 py-3.5 min-w-[220px]">
                    <div>
                      <p className="text-sm font-semibold text-slate-800 leading-normal">{audit.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Clause {audit.clause_targeted}</p>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <span className="text-sm text-slate-600">{audit.department}</span>
                  </td>
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                        {audit.auditor_name?.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm text-slate-600">{audit.auditor_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <div>
                      <p className="text-sm text-slate-600 font-medium">{formatDate(audit.scheduled_date)}</p>
                      {daysUntil > 0 && (
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          In {daysUntil} day{daysUntil !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <Badge variant={statusToVariant(audit.status)} dot>
                      {audit.status}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden divide-y divide-slate-100 border-t border-slate-100">
        {audits.map((audit, index) => {
          const daysUntil = getDaysUntil(audit.scheduled_date);
          return (
            <div
              key={audit.id}
              className="px-5 py-3.5 animate-fade-in"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{audit.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {audit.department} · Clause {audit.clause_targeted}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs text-slate-400">{formatDate(audit.scheduled_date)}</span>
                    {daysUntil > 0 && (
                      <span className="text-[10px] text-slate-300">
                        ({daysUntil}d)
                      </span>
                    )}
                  </div>
                </div>
                <Badge variant={statusToVariant(audit.status)} dot>
                  {audit.status}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
