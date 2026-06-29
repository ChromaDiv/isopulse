// ============================================================
// IsoPulse — Settings Page
// ============================================================

import React from 'react';
import Card from '@/components/ui/Card';
import { isSupabaseConfigured } from '@/lib/mock-db-helper';
import {
  Settings as SettingsIcon,
  Database,
  User,
  Bell,
  Sliders,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const supabaseConnected = isSupabaseConfigured();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600">
          <SettingsIcon className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-sans">
            System Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure system parameters, notification rules, and monitor backend database status
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
        {/* Left Column: Form Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section: Profile */}
          <Card padding="lg">
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-100">
              <User className="w-4.5 h-4.5 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                User Profile Settings
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Full Name</label>
                <input
                  type="text"
                  defaultValue="Quality Manager"
                  className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 text-slate-600 focus:outline-none"
                  disabled
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Email Address</label>
                <input
                  type="email"
                  defaultValue="admin@isopulse.io"
                  className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 text-slate-600 focus:outline-none"
                  disabled
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Job Role</label>
                <input
                  type="text"
                  defaultValue="QMS Lead Administrator"
                  className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 text-slate-600 focus:outline-none"
                  disabled
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Department</label>
                <input
                  type="text"
                  defaultValue="Quality Assurance"
                  className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 text-slate-600 focus:outline-none"
                  disabled
                />
              </div>
            </div>
          </Card>

          {/* Section: Notifications */}
          <Card padding="lg">
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-100">
              <Bell className="w-4.5 h-4.5 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                QMS Email Trigger Rules
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <div>
                  <h4 className="text-sm font-medium text-slate-800">Non-Conformance Raised (NCR)</h4>
                  <p className="text-xs text-slate-500">Alert lead auditors when an OFI or Non-Conformance check is toggled</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <div>
                  <h4 className="text-sm font-medium text-slate-800">CAPA Overdue Notifications</h4>
                  <p className="text-xs text-slate-500">Email assignees and managers 48 hours prior to corrective action due dates</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="text-sm font-medium text-slate-800">Equipment Calibration Alerts</h4>
                  <p className="text-xs text-slate-500">Notify maintenance engineers when equipment calibration drifts are logged</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Database Status */}
        <div className="space-y-6">
          <Card padding="lg" className="border-t-2 border-t-indigo-500">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <Database className="w-4.5 h-4.5 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Database Status
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Provider</span>
                <span className="text-xs font-bold text-slate-800">Supabase (PostgreSQL)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Connection State</span>
                {supabaseConnected ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle className="w-3 h-3" />
                    Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200">
                    Local SQLite/JSON
                  </span>
                )}
              </div>
              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Project Reference Host</span>
                <span className="text-xs text-slate-600 break-all font-mono">
                  {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Offline/Mock Mode'}
                </span>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 bg-slate-50/50 p-3 rounded-lg">
                <ShieldCheck className="w-4.5 h-4.5 text-indigo-600 flex-shrink-0" />
                <span>Row-Level Security (RLS) policies are active and protecting tables.</span>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="w-4.5 h-4.5 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Standard Settings
              </h3>
            </div>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between border-b border-slate-50 py-1">
                <span>Active Standard</span>
                <span className="font-semibold text-slate-800">ISO 9001:2015</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 py-1">
                <span>Risk Matrix Dimensions</span>
                <span className="font-semibold text-slate-800">5 × 5 Matrix</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Language</span>
                <span className="font-semibold text-slate-800">English (US)</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
