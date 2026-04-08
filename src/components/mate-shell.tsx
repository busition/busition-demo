"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Clock3, LocateFixed, UsersRound } from "lucide-react";

type MateShellProps = {
  children: React.ReactNode;
};

const navItems = [
  { href: "/mate", label: "Time", icon: Clock3 },
  { href: "/mate/route", label: "Route", icon: LocateFixed },
  { href: "/mate/alerts", label: "Alerts", icon: Bell },
  { href: "/mate/family", label: "Family", icon: UsersRound },
];

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/mate": {
    title: "Timetable",
    subtitle: "Live arrivals and ride context for riders and guardians.",
  },
  "/mate/route": {
    title: "Live Route",
    subtitle: "Track the vehicle, route line, and stop progress in one view.",
  },
  "/mate/alerts": {
    title: "Alerts",
    subtitle: "See boarding, delay, and service updates as a single feed.",
  },
  "/mate/family": {
    title: "Family",
    subtitle: "Shared access for riders, guardians, and campus-side contacts.",
  },
};

function cx(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function isActive(pathname: string, href: string) {
  if (href === "/mate") {
    return pathname === href;
  }

  return pathname.startsWith(href);
}

export function MateShell({ children }: MateShellProps) {
  const pathname = usePathname();
  const meta = pageMeta[pathname] ?? pageMeta["/mate"];

  return (
    <div className="mate-shell-bg min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-[430px] flex-col bg-[linear-gradient(180deg,#fffdf8_0%,#f7f8fb_62%,#f4f6fa_100%)] lg:my-4 lg:min-h-[calc(100vh-2rem)] lg:rounded-[40px] lg:border lg:border-white/60 lg:shadow-[0_34px_80px_rgba(24,24,24,0.18)]">
        <header className="sticky top-0 z-30 border-b border-black/5 bg-[rgba(255,253,248,0.88)] px-5 pb-4 pt-4 backdrop-blur">
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--foreground-soft)]">
            <span>9:41</span>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[rgba(255,154,31,0.12)] px-3 py-1 text-[var(--accent-deep)]">
                Guardian sync on
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[rgba(255,154,31,0.12)]">
                <Image
                  src="/brand/busition-symbol.png"
                  alt="Busition"
                  width={72}
                  height={72}
                  className="h-8 w-8 object-contain"
                  priority
                />
              </div>
              <div className="min-w-0">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                  Busition Mate
                </p>
                <h1 className="mt-1 text-[1.6rem] font-bold tracking-[-0.06em] text-[var(--foreground)]">
                  {meta.title}
                </h1>
              </div>
            </div>

            <Link
              href="/mate-preview"
              className="rounded-full border border-black/6 bg-white px-3 py-2 text-xs font-semibold text-[var(--foreground-soft)]"
            >
              Preview
            </Link>
          </div>

          <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">{meta.subtitle}</p>
        </header>

        <main className="flex-1 px-4 pb-28 pt-4">{children}</main>

        <nav className="sticky bottom-0 z-30 border-t border-black/5 bg-[rgba(255,255,255,0.92)] px-3 pb-4 pt-3 backdrop-blur">
          <div className="grid grid-cols-4 gap-2">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "flex flex-col items-center justify-center rounded-[20px] px-2 py-2 text-[0.7rem] font-semibold transition-all",
                    active
                      ? "bg-[rgba(255,154,31,0.14)] text-[var(--accent-deep)]"
                      : "text-[var(--foreground-soft)]",
                  )}
                >
                  <span
                    className={cx(
                      "mb-1 flex h-9 w-9 items-center justify-center rounded-full",
                      active ? "bg-[var(--accent)] text-white" : "bg-[#f2f3f5] text-[var(--foreground-soft)]",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
