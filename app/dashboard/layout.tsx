// This layout is now a passthrough for legacy /dashboard route
// The actual per-store dashboards live at /dashboard/[storeId]
export default function LegacyDashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
