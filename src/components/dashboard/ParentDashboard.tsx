"use client";

import { useMemo, useState } from "react";
import {
  BookOpenCheck,
  CalendarDays,
  Download,
  FileText,
  HeartHandshake,
  ReceiptText
} from "lucide-react";
import { useLearningCenterStore } from "@/lib/local-store";

const tabs = [
  { id: "schedule", label: "Jadwal", icon: CalendarDays },
  { id: "attendance", label: "Kehadiran", icon: HeartHandshake },
  { id: "grades", label: "Nilai", icon: BookOpenCheck },
  { id: "notes", label: "Catatan Guru", icon: FileText },
  { id: "payments", label: "Pembayaran", icon: ReceiptText },
  { id: "report", label: "Laporan", icon: Download }
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ParentDashboard() {
  const { data } = useLearningCenterStore();
  const [activeTab, setActiveTab] = useState<TabId>("schedule");
  const parent = data.parents[0];
  const child = data.students.find((student) => student.parentId === parent?.id) ?? data.students[0];
  const childClass = data.classes.find((kelas) => kelas.studentIds.includes(child?.id ?? ""));
  const schedules = data.schedules.filter((schedule) => schedule.classId === childClass?.id);
  const attendance = data.attendance.filter((item) => item.studentId === child?.id);
  const grades = data.grades.filter((grade) => grade.studentId === child?.id);
  const payments = data.payments.filter((payment) => payment.studentId === child?.id);
  const report = data.reports.find((item) => item.studentId === child?.id);

  const attendanceRate = useMemo(() => {
    if (attendance.length === 0) {
      return 0;
    }

    return Math.round((attendance.filter((item) => item.status === "hadir").length / attendance.length) * 100);
  }, [attendance]);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="label text-ocean-700">Profil anak</p>
            <h2 className="mt-1 text-2xl font-bold text-ink">{child?.name}</h2>
            <p className="mt-2 text-sm text-slate-500">
              SD kelas {child?.grade} · {childClass?.name ?? "Belum masuk kelas"} · {parent?.name}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <MiniMetric label="Hadir" value={`${attendanceRate}%`} />
            <MiniMetric
              label="Nilai"
              value={
                grades.length
                  ? String(Math.round(grades.reduce((total, grade) => total + grade.score, 0) / grades.length))
                  : "-"
              }
            />
            <MiniMetric label="Tagihan" value={payments.some((item) => item.status === "Belum bayar") ? "Ada" : "Lunas"} />
          </div>
        </div>
      </section>

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

      {activeTab === "schedule" ? (
        <Panel title="Jadwal anak">
          <div className="grid gap-4 md:grid-cols-2">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="rounded-lg bg-slate-50 p-4">
                <p className="label text-ocean-700">{childClass?.name}</p>
                <p className="mt-2 text-xl font-bold text-ink">
                  {schedule.day}, {schedule.startTime}-{schedule.endTime}
                </p>
                <p className="mt-1 text-sm capitalize text-slate-500">{schedule.mode}</p>
              </div>
            ))}
          </div>
        </Panel>
      ) : null}

      {activeTab === "attendance" ? (
        <Panel title="Kehadiran">
          <div className="space-y-3">
            {attendance.map((item) => (
              <div key={item.id} className="flex justify-between rounded-lg bg-slate-50 p-3">
                <span className="font-semibold text-ink">{item.date}</span>
                <span className="rounded-full bg-ocean-50 px-3 py-1 text-xs font-bold capitalize text-ocean-700">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      ) : null}

      {activeTab === "grades" ? (
        <Panel title="Nilai latihan dan quiz">
          <div className="space-y-3">
            {grades.map((grade) => {
              const subject = data.subjects.find((item) => item.id === grade.subjectId);

              return (
                <div key={grade.id} className="rounded-lg bg-slate-50 p-4">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-bold text-ink">{grade.title}</p>
                      <p className="text-sm text-slate-500">{subject?.name}</p>
                    </div>
                    <span className="text-2xl font-bold text-ocean-700">{grade.score}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{grade.note}</p>
                </div>
              );
            })}
          </div>
        </Panel>
      ) : null}

      {activeTab === "notes" ? (
        <Panel title="Catatan guru">
          <p className="leading-8 text-slate-700">
            {report?.teacherNotes ?? "Catatan perkembangan akan muncul setelah guru menyimpan laporan."}
          </p>
        </Panel>
      ) : null}

      {activeTab === "payments" ? (
        <Panel title="Status pembayaran">
          <div className="space-y-3">
            {payments.map((payment) => (
              <div key={payment.id} className="flex flex-col justify-between gap-3 rounded-lg bg-slate-50 p-4 sm:flex-row sm:items-center">
                <div>
                  <p className="font-bold text-ink">{payment.month}</p>
                  <p className="text-sm text-slate-500">
                    Rp{payment.amount.toLocaleString("id-ID")} · {payment.method}
                  </p>
                </div>
                <span className="w-fit rounded-full bg-sunshine-100 px-3 py-1 text-xs font-bold text-ink">
                  {payment.status}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      ) : null}

      {activeTab === "report" ? (
        <Panel title="Laporan perkembangan bulanan">
          {report ? (
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <ReportInfo label="Nama murid" value={child?.name ?? "-"} />
                <ReportInfo label="Kelas" value={`SD kelas ${child?.grade}`} />
                <ReportInfo label="Kehadiran" value={report.attendanceSummary} />
                <ReportInfo label="Rata-rata nilai" value={String(report.averageScore)} />
                <ReportInfo label="Materi dipelajari" value={report.completedMaterials.join(", ")} />
                <ReportInfo label="Kelebihan anak" value={report.strengths} />
                <ReportInfo label="Perlu ditingkatkan" value={report.improvements} />
                <ReportInfo label="Saran rumah" value={report.homeSuggestion} />
              </div>
              <button className="btn-primary" type="button" onClick={() => window.print()}>
                <Download className="h-4 w-4" />
                Download Laporan
              </button>
            </div>
          ) : (
            <p className="text-slate-600">Laporan belum tersedia.</p>
          )}
        </Panel>
      ) : null}
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-ocean-50 px-4 py-3">
      <p className="text-lg font-bold text-ocean-700">{value}</p>
      <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-bold text-ink">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ReportInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
      <p className="mt-1 leading-6 text-slate-700">{value}</p>
    </div>
  );
}
