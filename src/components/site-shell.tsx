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
  { href: "/mate-preview", label: "Mate Preview" },
  { href: "/driver", label: "Driver" },
  { href: "/console-preview", label: "Console Preview" },
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
              href="/mate-preview"
              className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--foreground-soft)] transition-colors hover:text-[var(--foreground)]"
            >
              Preview
            </Link>
            <Link
              href="/console"
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
                  href="/mate-preview"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl border border-[var(--line)] px-4 py-3 text-center text-sm font-semibold text-[var(--foreground)]"
                >
                  Preview
                </Link>
                <Link
                  href="/console"
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
            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--foreground-soft)]">
              Busition is the launch-preview site for a unified shuttle operations
              platform connecting riders, guardians, drivers, and operators in one
              live service flow.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-[var(--foreground)]">
              Preview pages
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--foreground-soft)]">
              <Link href="/mate-preview">Busition for Mate Preview</Link>
              <Link href="/driver">Busition for Driver</Link>
              <Link href="/console-preview">Busition for Console Preview</Link>
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
