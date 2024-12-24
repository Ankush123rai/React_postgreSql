import { DashboardStats } from '@/components/dashboard/DashboardStats';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <DashboardStats />
    </div>
  );
}