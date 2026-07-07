import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MaterialLibrary } from "@/components/dashboard/MaterialLibrary";
import { initialData } from "@/lib/mock-data";

export default function MateriPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="container-page py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-ocean-700">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke landing page
        </Link>
        <div className="mt-8 max-w-3xl">
          <p className="label text-ocean-700">Modul Materi</p>
          <h1 className="mt-3 text-4xl font-bold text-ink">Materi SD kelas 1-6</h1>
          <p className="mt-4 leading-8 text-slate-600">
            Struktur materi berisi mata pelajaran, kelas, bab, tujuan pembelajaran, ringkasan,
            contoh soal, latihan, PR, dan catatan guru.
          </p>
        </div>
        <div className="mt-8">
          <MaterialLibrary
            materials={initialData.materials}
            subjects={initialData.subjects}
            compact={false}
          />
        </div>
      </section>
    </main>
  );
}
