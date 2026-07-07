import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { OwnerDashboard } from "@/components/dashboard/OwnerDashboard";

export default function OwnerPage() {
  return (
    <DashboardShell
      role="owner"
      title="Owner Overview"
      description="Pantau pendapatan, kapasitas kelas, performa guru, dan indikator operasional Smart Kids Learning Center."
    >
      <OwnerDashboard />
    </DashboardShell>
  );
}
