"use client";

import { FormEvent, useMemo, useState } from "react";
import { Edit3, Plus, Save, Trash2 } from "lucide-react";
import type { AppData, Student, StudentFormInput } from "@/lib/types";

type Props = {
  data: AppData;
  onSave: (input: StudentFormInput) => void;
  onDelete: (studentId: string) => void;
};

function emptyStudent(data: AppData): StudentFormInput {
  return {
    name: "",
    grade: 1,
    age: 7,
    parentId: data.parents[0]?.id ?? "parent-1",
    parentName: "",
    whatsapp: "",
    address: "",
    packageId: data.packages[0]?.id ?? "paket-starter",
    desiredSchedule: "",
    notes: "",
    status: "baru"
  };
}

export function StudentManager({ data, onSave, onDelete }: Props) {
  const [form, setForm] = useState<StudentFormInput>(() => emptyStudent(data));
  const [query, setQuery] = useState("");

  const students = useMemo(
    () =>
      data.students.filter((student) =>
        `${student.name} ${student.parentName} ${student.grade}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [data.students, query]
  );

  function update<K extends keyof StudentFormInput>(key: K, value: StudentFormInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function edit(student: Student) {
    setForm({
      id: student.id,
      name: student.name,
      grade: student.grade,
      age: student.age,
      parentId: student.parentId,
      parentName: student.parentName,
      whatsapp: student.whatsapp,
      address: student.address,
      packageId: student.packageId,
      desiredSchedule: student.desiredSchedule,
      notes: student.notes,
      status: student.status
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(form);
    setForm(emptyStudent(data));
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
      <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-ink">{form.id ? "Edit murid" : "Tambah murid"}</h2>
            <p className="mt-1 text-sm text-slate-500">Lengkapi profil belajar dan kontak orang tua.</p>
          </div>
          {form.id ? (
            <button type="button" className="btn-secondary px-3 py-2" onClick={() => setForm(emptyStudent(data))}>
              <Plus className="h-4 w-4" />
              Baru
            </button>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="label">Nama murid</span>
            <input className="field" required value={form.name} onChange={(event) => update("name", event.target.value)} />
          </label>
          <label className="space-y-2">
            <span className="label">Kelas</span>
            <select
              className="field"
              value={form.grade}
              onChange={(event) => update("grade", Number(event.target.value))}
            >
              {[1, 2, 3, 4, 5, 6].map((grade) => (
                <option key={grade} value={grade}>
                  SD Kelas {grade}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="label">Usia</span>
            <input
              className="field"
              min={6}
              max={13}
              type="number"
              value={form.age}
              onChange={(event) => update("age", Number(event.target.value))}
            />
          </label>
          <label className="space-y-2">
            <span className="label">Status</span>
            <select
              className="field"
              value={form.status}
              onChange={(event) => update("status", event.target.value as Student["status"])}
            >
              <option value="baru">Baru</option>
              <option value="aktif">Aktif</option>
              <option value="cuti">Cuti</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="label">Orang tua</span>
            <input
              className="field"
              required
              value={form.parentName}
              onChange={(event) => update("parentName", event.target.value)}
            />
          </label>
          <label className="space-y-2">
            <span className="label">WhatsApp</span>
            <input className="field" required value={form.whatsapp} onChange={(event) => update("whatsapp", event.target.value)} />
          </label>
          <label className="space-y-2">
            <span className="label">Paket</span>
            <select
              className="field"
              value={form.packageId}
              onChange={(event) => update("packageId", event.target.value)}
            >
              {data.packages.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="label">Jadwal</span>
            <input
              className="field"
              value={form.desiredSchedule}
              onChange={(event) => update("desiredSchedule", event.target.value)}
            />
          </label>
        </div>
        <label className="mt-4 block space-y-2">
          <span className="label">Alamat</span>
          <textarea className="field min-h-20" value={form.address} onChange={(event) => update("address", event.target.value)} />
        </label>
        <label className="mt-4 block space-y-2">
          <span className="label">Catatan khusus</span>
          <textarea className="field min-h-20" value={form.notes} onChange={(event) => update("notes", event.target.value)} />
        </label>
        <button type="submit" className="btn-primary mt-5 w-full">
          <Save className="h-4 w-4" />
          Simpan Murid
        </button>
      </form>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-ink">Daftar Murid</h2>
            <p className="mt-1 text-sm text-slate-500">{students.length} murid ditemukan.</p>
          </div>
          <input
            className="field sm:max-w-64"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari murid..."
          />
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-3 py-3">Murid</th>
                <th className="px-3 py-3">Kelas</th>
                <th className="px-3 py-3">Orang tua</th>
                <th className="px-3 py-3">Paket</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-3 py-3 font-semibold text-ink">{student.name}</td>
                  <td className="px-3 py-3">SD {student.grade}</td>
                  <td className="px-3 py-3">{student.parentName}</td>
                  <td className="px-3 py-3">
                    {data.packages.find((item) => item.id === student.packageId)?.name ?? "-"}
                  </td>
                  <td className="px-3 py-3">
                    <span className="rounded-full bg-ocean-50 px-3 py-1 text-xs font-bold capitalize text-ocean-700">
                      {student.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex justify-end gap-2">
                      <button className="btn-secondary px-3 py-2" type="button" onClick={() => edit(student)}>
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-lg border border-red-100 bg-white px-3 py-2 text-red-600 transition hover:bg-red-50"
                        type="button"
                        onClick={() => onDelete(student.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
