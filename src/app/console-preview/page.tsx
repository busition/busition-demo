import Link from "next/link";
import type { Metadata } from "next";
import { BarChart3, CalendarRange, LayoutDashboard, MapPinned, UsersRound } from "lucide-react";

import { BrowserFrame, ConsoleAssignmentScreen, ConsoleScheduleScreen } from "@/components/mockup-screens";
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

          <div className="mt-10">
            <BrowserFrame>
              <ConsoleAssignmentScreen />
            </BrowserFrame>
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

        <section className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[1.14fr_0.86fr] lg:items-start">
          <div>
            <BrowserFrame>
              <ConsoleScheduleScreen />
            </BrowserFrame>
          </div>

          <div className="space-y-4">
            <div className="concept-card rounded-[36px] p-6 sm:p-8">
              <div className="section-kicker">Why the routes split</div>
              <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
                The marketing flow and the actual console now live separately.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-8 text-[var(--foreground-soft)]">
                <p>
                  The previous console page was still acting like a showcase. The new Busition
                  Console route now behaves like a real operator surface with multiple pages and
                  task-specific work areas.
                </p>
                <p>
                  This preview remains useful because it explains the design intent behind those
                  working surfaces before a team enters the service itself.
                </p>
              </div>
            </div>

            <div className="concept-card rounded-[36px] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-deep)]">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    Next step
                  </p>
                  <h3 className="mt-1 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                    What the real console adds
                  </h3>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  "A dedicated dashboard for route readiness and live alerts",
                  "Interactive driver assignment with route-side detail panels",
                  "A multi-page schedule manager based on the admin mockups",
                  "Driver and organization management in the same orange-led visual system",
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
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
