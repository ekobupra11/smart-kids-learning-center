"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  BookOpenCheck,
  CalendarClock,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Printer,
  ReceiptText,
  RotateCcw,
  UsersRound
} from "lucide-react";
import { AIMaterialGenerator } from "./AIMaterialGenerator";
import { MaterialLibrary } from "./MaterialLibrary";
import { StudentManager } from "./StudentManager";
import { useLearningCenterStore } from "@/lib/local-store";
import type { AppData, Payment } from "@/lib/types";

const tabs = [
  { id: "overview", label: "Ringkasan", icon: LayoutDashboard },
  { id: "students", label: "Murid", icon: UsersRound },
  { id: "classes", label: "Kelas & Jadwal", icon: CalendarClock },
  { id: "payments", label: "Pembayaran", icon: ReceiptText },
  { id: "progress", label: "Absensi & Nilai", icon: BookOpenCheck },
  { id: "reports", label: "Laporan", icon: FileText },
  { id: "ai", label: "AI Materi", icon: GraduationCap }
] as const;

type TabId = (typeof tabs)[number]["id"];

export function AdminDashboard() {
  const {
    data,
    stats,
    saveStudent,
    deleteStudent,
    updatePayment,
    resetMockData
  } = useLearningCenterStore();
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg border px-3 py-2 text-sm font-bold ${
                activeTab === tab.id
                  ? "border-ocean-600 bg-ocean-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-ocean-200"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "overview" ? (
        <OverviewPanel data={data} stats={stats} onReset={resetMockData} />
      ) : null}
      {activeTab === "students" ? (
        <StudentManager data={data} onSave={saveStudent} onDelete={deleteStudent} />
      ) : null}
      {activeTab === "classes" ? <ClassPanel data={data} /> : null}
      {activeTab === "payments" ? (
        <PaymentPanel data={data} onUpdatePayment={updatePayment} />
      ) : null}
      {activeTab === "progress" ? <AttendanceGradePanel data={data} /> : null}
      {activeTab === "reports" ? <ReportPanel data={data} /> : null}
      {activeTab === "ai" ? <AIMaterialGenerator /> : null}
    </div>
  );
}

