import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { dashboardPaths, roleCards } from "@/lib/auth";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="container-page flex min-h-screen flex-col justify-center py-12">
        <Link href="/" className="mb-8 inline-flex text-sm font-semibold text-ocean-700">
          Smart Kids Learning Center
        </Link>
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-sunshine-100 px-4 py-2 text-sm font-semibold text-ink">
            <Sparkles className="h-4 w-4 text-ocean-600" />
            Demo role login
          </div>
          <h1 className="text-4xl font-bold leading-tight text-ink md:text-5xl">
            Pilih dashboard sesuai peran.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            Masuk ke ruang kerja sesuai kebutuhan: operasional admin, aktivitas guru, pantauan orang
            tua, atau ringkasan bisnis owner.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {roleCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.role}
                href={dashboardPaths[card.role]}
                className="group rounded-lg border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-ocean-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-lg bg-ocean-50 p-3 text-ocean-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-ocean-600" />
                </div>
                <h2 className="mt-5 text-xl font-bold text-ink">{card.title}</h2>
                <p className="mt-2 leading-7 text-slate-600">{card.description}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
