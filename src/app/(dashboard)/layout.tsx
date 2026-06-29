// ============================================================
// IsoPulse — Dashboard Layout
// Wraps all authenticated pages with the AppShell sidebar layout
// ============================================================

import AppShell from '@/components/layout/AppShell';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
