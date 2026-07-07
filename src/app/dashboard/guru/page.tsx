import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { TeacherDashboard } from "@/components/dashboard/TeacherDashboard";

export default function GuruPage() {
  return (
    <DashboardShell
      role="guru"
      title="Ruang Kerja Guru"
      description="Lihat jadwal mengajar, daftar murid per kelas, isi absensi, nilai latihan, catatan perkembangan, dan materi pembelajaran."
    >
      <TeacherDashboard />
    </DashboardShell>
  );
}
