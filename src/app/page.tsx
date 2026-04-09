import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  ArrowRight,
  BusFront,
  Check,
  Clock3,
  MapPinned,
  ShieldCheck,
  UsersRound,
  Waypoints,
} from "lucide-react";

import { BrowserFrame, PhoneFrame } from "@/components/mockup-screens";
import { SiteShell } from "@/components/site-shell";

const sharedSignals = [
  {
    title: "Shared live ETA",
    detail: "Every role sees the same arrival forecast and route progress in real time.",
    icon: Clock3,
  },
  {
    title: "Boarding visibility",
    detail: "Boarded, waiting, and exception states stay visible the moment service changes.",
    icon: ShieldCheck,
  },
  {
    title: "Operational control",
    detail: "Assignments, schedules, and alerts stay connected to the same trip state.",
    icon: Waypoints,
  },
];

const roleCards = [
  {
    id: "mate",
    title: "Mate",
    summary: "For riders and guardians who need dependable ETA, boarding confirmation, and service alerts.",
    bullets: [
      "See ETA and next stop at a glance",
      "Receive boarding and delay updates in one feed",
      "Share the same trip status with family or staff",
    ],
    href: "/mate",
    actionLabel: "Explore Mate",
    icon: UsersRound,
    preview: "/previews/mate-live-route-preview.png",
    previewAlt: "Busition Mate live route preview",
    frame: "phone" as const,
  },
  {
    id: "driver",
    title: "Driver",
    summary: "For drivers who need the next stop, rider queue, and route actions without extra distraction.",
    bullets: [
      "Keep the next action visible while driving",
      "Resolve boarding exceptions quickly",
      "Reach support and shift readiness from the same flow",
    ],
    href: "/driver",
    actionLabel: "Explore Driver",
    icon: BusFront,
    preview: "/previews/driver-today-trip-preview.png",
    previewAlt: "Busition Driver today trip preview",
    frame: "phone" as const,
  },
  {
    id: "console",
    title: "Console",
    summary: "For operators who need live coverage, schedule control, and route health in one workspace.",
    bullets: [
      "Spot coverage gaps before service slips",
      "Coordinate assignments, schedules, and partners together",
      "Operate from live route and boarding data",
    ],
    href: "/login?next=/console",
    actionLabel: "Open Console",
    icon: MapPinned,
    preview: "/previews/console-schedule-preview.png",
    previewAlt: "Busition Console schedule preview",
    frame: "browser" as const,
  },
];

type PricingPlan = {
  name: string;
  eyebrow: string;
  price: string;
  detail: string;
  points: string[];
  href: string;
  ctaLabel: string;
  featured?: boolean;
  badge?: string;
};

const pricingPlans: PricingPlan[] = [
  {
    name: "Pilot Launch",
    eyebrow: "First live rollout",
    price: "Free",
    detail: "For first institutions replacing calls and uncertainty with live ETA and boarding visibility.",
    points: [
      "Initial route rollout and launch support",
      "Mate, Driver, and Console access",
      "Operational setup for live ETA and boarding proof",
    ],
    href: "mailto:contact@wookingwoo.com?subject=Busition%20Pilot%20Launch",
    ctaLabel: "Talk to us",
  },
  {
    name: "Multi-Route Ops",
    eyebrow: "Daily route operations",
    price: "$99 / mo",
    detail: "For schools, academies, and campus shuttle teams running daily multi-role operations.",
    points: [
      "Shared trip state across every role",
      "Coverage and schedule workflows in Console",
      "Operator-grade alerts and service updates",
    ],
    featured: true,
    badge: "Recommended",
    href: "mailto:contact@wookingwoo.com?subject=Busition%20Multi-Route%20Ops",
    ctaLabel: "Talk to us",
  },
  {
    name: "Enterprise Rollout",
    eyebrow: "Multi-site expansion",
    price: "Contact us",
    detail: "For multi-site operators that need stronger rollout control, reporting, and partner coordination.",
    points: [
      "Multi-site organization management",
      "Operational reporting and rollout planning",
      "Implementation support from the Busition team",
    ],
    href: "mailto:contact@wookingwoo.com?subject=Busition%20Enterprise%20Rollout",
    ctaLabel: "Contact sales",
  },
];

