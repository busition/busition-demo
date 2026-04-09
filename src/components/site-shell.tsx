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
  { href: "/", label: "Overview" },
  { href: "/mate", label: "Mate" },
  { href: "/driver", label: "Driver" },
  { href: "/console", label: "Console" },
];

const footerLinks = [
  { href: "/policy/service", label: "Terms" },
  { href: "/policy/privacy", label: "Privacy" },
  { href: "/login?next=/console", label: "Open Console" },
];

const serviceLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

function cx(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname.startsWith(href);
}

function isServiceEntryHref(href: string) {
  return href === "/mate" || href === "/driver" || href === "/console" || href === "/login?next=/console";
}

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentYear = new Date().getFullYear();

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
                {...(isServiceEntryHref(item.href) ? serviceLinkProps : {})}
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
              {...serviceLinkProps}
              className="orange-button rounded-xl px-4 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5"
            >
              Open Console
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
                  {...(isServiceEntryHref(item.href) ? serviceLinkProps : {})}
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
                {...serviceLinkProps}
                onClick={() => setMobileOpen(false)}
                className="orange-button mt-2 rounded-2xl px-4 py-3 text-center text-sm font-semibold"
              >
                Open Console
              </Link>
            </div>
          </div>
        ) : null}
      </header>

      {children}

      <footer className="border-t border-[var(--line)] bg-[#f6f5ef]">
        <div className="mx-auto max-w-[1240px] px-4 pb-6 pt-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 border-b border-[var(--line)] pb-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
            <div className="max-w-[760px]">
              <BusitionLogo />
              <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
                Real-time shuttle operations for riders, guardians, drivers, and operators.
              </p>

              <div className="mt-4 flex flex-col gap-1 text-sm leading-7 text-[var(--foreground-soft)] sm:flex-row sm:flex-wrap sm:gap-x-6">
                <p>Representative: Jeongheon Woo</p>
                <p>Privacy Officer: Kyungmin Yoo</p>
                <p>Business Registration No.: 117-20-13096</p>
                <p>
                  Contact:{" "}
                  <a
                    href="mailto:contact@wookingwoo.com"
                    className="transition-colors hover:text-[var(--accent-deep)]"
                  >
                    contact@wookingwoo.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-[var(--foreground-soft)] lg:justify-end">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  {...(isServiceEntryHref(link.href) ? serviceLinkProps : {})}
                  className="transition-colors hover:text-[var(--accent-deep)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)] sm:flex-row sm:items-center sm:justify-between">
            <p>© {currentYear} Busition.</p>
            <p>From live position to operational certainty.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
