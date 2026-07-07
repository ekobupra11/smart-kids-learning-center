"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  UsersRound
} from "lucide-react";
import { RegistrationForm } from "./RegistrationForm";
import { initialData } from "@/lib/mock-data";

const advantages = [
  {
    icon: UsersRound,
    title: "Kelas kecil",
    description: "Guru lebih mudah memantau pemahaman, ritme belajar, dan keberanian anak."
  },
  {
    icon: ShieldCheck,
    title: "Guru sabar",
    description: "Pendekatan hangat untuk anak SD kelas awal sampai persiapan ujian kelas 6."
  },
  {
    icon: BarChart3,
    title: "Laporan perkembangan",
    description: "Orang tua bisa melihat kehadiran, nilai, catatan guru, dan saran belajar."
  },
  {
    icon: BrainCircuit,
    title: "Modul AI",
    description: "Materi dan latihan personal bisa digenerate sesuai kelas, mapel, dan bab."
  }
];

const grades = ["Kelas 1", "Kelas 2", "Kelas 3", "Kelas 4", "Kelas 5", "Kelas 6"];

export function LandingPage() {
  const whatsappUrl =
    "https://wa.me/6281234567890?text=Halo%20Smart%20Kids%2C%20saya%20mau%20konsultasi%20program%20bimbel%20SD.";

  return (
    <main className="min-h-screen overflow-hidden">
      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/88 backdrop-blur">
        <nav className="container-page flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-ink">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-ocean-600 text-white">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="hidden sm:inline">Smart Kids Learning Center</span>
            <span className="sm:hidden">Smart Kids</span>
          </Link>
          <div className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
            <a href="#program" className="hover:text-ocean-700">
              Program
            </a>
            <a href="#harga" className="hover:text-ocean-700">
              Paket
            </a>
            <a href="#faq" className="hover:text-ocean-700">
              FAQ
            </a>
            <Link href="/materi" className="hover:text-ocean-700">
              Materi
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login" className="btn-secondary hidden px-3 py-2 sm:inline-flex">
              Demo Login
            </Link>
            <a href={whatsappUrl} className="btn-primary px-3 py-2" target="_blank">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </nav>
      </header>

      <section className="relative">
        <div className="container-page grid min-h-[calc(100vh-4rem)] items-center gap-10 py-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ocean-700 shadow-soft">
              <BrainCircuit className="h-4 w-4" />
              Bimbel SD modern berbasis AI
            </div>
            <h1 className="text-4xl font-bold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              Smart Kids Learning Center
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Program bimbel SD kelas 1-6 dengan kelas kecil, guru sabar, latihan personal,
              dashboard orang tua, dan laporan perkembangan bulanan.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#daftar" className="btn-primary">
                Daftar Murid
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/login" className="btn-secondary">
                Lihat Dashboard Demo
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
              {[
                ["1-6", "Kelas SD"],
                ["8x", "Laporan/bulan"],
                ["AI", "Latihan personal"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-ocean-100 bg-white p-4 shadow-soft">
                  <div className="text-2xl font-bold text-ocean-700">{value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[360px] lg:min-h-[560px]">
            <Image
              src="/images/hero-learning-center.png"
              alt="Anak-anak SD belajar bersama guru dan tablet AI"
              fill
              priority
              className="rounded-lg object-cover shadow-soft"
              sizes="(min-width: 1024px) 54vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section id="program" className="bg-white py-16">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="label text-ocean-700">Program SD kelas 1-6</p>
              <h2 className="mt-3 text-3xl font-bold text-ink">Belajar lebih personal, terukur, dan menyenangkan.</h2>
              <p className="mt-4 leading-8 text-slate-600">
                Setiap kelas punya jadwal, guru, materi, murid, absensi, nilai, dan laporan. Admin,
                guru, orang tua, dan owner mendapat tampilan dashboard sesuai kebutuhan.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {grades.map((grade) => (
                  <span
                    key={grade}
                    className="rounded-full border border-ocean-100 bg-ocean-50 px-4 py-2 text-sm font-semibold text-ocean-700"
                  >
                    {grade}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {advantages.map((item) => {
                const Icon = item.icon;

                return (
                  <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-sunshine-100 text-ocean-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-ink">{item.title}</h3>
                    <p className="mt-2 leading-7 text-slate-600">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="harga" className="py-16">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="label text-ocean-700">Paket harga</p>
              <h2 className="mt-3 text-3xl font-bold text-ink">Mulai dari kebutuhan belajar anak.</h2>
            </div>
            <a href={whatsappUrl} target="_blank" className="btn-secondary">
              Konsultasi Paket
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {initialData.packages.map((item) => (
              <article
                key={item.id}
                className={`rounded-lg border p-6 shadow-soft ${
                  item.highlighted
                    ? "border-ocean-500 bg-ocean-600 text-white"
                    : "border-slate-200 bg-white text-ink"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  {item.highlighted ? (
                    <span className="rounded-full bg-sunshine-300 px-3 py-1 text-xs font-bold text-ink">
                      Favorit
                    </span>
                  ) : null}
                </div>
                <p className={`mt-2 text-sm ${item.highlighted ? "text-ocean-50" : "text-slate-500"}`}>
                  {item.frequency}
                </p>
                <div className="mt-5 text-3xl font-bold">
                  Rp{item.price.toLocaleString("id-ID")}
                  <span className={`text-sm font-semibold ${item.highlighted ? "text-ocean-50" : "text-slate-500"}`}>
                    /bulan
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_0.9fr]" id="daftar">
          <div>
            <p className="label text-ocean-700">Pendaftaran murid</p>
            <h2 className="mt-3 text-3xl font-bold text-ink">Isi data anak, admin akan follow-up via WhatsApp.</h2>
            <p className="mt-4 leading-8 text-slate-600">
              Tim admin akan menghubungi orang tua untuk konfirmasi jadwal, paket, dan kebutuhan
              belajar anak.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {initialData.testimonials.map((item) => (
                <blockquote key={item.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
                  <p className="leading-7 text-slate-700">"{item.quote}"</p>
                  <footer className="mt-4">
                    <div className="font-bold text-ink">{item.name}</div>
                    <div className="text-sm text-slate-500">{item.role}</div>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
          <RegistrationForm />
        </div>
      </section>

      <section id="faq" className="py-16">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="label text-ocean-700">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold text-ink">Pertanyaan yang sering ditanyakan.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {initialData.faqs.map((item) => (
              <details key={item.question} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
                <summary className="cursor-pointer text-base font-bold text-ink">{item.question}</summary>
                <p className="mt-3 leading-7 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="container-page flex flex-col justify-between gap-4 text-sm text-slate-500 md:flex-row">
          <span>© 2026 Smart Kids Learning Center. MVP bimbel SD berbasis AI.</span>
          <div className="flex gap-4">
            <Link href="/login" className="font-semibold text-ocean-700">
              Dashboard
            </Link>
            <a href={whatsappUrl} target="_blank" className="font-semibold text-ocean-700">
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
