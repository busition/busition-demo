"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Clock3, LocateFixed, UsersRound } from "lucide-react";

type MateShellProps = {
  children: React.ReactNode;
};

const navItems = [
  { href: "/mate", label: "Today", icon: Clock3 },
  { href: "/mate/route", label: "Route", icon: LocateFixed },
  { href: "/mate/alerts", label: "Alerts", icon: Bell },
  { href: "/mate/family", label: "Sharing", icon: UsersRound },
];

const pageMeta: Record<string, { title: string; subtitle: string; status: string }> = {
  "/mate": {
    title: "Ride overview",
    subtitle: "See ETA, boarding confirmation, and service updates in one place.",
    status: "ETA 6 min",
  },
  "/mate/route": {
    title: "Live route",
    subtitle: "Follow the current stop, next stop, and arrival progress in real time.",
    status: "Trip live",
  },
  "/mate/alerts": {
    title: "Service alerts",
    subtitle: "Review boarding, delay, and route updates before they affect pickup.",
    status: "1 new",
  },
  "/mate/family": {
    title: "Shared access",
    subtitle: "Control who receives the same ride status and boarding proof.",
    status: "2 linked",
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
      <div className="mx-auto flex min-h-screen max-w-[430px] flex-col bg-[linear-gradient(180deg,#fffdf8_0%,#f7f8fb_62%,#f4f6fa_100%)] lg:my-4 lg:min-h-[calc(100vh-2rem)] lg:rounded-[40px] lg:border lg:border-white/60 lg:shadow-[0_30px_72px_rgba(24,24,24,0.16)]">
        <header className="sticky top-0 z-30 border-b border-black/5 bg-[rgba(255,253,248,0.94)] px-5 pb-4 pt-4 backdrop-blur">
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--foreground-soft)]">
            <span>9:41</span>
            <span className="rounded-full bg-[rgba(255,154,31,0.12)] px-3 py-1 text-[var(--accent-deep)]">
              {meta.status}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Link
              href="/"
              aria-label="Busition home"
              className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[rgba(255,154,31,0.12)]"
            >
              <Image
                src="/brand/busition-symbol.png"
                alt="Busition"
                width={72}
                height={72}
                className="h-8 w-8 object-contain"
                priority
              />
            </Link>

            <div className="min-w-0">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                Busition Mate
              </p>
              <h1 className="mt-1 text-[1.55rem] font-bold tracking-[-0.06em] text-[var(--foreground)]">
                {meta.title}
              </h1>
              <p className="mt-1 text-sm leading-6 text-[var(--foreground-soft)]">
                {meta.subtitle}
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 pb-28 pt-4">{children}</main>

        <nav className="sticky bottom-0 z-30 border-t border-black/5 bg-[rgba(255,255,255,0.94)] px-3 pb-4 pt-3 backdrop-blur">
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
                      active
                        ? "bg-[var(--accent)] text-white"
                        : "bg-[#f2f3f5] text-[var(--foreground-soft)]",
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
