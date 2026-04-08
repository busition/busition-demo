"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BusFront, CircleUserRound, LocateFixed, UsersRound } from "lucide-react";

type DriverShellProps = {
  children: React.ReactNode;
};

const navItems = [
  { href: "/driver", label: "Today", icon: BusFront },
  { href: "/driver/route", label: "Route", icon: LocateFixed },
  { href: "/driver/boarding", label: "Boarding", icon: UsersRound },
  { href: "/driver/profile", label: "Profile", icon: CircleUserRound },
];

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/driver": {
    title: "Today's Trip",
    subtitle: "Route-first driver workspace for today’s live shuttle run.",
  },
  "/driver/route": {
    title: "Live Route",
    subtitle: "Keep the route line, current stop, and trip actions visible together.",
  },
  "/driver/boarding": {
    title: "Boarding",
    subtitle: "Confirm riders quickly and recover from exceptions without extra taps.",
  },
  "/driver/profile": {
    title: "Profile",
    subtitle: "Driver identity, vehicle readiness, and support tools in one place.",
  },
};

function cx(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function isActive(pathname: string, href: string) {
  if (href === "/driver") {
    return pathname === href;
  }

  return pathname.startsWith(href);
}

export function DriverShell({ children }: DriverShellProps) {
  const pathname = usePathname();
  const meta = pageMeta[pathname] ?? pageMeta["/driver"];

  return (
    <div className="driver-shell-bg min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-[430px] flex-col bg-[linear-gradient(180deg,#fffefb_0%,#f7f7f4_44%,#f3f5f7_100%)] lg:my-4 lg:min-h-[calc(100vh-2rem)] lg:rounded-[40px] lg:border lg:border-white/60 lg:shadow-[0_34px_80px_rgba(24,24,24,0.2)]">
        <header className="sticky top-0 z-30 border-b border-black/5 bg-[rgba(255,254,251,0.9)] px-5 pb-4 pt-4 backdrop-blur">
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--foreground-soft)]">
            <span>9:41</span>
            <span className="rounded-full bg-[rgba(255,154,31,0.12)] px-3 py-1 text-[var(--accent-deep)]">
              Driver mode
            </span>
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
                  Busition Driver
                </p>
                <h1 className="mt-1 text-[1.6rem] font-bold tracking-[-0.06em] text-[var(--foreground)]">
                  {meta.title}
                </h1>
              </div>
            </div>

            <Link
              href="/driver-preview"
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
