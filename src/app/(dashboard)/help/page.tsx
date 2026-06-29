// ============================================================
// IsoPulse — Help & Documentation Page
// ============================================================

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import {
  ISO_9001_2015_MASTER,
  ISO_9001_GENERAL_SECTIONS,
} from '@/lib/iso9001Data';
import {
  HelpCircle,
  BookOpen,
  ClipboardCheck,
  ShieldAlert,
  ArrowRight,
  ChevronDown,
  Search,
  BookMarked,
  Layers,
} from 'lucide-react';

function HelpPageContent() {
  const searchParams = useSearchParams();
  const initialClause = searchParams.get('clause');

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(initialClause);

  // Auto-scroll section if requested by URL search parameter
  useEffect(() => {
    if (initialClause) {
      // Smooth scroll to the targeted element
      setTimeout(() => {
        const element = document.getElementById(`clause-card-${initialClause}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, [initialClause]);

  const toggleSection = (id: string) => {
    setExpandedSection((prev) => (prev === id ? null : id));
  };

  // Helper to match search query
  const matchesQuery = (text: string) =>
    text.toLowerCase().includes(searchQuery.toLowerCase());

  // Filter General Sections
  const filteredGeneral = Object.values(ISO_9001_GENERAL_SECTIONS).filter(
    (sec) =>
      matchesQuery(sec.title) ||
      matchesQuery(sec.content) ||
      matchesQuery(sec.id)
  );

  // Filter Master Clauses & Subclauses
  const filteredMaster = Object.values(ISO_9001_2015_MASTER).map((clause) => {
    const matchedSubclauses = Object.values(clause.subclauses).filter(
      (sub) =>
        matchesQuery(sub.id) ||
        matchesQuery(sub.title) ||
        matchesQuery(sub.definition) ||
        matchesQuery(sub.fullRequirements) ||
        sub.departments.some(matchesQuery) ||
        sub.auditQuestions.some(matchesQuery)
    );

    return {
      ...clause,
      subclauses: matchedSubclauses,
      matchesMain: matchesQuery(clause.title) || matchesQuery(clause.id),
    };
  }).filter((clause) => clause.matchesMain || clause.subclauses.length > 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-sans">
              Help & Documentation
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Search standard workflows, audit methodology, and reference ISO 9001:2015 QMS requirements
            </p>
          </div>
        </div>

        {/* Live Search bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search clause, dept, keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors"
          />
        </div>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
        <Link href="/clause-matrix" className="group">
          <Card padding="md" className="flex flex-col justify-between h-full hover:border-indigo-200 transition-all duration-200" hover>
            <div>
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 mb-4 group-hover:scale-105 transition-transform">
                <BookOpen className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-indigo-600 transition-colors">Clause Matrix Guide</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Track the implementation progress of standard requirements. Review sub-clause definitions and map documented compliance evidence in one matrix directory.
              </p>
            </div>
            <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
              Explore Matrix
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </Link>

        <Link href="/audits" className="group">
          <Card padding="md" className="flex flex-col justify-between h-full hover:border-emerald-200 transition-all duration-200" hover>
            <div>
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 mb-4 group-hover:scale-105 transition-transform">
                <ClipboardCheck className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-emerald-600 transition-colors">Smart Audit Planner</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Schedule internal audits targeting specific QMS clauses. Live Audit Mode populates pre-built standard questions and logs conformant, non-conformant, or OFI results.
              </p>
            </div>
            <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              Schedule Audit
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </Link>

        <Link href="/capa" className="group">
          <Card padding="md" className="flex flex-col justify-between h-full hover:border-rose-200 transition-all duration-200" hover>
            <div>
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-rose-50 text-rose-600 mb-4 group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-4.5 h-4.5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-rose-600 transition-colors">CAPA Command Center</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Log corrective actions stemming from audit findings. Use the guided &quot;5 Whys&quot; root cause analysis panel to systematically eliminate failures and prevent recurrence.
              </p>
            </div>
            <div className="text-xs font-semibold text-rose-600 flex items-center gap-1">
              Open Kanban Board
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </Link>
      </div>

      {/* General / Intro Sections (0-3) */}
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <BookMarked className="w-4.5 h-4.5 text-indigo-500" />
          <h3 className="text-base font-bold text-slate-900">Standard Framework & Intro</h3>
        </div>

        {filteredGeneral.length === 0 && searchQuery && (
          <p className="text-xs text-slate-400 italic">No matching framework sections found.</p>
        )}

        <div className="grid grid-cols-1 gap-3">
          {filteredGeneral.map((section) => {
            const isExpanded = expandedSection === `general-${section.id}`;
            return (
              <div
                key={section.id}
                id={`clause-card-general-${section.id}`}
                className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleSection(`general-${section.id}`)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      Section {section.id}
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm">{section.title}</h4>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4.5 h-4.5 text-slate-400 rotate-180 transition-transform" />
                  ) : (
                    <ChevronDown className="w-4.5 h-4.5 text-slate-400 transition-transform" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-50 bg-slate-50/20 text-xs text-slate-600 leading-relaxed whitespace-pre-line prose max-w-none">
                    {section.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ISO 9001 Reference Sections */}
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Layers className="w-4.5 h-4.5 text-indigo-500" />
          <h3 className="text-base font-bold text-slate-900">ISO 9001:2015 Clause Reference Manual</h3>
        </div>

        {filteredMaster.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200">
            <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-500">No matching standard clauses found</p>
            <p className="text-xs text-slate-400 mt-1">Try refining your search keyword or clause number</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {filteredMaster.map((mainClause) => (
            <Card key={mainClause.id} padding="md" className="space-y-4 border-l-3 border-l-indigo-500/80">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                  Clause {mainClause.id}
                </span>
                <h4 className="text-sm font-bold text-slate-800">{mainClause.title}</h4>
              </div>

              {/* Sub-clause List */}
              <div className="space-y-3.5 pl-1.5">
                {mainClause.subclauses.map((sub) => {
                  const isExpanded = expandedSection === sub.id;
                  return (
                    <div
                      key={sub.id}
                      id={`clause-card-${sub.id}`}
                      className={`rounded-xl border transition-all ${
                        isExpanded
                          ? 'border-indigo-200/80 bg-indigo-50/5 shadow-xs'
                          : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/10'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleSection(sub.id)}
                        className="w-full flex items-start justify-between p-3.5 text-left cursor-pointer"
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="font-bold text-xs text-slate-900 mt-0.5">{sub.id}</span>
                          <div>
                            <h5 className="font-semibold text-slate-800 text-xs">{sub.title}</h5>
                            <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{sub.definition}</p>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-slate-400 rotate-180 transition-transform mt-0.5 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 transition-transform mt-0.5 flex-shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1.5 border-t border-slate-100/50 space-y-4 text-xs">
                          {/* Verbatim Standard Text */}
                          <div className="space-y-1.5 bg-slate-50/50 border border-slate-100 rounded-lg p-3">
                            <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-wider block">Official Standard Requirements</span>
                            <p className="text-slate-700 leading-relaxed whitespace-pre-line font-serif text-[11px] antialiased">
                              {sub.fullRequirements}
                            </p>
                          </div>

                          {/* Pre-built Questions */}
                          <div className="space-y-2">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Conformity Checklist Questions</span>
                            <div className="space-y-1.5 pl-1">
                              {sub.auditQuestions.map((q, qidx) => (
                                <div key={qidx} className="flex gap-2 text-slate-600 leading-relaxed">
                                  <span className="text-indigo-500 font-semibold">•</span>
                                  <span>{q}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Departments & Actions */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100/60">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mr-1">Target Departments:</span>
                              {sub.departments.map((d) => (
                                <span key={d} className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200/40">
                                  {d}
                                </span>
                              ))}
                            </div>
                            
                            <Link href={`/clause-matrix?clause=${sub.id}`}>
                              <button
                                type="button"
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-medium text-[11px] hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
                              >
                                Assess in Clause Matrix
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HelpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-6 h-6 border-2 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
        </div>
      }
    >
      <HelpPageContent />
    </Suspense>
  );
}
