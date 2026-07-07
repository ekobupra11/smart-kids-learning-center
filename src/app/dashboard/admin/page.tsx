import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function AdminPage() {
  return (
    <DashboardShell
      role="admin"
      title="Manajemen Smart Kids Learning Center"
      description="Kelola pendaftaran murid, kelas, guru, jadwal, pembayaran, absensi, nilai, laporan, dan materi digital dari satu tempat."
    >
      <AdminDashboard />
    </DashboardShell>
  );
}
