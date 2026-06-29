// ============================================================
// IsoPulse — CAPACard Component
// Individual CAPA issue card in the Kanban board
// ============================================================

'use client';

import React from 'react';
import type { CAPAAction } from '@/lib/types';
import { Calendar, User, Clock } from 'lucide-react';

interface CAPACardProps {
  capa: CAPAAction;
  onSelect: (capa: CAPAAction) => void;
}

export default function CAPACard({ capa, onSelect }: CAPACardProps) {
  const isOverdue =
    capa.status !== 'Closed' &&
    new Date(capa.due_date).getTime() < new Date().setHours(0, 0, 0, 0);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', capa.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => onSelect(capa)}
      className={`
        bg-white rounded-xl border border-slate-200/80 shadow-sm p-4.5
        hover:shadow-md hover:border-slate-300/80 transition-all cursor-grab active:cursor-grabbing select-none space-y-3.5
        ${isOverdue ? 'border-l-rose-500 border-l-2' : ''}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-bold uppercase tracking-wider">
          {capa.finding_id}
        </span>
        {isOverdue && (
          <span className="flex items-center gap-0.5 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100 animate-pulse">
            <Clock className="w-3 h-3" />
            Overdue
          </span>
        )}
      </div>

      {/* Details */}
      <div>
        <h4 className="font-semibold text-slate-800 text-xs leading-snug line-clamp-2">
          {capa.title || 'Untitled CAPA Action'}
        </h4>
        {capa.description && (
          <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-normal">
            {capa.description}
          </p>
        )}
      </div>

      {/* Meta Row */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-50">
        <div className="flex items-center gap-1 min-w-0">
          <User className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate">{capa.assigned_to}</span>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{capa.due_date}</span>
        </div>
      </div>
    </div>
  );
}
