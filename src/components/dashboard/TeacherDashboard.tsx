"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  BookOpenCheck,
  CalendarDays,
  ClipboardList,
  FilePenLine,
  GraduationCap,
  Save,
  UsersRound
} from "lucide-react";
import { AIMaterialGenerator } from "./AIMaterialGenerator";
import { MaterialLibrary } from "./MaterialLibrary";
import { useLearningCenterStore } from "@/lib/local-store";
import type { Attendance, Grade } from "@/lib/types";

const tabs = [
  { id: "schedule", label: "Jadwal", icon: CalendarDays },
  { id: "students", label: "Murid", icon: UsersRound },
  { id: "attendance", label: "Absensi", icon: ClipboardList },
  { id: "grades", label: "Nilai", icon: BookOpenCheck },
  { id: "notes", label: "Catatan", icon: FilePenLine },
  { id: "materials", label: "Materi", icon: GraduationCap },
  { id: "ai", label: "AI Materi", icon: GraduationCap }
] as const;

type TabId = (typeof tabs)[number]["id"];

export function TeacherDashboard() {
  const { data, setAttendance, addGrade, saveTeacherNote } = useLearningCenterStore();
  const [activeTab, setActiveTab] = useState<TabId>("schedule");
  const teacher = data.teachers[0];
  const teacherClasses = data.classes.filter((kelas) => kelas.teacherId === teacher?.id);
  const defaultClassId = teacherClasses[0]?.id ?? data.classes[0]?.id ?? "";
  const [selectedClassId, setSelectedClassId] = useState(defaultClassId);
  const activeClass = data.classes.find((kelas) => kelas.id === selectedClassId) ?? teacherClasses[0];
  const classStudents = data.students.filter((student) => activeClass?.studentIds.includes(student.id));

  const [gradeForm, setGradeForm] = useState({
    studentId: classStudents[0]?.id ?? "",
    subjectId: data.subjects[0]?.id ?? "",
    title: "Quiz Harian",
    score: 85,
    note: ""
  });
  const [noteForm, setNoteForm] = useState({
    studentId: classStudents[0]?.id ?? "",
    text: ""
  });

  function submitGrade(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const studentId = gradeForm.studentId || classStudents[0]?.id;
    const subjectId = gradeForm.subjectId || data.subjects[0]?.id;

    if (!activeClass || !studentId || !subjectId) {
      return;
    }

    addGrade({
      studentId,
      classId: activeClass.id,
      subjectId,
      title: gradeForm.title,
      score: gradeForm.score,
      note: gradeForm.note
    });
    setGradeForm((current) => ({ ...current, note: "" }));
  }

  function submitNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const studentId = noteForm.studentId || classStudents[0]?.id;

    if (!studentId || !noteForm.text) {
      return;
    }

    saveTeacherNote(studentId, noteForm.text);
    setNoteForm((current) => ({ ...current, text: "" }));
  }

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

      {activeTab !== "ai" && activeTab !== "materials" ? (
        <ClassPicker
          classes={teacherClasses}
          selectedClassId={selectedClassId}
          onChange={setSelectedClassId}
        />
      ) : null}

      {activeTab === "schedule" ? (
        <SchedulePanel data={data} classIds={teacherClasses.map((item) => item.id)} />
      ) : null}
      {activeTab === "students" ? <StudentPanel students={classStudents} /> : null}
      {activeTab === "attendance" ? (
        <AttendancePanel
          students={classStudents}
          classId={activeClass?.id ?? ""}
          onSetAttendance={setAttendance}
        />
      ) : null}
      {activeTab === "grades" ? (
        <GradePanel
          data={data}
          classId={activeClass?.id ?? ""}
          students={classStudents}
          gradeForm={gradeForm}
          setGradeForm={setGradeForm}
          onSubmit={submitGrade}
        />
      ) : null}
      {activeTab === "notes" ? (
        <NotePanel
          students={classStudents}
          reports={data.reports}
          noteForm={noteForm}
          setNoteForm={setNoteForm}
          onSubmit={submitNote}
        />
      ) : null}
      {activeTab === "materials" ? (
        <MaterialLibrary materials={data.materials} subjects={data.subjects} />
      ) : null}
      {activeTab === "ai" ? <AIMaterialGenerator /> : null}
    </div>
  );
}

