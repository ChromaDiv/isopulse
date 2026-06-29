// ============================================================
// IsoPulse — Executive Dashboard (Clause 9.3 Management Review)
// Server Component fetching real data from Supabase
// ============================================================

import StatsGrid from '@/components/dashboard/StatsGrid';
import ComplianceHealthScore from '@/components/dashboard/ComplianceHealthScore';
import AuditTrendChart from '@/components/dashboard/AuditTrendChart';
import RecentActivity from '@/components/dashboard/RecentActivity';
import UpcomingAudits from '@/components/dashboard/UpcomingAudits';
import {
  getDashboardStats,
  getComplianceHealth,
  getAuditTrend,
  getRecentActivity,
  getUpcomingAudits,
} from '@/lib/data/queries';

export default async function DashboardPage() {
  const [stats, health, trend, activity, audits] = await Promise.all([
    getDashboardStats(),
    getComplianceHealth(),
    getAuditTrend(),
    getRecentActivity(),
    getUpcomingAudits(),
  ]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Executive Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          ISO 9001:2015 Management Review — Real-time QMS performance overview
        </p>
      </div>

      {/* Stats Grid */}
      <StatsGrid stats={stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Health — takes 1 column */}
        <div className="lg:col-span-1">
          <ComplianceHealthScore health={health} />
        </div>

        {/* Audit Trend Chart — takes 2 columns */}
        <div className="lg:col-span-2">
          <AuditTrendChart data={trend} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <RecentActivity activities={activity} />

        {/* Upcoming Audits */}
        <UpcomingAudits audits={audits} />
      </div>
    </div>
  );
}
