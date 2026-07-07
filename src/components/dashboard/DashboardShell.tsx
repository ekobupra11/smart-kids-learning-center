"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  Home,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Sparkles,
  UserRoundCog
} from "lucide-react";
import { dashboardPaths, roleLabels } from "@/lib/auth";
import type { Role } from "@/lib/types";

const navItems = [
  { href: "/", label: "Landing", icon: Home },
  { href: "/materi", label: "Materi", icon: BookOpen },
  { href: "/dashboard/admin", label: "Admin", icon: UserRoundCog },
  { href: "/dashboard/guru", label: "Guru", icon: CalendarDays },
  { href: "/dashboard/orang-tua", label: "Orang Tua", icon: LayoutDashboard },
  { href: "/dashboard/owner", label: "Owner", icon: BarChart3 }
];

type Props = {
  role: Role;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function DashboardShell({ role, title, description, children }: Props) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-slate-200 bg-white">
          <div className="sticky top-0 p-5">
            <Link href="/" className="flex items-center gap-3 font-bold text-ink">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-ocean-600 text-white">
                <Sparkles className="h-5 w-5" />
              </span>
              <span>Smart Kids</span>
            </Link>
            <div className="mt-6 rounded-lg bg-ocean-50 p-4">
              <p className="text-xs font-bold uppercase text-ocean-700">Role aktif</p>
              <p className="mt-1 text-lg font-bold text-ink">{roleLabels[role]}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Akses ruang kerja sesuai peran.</p>
            </div>
            <nav className="mt-6 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                      active ? "bg-ocean-600 text-white" : "text-slate-600 hover:bg-ocean-50 hover:text-ocean-700"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-6 space-y-2">
              <a
                href="https://wa.me/6281234567890?text=Halo%20Smart%20Kids%2C%20saya%20ingin%20bertanya."
                target="_blank"
                className="btn-primary w-full py-2.5"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <Link href="/login" className="btn-secondary w-full py-2.5">
                <LogOut className="h-4 w-4" />
                Ganti Role
              </Link>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="border-b border-slate-200 bg-white">
            <div className="container-page py-6">
              <p className="label text-ocean-700">{roleLabels[role]} dashboard</p>
              <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <h1 className="text-3xl font-bold text-ink">{title}</h1>
                  <p className="mt-2 max-w-3xl leading-7 text-slate-600">{description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(dashboardPaths) as Role[]).map((item) => (
                    <Link
                      key={item}
                      href={dashboardPaths[item]}
                      className={`whitespace-nowrap rounded-lg border px-3 py-2 text-xs font-bold ${
                        item === role
                          ? "border-ocean-600 bg-ocean-600 text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-ocean-200"
                      }`}
                    >
                      {roleLabels[item]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </header>
          <div className="container-page py-8">{children}</div>
        </section>
      </div>
    </main>
  );
}
