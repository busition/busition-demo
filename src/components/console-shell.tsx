"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  CalendarRange,
  House,
  Route,
  UsersRound,
} from "lucide-react";

import { BusitionLogo } from "@/components/busition-logo";

type ConsoleShellProps = {
  children: React.ReactNode;
};

const navItems = [
  { href: "/console", label: "Dashboard", icon: House },
  { href: "/console/assignments", label: "Assignments", icon: Route },
  { href: "/console/schedules", label: "Schedules", icon: CalendarRange },
  { href: "/console/drivers", label: "Drivers", icon: UsersRound },
  { href: "/console/organizations", label: "Organizations", icon: Building2 },
];

const pageMeta: Record<
  string,
  { title: string; subtitle: string; status: string }
> = {
  "/console": {
    title: "Morning operations",
    subtitle: "Live routes, alerts, and next actions.",
    status: "18 live routes",
  },
  "/console/assignments": {
    title: "Assignments",
    subtitle: "Route coverage and driver matching.",
    status: "3 need drivers",
  },
  "/console/schedules": {
    title: "Schedules",
    subtitle: "Route plans and departures.",
    status: "Wed active",
  },
  "/console/drivers": {
    title: "Drivers",
    subtitle: "Availability and live ownership.",
    status: "24 ready",
  },
  "/console/organizations": {
    title: "Organizations",
    subtitle: "Partners, launches, and access.",
    status: "6 online",
  },
};

function cx(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function isActive(pathname: string, href: string) {
  if (href === "/console") {
    return pathname === href;
  }

  return pathname.startsWith(href);
}

export function ConsoleShell({ children }: ConsoleShellProps) {
  const pathname = usePathname();
  const meta = pageMeta[pathname] ?? pageMeta["/console"];

  return (
    <div className="console-shell-bg min-h-screen bg-[#eef1f4] text-[var(--foreground)]">
      <div className="grid min-h-screen lg:grid-cols-[248px_1fr]">
        <aside className="hidden flex-col bg-[#312d29] px-5 py-6 text-white lg:flex">
          <Link href="/" aria-label="Busition home">
            <BusitionLogo compact />
          </Link>

          <div className="mt-8 rounded-[24px] border border-white/8 bg-white/6 px-4 py-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/52">
              Operator
            </p>
            <p className="mt-3 text-lg font-bold tracking-[-0.04em] text-white">Ronny</p>
            <p className="mt-2 text-sm text-white/64">Seoul AM · 06:30-15:00</p>
          </div>

          <nav className="mt-8 space-y-1.5">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "flex items-center gap-3 rounded-[18px] px-4 py-3 text-sm font-semibold transition-all",
                    active
                      ? "bg-[linear-gradient(135deg,rgba(255,154,31,0.18)_0%,rgba(255,132,0,0.22)_100%)] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                      : "text-white/56 hover:bg-white/6 hover:text-white/84",
                  )}
                >
                  <span
                    className={cx(
                      "flex h-10 w-10 items-center justify-center rounded-[14px]",
                      active ? "bg-[#ff971f] text-white" : "bg-white/7 text-white/62",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-8">
            <Link
              href="/"
              className="block rounded-[18px] border border-white/10 px-4 py-3 text-center text-sm font-semibold text-white/62 transition-colors hover:text-white/84"
            >
              Back to site
            </Link>
          </div>
        </aside>

        <main className="min-w-0">
          <header className="sticky top-0 z-30 border-b border-black/5 bg-[rgba(248,248,245,0.9)] backdrop-blur">
            <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="lg:hidden">
                    <Link href="/" aria-label="Busition home">
                      <BusitionLogo compact />
                    </Link>
                  </div>
                  <p className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--foreground-soft)] lg:mt-0">
                    Busition Console
                  </p>
                  <h1 className="mt-2 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)] sm:text-2xl">
                    {meta.title}
                  </h1>
                  <p className="mt-2 text-sm text-[var(--foreground-soft)]">{meta.subtitle}</p>
                </div>

                <span className="rounded-full border border-[rgba(255,154,31,0.2)] bg-[rgba(255,154,31,0.1)] px-3 py-2 text-xs font-semibold text-[var(--accent-deep)]">
                  {meta.status}
                </span>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
                {navItems.map((item) => {
                  const active = isActive(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cx(
                        "whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                        active
                          ? "bg-[var(--accent)] text-white"
                          : "border border-black/6 bg-white text-[var(--foreground-soft)]",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