function ClassPicker({
  classes,
  selectedClassId,
  onChange
}: {
  classes: { id: string; name: string }[];
  selectedClassId: string;
  onChange: (classId: string) => void;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
      <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <span className="label">Pilih kelas</span>
        <select className="field sm:max-w-64" value={selectedClassId} onChange={(event) => onChange(event.target.value)}>
          {classes.map((kelas) => (
            <option key={kelas.id} value={kelas.id}>
              {kelas.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

function SchedulePanel({
  data,
  classIds
}: {
  data: ReturnType<typeof useLearningCenterStore>["data"];
  classIds: string[];
}) {
  const schedules = data.schedules.filter((schedule) => classIds.includes(schedule.classId));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {schedules.map((schedule) => {
        const kelas = data.classes.find((item) => item.id === schedule.classId);
        const students = data.students.filter((student) => kelas?.studentIds.includes(student.id));

        return (
          <article key={schedule.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <p className="label text-ocean-700">{kelas?.name}</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">
              {schedule.day}, {schedule.startTime}-{schedule.endTime}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {students.length} murid · Mode {schedule.mode}
            </p>
          </article>
        );
      })}
    </div>
  );
}

function StudentPanel({
  students
}: {
  students: ReturnType<typeof useLearningCenterStore>["data"]["students"];
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-bold text-ink">Daftar murid per kelas</h2>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {students.map((student) => (
          <article key={student.id} className="rounded-lg bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-ink">{student.name}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  SD kelas {student.grade} · {student.parentName}
                </p>
              </div>
              <span className="rounded-full bg-ocean-50 px-3 py-1 text-xs font-bold capitalize text-ocean-700">
                {student.status}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{student.notes}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AttendancePanel({
  students,
  classId,
  onSetAttendance
}: {
  students: ReturnType<typeof useLearningCenterStore>["data"]["students"];
  classId: string;
  onSetAttendance: (studentId: string, classId: string, status: Attendance["status"]) => void;
}) {
  const statuses: Attendance["status"][] = ["hadir", "izin", "sakit", "alpa"];

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-bold text-ink">Isi absensi hari ini</h2>
      <div className="mt-5 space-y-3">
        {students.map((student) => (
          <div key={student.id} className="flex flex-col justify-between gap-3 rounded-lg bg-slate-50 p-3 md:flex-row md:items-center">
            <div>
              <p className="font-bold text-ink">{student.name}</p>
              <p className="text-sm text-slate-500">SD kelas {student.grade}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  type="button"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold capitalize text-slate-600 hover:border-ocean-300 hover:text-ocean-700"
                  onClick={() => onSetAttendance(student.id, classId, status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function GradePanel({
  data,
  students,
  gradeForm,
  setGradeForm,
  onSubmit
}: {
  data: ReturnType<typeof useLearningCenterStore>["data"];
  classId: string;
  students: ReturnType<typeof useLearningCenterStore>["data"]["students"];
  gradeForm: { studentId: string; subjectId: string; title: string; score: number; note: string };
  setGradeForm: React.Dispatch<React.SetStateAction<{ studentId: string; subjectId: string; title: string; score: number; note: string }>>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const recentGrades = useMemo(
    () => data.grades.filter((grade) => students.some((student) => student.id === grade.studentId)).slice(-6).reverse(),
    [data.grades, students]
  );

  function update<K extends keyof typeof gradeForm>(key: K, value: (typeof gradeForm)[K]) {
    setGradeForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <form onSubmit={onSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-bold text-ink">Isi nilai latihan/quiz</h2>
        <div className="mt-5 grid gap-4">
          <label className="space-y-2">
            <span className="label">Murid</span>
            <select className="field" value={gradeForm.studentId} onChange={(event) => update("studentId", event.target.value)}>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="label">Mapel</span>
            <select className="field" value={gradeForm.subjectId} onChange={(event) => update("subjectId", event.target.value)}>
              {data.subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="label">Judul</span>
            <input className="field" value={gradeForm.title} onChange={(event) => update("title", event.target.value)} />
          </label>
          <label className="space-y-2">
            <span className="label">Nilai</span>
            <input
              className="field"
              min={0}
              max={100}
              type="number"
              value={gradeForm.score}
              onChange={(event) => update("score", Number(event.target.value))}
            />
          </label>
          <label className="space-y-2">
            <span className="label">Catatan nilai</span>
            <textarea className="field min-h-24" value={gradeForm.note} onChange={(event) => update("note", event.target.value)} />
          </label>
        </div>
        <button type="submit" className="btn-primary mt-5 w-full">
          <Save className="h-4 w-4" />
          Simpan Nilai
        </button>
      </form>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-bold text-ink">Nilai terbaru</h2>
        <div className="mt-5 space-y-3">
          {recentGrades.map((grade: Grade) => {
            const student = data.students.find((item) => item.id === grade.studentId);
            const subject = data.subjects.find((item) => item.id === grade.subjectId);

            return (
              <div key={grade.id} className="rounded-lg bg-slate-50 p-3">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="font-bold text-ink">{grade.title}</p>
                    <p className="text-sm text-slate-500">
                      {student?.name} · {subject?.name}
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

function NotePanel({
  students,
  reports,
  noteForm,
  setNoteForm,
  onSubmit
}: {
  students: ReturnType<typeof useLearningCenterStore>["data"]["students"];
  reports: ReturnType<typeof useLearningCenterStore>["data"]["reports"];
  noteForm: { studentId: string; text: string };
  setNoteForm: React.Dispatch<React.SetStateAction<{ studentId: string; text: string }>>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <form onSubmit={onSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-bold text-ink">Catatan perkembangan murid</h2>
        <div className="mt-5 grid gap-4">
          <label className="space-y-2">
            <span className="label">Murid</span>
            <select
              className="field"
              value={noteForm.studentId}
              onChange={(event) => setNoteForm((current) => ({ ...current, studentId: event.target.value }))}
            >
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="label">Catatan guru</span>
            <textarea
              className="field min-h-40"
              value={noteForm.text}
              onChange={(event) => setNoteForm((current) => ({ ...current, text: event.target.value }))}
              placeholder="Tulis progres, kebiasaan belajar, dan rekomendasi singkat."
            />
          </label>
        </div>
        <button type="submit" className="btn-primary mt-5 w-full">
          <Save className="h-4 w-4" />
          Simpan Catatan
        </button>
      </form>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-bold text-ink">Catatan laporan</h2>
        <div className="mt-5 space-y-3">
          {reports.map((report) => {
            const student = students.find((item) => item.id === report.studentId);

            return student ? (
              <div key={report.id} className="rounded-lg bg-slate-50 p-3">
                <p className="font-bold text-ink">{student.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{report.teacherNotes}</p>
              </div>
            ) : null;
          })}
        </div>
      </section>
    </div>
  );
}
