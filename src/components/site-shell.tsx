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
  { href: "/mate", label: "Mate" },
  { href: "/driver", label: "Driver" },
  { href: "/console", label: "Console" },
];

function cx(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname.startsWith(href);
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

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "text-sm font-semibold transition-colors",
                  isActive(pathname, item.href)
                    ? "text-[var(--accent-deep)]"
                    : "text-[var(--foreground-soft)] hover:text-[var(--foreground)]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/login?next=/console"
              className="orange-button rounded-xl px-4 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5"
            >
              Operator login
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
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cx(
                    "rounded-2xl px-4 py-3 text-sm font-semibold",
                    isActive(pathname, item.href)
                      ? "bg-[var(--accent-soft)] text-[var(--accent-deep)]"
                      : "text-[var(--foreground-soft)]",
                  )}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/login?next=/console"
                onClick={() => setMobileOpen(false)}
                className="orange-button mt-2 rounded-2xl px-4 py-3 text-center text-sm font-semibold"
              >
                Operator login
              </Link>
            </div>
          </div>
        ) : null}
      </header>

      {children}

      <footer className="border-t border-[var(--line)] bg-[#f6f5ef]">
        <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <BusitionLogo />
              <div className="mt-4 space-y-1 text-sm leading-7 text-[var(--foreground-soft)]">
                <p>Busition (버지션)</p>
                <p>Representative: Jeongheon Woo</p>
                <p>Privacy Officer: Kyungmin Yoo</p>
                <p>Business Registration No.: 117-20-13096</p>
                <p>
                  Contact:{" "}
                  <a
                    href="mailto:contact@wookingwoo.com"
                    className="transition-colors hover:text-[var(--foreground)]"
                  >
                    contact@wookingwoo.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-[var(--foreground-soft)] lg:justify-end">
              <Link
                href="/policy/service"
                className="transition-colors hover:text-[var(--foreground)]"
              >
                Terms
              </Link>
              <Link
                href="/policy/privacy"
                className="transition-colors hover:text-[var(--foreground)]"
              >
                Privacy
              </Link>
              <Link
                href="/login?next=/console"
                className="transition-colors hover:text-[var(--foreground)]"
              >
                Operator login
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
