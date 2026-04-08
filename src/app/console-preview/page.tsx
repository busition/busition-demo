import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CalendarRange, ImageIcon, LayoutDashboard, MapPinned, UsersRound } from "lucide-react";

import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Busition for Console | Preview",
  description:
    "English preview page for the Busition operator console concept.",
};

export default function ConsolePreviewPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-[1240px] px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-28">
        <section>
          <div className="max-w-[760px]">
            <div className="section-kicker">Busition for Console Preview</div>
            <h1 className="mt-6 font-display text-5xl font-semibold tracking-[-0.08em] text-[var(--foreground)] sm:text-6xl">
              The operator concept before you enter the real console.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[var(--foreground-soft)]">
              This preview still explains the screen logic from the original concept work.
              The actual operator experience now lives in a separate Busition Console app
              with dedicated pages for assignments, schedules, drivers, and organizations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/console"
                className="orange-button rounded-[18px] px-6 py-4 text-sm font-semibold"
              >
                Enter console service
              </Link>
              <Link
                href="/driver-preview"
                className="outline-button rounded-[18px] px-6 py-4 text-sm font-semibold"
              >
                Back to Driver Preview
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
                  Schedule manager reference
                </p>
              </div>
              <span className="rounded-full bg-[rgba(255,154,31,0.12)] px-3 py-2 text-xs font-semibold text-[var(--accent-deep)]">
                Provided visual reference
              </span>
            </div>

            <div className="mt-4 overflow-hidden rounded-[28px] border border-[var(--line)] bg-[#f5f6f8]">
              <Image
                src="/previews/console-schedule-preview.png"
                alt="Static Busition Console schedule manager preview"
                width={1899}
                height={1102}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </section>

        <section className="pt-20 sm:pt-24">
          <div className="grid gap-4 lg:grid-cols-4">
            {[
              {
                title: "Driver assignment",
                detail: "See route inventory first, then attach drivers and vehicles without losing context.",
                icon: LayoutDashboard,
              },
              {
                title: "Schedule design",
                detail: "Keep day selection, stop ordering, and save actions in the same working panel.",
                icon: CalendarRange,
              },
              {
                title: "Operational geography",
                detail: "Keep maps visible so route decisions remain grounded in the actual service area.",
                icon: MapPinned,
              },
              {
                title: "Role governance",
                detail: "Manage drivers, organizations, and service entities from one operator-side entry point.",
                icon: UsersRound,
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

        <section className="grid gap-4 py-20 sm:py-24 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="concept-card rounded-[36px] p-6 sm:p-8">
            <div className="section-kicker">Why the preview changed</div>
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
              The live mockup is gone. This preview now uses a fixed image reference.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-[var(--foreground-soft)]">
              <p>
                The previous version embedded web-built console mockups directly into the preview page.
                This version keeps the preview intentionally static so the marketing route behaves more
                like a visual concept sheet.
              </p>
              <p>
                The actual Busition Console still lives separately under the real console service route
                with assignments, schedules, drivers, and organization pages.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="concept-card rounded-[36px] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-deep)]">
                  <ImageIcon className="h-6 w-6" />
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
                  "Dark operator navigation with orange-led active states",
                  "A three-column planner for route list, schedule editor, and map",
                  "Static concept framing for presentation or stakeholder review",
                  "A cleaner distinction between marketing preview and real product",
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

            <div className="concept-card rounded-[36px] p-6 sm:p-8">
              <div className="section-kicker">Next step</div>
              <h3 className="mt-6 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                The real console remains interactive.
              </h3>
              <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
                Use the actual console route when you want to explore working assignments,
                schedules, driver management, and organization controls. Use this preview
                page when you want a simpler static presentation of the intended layout.
              </p>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
