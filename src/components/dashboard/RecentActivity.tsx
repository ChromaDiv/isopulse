// ============================================================
// IsoPulse — RecentActivity Component
// Timeline feed of recent QMS events
// ============================================================

'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import {
  CheckCircle2,
  AlertOctagon,
  ShieldCheck,
  ShieldAlert,
  RefreshCw,
  Clock,
} from 'lucide-react';
import type { ActivityItem } from '@/lib/types';

interface RecentActivityProps {
  activities: ActivityItem[];
}

const activityConfig: Record<
  ActivityItem['type'],
  { icon: React.ElementType; bg: string; color: string }
> = {
  audit_completed: { icon: CheckCircle2, bg: 'bg-emerald-50', color: 'text-emerald-600' },
  ncr_raised: { icon: AlertOctagon, bg: 'bg-rose-50', color: 'text-rose-600' },
  capa_closed: { icon: ShieldCheck, bg: 'bg-indigo-50', color: 'text-indigo-600' },
  capa_opened: { icon: ShieldAlert, bg: 'bg-amber-50', color: 'text-amber-600' },
  risk_updated: { icon: RefreshCw, bg: 'bg-sky-50', color: 'text-sky-600' },
};

function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  return 'Just now';
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card padding="none" className="animate-fade-in">
      <div className="flex items-center gap-2 px-5 pt-5 pb-4 sm:px-6 sm:pt-6">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50">
          <Clock className="w-4 h-4 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>
          <p className="text-xs text-slate-500">Latest QMS events and updates</p>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {activities.map((activity, index) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;

          return (
            <div
              key={activity.id}
              className="flex gap-3 px-5 py-3.5 sm:px-6 hover:bg-slate-50/60 transition-colors duration-150 animate-fade-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div
                className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg ${config.bg} mt-0.5`}
              >
                <Icon className={`w-4 h-4 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                  {activity.description}
                </p>
              </div>
              <span className="flex-shrink-0 text-[11px] text-slate-400 font-medium mt-0.5">
                {formatTimeAgo(activity.timestamp)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="px-5 py-3 sm:px-6 border-t border-slate-100">
        <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
          View all activity →
        </button>
      </div>
    </Card>
  );
}
