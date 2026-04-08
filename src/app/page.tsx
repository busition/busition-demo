import Link from "next/link";
import { ArrowRight, BellRing, BusFront, Clock3, GraduationCap, LocateFixed, MapPinned, School, ShieldCheck, UsersRound, Waypoints } from "lucide-react";

import {
  BrowserFrame,
  ConsoleAssignmentScreen,
  MateRouteScreen,
  MateTimetableScreen,
  OrbitRoleMap,
  PhoneFrame,
} from "@/components/mockup-screens";
import { SiteShell } from "@/components/site-shell";

const featureCards = [
  {
    title: "Live ETA for riders and guardians",
    description:
      "The ride stops feeling vague. Busition changes 'where is it?' into a shared countdown with current stop context.",
    icon: Clock3,
  },
  {
    title: "Boarding proof with less manual follow-up",
    description:
      "Drivers, guardians, and operators all read from the same boarding state instead of fragmented calls and spreadsheets.",
    icon: ShieldCheck,
  },
  {
    title: "Service orchestration for operators",
    description:
      "Assignments, schedules, delay handling, and route changes live in one operator console instead of separate tools.",
    icon: Waypoints,
  },
];

const previewLinks = [
  {
    href: "/mate",
    title: "Busition for Mate",
    description: "See the rider and guardian-facing flow built around ETA, alerts, and shared visibility.",
    icon: UsersRound,
  },
  {
    href: "/driver",
    title: "Busition for Driver",
    description: "Preview the trip-first driver experience with boarding control and stop-level focus.",
    icon: BusFront,
  },
  {
    href: "/console-preview",
    title: "Busition for Console",
    description: "Explore the operator preview before opening the actual multi-page console service.",
    icon: MapPinned,
  },
];

const packages = [
  {
    name: "Starter",
    price: "Free",
    accent: false,
    points: [
      "Single-route concept validation",
      "Basic route and rider preview",
      "Mate and Driver screen walkthroughs",
      "Pilot narrative for stakeholder meetings",
    ],
  },
  {
    name: "Operator Pilot",
    price: "$99 / mo",
    accent: true,
    points: [
      "Multi-role site experience",
      "Operator console preview",
      "Pilot launch structure and route planning narrative",
      "Best for academies and small shuttle teams",
    ],
  },
  {
    name: "Enterprise Preview",
    price: "$490 / mo",
    accent: false,
    points: [
      "Multi-site shuttle storytelling",
      "Console-heavy rollout proposal",
      "Driver, rider, and operator flow alignment",
      "Best for universities and enterprise commutes",
    ],
  },
];

function HeroVisual() {
  return (
    <div className="relative h-[460px] w-full lg:h-[540px]">
      <div className="absolute right-8 top-16 h-[250px] w-[250px] rotate-[18deg] rounded-[46px] bg-[linear-gradient(135deg,#ffd450_0%,#ffaf21_100%)] shadow-[0_30px_60px_rgba(255,172,34,0.22)] lg:h-[320px] lg:w-[320px]" />
      <div className="animate-bob-minor absolute left-8 top-12 rounded-full bg-white px-4 py-3 shadow-[0_16px_34px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent-soft)]">
            <BellRing className="h-5 w-5 text-[var(--accent-deep)]" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Device-free launch
            </p>
            <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">
              Start with the phones people already use.
            </p>
          </div>
        </div>
      </div>

      <div className="animate-float-mid absolute left-0 top-[120px] flex h-[190px] w-[190px] flex-col justify-between rounded-[42px] bg-[#ffbe32] p-6 shadow-[0_26px_52px_rgba(255,176,50,0.24)] lg:left-10 lg:h-[220px] lg:w-[220px]">
        <div className="flex h-20 w-full items-start justify-between">
          <div className="h-11 w-11 rounded-[12px] bg-[#6cc06f]/30" />
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
            <LocateFixed className="h-5 w-5 text-[#6ab24d]" />
          </div>
        </div>
        <div className="rounded-[24px] bg-[#2c2c31] p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <BusFront className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Morning shuttle</p>
              <p className="text-xs text-white/64">Route is live</p>
            </div>
          </div>
        </div>
      </div>

      <PhoneFrame className="absolute right-0 top-0 scale-[0.92] lg:right-8 lg:top-6 lg:scale-100">
        <MateRouteScreen />
      </PhoneFrame>
    </div>
  );
}

