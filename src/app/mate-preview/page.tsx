import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Bell, Clock3, ImageIcon, MapPin, ShieldCheck, UsersRound } from "lucide-react";

import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Busition for Mate | Preview",
  description:
    "English preview page for the Busition rider and guardian experience.",
};

export default function MatePreviewPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-[1240px] px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-28">
        <section>
          <div className="max-w-[760px]">
            <div className="section-kicker">Busition for Mate Preview</div>
            <h1 className="mt-6 font-display text-5xl font-semibold tracking-[-0.08em] text-[var(--foreground)] sm:text-6xl">
              The mobile concept before you enter the actual Mate app.
            </h1>
            <p className="mt-6 max-w-[560px] text-lg leading-8 text-[var(--foreground-soft)]">
              The concept direction for Mate was practical and calm: clear arrival timing,
              route awareness, and enough shared access that guardians and staff stop relying
              on phone calls to understand what is happening.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/mate"
                className="orange-button rounded-[18px] px-6 py-4 text-sm font-semibold"
              >
                Enter Mate service
              </Link>
              <Link
                href="/"
                className="outline-button rounded-[18px] px-6 py-4 text-sm font-semibold"
              >
                Back to Home
              </Link>
            </div>
          </div>

          <div className="mt-10 concept-card overflow-hidden rounded-[34px] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-[var(--line)] bg-white px-4 py-4 sm:px-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                  Static preview image
                </p>
                <p className="mt-2 text-lg font-bold text-[var(--foreground)]">
                  Live route reference
                </p>
              </div>
              <span className="rounded-full bg-[rgba(255,154,31,0.12)] px-3 py-2 text-xs font-semibold text-[var(--accent-deep)]">
                Provided visual reference
              </span>
            </div>

            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-[360px] overflow-hidden rounded-[34px] border border-[var(--line)] bg-white shadow-[0_28px_60px_rgba(26,26,26,0.08)]">
                <Image
                  src="/previews/mate-live-route-preview.png"
                  alt="Static Busition Mate live route preview"
                  width={523}
                  height={1149}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="pt-20 sm:pt-24">
          <div className="grid gap-4 lg:grid-cols-4">
            {[
              {
                title: "Arrival timing",
                detail: "Move from static schedules to live stop-aware countdowns.",
                icon: Clock3,
              },
              {
                title: "Boarding trust",
                detail: "Make boarding and alighting visible instead of uncertain.",
                icon: ShieldCheck,
              },
              {
                title: "Guardian access",
                detail: "Share the same route view with family or school staff.",
                icon: UsersRound,
              },
              {
                title: "Route context",
                detail: "Know which stop is current, what is next, and how full the ride is.",
                icon: MapPin,
              },
            ].map((item) => (
              <div key={item.title} className="concept-card rounded-[28px] p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-deep)]">
                  <item.icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[1fr_0.94fr] lg:items-start">
          <div className="concept-card rounded-[36px] p-6 sm:p-8">
            <div className="section-kicker">Why the preview changed</div>
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
              The live mockup is gone. This preview now uses a fixed image reference.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-[var(--foreground-soft)]">
              <p>
                The previous version rendered web-built Mate mockups directly in the preview page.
                This version keeps the preview intentionally static so it reads more like a clean
                concept sheet for route tracking and guardian sharing.
              </p>
              <p>
                The actual Mate service still lives separately under its own mobile-first app shell
                with timetable, route tracking, alerts, and family pages.
              </p>
            </div>
          </div>

          <div className="concept-card rounded-[36px] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-deep)]">
                <Bell className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                  Preview mode
                </p>
                <h3 className="mt-1 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                  What this image communicates
                </h3>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {[
                "A mobile-first live route screen with one clear primary flow",
                "Guardian sync status presented without heavy setup or clutter",
                "Route map, stop labels, and trip detail in one vertical layout",
                "A cleaner distinction between marketing preview and real app",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[20px] border border-[var(--line)] bg-white px-4 py-3"
                >
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                  <p className="text-sm leading-7 text-[var(--foreground)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
