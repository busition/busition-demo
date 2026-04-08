"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { BusitionLogo } from "@/components/busition-logo";

type SiteShellProps = {
  children: React.ReactNode;
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#mate-experience", label: "Mate" },
  { href: "/#driver-experience", label: "Driver" },
  { href: "/#console-experience", label: "Console" },
];

function cx(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="top-fade sticky top-0 z-50 border-b border-[var(--line)]">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Busition home">
            <BusitionLogo compact />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "text-sm font-semibold transition-colors",
                    active
                      ? "text-[var(--accent-deep)]"
                      : "text-[var(--foreground-soft)] hover:text-[var(--foreground)]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/#mate-experience"
              className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--foreground-soft)] transition-colors hover:text-[var(--foreground)]"
            >
              Overview
            </Link>
            <Link
              href="/console"
              target="_blank"
              rel="noopener noreferrer"
              className="orange-button rounded-xl px-4 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5"
            >
              Operator Login
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--line)] bg-white text-[var(--foreground)] lg:hidden"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-[var(--line)] bg-white lg:hidden">
            <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-4 py-4 sm:px-6">
              {navItems.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cx(
                      "rounded-2xl px-4 py-3 text-sm font-semibold",
                      active
                        ? "bg-[var(--accent-soft)] text-[var(--accent-deep)]"
                        : "text-[var(--foreground-soft)]",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link
                  href="/#mate-experience"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl border border-[var(--line)] px-4 py-3 text-center text-sm font-semibold text-[var(--foreground)]"
                >
                  Overview
                </Link>
                <Link
                  href="/console"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="orange-button rounded-2xl px-4 py-3 text-center text-sm font-semibold"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      {children}

      <footer className="border-t border-[var(--line)] bg-[#f6f5ef]">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.8fr] lg:px-8">
          <div>
            <BusitionLogo />
            <div className="mt-4 max-w-md space-y-1 text-sm leading-7 text-[var(--foreground-soft)]">
              <p>Busition (버지션)</p>
              <p>Representative: Jeongheon Woo</p>
              <p>Privacy Officer: Kyungmin Yoo</p>
              <p>Business Registration No.: 117-20-13096</p>
              <div className="flex flex-col gap-1 pt-2">
                <Link
                  href="/policy/service"
                  className="transition-colors hover:text-[var(--foreground)]"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/policy/privacy"
                  className="transition-colors hover:text-[var(--foreground)]"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-[var(--foreground)]">
              Product overview
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--foreground-soft)]">
              <Link href="/#mate-experience">Busition for Mate</Link>
              <Link href="/#driver-experience">Busition for Driver</Link>
              <Link href="/#console-experience">Busition for Console</Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-[var(--foreground)]">
              Product direction
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--foreground-soft)]">
              <span>Realtime ETA and route flow</span>
              <span>Boarding certainty and alerts</span>
              <span>Operational control and schedule design</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
