"use client";

import Link from "next/link";
import { BarChart3, CalendarClock, Crown, ReceiptText, TrendingUp, UsersRound } from "lucide-react";
import { useLearningCenterStore } from "@/lib/local-store";

export function OwnerDashboard() {
  const { data, stats } = useLearningCenterStore();
  const capacity = data.classes.reduce((total, kelas) => total + kelas.studentIds.length, 0);
  const paidPayments = data.payments.filter((payment) => payment.status === "Sudah bayar").length;
  const unpaidPayments = data.payments.filter((payment) => payment.status === "Belum bayar").length;

  const metrics = [
    {
      label: "Pendapatan diterima",
      value: `Rp${stats.paid.toLocaleString("id-ID")}`,
      icon: ReceiptText,
      detail: `${paidPayments} pembayaran lunas`
    },
    {
      label: "Piutang berjalan",
      value: `Rp${stats.unpaid.toLocaleString("id-ID")}`,
      icon: TrendingUp,
      detail: `${unpaidPayments} tagihan belum bayar`
    },
    {
      label: "Murid aktif",
      value: stats.activeStudents,
      icon: UsersRound,
      detail: `${data.students.length} total murid`
    },
    {
      label: "Kapasitas terisi",
      value: capacity,
      icon: CalendarClock,
      detail: `${data.classes.length} rombongan belajar`
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <article key={metric.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-500">{metric.label}</p>
                  <p className="mt-2 text-2xl font-bold text-ink">{metric.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{metric.detail}</p>
                </div>
                <span className="rounded-lg bg-sunshine-100 p-3 text-ocean-700">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
            </article>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="label text-ocean-700">Operasional</p>
              <h2 className="mt-1 text-xl font-bold text-ink">Performa kelas</h2>
            </div>
            <BarChart3 className="h-5 w-5 text-ocean-700" />
          </div>
          <div className="mt-5 space-y-3">
            {data.classes.map((kelas) => {
              const teacher = data.teachers.find((item) => item.id === kelas.teacherId);
              const fill = Math.min(100, Math.round((kelas.studentIds.length / 8) * 100));

              return (
                <div key={kelas.id} className="rounded-lg bg-slate-50 p-4">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-bold text-ink">{kelas.name}</p>
                      <p className="text-sm text-slate-500">Guru {teacher?.name ?? "-"}</p>
                    </div>
                    <span className="text-sm font-bold text-ocean-700">{kelas.studentIds.length}/8 murid</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white">
                    <div className="h-2 rounded-full bg-ocean-600" style={{ width: `${fill}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-ocean-50 p-3 text-ocean-700">
              <Crown className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-ink">Owner actions</h2>
              <p className="mt-1 text-sm text-slate-500">Akses cepat ke modul yang paling sering dipantau.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            <Link href="/dashboard/admin" className="btn-secondary justify-start">
              Kelola operasional admin
            </Link>
            <Link href="/dashboard/guru" className="btn-secondary justify-start">
              Cek workflow guru
            </Link>
            <Link href="/dashboard/orang-tua" className="btn-secondary justify-start">
              Preview dashboard orang tua
            </Link>
          </div>
        </section>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-bold text-ink">Ringkasan guru</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-3 py-3">Guru</th>
                <th className="px-3 py-3">Spesialisasi</th>
                <th className="px-3 py-3">Kelas diampu</th>
                <th className="px-3 py-3">Kontak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td className="px-3 py-3 font-semibold text-ink">{teacher.name}</td>
                  <td className="px-3 py-3">{teacher.specialties.join(", ")}</td>
                  <td className="px-3 py-3">
                    {data.classes.filter((kelas) => kelas.teacherId === teacher.id).length}
                  </td>
                  <td className="px-3 py-3">{teacher.whatsapp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
