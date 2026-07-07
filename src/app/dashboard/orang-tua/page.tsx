import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ParentDashboard } from "@/components/dashboard/ParentDashboard";

export default function OrangTuaPage() {
  return (
    <DashboardShell
      role="orang_tua"
      title="Dashboard Orang Tua"
      description="Pantau jadwal anak, kehadiran, nilai, catatan guru, status pembayaran, dan laporan perkembangan bulanan."
    >
      <ParentDashboard />
    </DashboardShell>
  );
}
