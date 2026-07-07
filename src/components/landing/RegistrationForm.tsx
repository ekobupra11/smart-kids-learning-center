"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { initialData } from "@/lib/mock-data";
import { useLearningCenterStore } from "@/lib/local-store";
import type { RegistrationInput } from "@/lib/types";

const emptyForm: RegistrationInput = {
  childName: "",
  grade: 1,
  age: 7,
  parentName: "",
  whatsapp: "",
  address: "",
  packageId: "paket-regular",
  desiredSchedule: "",
  notes: ""
};

export function RegistrationForm() {
  const { addRegistration } = useLearningCenterStore();
  const [form, setForm] = useState<RegistrationInput>(emptyForm);
  const [successName, setSuccessName] = useState("");

  function update<K extends keyof RegistrationInput>(key: K, value: RegistrationInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const childName = form.childName;
    addRegistration(form);
    setSuccessName(childName);
    setForm(emptyForm);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-5">
        <h3 className="text-xl font-bold text-ink">Form Pendaftaran Murid</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Isi data awal agar admin bisa menyiapkan kelas yang sesuai.
        </p>
      </div>

      {successName ? (
        <div className="mb-5 flex items-start gap-3 rounded-lg bg-ocean-50 p-4 text-sm text-ocean-700">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none" />
          <span>
            Pendaftaran {successName} tersimpan. Admin dapat melihatnya di dashboard murid.
          </span>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="label">Nama anak</span>
          <input
            className="field"
            required
            value={form.childName}
            onChange={(event) => update("childName", event.target.value)}
            placeholder="Contoh: Alya Putri"
          />
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
            required
            min={6}
            max={13}
            type="number"
            value={form.age}
            onChange={(event) => update("age", Number(event.target.value))}
          />
        </label>
        <label className="space-y-2">
          <span className="label">Nama orang tua</span>
          <input
            className="field"
            required
            value={form.parentName}
            onChange={(event) => update("parentName", event.target.value)}
            placeholder="Nama ayah/ibu"
          />
        </label>
        <label className="space-y-2">
          <span className="label">Nomor WhatsApp</span>
          <input
            className="field"
            required
            value={form.whatsapp}
            onChange={(event) => update("whatsapp", event.target.value)}
            placeholder="62812..."
          />
        </label>
        <label className="space-y-2">
          <span className="label">Pilihan paket</span>
          <select
            className="field"
            value={form.packageId}
            onChange={(event) => update("packageId", event.target.value)}
          >
            {initialData.packages.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} - Rp{item.price.toLocaleString("id-ID")}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block space-y-2">
        <span className="label">Alamat</span>
        <textarea
          className="field min-h-20"
          required
          value={form.address}
          onChange={(event) => update("address", event.target.value)}
          placeholder="Alamat lengkap"
        />
      </label>
      <label className="mt-4 block space-y-2">
        <span className="label">Jadwal yang diinginkan</span>
        <input
          className="field"
          required
          value={form.desiredSchedule}
          onChange={(event) => update("desiredSchedule", event.target.value)}
          placeholder="Contoh: Senin & Rabu sore"
        />
      </label>
      <label className="mt-4 block space-y-2">
        <span className="label">Catatan khusus</span>
        <textarea
          className="field min-h-24"
          value={form.notes}
          onChange={(event) => update("notes", event.target.value)}
          placeholder="Kebutuhan belajar, karakter anak, target khusus"
        />
      </label>
      <button type="submit" className="btn-primary mt-5 w-full">
        Kirim Pendaftaran
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
