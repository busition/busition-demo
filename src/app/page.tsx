import {
  ArrowRight,
  BellRing,
  BrainCircuit,
  BusFront,
  ChartColumnIncreasing,
  Clock3,
  Factory,
  GraduationCap,
  MapPinned,
  Route,
  School,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Waypoints,
  Workflow,
} from "lucide-react";

import { BusitionLogo } from "@/components/busition-logo";
import { DemoLab } from "@/components/demo-lab";
import { HeroVisual } from "@/components/hero-visual";

const proofCards = [
  {
    value: "0",
    label: "extra hardware required",
    detail: "Launch with smartphones, live telemetry, and role-based access instead of fixed devices.",
  },
  {
    value: "3",
    label: "synced experiences",
    detail: "Driver, Mate, and Console all read from the same live operating flow.",
  },
  {
    value: "1",
    label: "shared operating graph",
    detail: "ETA, boarding, seats, delay, and notifications move in one system, not three silos.",
  },
  {
    value: "7",
    label: "pilot steps to go live",
    detail: "Set up the org, routes, riders, and invites quickly enough to prove value in week one.",
  },
];

const roleCards = [
  {
    title: "Busition for Console",
    description:
      "A live web console for route control, stop pressure, delay handling, and service analytics.",
    icon: Workflow,
  },
  {
    title: "Busition for Driver",
    description:
      "A driver-first operating flow with large actions, route focus, and quick boarding correction.",
    icon: BusFront,
  },
  {
    title: "Busition for Mate",
    description:
      "Live ETA, boarding proof, seat visibility, and shareable access for riders, guardians, and staff.",
    icon: UsersRound,
  },
  {
    title: "Busition Platform",
    description:
      "The shared layer that syncs location, ETA, route progress, alerts, and optimization signals in real time.",
    icon: Waypoints,
  },
];

const featureCards = [
  {
    title: "Real-time route progression",
    description:
      "Show where the bus is, how far the route has advanced, and what the next stop means for every role.",
    icon: Route,
  },
  {
    title: "Boarding certainty",
    description:
      "Combine rider pre-status, live arrival, and driver correction into an auditable boarding record.",
    icon: ShieldCheck,
  },
  {
    title: "Guardian and rider trust",
    description:
      "Replace anxious waiting and inbound calls with ETA, boarding proof, and shareable visibility.",
    icon: BellRing,
  },
  {
    title: "Seat and stop intelligence",
    description:
      "Let riders know whether the next shuttle is worth waiting for and let ops see downstream pressure.",
    icon: Clock3,
  },
  {
    title: "Operations analytics",
    description:
      "Track stop demand, delay corridors, no-show patterns, and complaint reduction from the same route history.",
    icon: ChartColumnIncreasing,
  },
  {
    title: "Route optimization path",
    description:
      "Use route modeling and operational data to redesign stop clusters, capacity, and service balance over time.",
    icon: BrainCircuit,
  },
];

const rolloutSteps = [
  "Create the organization and fleet structure.",
  "Register vehicles and assign driver accounts.",
  "Upload routes, stops, and operating windows.",
  "Import riders or workers from a spreadsheet.",
  "Send invite links to riders, guardians, and staff.",
  "Run the pilot with live ETA, boarding, and alerts.",
  "Review route history, activation, and complaint reduction.",
];

const successSignals = [
  "Driver app activation on every live run",
  "Rider and guardian account connection rate",
  "Boarding-event capture and correction rate",
  "Complaint and manual-call reduction after pilot",
];

