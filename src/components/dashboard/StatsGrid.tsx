// ============================================================
// IsoPulse — StatsGrid Component
// Dashboard statistics cards with trend indicators
// ============================================================

'use client';

import React from 'react';
import {
  ClipboardCheck,
  AlertOctagon,
  Clock,
  Gauge,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';
import type { DashboardStats } from '@/lib/types';

interface StatsGridProps {
  stats: DashboardStats;
}

interface StatCardConfig {
  label: string;
  value: number;
  trend: number;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  trendSuffix?: string;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const cards: StatCardConfig[] = [
    {
      label: 'Active Audits',
      value: stats.activeAudits,
      trend: stats.activeAuditsTrend,
      icon: ClipboardCheck,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
    },
    {
      label: 'Open NCRs',
      value: stats.openNCRs,
      trend: stats.openNCRsTrend,
      icon: AlertOctagon,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-600',
    },
    {
      label: 'Overdue CAPAs',
      value: stats.overdueCAPAs,
      trend: stats.overdueCAPAsTrend,
      icon: Clock,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      label: 'Calibration Alerts',
      value: stats.calibrationAlerts,
      trend: stats.calibrationAlertsTrend,
      icon: Gauge,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 stagger-children">
      {cards.map((card) => {
        const Icon = card.icon;
        const isPositive = card.trend > 0;
        const isNeutral = card.trend === 0;
        const isNCRorCAPAGood = (card.label === 'Open NCRs' || card.label === 'Overdue CAPAs') && card.trend < 0;

        // For NCRs and CAPAs, a decrease is good
        const trendColor = isNeutral
          ? 'text-slate-400'
          : isNCRorCAPAGood || (card.label !== 'Open NCRs' && card.label !== 'Overdue CAPAs' && isPositive)
            ? 'text-emerald-600'
            : 'text-rose-600';

        const trendBg = isNeutral
          ? 'bg-slate-50'
          : isNCRorCAPAGood || (card.label !== 'Open NCRs' && card.label !== 'Overdue CAPAs' && isPositive)
            ? 'bg-emerald-50'
            : 'bg-rose-50';

        return (
          <div
            key={card.label}
            className="animate-fade-in bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 hover:shadow-md hover:border-slate-300/80 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-lg ${card.iconBg} transition-transform duration-200 group-hover:scale-110`}
              >
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${trendBg} ${trendColor}`}>
                {isNeutral ? (
                  <Minus className="w-3 h-3" />
                ) : isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{isNeutral ? '0%' : `${Math.abs(card.trend)}%`}</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-slate-900 tracking-tight animate-count-up">
                {card.value}
              </p>
              <p className="text-sm text-slate-500 mt-0.5">{card.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
