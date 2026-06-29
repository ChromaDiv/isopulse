// ============================================================
// IsoPulse — FiveWhysAnalysis Component
// Guided root cause analysis methodology form
// ============================================================

'use client';

import React from 'react';
import { ArrowDown, HelpCircle, AlertCircle, ShieldCheck } from 'lucide-react';

interface FiveWhysAnalysisProps {
  why1: string;
  why2: string;
  why3: string;
  why4: string;
  why5: string;
  onChange: (field: string, value: string) => void;
}

export default function FiveWhysAnalysis({
  why1,
  why2,
  why3,
  why4,
  why5,
  onChange,
}: FiveWhysAnalysisProps) {
  const steps = [
    { label: 'Why did the problem occur? (First occurrence)', value: why1, field: 'why_1', placeholder: 'e.g. The raw materials did not arrive on schedule.' },
    { label: 'Why did that happen?', value: why2, field: 'why_2', placeholder: 'e.g. The supplier had a backlog in production.' },
    { label: 'Why was there a production backlog?', value: why3, field: 'why_3', placeholder: 'e.g. The supplier was missing core electronic components.' },
    { label: 'Why were they missing core components?', value: why4, field: 'why_4', placeholder: 'e.g. No backup supplier was qualified for those parts.' },
    { label: 'Why was no backup supplier qualified? (Root Cause)', value: why5, field: 'why_5', placeholder: 'e.g. Single-source risk wasn\'t captured in procurement review guidelines.' },
  ];

  const rootCauseFound = why1 && why2 && why3 && why4 && why5;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="w-4.5 h-4.5 text-indigo-600" />
        <h4 className="font-semibold text-slate-800 text-xs uppercase tracking-wider">
          5 Whys Root Cause Analysis
        </h4>
      </div>

      <div className="space-y-3">
        {steps.map((step, idx) => {
          // Unlock step if it is the first step, or if the previous step is filled
          const isUnlocked = idx === 0 || !!steps[idx - 1].value;

          return (
            <div key={step.field} className="space-y-2">
              {idx > 0 && (
                <div className="flex justify-center -my-1">
                  <ArrowDown className={`w-4 h-4 ${isUnlocked ? 'text-indigo-400' : 'text-slate-200'}`} />
                </div>
              )}

              <div
                className={`p-3.5 rounded-lg border transition-all ${
                  isUnlocked
                    ? 'bg-slate-50 border-slate-200 shadow-sm'
                    : 'bg-slate-50/30 border-slate-100 opacity-50 select-none pointer-events-none'
                }`}
              >
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Why {idx + 1}: {step.label}
                </label>
                <input
                  type="text"
                  disabled={!isUnlocked}
                  value={step.value}
                  onChange={(e) => onChange(step.field, e.target.value)}
                  placeholder={step.placeholder}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 placeholder:text-slate-400"
                />
              </div>
            </div>
          );
        })}
      </div>

      {rootCauseFound ? (
        <div className="mt-4 flex items-start gap-2.5 p-3 rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-800 text-xs animate-fade-in shadow-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold leading-none">Root Cause Chain Complete</p>
            <p className="mt-1 opacity-90 leading-relaxed font-medium">
              Objective root cause identified. Use this finding to establish a permanent corrective action.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-2 p-3 rounded-lg border border-amber-100 bg-amber-50/50 text-amber-800 text-[11px] font-medium leading-normal">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          Complete all 5 levels of inquiry to uncover the underlying systematic failure.
        </div>
      )}
    </div>
  );
}