const markets = [
  {
    title: "Academies and schools",
    description:
      "Use Busition to prove boarding, reduce parent anxiety, and remove phone-based dispatch from daily pickup.",
    icon: School,
  },
  {
    title: "Universities and campuses",
    description:
      "Help students choose routes with live ETA and seat visibility while operations balances route pressure.",
    icon: GraduationCap,
  },
  {
    title: "Enterprise commutes",
    description:
      "Protect shift punctuality, route control, and transport auditability across multi-site shuttle operations.",
    icon: Factory,
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="pb-10">
      <header className="sticky top-0 z-50">
        <div className="mx-auto max-w-[1280px] px-4 pt-4 sm:px-6 lg:px-8">
          <div className="panel-surface flex items-center justify-between rounded-full px-4 py-3 sm:px-6">
            <BusitionLogo compact />

            <nav className="hidden items-center gap-6 text-sm font-semibold text-[var(--foreground-soft)] lg:flex">
              <a href="#system" className="transition-colors hover:text-[var(--foreground)]">
                System
              </a>
              <a href="#demo-lab" className="transition-colors hover:text-[var(--foreground)]">
                Demo
              </a>
              <a href="#features" className="transition-colors hover:text-[var(--foreground)]">
                Features
              </a>
              <a href="#launch-plan" className="transition-colors hover:text-[var(--foreground)]">
                Launch
              </a>
            </nav>

            <a
              href="#demo-lab"
              className="inline-flex items-center gap-2 rounded-full bg-[#18212f] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Launch demo
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1280px] px-4 pt-10 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
          <div>
            <div className="eyebrow">Pre-launch experience site</div>
            <h1 className="mt-6 max-w-3xl font-display text-5xl font-semibold tracking-[-0.08em] text-[var(--foreground)] sm:text-6xl lg:text-7xl">
              See every shuttle.
              <br />
              Trust every boarding.
              <br />
              Run every route from one system.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--foreground-soft)]">
              Busition is the shuttle operations platform that synchronizes drivers,
              riders, guardians, and control teams around live ETA, boarding proof,
              seat visibility, alerts, and route decisions. This site is the
              interactive launch preview of how the service works before the full
              product stack ships.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#demo-lab"
                className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#ffb045_0%,#f0671b_100%)] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_34px_rgba(240,104,29,0.22)] transition-transform hover:-translate-y-0.5"
              >
                Try the live demo
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#launch-plan"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/74 px-5 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[rgba(255,155,26,0.2)]"
              >
                Explore the rollout model
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {[
                "Smartphone-first rollout with no extra hardware.",
                "Live route control across Driver, Mate, and Console.",
                "Built for schools, universities, and enterprise shuttles.",
                "Designed to evolve from launch preview into an operating SaaS.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[22px] border border-[var(--border)] bg-white/70 px-4 py-4"
                >
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-strong)]" />
                  <p className="text-sm leading-6 text-[var(--foreground)]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <HeroVisual />
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {proofCards.map((card) => (
            <div
              key={card.label}
              className="panel-surface rounded-[30px] p-6 transition-transform hover:-translate-y-1"
            >
              <p className="font-display text-5xl font-semibold tracking-[-0.08em] text-[var(--foreground)]">
                {card.value}
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                {card.label}
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
                {card.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="system" className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Product structure"
          title="Busition is not three disconnected apps. It is one live operating graph."
          description="The experience splits by role, but the system stays unified. Driver, Mate, and Console all reflect the same route, ETA, boarding, and exception state so the service feels coordinated instead of fragmented."
        />

        <div className="mt-10 grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            {roleCards.map((card) => (
              <div
                key={card.title}
                className="panel-surface rounded-[28px] p-6 transition-transform hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(255,155,26,0.12)] text-[var(--accent-strong)]">
                  <card.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          <div className="panel-dark relative overflow-hidden rounded-[34px] p-6 text-white sm:p-8">
            <div className="soft-grid absolute inset-0 opacity-15" />
            <div className="relative z-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                    Shared operating model
                  </p>
                  <h3 className="mt-4 font-display text-4xl font-semibold tracking-[-0.06em] text-white">
                    One route state drives every role.
                  </h3>
                  <p className="mt-4 text-base leading-8 text-white/68">
                    Busition keeps location, ETA, boarding events, stop demand,
                    seat pressure, and notifications in one synchronized stream.
                    That is what lets the platform reduce calls, improve trust, and
                    turn daily transport into something that can actually be managed.
                  </p>
                </div>

                <div className="rounded-[26px] border border-white/10 bg-white/8 px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffcf86]">
                    Event examples
                  </p>
                  <div className="mt-4 space-y-3 text-sm text-white/78">
                    <p>route.created</p>
                    <p>bus.trip.started</p>
                    <p>rider.boarded.confirmed</p>
                    <p>route.delay.detected</p>
                    <p>trip.completed</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-4 lg:grid-cols-3">
                {[
                  {
                    title: "Live telemetry",
                    text: "Bus position, stop progression, and ETA stay current across every view.",
                    icon: MapPinned,
                  },
                  {
                    title: "Role-aware actions",
                    text: "Drivers correct a boarding event once and the change propagates everywhere.",
                    icon: Workflow,
                  },
                  {
                    title: "Optimization path",
                    text: "Operational history becomes the raw material for route redesign and analytics.",
                    icon: BrainCircuit,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[24px] border border-white/10 bg-white/7 p-5"
                  >
                    <item.icon className="h-5 w-5 text-[#ffb045]" />
                    <p className="mt-4 text-lg font-semibold text-white">{item.title}</p>
                    <p className="mt-3 text-sm leading-7 text-white/68">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="demo-lab" className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-8">
        <DemoLab />
      </section>

      <section id="features" className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Feature surface"
          title="Built for the real friction points in shuttle operations."
          description="The planning materials made the priorities clear: eliminate waiting uncertainty, prove boarding, reduce operator phone load, expose seat pressure, and turn route history into better service design. The site reflects those capabilities directly."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {featureCards.map((card, index) => (
            <div
              key={card.title}
              className={`rounded-[30px] p-6 ${
                index === 0 || index === 4
                  ? "panel-dark text-white"
                  : "panel-surface"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  index === 0 || index === 4
                    ? "bg-white/8 text-[#ffb045]"
                    : "bg-[rgba(255,155,26,0.12)] text-[var(--accent-strong)]"
                }`}
              >
                <card.icon className="h-6 w-6" />
              </div>
              <h3
                className={`mt-5 font-display text-2xl font-semibold tracking-[-0.05em] ${
                  index === 0 || index === 4 ? "text-white" : "text-[var(--foreground)]"
                }`}
              >
                {card.title}
              </h3>
              <p
                className={`mt-3 text-sm leading-7 ${
                  index === 0 || index === 4
                    ? "text-white/68"
                    : "text-[var(--foreground-soft)]"
                }`}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="launch-plan" className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-10 xl:grid-cols-[1.02fr_0.98fr]">
          <div>
            <SectionHeading
              eyebrow="Launch sequence"
              title="Designed for a fast pilot, not a heavy implementation project."
              description="The business plan emphasized a simple truth: value has to be felt in the first week. The launch path below turns Busition into a realistic pilot motion instead of a vague future promise."
            />

            <div className="mt-10 space-y-3">
              {rolloutSteps.map((step, index) => (
                <div
                  key={step}
                  className="panel-surface flex items-start gap-4 rounded-[24px] px-5 py-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[rgba(255,155,26,0.14)] font-display text-lg font-semibold text-[var(--accent-strong)]">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-[var(--foreground)]">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="panel-dark rounded-[34px] p-6 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffcf86]">
                Success signals
              </p>
              <h3 className="mt-4 font-display text-4xl font-semibold tracking-[-0.06em] text-white">
                What proves the pilot is working
              </h3>
              <div className="mt-8 space-y-4">
                {successSignals.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/7 px-4 py-3"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#ffb045]" />
                    <p className="text-sm leading-7 text-white/76">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {markets.map((market) => (
                <div
                  key={market.title}
                  className={`rounded-[28px] p-6 ${market.title === "Enterprise commutes" ? "panel-dark text-white sm:col-span-2" : "panel-surface"}`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      market.title === "Enterprise commutes"
                        ? "bg-white/8 text-[#ffb045]"
                        : "bg-[rgba(255,155,26,0.12)] text-[var(--accent-strong)]"
                    }`}
                  >
                    <market.icon className="h-6 w-6" />
                  </div>
                  <h3
                    className={`mt-5 font-display text-2xl font-semibold tracking-[-0.05em] ${
                      market.title === "Enterprise commutes"
                        ? "text-white"
                        : "text-[var(--foreground)]"
                    }`}
                  >
                    {market.title}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-7 ${
                      market.title === "Enterprise commutes"
                        ? "text-white/68"
                        : "text-[var(--foreground-soft)]"
                    }`}
                  >
                    {market.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-24 sm:px-6 lg:px-8">
        <div className="panel-surface overflow-hidden rounded-[38px] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-10 xl:grid-cols-[1.06fr_0.94fr]">
            <div>
              <div className="eyebrow">Long-term leverage</div>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-5xl">
                From launch-preview website to data-rich mobility operations SaaS.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                Busition starts with live route visibility and role-specific trust. Over
                time, the same route history becomes a defensible layer for schedule
                redesign, stop clustering, delay prediction, demand analysis, and
                enterprise-grade operational reporting.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Data moat",
                    detail: "Stop demand, seat pressure, no-show patterns, and delay corridors accumulate with every route run.",
                    icon: ChartColumnIncreasing,
                  },
                  {
                    title: "Optimization path",
                    detail: "Route design and vehicle planning become stronger as more operational history is captured.",
                    icon: BrainCircuit,
                  },
                  {
                    title: "Trust layer",
                    detail: "Boarding proof, rider visibility, and role-based sharing become part of the daily operating habit.",
                    icon: UsersRound,
                  },
                  {
                    title: "Service standard",
                    detail: "Schools, campuses, and enterprises can all run on one recognizable operations model.",
                    icon: Sparkles,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[24px] border border-[var(--border)] bg-white/78 p-5"
                  >
                    <item.icon className="h-5 w-5 text-[var(--accent-strong)]" />
                    <p className="mt-4 text-lg font-semibold text-[var(--foreground)]">
                      {item.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-dark rounded-[34px] p-6 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffcf86]">
                Positioning
              </p>
              <h3 className="mt-4 font-display text-4xl font-semibold tracking-[-0.06em] text-white">
                The operating system for shuttle mobility.
              </h3>
              <p className="mt-5 text-base leading-8 text-white/68">
                Busition is not another map viewer. It is the operating layer that
                removes uncertainty from shuttle service by giving every stakeholder
                the same live source of truth.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "See the route as it actually operates, not as the timetable promised.",
                  "Replace fragmented phone calls with one synchronized data flow.",
                  "Prove boarding, reduce waiting anxiety, and expose route pressure.",
                  "Use every completed trip as input for better operations tomorrow.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/7 px-4 py-3"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#ffb045]" />
                    <p className="text-sm leading-7 text-white/78">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#demo-lab"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#18212f]"
                >
                  Replay the demo
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#system"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-5 py-3 text-sm font-semibold text-white"
                >
                  Review the system
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-[1280px] px-4 pb-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-[28px] border border-[var(--border)] bg-white/58 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <BusitionLogo />
          <p className="text-sm text-[var(--foreground-soft)]">
            Launch-preview site for Busition. English-first public demo experience.
          </p>
        </div>
      </footer>
    </main>
  );
}