function OverviewPanel({
  data,
  stats,
  onReset
}: {
  data: AppData;
  stats: {
    paid: number;
    unpaid: number;
    activeStudents: number;
    averageScore: number;
    attendanceRate: number;
  };
  onReset: () => void;
}) {
  const metrics = [
    {
      label: "Murid aktif",
      value: stats.activeStudents,
      icon: UsersRound,
      detail: `${data.students.length} total murid`
    },
    {
      label: "Pembayaran masuk",
      value: `Rp${stats.paid.toLocaleString("id-ID")}`,
      icon: ReceiptText,
      detail: `Piutang Rp${stats.unpaid.toLocaleString("id-ID")}`
    },
    {
      label: "Kehadiran",
      value: `${stats.attendanceRate}%`,
      icon: CalendarClock,
      detail: `${data.attendance.length} catatan absensi`
    },
    {
      label: "Rata-rata nilai",
      value: stats.averageScore,
      icon: BarChart3,
      detail: `${data.grades.length} nilai tersimpan`
    }
  ];

  return (
    <div className="space-y-5">
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
                <span className="rounded-lg bg-ocean-50 p-3 text-ocean-700">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
            </article>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-ink">Pendaftaran terbaru</h2>
              <p className="mt-1 text-sm text-slate-500">Murid baru dari form landing page akan muncul di sini.</p>
            </div>
            <button type="button" onClick={onReset} className="btn-secondary px-3 py-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
          <div className="mt-5 divide-y divide-slate-100">
            {data.students.slice(-5).reverse().map((student) => (
              <div key={student.id} className="flex flex-col justify-between gap-2 py-3 sm:flex-row sm:items-center">
                <div>
                  <p className="font-bold text-ink">{student.name}</p>
                  <p className="text-sm text-slate-500">
                    SD kelas {student.grade} · {student.parentName} · {student.whatsapp}
                  </p>
                </div>
                <span className="w-fit rounded-full bg-sunshine-100 px-3 py-1 text-xs font-bold capitalize text-ink">
                  {student.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="text-xl font-bold text-ink">Modul tersedia</h2>
          <p className="mt-1 text-sm text-slate-500">
            {data.materials.length} materi siap dipakai di kelas dan dashboard guru.
          </p>
          <div className="mt-4 space-y-3">
            {data.subjects.map((subject) => {
              const count = data.materials.filter((material) => material.subjectId === subject.id).length;

              return (
                <div key={subject.id} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    />
                    <span className="font-semibold text-ink">{subject.name}</span>
                  </div>
                  <span className="text-sm font-bold text-ocean-700">{count} bab</span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

function ClassPanel({ data }: { data: AppData }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-2">
        {data.classes.map((kelas) => {
          const teacher = data.teachers.find((item) => item.id === kelas.teacherId);
          const schedules = data.schedules.filter((item) => kelas.scheduleIds.includes(item.id));
          const students = data.students.filter((student) => kelas.studentIds.includes(student.id));

          return (
            <article key={kelas.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <p className="label text-ocean-700">Kelas</p>
                  <h2 className="mt-1 text-xl font-bold text-ink">{kelas.name}</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    {kelas.room} · Guru {teacher?.name ?? "-"}
                  </p>
                </div>
                <span className="rounded-full bg-ocean-50 px-3 py-1 text-xs font-bold text-ocean-700">
                  {students.length} murid
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs font-bold uppercase text-slate-500">Jadwal</p>
                  {schedules.map((schedule) => (
                    <p key={schedule.id} className="mt-1 font-semibold text-ink">
                      {schedule.day}, {schedule.startTime}-{schedule.endTime}
                    </p>
                  ))}
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs font-bold uppercase text-slate-500">Materi</p>
                  <p className="mt-1 font-semibold text-ink">{kelas.materialIds.length} bab aktif</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {students.map((student) => (
                  <span key={student.id} className="rounded-full bg-sunshine-100 px-3 py-1 text-xs font-bold text-ink">
                    {student.name}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
      <MaterialLibrary materials={data.materials} subjects={data.subjects} />
    </div>
  );
}

function PaymentPanel({
  data,
  onUpdatePayment
}: {
  data: AppData;
  onUpdatePayment: (paymentId: string, status: Payment["status"], method: Payment["method"]) => void;
}) {
  const totals = useMemo(
    () => ({
      paid: data.payments
        .filter((payment) => payment.status === "Sudah bayar")
        .reduce((total, payment) => total + payment.amount, 0),
      unpaid: data.payments
        .filter((payment) => payment.status === "Belum bayar")
        .reduce((total, payment) => total + payment.amount, 0)
    }),
    [data.payments]
  );

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-bold text-ink">Status pembayaran</h2>
          <p className="mt-1 text-sm text-slate-500">
            Masuk Rp{totals.paid.toLocaleString("id-ID")} · Belum bayar Rp
            {totals.unpaid.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-3">Murid</th>
              <th className="px-3 py-3">Bulan</th>
              <th className="px-3 py-3">Tagihan</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Metode</th>
              <th className="px-3 py-3">Tanggal</th>
              <th className="px-3 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.payments.map((payment) => {
              const student = data.students.find((item) => item.id === payment.studentId);

              return (
                <tr key={payment.id}>
                  <td className="px-3 py-3 font-semibold text-ink">{student?.name ?? "-"}</td>
                  <td className="px-3 py-3">{payment.month}</td>
                  <td className="px-3 py-3">Rp{payment.amount.toLocaleString("id-ID")}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        payment.status === "Sudah bayar"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">{payment.method}</td>
                  <td className="px-3 py-3">{payment.paidAt ?? "-"}</td>
                  <td className="px-3 py-3">
                    <div className="flex justify-end gap-2">
                      <select
                        className="field max-w-32 py-2"
                        value={payment.method}
                        onChange={(event) =>
                          onUpdatePayment(payment.id, "Sudah bayar", event.target.value as Payment["method"])
                        }
                      >
                        <option value="-">Metode</option>
                        <option value="Tunai">Tunai</option>
                        <option value="Transfer">Transfer</option>
                        <option value="QRIS">QRIS</option>
                      </select>
                      <button
                        type="button"
                        className="btn-secondary px-3 py-2"
                        onClick={() =>
                          onUpdatePayment(
                            payment.id,
                            payment.status === "Sudah bayar" ? "Belum bayar" : "Sudah bayar",
                            payment.status === "Sudah bayar" ? "-" : "Transfer"
                          )
                        }
                      >
                        Toggle
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AttendanceGradePanel({ data }: { data: AppData }) {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-bold text-ink">Absensi</h2>
        <div className="mt-5 space-y-3">
          {data.attendance.map((item) => {
            const student = data.students.find((studentItem) => studentItem.id === item.studentId);
            const kelas = data.classes.find((classItem) => classItem.id === item.classId);

            return (
              <div key={item.id} className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 p-3">
                <div>
                  <p className="font-bold text-ink">{student?.name ?? "-"}</p>
                  <p className="text-sm text-slate-500">
                    {kelas?.name ?? "-"} · {item.date}
                  </p>
                </div>
                <span className="rounded-full bg-ocean-50 px-3 py-1 text-xs font-bold capitalize text-ocean-700">
                  {item.status}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-bold text-ink">Nilai latihan/quiz</h2>
        <div className="mt-5 space-y-3">
          {data.grades.map((grade) => {
            const student = data.students.find((studentItem) => studentItem.id === grade.studentId);
            const subject = data.subjects.find((subjectItem) => subjectItem.id === grade.subjectId);

            return (
              <div key={grade.id} className="rounded-lg bg-slate-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-ink">{grade.title}</p>
                    <p className="text-sm text-slate-500">
                      {student?.name ?? "-"} · {subject?.name ?? "-"} · {grade.date}
                    </p>
                  </div>
                  <span className="text-xl font-bold text-ocean-700">{grade.score}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{grade.note}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function ReportPanel({ data }: { data: AppData }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-ink">Laporan perkembangan murid</h2>
          <p className="mt-1 text-sm text-slate-500">Siap dicetak atau diunduh sebagai PDF dari browser.</p>
        </div>
        <button type="button" className="btn-primary" onClick={() => window.print()}>
          <Printer className="h-4 w-4" />
          Cetak Laporan
        </button>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {data.reports.map((report) => {
          const student = data.students.find((item) => item.id === report.studentId);

          return (
            <article key={report.id} className="rounded-lg border border-slate-200 p-5">
              <p className="label text-ocean-700">{report.month}</p>
              <h3 className="mt-2 text-xl font-bold text-ink">{student?.name ?? "-"}</h3>
              <p className="mt-1 text-sm text-slate-500">SD kelas {student?.grade ?? "-"}</p>
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <Info label="Kehadiran" value={report.attendanceSummary} />
                <Info label="Rata-rata nilai" value={String(report.averageScore)} />
                <Info label="Materi dipelajari" value={report.completedMaterials.join(", ")} />
                <Info label="Kelebihan anak" value={report.strengths} />
                <Info label="Perlu ditingkatkan" value={report.improvements} />
                <Info label="Saran rumah" value={report.homeSuggestion} />
              </div>
              <div className="mt-4 rounded-lg bg-ocean-50 p-3 text-sm leading-6 text-ocean-800">
                {report.teacherNotes}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
      <p className="mt-1 leading-6 text-slate-700">{value}</p>
    </div>
  );
}
