import { BookOpenCheck, BriefcaseBusiness, GraduationCap, ShieldCheck } from "lucide-react";
import type { Role } from "./types";

export const roleLabels: Record<Role, string> = {
  admin: "Admin",
  guru: "Guru",
  orang_tua: "Orang Tua",
  owner: "Owner"
};

export const dashboardPaths: Record<Role, string> = {
  admin: "/dashboard/admin",
  guru: "/dashboard/guru",
  orang_tua: "/dashboard/orang-tua",
  owner: "/dashboard/owner"
};

export const roleAccess = {
  admin: [
    "Kelola murid, guru, kelas, jadwal",
    "Pantau pembayaran, absensi, nilai",
    "Cetak laporan perkembangan"
  ],
  guru: [
    "Lihat jadwal mengajar",
    "Isi absensi dan nilai",
    "Buat catatan perkembangan dan materi"
  ],
  orang_tua: [
    "Pantau jadwal dan kehadiran anak",
    "Lihat nilai dan catatan guru",
    "Download laporan bulanan"
  ],
  owner: [
    "Lihat performa bisnis",
    "Pantau pendapatan dan kapasitas kelas",
    "Evaluasi laporan operasional"
  ]
} satisfies Record<Role, string[]>;

export const roleCards = [
  {
    role: "admin" as Role,
    icon: ShieldCheck,
    title: "Admin Bimbel",
    description: "Operasional harian, data murid, kelas, pembayaran, dan laporan."
  },
  {
    role: "guru" as Role,
    icon: GraduationCap,
    title: "Guru",
    description: "Jadwal mengajar, absensi, nilai, materi, dan catatan perkembangan."
  },
  {
    role: "orang_tua" as Role,
    icon: BookOpenCheck,
    title: "Orang Tua",
    description: "Pantau progres belajar, tagihan, dan laporan bulanan anak."
  },
  {
    role: "owner" as Role,
    icon: BriefcaseBusiness,
    title: "Owner",
    description: "Ringkasan pendapatan, kapasitas kelas, dan performa bimbel."
  }
];
