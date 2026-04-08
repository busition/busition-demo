import Link from "next/link";
import type { Metadata } from "next";
import { BarChart3, CalendarRange, LayoutDashboard, MapPinned, UsersRound } from "lucide-react";

import { BrowserFrame, ConsoleAssignmentScreen, ConsoleScheduleScreen } from "@/components/mockup-screens";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Busition for Console | Launch Preview",
  description:
    "English preview page for the Busition operator console experience.",
};

export default function ConsolePage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-[1240px] px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-28">
        <section>
          <div className="max-w-[760px]">
            <div className="section-kicker">Busition for Console</div>
            <h1 className="mt-6 font-display text-5xl font-semibold tracking-[-0.08em] text-[var(--foreground)] sm:text-6xl">
              An operator console structured around routes, assignments, and schedules.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[var(--foreground-soft)]">
              The Figma direction for Console was very specific: dark operator
              navigation, clear white working surfaces, route cards for assignment,
              and a schedule editor that keeps the map visible alongside the plan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="orange-button rounded-[18px] px-6 py-4 text-sm font-semibold"
              >
                Back to Home
              </Link>
              <Link
                href="/driver"
                className="outline-button rounded-[18px] px-6 py-4 text-sm font-semibold"
              >
                Back to Driver
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
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--blue-soft)] text-[var(--blue)]">
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
              <div className="section-kicker">Why the layout changed</div>
              <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
                The site now follows the screen logic of the console concepts.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-8 text-[var(--foreground-soft)]">
                <p>
                  The previous version behaved like a general-purpose product site.
                  The concept files point somewhere more grounded: an operator
                  system with route inventories, assignment views, schedule editing,
                  and map-assisted planning.
                </p>
                <p>
                  This page is structured directly around those console behaviors so
                  the marketing site feels connected to the product that is being
                  presented.
                </p>
              </div>
            </div>

            <div className="concept-card rounded-[36px] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--blue-soft)] text-[var(--blue)]">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    Operator value
                  </p>
                  <h3 className="mt-1 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                    What Console unlocks
                  </h3>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  "One view for assignments, schedules, and route context",
                  "Lower dependency on spreadsheets and chat-based coordination",
                  "Cleaner launch path for pilot organizations with multiple routes",
                  "A stronger bridge from concept site into actual product implementation",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[20px] border border-[var(--line)] bg-white px-4 py-3"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--blue)]" />
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
