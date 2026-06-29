// ============================================================
// IsoPulse — CAPAKanbanBoard Component
// Interactive Kanban board tracking status of CAPA corrective actions
// ============================================================

'use client';

import React, { useState } from 'react';
import type { CAPAAction, CAPAStatus } from '@/lib/types';
import CAPACard from './CAPACard';
import CAPADetailDrawer from './CAPADetailDrawer';
import CreateCAPAModal from './CreateCAPAModal';
import { Plus, ShieldAlert, KanbanSquare } from 'lucide-react';
import { updateCAPAStatus } from '@/lib/actions/capa-actions';

interface CAPAKanbanBoardProps {
  initialCapas: CAPAAction[];
}

interface ColumnConfig {
  id: CAPAStatus;
  title: string;
  headerBg: string;
  badgeBg: string;
  textColor: string;
}

const columns: ColumnConfig[] = [
  { id: 'Open', title: 'Open', headerBg: 'border-t-rose-500', badgeBg: 'bg-rose-50 text-rose-700', textColor: 'text-rose-900' },
  { id: 'In Progress', title: 'In Progress', headerBg: 'border-t-blue-500', badgeBg: 'bg-blue-50 text-blue-700', textColor: 'text-blue-900' },
  { id: 'Verification', title: 'Verification Pending', headerBg: 'border-t-violet-500', badgeBg: 'bg-violet-50 text-violet-700', textColor: 'text-violet-900' },
  { id: 'Closed', title: 'Closed', headerBg: 'border-t-emerald-500', badgeBg: 'bg-emerald-50 text-emerald-700', textColor: 'text-emerald-900' },
];

export default function CAPAKanbanBoard({ initialCapas }: CAPAKanbanBoardProps) {
  const [capas, setCapas] = useState<CAPAAction[]>(initialCapas);
  const [selectedCapa, setSelectedCapa] = useState<CAPAAction | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [draggedOverCol, setDraggedOverCol] = useState<CAPAStatus | null>(null);

  const handleDragOver = (e: React.DragEvent, colId: CAPAStatus) => {
    e.preventDefault();
    setDraggedOverCol(colId);
  };

  const handleDragLeave = () => {
    setDraggedOverCol(null);
  };

  const handleDrop = async (e: React.DragEvent, targetStatus: CAPAStatus) => {
    e.preventDefault();
    setDraggedOverCol(null);
    const capaId = e.dataTransfer.getData('text/plain');

    const targetCapa = capas.find((c) => c.id === capaId);
    if (!targetCapa || targetCapa.status === targetStatus) return;

    // Optimistic Update
    setCapas((prev) =>
      prev.map((c) => (c.id === capaId ? { ...c, status: targetStatus } : c))
    );

    try {
      const res = await updateCAPAStatus(capaId, targetStatus);
      if (res?.error) {
        // Rollback on failure
        setCapas(initialCapas);
        alert(`Failed to update status: ${res.error}`);
      }
    } catch (err) {
      setCapas(initialCapas);
      console.error(err);
    }
  };

  // Helper to move item via click (mobile fallback)
  const handleMobileMove = async (capaId: string, nextStatus: CAPAStatus) => {
    setCapas((prev) =>
      prev.map((c) => (c.id === capaId ? { ...c, status: nextStatus } : c))
    );
    try {
      await updateCAPAStatus(capaId, nextStatus);
    } catch (err) {
      setCapas(initialCapas);
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Header bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <KanbanSquare className="w-5 h-5 text-indigo-600" />
          <h2 className="text-sm font-semibold text-slate-800">CAPA Process Lifecycle</h2>
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Initiate Corrective Action
        </button>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {columns.map((col) => {
          const colCapas = capas.filter((c) => c.status === col.id);
          const isOver = draggedOverCol === col.id;

          return (
            <div
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, col.id)}
              className={`
                bg-slate-50 border border-slate-200/60 rounded-xl flex flex-col max-h-[75vh] min-h-[300px] transition-all duration-200
                ${col.headerBg} border-t-2
                ${isOver ? 'bg-indigo-50/40 border-indigo-200 shadow-inner' : ''}
              `}
            >
              {/* Column Title and Stats count */}
              <div className="px-4.5 py-3 flex items-center justify-between border-b border-slate-100 flex-shrink-0">
                <span className={`text-xs font-bold ${col.textColor} tracking-tight`}>{col.title}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${col.badgeBg}`}>
                  {colCapas.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="p-3 space-y-3 overflow-y-auto flex-1 min-h-[200px]">
                {colCapas.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center opacity-40">
                    <ShieldAlert className="w-7 h-7 text-slate-400 mb-1.5" />
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">No Actions</p>
                  </div>
                ) : (
                  colCapas.map((capa) => (
                    <div key={capa.id} className="relative group">
                      <CAPACard capa={capa} onSelect={setSelectedCapa} />

                      {/* Mobile quick status buttons */}
                      <div className="md:hidden flex gap-1 mt-1 justify-end px-2">
                        {columns
                          .filter((c) => c.id !== col.id)
                          .map((c) => (
                            <button
                              key={c.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMobileMove(capa.id, c.id);
                              }}
                              className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 cursor-pointer"
                            >
                              Move to {c.title.split(' ')[0]}
                            </button>
                          ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-out Drawer */}
      {selectedCapa && (
        <CAPADetailDrawer
          key={selectedCapa.id}
          capa={selectedCapa}
          onClose={() => setSelectedCapa(null)}
        />
      )}

      {/* Create Modal */}
      {isCreateOpen && (
        <CreateCAPAModal onClose={() => setIsCreateOpen(false)} />
      )}
    </div>
  );
}
