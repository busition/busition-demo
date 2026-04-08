import Link from "next/link";
import type { Metadata } from "next";
import { BusFront, CheckCheck, MapPinned, Smartphone, Waypoints } from "lucide-react";

import { DriverLoginPanel, DriverTripScreen, PhoneFrame } from "@/components/mockup-screens";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Busition for Driver | Launch Preview",
  description:
    "English preview page for the Busition driver experience.",
};

export default function DriverPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-[1240px] px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-28">
        <section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="section-kicker">Busition for Driver</div>
            <h1 className="mt-6 font-display text-5xl font-semibold tracking-[-0.08em] text-[var(--foreground)] sm:text-6xl">
              A driver flow built for the next stop, not the next distraction.
            </h1>
            <p className="mt-6 max-w-[560px] text-lg leading-8 text-[var(--foreground-soft)]">
              The driver concepts consistently pushed toward larger actions, less
              typing, clearer stop focus, and simple correction when automatic
              boarding prediction is not enough.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/console"
                className="orange-button rounded-[18px] px-6 py-4 text-sm font-semibold"
              >
                Continue to Console
              </Link>
              <Link
                href="/mate"
                className="outline-button rounded-[18px] px-6 py-4 text-sm font-semibold"
              >
                Back to Mate
              </Link>
            </div>
          </div>

          <div className="grid items-center gap-6 md:grid-cols-[0.72fr_1.28fr]">
            <DriverLoginPanel />
            <PhoneFrame className="animate-float-mid">
              <DriverTripScreen />
            </PhoneFrame>
          </div>
        </section>

        <section className="pt-20 sm:pt-24">
          <div className="grid gap-4 lg:grid-cols-4">
            {[
              {
                title: "Trip-first dashboard",
                detail: "Surface route, next stop, seat signal, and rider status before anything else.",
                icon: BusFront,
              },
              {
                title: "Boarding correction",
                detail: "Let drivers repair one missed boarding event without opening a deep workflow.",
                icon: CheckCheck,
              },
              {
                title: "Navigation handoff",
                detail: "Keep the next stop and route progression clear while staying compatible with nav tools.",
                icon: MapPinned,
              },
              {
                title: "Simple device posture",
                detail: "Stay usable on mounted phones with high-contrast controls and larger tap targets.",
                icon: Smartphone,
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
            <div className="section-kicker">Driver design rule</div>
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
              Busition reduces calls and manual checking by changing what the driver sees.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-[var(--foreground-soft)]">
              <p>
                The strongest driver-side insight from the planning work is that the
                UI cannot behave like a general consumer app. It has to respect the
                rhythm of a route, the pressure of the next stop, and the need to
                recover quickly from small boarding mismatches.
              </p>
              <p>
                That is why the preview stays focused on route context, stop roster,
                and quick boarding confirmation instead of hiding the operating
                reality behind decorative interactions.
              </p>
            </div>
          </div>

          <div className="concept-card rounded-[36px] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-deep)]">
                <Waypoints className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                  Trip flow
                </p>
                <h3 className="mt-1 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                  The route sequence
                </h3>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {[
                "Driver login and trip selection",
                "Today’s route briefing with stop list",
                "Next-stop focus with rider exceptions",
                "Boarding confirmation and correction",
                "Trip close with final rider check",
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