function cx(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function RolePreview({
  frame,
  preview,
  previewAlt,
}: {
  frame: "phone" | "browser";
  preview: string;
  previewAlt: string;
}) {
  const image = (
    <Image
      src={preview}
      alt={previewAlt}
      width={frame === "phone" ? 523 : 1899}
      height={frame === "phone" ? 1149 : 1102}
      className="h-auto w-full"
    />
  );

  if (frame === "phone") {
    return <PhoneFrame>{image}</PhoneFrame>;
  }

  return <BrowserFrame>{image}</BrowserFrame>;
}

function RoleOverviewSection({
  title,
  summary,
  bullets,
  href,
  actionLabel,
  icon: Icon,
  preview,
  previewAlt,
  frame,
  reverse = false,
}: {
  title: string;
  summary: string;
  bullets: string[];
  href: string;
  actionLabel: string;
  icon: ComponentType<{ className?: string }>;
  preview: string;
  previewAlt: string;
  frame: "phone" | "browser";
  reverse?: boolean;
}) {
  return (
    <article
      className={cx(
        "grid items-center gap-10 py-12 lg:grid-cols-[0.96fr_1.04fr] lg:gap-14",
        reverse && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1",
      )}
    >
      <div className="flex items-center justify-center">
        <div className="w-full rounded-[32px] bg-[linear-gradient(180deg,#fffdf8_0%,#f6f7f4_100%)] p-5 sm:p-7">
          <RolePreview frame={frame} preview={preview} previewAlt={previewAlt} />
        </div>
      </div>

      <div className="max-w-[520px]">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-deep)]">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
              Role
            </p>
            <h3 className="mt-1 text-3xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              {title}
            </h3>
          </div>
        </div>

        <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
          {summary}
        </p>

        <div className="mt-6 space-y-3">
          {bullets.map((bullet) => (
            <div
              key={bullet}
              className="rounded-[18px] border border-[var(--line)] bg-white px-4 py-3 text-sm font-semibold text-[var(--foreground)]"
            >
              {bullet}
            </div>
          ))}
        </div>

        <div className="mt-7">
          <Link
            href={href}
            className="orange-button inline-flex items-center gap-2 rounded-[18px] px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
          >
            {actionLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function PricingPlanCard({ plan }: { plan: PricingPlan }) {
  return (
    <article
      className={cx(
        "relative flex h-full flex-col overflow-hidden rounded-[30px] border p-6 transition-transform duration-200 hover:-translate-y-1 sm:p-7",
        plan.featured
          ? "border-[rgba(255,154,31,0.26)] bg-[linear-gradient(180deg,#fff9ee_0%,#fff3de_100%)] shadow-[0_24px_48px_rgba(255,154,31,0.14)]"
          : "concept-card",
      )}
    >
      <div
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute inset-x-6 top-0 h-px",
          plan.featured
            ? "bg-[linear-gradient(90deg,rgba(255,154,31,0)_0%,rgba(255,154,31,0.76)_50%,rgba(255,154,31,0)_100%)]"
            : "bg-[linear-gradient(90deg,rgba(35,35,35,0)_0%,rgba(35,35,35,0.18)_50%,rgba(35,35,35,0)_100%)]",
        )}
      />
      <div
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute right-[-32px] top-[-42px] h-32 w-32 rounded-full",
          plan.featured
            ? "bg-[radial-gradient(circle,rgba(255,190,92,0.28)_0%,rgba(255,190,92,0)_72%)]"
            : "bg-[radial-gradient(circle,rgba(35,35,35,0.08)_0%,rgba(35,35,35,0)_72%)]",
        )}
      />

      <div className="relative flex h-full flex-col">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
            {plan.eyebrow}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h3 className="whitespace-nowrap text-[1.75rem] font-bold tracking-[-0.05em] text-[var(--foreground)]">
              {plan.name}
            </h3>

            {plan.badge ? (
              <span className="inline-flex rounded-full border border-[rgba(255,154,31,0.22)] bg-white/82 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--accent-deep)]">
                {plan.badge}
              </span>
            ) : null}
          </div>
        </div>

        <div
          className={cx(
            "mt-7 rounded-[24px] border px-5 py-5",
            plan.featured
              ? "border-[rgba(255,154,31,0.14)] bg-white/78"
              : "border-[rgba(35,35,35,0.08)] bg-white/74",
          )}
        >
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
            Plan pricing
          </p>
          <p className="mt-2 text-4xl font-bold tracking-[-0.06em] text-[var(--foreground)]">
            {plan.price}
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
            {plan.detail}
          </p>
        </div>

        <ul className="mt-6 space-y-3">
          {plan.points.map((point) => (
            <li
              key={point}
              className={cx(
                "flex items-start gap-3 rounded-[18px] px-4 py-3 text-sm font-semibold",
                plan.featured ? "bg-white/84" : "bg-white/78",
              )}
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-deep)]">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="leading-6 text-[var(--foreground)]">{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <Link
            href={plan.href}
            className={cx(
              "inline-flex w-full items-center justify-center gap-2 rounded-[18px] px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5",
              plan.featured
                ? "orange-button"
                : "outline-button text-[var(--foreground)]",
            )}
          >
            {plan.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function HeroVisual() {
  return (
    <div className="relative h-[420px] w-full lg:h-[520px]">
      <div className="absolute inset-x-10 top-6 h-24 rounded-full bg-[radial-gradient(circle,rgba(255,208,92,0.32)_0%,rgba(255,208,92,0)_72%)] blur-3xl" />
      <div className="relative h-full overflow-hidden rounded-[40px] border border-[rgba(255,182,72,0.16)] bg-[linear-gradient(180deg,#fffaf1_0%,#fffefb_44%,#ffffff_100%)] shadow-[0_24px_64px_rgba(255,166,35,0.1)]">
        <div className="absolute inset-0 flex items-center justify-center px-4 py-6">
          <Image
            src="/illustrations/busition-connected-route-hero.png"
            alt="Busition shuttle service illustration showing a connected route experience across bus and mobile interface."
            width={1440}
            height={1525}
            className="h-full w-auto max-w-full object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <SiteShell>
      <main>
        <section className="mx-auto grid max-w-[1240px] gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pb-24 lg:pt-20">
          <div className="flex flex-col justify-center">
            <div className="section-kicker">Real-time shuttle operations</div>
            <h1 className="mt-6 font-display text-5xl font-semibold tracking-[-0.08em] text-[var(--foreground)] sm:text-6xl xl:text-7xl">
              From live position
              <br />
              to operational certainty.
            </h1>
            <p className="mt-6 max-w-[560px] text-lg leading-8 text-[var(--foreground-soft)]">
              Busition keeps riders, guardians, drivers, and operators aligned on the
              same live ETA, boarding status, delay updates, and route changes.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="#roles"
                className="orange-button rounded-[18px] px-6 py-4 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              >
                Explore the product
              </Link>
              <Link
                href="/login?next=/console"
                className="outline-button rounded-[18px] px-6 py-4 text-sm font-semibold transition-colors hover:text-[var(--accent-deep)]"
              >
                Open Console
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {sharedSignals.map((signal) => (
                <div key={signal.title} className="concept-card rounded-[24px] px-5 py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-deep)]">
                    <signal.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-base font-bold text-[var(--foreground)]">
                    {signal.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--foreground-soft)]">
                    {signal.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <HeroVisual />
        </section>

        <section id="roles" className="concept-band py-20 sm:py-24">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[760px] text-center">
              <div className="section-kicker">Role overview</div>
              <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-5xl">
                Three products. One live operating state.
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                Each role gets a simpler interface, but every screen reads from the same
                route progress, boarding certainty, and operating updates.
              </p>
            </div>

            <div className="mt-14 divide-y divide-[rgba(35,35,35,0.08)]">
              {roleCards.map((role, index) => (
                <RoleOverviewSection
                  key={role.id}
                  title={role.title}
                  summary={role.summary}
                  bullets={role.bullets}
                  href={role.href}
                  actionLabel={role.actionLabel}
                  icon={role.icon}
                  preview={role.preview}
                  previewAlt={role.previewAlt}
                  frame={role.frame}
                  reverse={index % 2 === 1}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
            <div>
              <div className="section-kicker">Direct entry</div>
              <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-5xl">
                Start with the surface built for your role.
              </h2>
              <p className="mt-5 max-w-[34rem] text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                The workflow changes by audience. The operational truth does not.
                Each role stays focused on the job at hand without losing the shared trip state.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {roleCards.map((role) => (
                <Link
                  key={role.id}
                  href={role.href}
                  className="concept-card rounded-[30px] p-6 transition-transform hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-deep)]">
                    <role.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                    {role.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                    {role.summary}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-deep)]">
                    {role.actionLabel}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="concept-band py-20 sm:py-24">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[760px] text-center">
              <div className="section-kicker">Pricing</div>
              <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-5xl">
                Plans built for pilot launch and scale.
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                Start with a controlled rollout, then expand as routes, riders, and partners grow.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3 lg:gap-6">
              {pricingPlans.map((plan) => (
                <PricingPlanCard key={plan.name} plan={plan} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
