"use client";

import { useMemo, useState } from "react";
import { BookOpen, ClipboardCheck } from "lucide-react";
import type { Material, Subject } from "@/lib/types";

type Props = {
  materials: Material[];
  subjects: Subject[];
  compact?: boolean;
};

export function MaterialLibrary({ materials, subjects, compact = true }: Props) {
  const [grade, setGrade] = useState<number | "all">("all");
  const [subjectId, setSubjectId] = useState<string>("all");

  const filtered = useMemo(
    () =>
      materials.filter((material) => {
        const gradeMatch = grade === "all" || material.classGrade === grade;
        const subjectMatch = subjectId === "all" || material.subjectId === subjectId;
        return gradeMatch && subjectMatch;
      }),
    [grade, materials, subjectId]
  );

  function subjectName(id: string) {
    return subjects.find((subject) => subject.id === id)?.name ?? "Mapel";
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          className="field sm:max-w-48"
          value={grade}
          onChange={(event) =>
            setGrade(event.target.value === "all" ? "all" : Number(event.target.value))
          }
        >
          <option value="all">Semua kelas</option>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <option key={item} value={item}>
              SD Kelas {item}
            </option>
          ))}
        </select>
        <select
          className="field sm:max-w-56"
          value={subjectId}
          onChange={(event) => setSubjectId(event.target.value)}
        >
          <option value="all">Semua mapel</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      <div className={`grid gap-4 ${compact ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
        {filtered.map((material) => (
          <article key={material.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase text-ocean-700">
                  {subjectName(material.subjectId)} · SD Kelas {material.classGrade}
                </p>
                <h3 className="mt-2 text-lg font-bold text-ink">{material.chapter}</h3>
              </div>
              <span className="rounded-lg bg-sunshine-100 p-2 text-ocean-700">
                <BookOpen className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-4 leading-7 text-slate-600">{material.summary}</p>
            <div className="mt-4">
              <p className="label">Tujuan pembelajaran</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                {material.learningGoals.map((goal) => (
                  <li key={goal} className="flex gap-2">
                    <ClipboardCheck className="mt-0.5 h-4 w-4 flex-none text-ocean-600" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <p className="font-bold text-ink">Contoh soal</p>
                <p className="mt-1 text-slate-600">{material.examples[0]}</p>
              </div>
              <div>
                <p className="font-bold text-ink">Latihan</p>
                <p className="mt-1 text-slate-600">{material.exercises[0]}</p>
              </div>
              <div>
                <p className="font-bold text-ink">PR</p>
                <p className="mt-1 text-slate-600">{material.homework[0]}</p>
              </div>
              <div>
                <p className="font-bold text-ink">Catatan guru</p>
                <p className="mt-1 text-slate-600">{material.teacherNotes}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
