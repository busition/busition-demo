import Link from "next/link";
import type { Metadata } from "next";
import { BusFront, CheckCheck, MapPinned, Smartphone, Waypoints } from "lucide-react";

import { DriverLoginPanel, DriverTripScreen, PhoneFrame } from "@/components/mockup-screens";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Busition for Driver | Preview",
  description:
    "English preview page for the Busition driver experience.",
};

export default function DriverPreviewPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-[1240px] px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-28">
        <section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="section-kicker">Busition for Driver Preview</div>
            <h1 className="mt-6 font-display text-5xl font-semibold tracking-[-0.08em] text-[var(--foreground)] sm:text-6xl">
              The driver concept before you enter the actual mobile app.
            </h1>
            <p className="mt-6 max-w-[560px] text-lg leading-8 text-[var(--foreground-soft)]">
              The driver concepts consistently pushed toward larger actions, less typing,
              clearer stop focus, and simple correction when automatic boarding prediction
              is not enough.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/driver"
                className="orange-button rounded-[18px] px-6 py-4 text-sm font-semibold"
              >
                Enter driver service
              </Link>
              <Link
                href="/mate-preview"
                className="outline-button rounded-[18px] px-6 py-4 text-sm font-semibold"
              >
                Back to Mate Preview
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
            <div className="section-kicker">Why the routes split</div>
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
              Preview flow and driver app flow now live separately.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-[var(--foreground-soft)]">
              <p>
                The preview remains useful for showing the original driver concept,
                but the actual Driver service now lives under its own mobile shell with
                trip, route, boarding, and profile pages.
              </p>
              <p>
                That separation keeps the marketing story clean while letting the product
                behave like a real operator-side mobile app.
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
                  Actual app
                </p>
                <h3 className="mt-1 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                  What Driver now includes
                </h3>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {[
                "A trip-first home page for today’s live shift",
                "A route page that keeps navigation and stop sequence together",
                "A boarding page for rider confirmation and exception repair",
                "A profile page for vehicle readiness and driver-side support tools",
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