function FeatureSection({
  reverse = false,
  title,
  description,
  eyebrow,
  bullets,
  children,
}: {
  reverse?: boolean;
  title: string;
  description: string;
  eyebrow: string;
  bullets: string[];
  children: React.ReactNode;
}) {
  return (
    <section className="py-16 sm:py-20">
      <div
        className={`grid items-center gap-12 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}
      >
        <div>{children}</div>
        <div className="max-w-[520px]">
          <div className="section-kicker">{eyebrow}</div>
          <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
            {description}
          </p>
          <div className="mt-8 space-y-3">
            {bullets.map((bullet) => (
              <div
                key={bullet}
                className="flex items-start gap-3 rounded-[20px] border border-[var(--line)] bg-white px-4 py-3"
              >
                <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                <p className="text-sm leading-7 text-[var(--foreground)]">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <SiteShell>
      <main>
        <section className="mx-auto grid max-w-[1240px] gap-12 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pb-28 lg:pt-20">
          <div className="flex flex-col justify-center">
            <div className="section-kicker">Launch preview site</div>
            <h1 className="mt-7 font-display text-5xl font-semibold tracking-[-0.08em] text-[var(--foreground)] sm:text-6xl xl:text-7xl">
              A smarter beginning
              <br />
              for shuttle service.
            </h1>
            <p className="mt-6 max-w-[560px] text-lg leading-8 text-[var(--foreground-soft)]">
              Busition turns shuttle operations into one connected service flow.
              Riders, guardians, drivers, and operators all see the same route
              state, ETA, boarding signal, and service update in real time.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/mate"
                className="orange-button rounded-[18px] px-6 py-4 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              >
                Start preview
              </Link>
              <Link
                href="/console-preview"
                className="outline-button rounded-[18px] px-6 py-4 text-sm font-semibold transition-colors hover:text-[var(--accent-deep)]"
              >
                Open console preview
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <div className="concept-card rounded-[26px] px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                  Launch model
                </p>
                <p className="mt-3 text-2xl font-bold text-[var(--foreground)]">
                  No extra hardware
                </p>
              </div>
              <div className="concept-card rounded-[26px] px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                  Core promise
                </p>
                <p className="mt-3 text-2xl font-bold text-[var(--foreground)]">
                  One live operating view
                </p>
              </div>
            </div>
          </div>

          <HeroVisual />
        </section>

        <section className="concept-band py-20 sm:py-24">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[760px] text-center">
              <div className="section-kicker">Connected roles</div>
              <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-5xl">
                Driver, rider, guardian, and operator belong to the same route.
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                The original concepts were clear about one thing: the value is not
                a single app screen. The value is the fact that every role reads
                the same service reality instead of separate assumptions.
              </p>
            </div>

            <div className="mt-16">
              <OrbitRoleMap />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <FeatureSection
            eyebrow="Mate experience"
            title="Live arrival guidance that makes waiting feel predictable."
            description="The mobile concept work focused on a very practical experience: riders and guardians should know how far the route has progressed, what stop is next, and whether the shuttle is worth waiting for."
            bullets={[
              "Show the next stop, route path, and stop-by-stop progress.",
              "Turn vague waiting into a route-aware ETA with actual context.",
              "Keep the structure light enough for schools, campuses, and private shuttle programs.",
            ]}
          >
            <div className="flex flex-wrap items-center justify-center gap-6">
              <PhoneFrame className="animate-float-mid scale-[0.92] sm:scale-100">
                <MateTimetableScreen />
              </PhoneFrame>
              <PhoneFrame className="animate-float-slow hidden sm:block">
                <MateRouteScreen />
              </PhoneFrame>
            </div>
          </FeatureSection>

          <FeatureSection
            reverse
            eyebrow="Console experience"
            title="A console that looks like an operator tool, not a generic dashboard."
            description="The desktop concepts pointed toward route assignment, schedule management, and map-assisted operations. The site now follows that structure instead of abstract landing-page patterns."
            bullets={[
              "Assign drivers and vehicles from a route-centric grid.",
              "Edit schedules with day-based controls and stop ordering.",
              "Keep route structure and geography visible in the same screen flow.",
            ]}
          >
            <BrowserFrame>
              <ConsoleAssignmentScreen />
            </BrowserFrame>
          </FeatureSection>

          <section className="py-16 sm:py-20">
            <div className="grid gap-4 lg:grid-cols-3">
              {featureCards.map((card) => (
                <div key={card.title} className="concept-card rounded-[30px] p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-deep)]">
                    <card.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </section>

        <section className="concept-band py-20 sm:py-24">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-[720px]">
                <div className="section-kicker">Preview by product</div>
                <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-5xl">
                  The site is now organized like the actual product family.
                </h2>
                <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                  Instead of compressing every concept into one experimental page,
                  Busition now has dedicated preview routes for the rider-facing,
                  driver-facing, and operator-facing experiences.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {previewLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="concept-card rounded-[30px] p-6 transition-transform hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-deep)]">
                    <link.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                    {link.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                    {link.description}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-deep)]">
                    Open page
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-12 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
            <div>
              <div className="section-kicker">Target segments</div>
              <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-5xl">
                Built for the markets the planning documents prioritized first.
              </h2>
              <div className="mt-8 space-y-4">
                {[
                  {
                    title: "Academies and K-12 transport",
                    detail: "Reduce guardian anxiety, prove boarding, and replace daily phone-based dispatch.",
                    icon: School,
                  },
                  {
                    title: "Universities and campus loops",
                    detail: "Give students live seats, stop context, and better route decisions before they walk to a stop.",
                    icon: GraduationCap,
                  },
                  {
                    title: "Enterprise commute operations",
                    detail: "Expose shift punctuality risk and move transport decisions into one operator-facing view.",
                    icon: MapPinned,
                  },
                ].map((item) => (
                  <div key={item.title} className="concept-card rounded-[24px] px-5 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-deep)]">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[var(--foreground)]">{item.title}</p>
                        <p className="mt-1 text-sm leading-7 text-[var(--foreground-soft)]">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`rounded-[30px] border p-6 ${
                    pkg.accent
                      ? "border-[rgba(255,154,31,0.24)] bg-[#fff7ea] shadow-[0_24px_48px_rgba(255,154,31,0.12)]"
                      : "concept-card"
                  }`}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    {pkg.name}
                  </p>
                  <p className="mt-4 text-4xl font-bold tracking-[-0.06em] text-[var(--foreground)]">
                    {pkg.price}
                  </p>
                  <div className="mt-6 space-y-3">
                    {pkg.points.map((point) => (
                      <div key={point} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                        <p className="text-sm leading-7 text-[var(--foreground-soft)]">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                  <button
                    className={`mt-8 w-full rounded-[18px] py-3 text-sm font-semibold ${
                      pkg.accent
                        ? "orange-button"
                        : "border border-[var(--line)] bg-white text-[var(--foreground)]"
                    }`}
                  >
                    Start with {pkg.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
