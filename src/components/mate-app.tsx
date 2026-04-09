"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bell,
  Clock3,
  LocateFixed,
  Share2,
  ShieldCheck,
  TriangleAlert,
  UsersRound,
} from "lucide-react";

import {
  familyMembers,
  mateAlerts,
  mateHero,
  matePreferences,
  routeJourneys,
  timetableTrips,
  type AlertCategory,
  type AlertSeverity,
  type MateAlert,
  type RouteJourney,
  type StopState,
} from "@/lib/mate-data";

function cx(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function panelClassName(className = "") {
  return cx(
    "rounded-[28px] border border-black/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,248,246,0.96)_100%)] shadow-[0_16px_36px_rgba(24,24,24,0.06)]",
    className,
  );
}

function stopTone(state: StopState) {
  switch (state) {
    case "done":
      return "bg-[#eceef1] text-[var(--foreground-soft)]";
    case "active":
      return "bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]";
    case "upcoming":
      return "bg-[rgba(25,184,146,0.12)] text-[var(--success)]";
  }
}

function alertTone(category: AlertSeverity) {
  switch (category) {
    case "Boarding":
      return "bg-[rgba(25,184,146,0.12)] text-[var(--success)]";
    case "Delay":
      return "bg-[rgba(245,91,78,0.1)] text-[#d14e42]";
    case "Service":
      return "bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]";
  }
}

function getCurrentStop(journey: RouteJourney) {
  return journey.stops.find((stop) => stop.state === "active") ?? journey.stops[0];
}

function getNextStop(journey: RouteJourney) {
  return journey.stops.find((stop) => stop.state === "upcoming") ?? journey.stops.at(-1);
}

function getUnreadAlerts() {
  return mateAlerts.filter((alert) => alert.unread);
}

function sortAlerts(alerts: MateAlert[]) {
  return [...alerts].sort((a, b) => Number(Boolean(b.unread)) - Number(Boolean(a.unread)));
}

function ActionLink({
  href,
  label,
  emphasis = false,
}: {
  href: string;
  label: string;
  emphasis?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cx(
        "rounded-[18px] px-4 py-3 text-center text-sm font-semibold",
        emphasis
          ? "orange-button"
          : "border border-black/6 bg-white text-[var(--foreground)]",
      )}
    >
      {label}
    </Link>
  );
}

function RouteMap({ journey }: { journey: RouteJourney }) {
  return (
    <div className="mate-map-grid relative h-[320px] overflow-hidden rounded-[28px] border border-black/6 bg-[#eef2f0]">
      <div className="absolute left-4 top-4 z-10 rounded-[20px] border border-white/60 bg-white/92 px-4 py-3 shadow-[0_10px_24px_rgba(0,0,0,0.06)]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
          {journey.detailLabel}
        </p>
        <p className="mt-2 text-lg font-bold text-[var(--foreground)]">{journey.direction}</p>
        <p className="mt-1 text-sm text-[var(--foreground-soft)]">{journey.progress}</p>
      </div>

      {journey.routePath.map((segment, index) => (
        <div
          key={`${segment.left}-${segment.top}-${index}`}
          className="absolute h-[10px] rounded-full bg-[linear-gradient(90deg,#74b4ea_0%,#2f89dd_100%)] shadow-[0_8px_18px_rgba(41,121,201,0.18)]"
          style={{
            left: segment.left,
            top: segment.top,
            width: segment.width,
            transform: `rotate(${segment.rotate})`,
            transformOrigin: "left center",
          }}
        />
      ))}

      {journey.markers.map((marker) => (
        <div
          key={`${marker.label}-${marker.left}-${marker.top}`}
          className="absolute"
          style={{ left: marker.left, top: marker.top }}
        >
          <div
            className={cx(
              "absolute -left-2 -top-2 h-5 w-5 rounded-full border-4 border-white shadow-[0_8px_18px_rgba(0,0,0,0.12)]",
              marker.complete
                ? "bg-[#3e4650]"
                : marker.active
                  ? "bg-[var(--accent)]"
                  : "bg-[#66c3a0]",
            )}
          />
          <div className="mt-5 rounded-[16px] border border-white/70 bg-white/90 px-3 py-2 shadow-[0_10px_20px_rgba(0,0,0,0.06)]">
            <p className="text-xs font-semibold text-[var(--foreground)]">{marker.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TimelineTripCard({
  routeName,
  state,
  headline,
  detail,
  accent,
  statusTone,
  actionLabel,
}: {
  routeName: string;
  state: string;
  headline: string;
  detail: string;
  accent: string;
  statusTone: string;
  actionLabel: string;
}) {
  return (
    <div className="rounded-[22px] border border-black/6 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">{routeName}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
            {state}
          </p>
        </div>
        <Clock3 className="h-5 w-5 text-[var(--foreground-soft)]" />
      </div>

      <div className={cx("mt-4 rounded-[18px] px-4 py-4", accent)}>
        <p className={cx("text-2xl font-bold tracking-[-0.05em]", statusTone)}>{headline}</p>
        <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">{detail}</p>
      </div>

      <Link
        href="/mate/route"
        className="mt-4 inline-flex text-sm font-semibold text-[var(--accent-deep)]"
      >
        {actionLabel}
      </Link>
    </div>
  );
}

export function MateTimetableView() {
  const currentJourney = routeJourneys[0];
  const currentStop = getCurrentStop(currentJourney);
  const nextStop = getNextStop(currentJourney);
  const primaryTrip = timetableTrips[0];
  const upcomingTrips = timetableTrips.slice(1);
  const unreadAlerts = getUnreadAlerts();
  const latestAlert = unreadAlerts[0] ?? mateAlerts[0];

  return (
    <div className="space-y-4">
      <section className="rounded-[30px] bg-[linear-gradient(135deg,#fff6e5_0%,#fff0d8_100%)] p-5 shadow-[0_18px_34px_rgba(255,154,31,0.12)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Live trip
            </p>
            <h2 className="mt-3 text-[1.9rem] font-bold tracking-[-0.07em] text-[var(--foreground)]">
              {mateHero.eta}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">
              {primaryTrip.routeName}
            </p>
          </div>
          <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-[var(--accent-deep)] shadow-[0_10px_20px_rgba(255,154,31,0.1)]">
            {unreadAlerts.length} new
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[22px] bg-white/88 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Current stop
            </p>
            <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
              {currentStop?.name}
            </p>
            <p className="mt-2 text-xs text-[var(--foreground-soft)]">{currentStop?.boarding}</p>
          </div>
          <div className="rounded-[22px] bg-white/88 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Next stop
            </p>
            <p className="mt-2 text-base font-semibold text-[var(--foreground)]">
              {nextStop?.name}
            </p>
            <p className="mt-2 text-xs text-[var(--foreground-soft)]">{mateHero.detail}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <ActionLink href="/mate/route" label="Track route" emphasis />
          <ActionLink href="/mate/alerts" label="Open alerts" />
          <ActionLink href="/mate/family" label="Shared access" />
        </div>
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]">
            <LocateFixed className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Stay informed
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              What to check before pickup
            </h3>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[20px] border border-black/6 bg-white px-4 py-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">Follow live progress</p>
            <p className="mt-2 text-xs leading-6 text-[var(--foreground-soft)]">
              See the route line and current stop before leaving for pickup.
            </p>
          </div>
          <div className="rounded-[20px] border border-black/6 bg-white px-4 py-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">Check service alerts</p>
            <p className="mt-2 text-xs leading-6 text-[var(--foreground-soft)]">
              Keep delay, route, and boarding changes visible in one feed.
            </p>
          </div>
          <div className="rounded-[20px] border border-black/6 bg-white px-4 py-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">Confirm shared access</p>
            <p className="mt-2 text-xs leading-6 text-[var(--foreground-soft)]">
              Make sure the right guardian or staff contacts receive the same updates.
            </p>
          </div>
        </div>
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Timeline
            </p>
            <h3 className="mt-2 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Current and upcoming trips
            </h3>
          </div>
          <Link href="/mate/route" className="text-sm font-semibold text-[var(--accent-deep)]">
            Open live route
          </Link>
        </div>

        <div className="mt-5 grid gap-3">
          <TimelineTripCard {...primaryTrip} />
          {upcomingTrips.map((trip) => (
            <TimelineTripCard key={trip.id} {...trip} />
          ))}
        </div>
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]">
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Important now
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              {latestAlert.title}
            </h3>
          </div>
        </div>

        <div className="mt-5 rounded-[22px] border border-black/6 bg-white px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <span className={cx("rounded-full px-3 py-2 text-xs font-semibold", alertTone(latestAlert.category))}>
              {latestAlert.category}
            </span>
            <span className="text-xs font-semibold text-[var(--foreground-soft)]">
              {latestAlert.timestamp}
            </span>
          </div>
          <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{latestAlert.detail}</p>
        </div>
      </section>
    </div>
  );
}

export function MateRouteView() {
  const [activeJourneyId, setActiveJourneyId] = useState(routeJourneys[0]?.id ?? "");
  const journey = routeJourneys.find((item) => item.id === activeJourneyId) ?? routeJourneys[0];
  const currentStop = getCurrentStop(journey);
  const nextStop = getNextStop(journey);

  return (
    <div className="space-y-4">
      <section className="flex gap-2 overflow-x-auto pb-1">
        {routeJourneys.map((item) => {
          const active = item.id === journey.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveJourneyId(item.id)}
              className={cx(
                "rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
                active
                  ? "bg-[var(--accent)] text-white"
                  : "border border-black/6 bg-white text-[var(--foreground-soft)]",
              )}
            >
              {item.topLabel}
            </button>
          );
        })}
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Selected trip
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              {journey.direction}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
              {journey.description}
            </p>
          </div>
          <div className="rounded-[18px] bg-[#f5f5f2] px-4 py-3 text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Share code
            </p>
            <p className="mt-2 text-sm font-bold text-[var(--foreground)]">{journey.shareCode}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[18px] border border-black/6 bg-white px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Current stop
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{currentStop?.name}</p>
            <p className="mt-2 text-xs text-[var(--foreground-soft)]">{currentStop?.boarding}</p>
          </div>
          <div className="rounded-[18px] border border-black/6 bg-white px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Next stop
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{nextStop?.name}</p>
            <p className="mt-2 text-xs text-[var(--foreground-soft)]">{journey.progress}</p>
          </div>
          <div className="rounded-[18px] border border-black/6 bg-white px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Shared access
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
              {familyMembers.length} people connected
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <ActionLink href="/mate/alerts" label="Open alerts" />
          <ActionLink href="/mate/family" label="Share ETA" emphasis />
        </div>
      </section>

      <section className={panelClassName("overflow-hidden p-4")}>
        <RouteMap journey={journey} />
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Stops
            </p>
            <h3 className="mt-2 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Follow the trip stop by stop
            </h3>
          </div>
          <LocateFixed className="h-5 w-5 text-[var(--foreground-soft)]" />
        </div>

        <div className="mt-5 space-y-3">
          {journey.stops.map((stop) => {
            const active = stop.state === "active";

            return (
              <div
                key={stop.id}
                className={cx(
                  "flex items-start gap-3 rounded-[20px] border px-4 py-4",
                  active
                    ? "border-[rgba(255,154,31,0.24)] bg-[#fff8ef]"
                    : "border-black/6 bg-white",
                )}
              >
                <div
                  className={cx(
                    "mt-1 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                    stopTone(stop.state),
                  )}
                >
                  {stop.state === "done" ? "✓" : stop.state === "active" ? "•" : "○"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[var(--foreground)]">{stop.name}</p>
                    <span
                      className={cx(
                        "rounded-full px-3 py-1.5 text-[0.68rem] font-semibold",
                        stopTone(stop.state),
                      )}
                    >
                      {stop.boarding}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-6 text-[var(--foreground-soft)]">
                    {stop.address}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export function MateAlertsView() {
  const [filter, setFilter] = useState<AlertCategory>("All");
  const filteredAlerts =
    filter === "All"
      ? sortAlerts(mateAlerts)
      : sortAlerts(mateAlerts.filter((alert) => alert.category === filter));
  const importantAlert = filteredAlerts[0];

  return (
    <div className="space-y-4">
      <section className="rounded-[30px] bg-[linear-gradient(135deg,#fff6e7_0%,#fff0db_100%)] p-5 shadow-[0_18px_34px_rgba(255,154,31,0.12)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Attention now
            </p>
            <h2 className="mt-3 text-[1.9rem] font-bold tracking-[-0.07em] text-[var(--foreground)]">
              {importantAlert.title}
            </h2>
          </div>
          <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-[var(--accent-deep)]">
            {getUnreadAlerts().length} new
          </span>
        </div>
        <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{importantAlert.detail}</p>
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Filter updates
            </p>
            <h3 className="mt-2 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Service feed
            </h3>
          </div>
          <TriangleAlert className="h-5 w-5 text-[var(--foreground-soft)]" />
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {(["All", "Boarding", "Delay", "Service"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={cx(
                "whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                filter === item
                  ? "bg-[var(--accent)] text-white"
                  : "border border-black/6 bg-white text-[var(--foreground-soft)]",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className={panelClassName("p-5")}>
            <div className="flex items-center justify-between gap-3">
              <span className={cx("rounded-full px-3 py-2 text-xs font-semibold", alertTone(alert.category))}>
                {alert.category}
              </span>
              <span className="text-xs font-semibold text-[var(--foreground-soft)]">
                {alert.timestamp}
              </span>
            </div>
            <p className="mt-4 text-lg font-bold tracking-[-0.04em] text-[var(--foreground)]">
              {alert.title}
            </p>
            <p className="mt-2 text-sm leading-7 text-[var(--foreground-soft)]">{alert.detail}</p>
          </div>
        ))}
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Alert delivery
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Notification preferences
            </h3>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {matePreferences.map((preference) => (
            <div
              key={preference.id}
              className="flex items-start justify-between gap-4 rounded-[20px] border border-black/6 bg-white px-4 py-4"
            >
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">{preference.title}</p>
                <p className="mt-2 text-xs leading-6 text-[var(--foreground-soft)]">
                  {preference.detail}
                </p>
              </div>
              <span
                className={cx(
                  "rounded-full px-3 py-2 text-[0.68rem] font-semibold whitespace-nowrap",
                  preference.enabled
                    ? "bg-[rgba(25,184,146,0.12)] text-[var(--success)]"
                    : "bg-[#f1f0ea] text-[var(--foreground-soft)]",
                )}
              >
                {preference.enabled ? "Enabled" : "Off"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function MateFamilyView() {
  const currentJourney = routeJourneys[0];
  const currentStop = getCurrentStop(currentJourney);

  return (
    <div className="space-y-4">
      <section className="rounded-[30px] bg-[linear-gradient(135deg,#fff6e7_0%,#fff0db_100%)] p-5 shadow-[0_18px_34px_rgba(255,154,31,0.12)]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
          Shared access
        </p>
        <h2 className="mt-3 text-[1.9rem] font-bold tracking-[-0.07em] text-[var(--foreground)]">
          {familyMembers.length} people follow the same ride
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
          ETA, boarding proof, and service changes stay synced from one live trip state.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[22px] bg-white/88 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Current stop
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{currentStop?.name}</p>
          </div>
          <div className="rounded-[22px] bg-white/88 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Boarding status
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{currentStop?.boarding}</p>
          </div>
        </div>
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]">
            <UsersRound className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              People
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Who receives updates
            </h3>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {familyMembers.map((member) => (
            <div
              key={member.id}
              className="rounded-[20px] border border-black/6 bg-white px-4 py-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-bold tracking-[-0.04em] text-[var(--foreground)]">
                    {member.name}
                  </p>
                  <p className="mt-1 text-sm text-[var(--foreground-soft)]">{member.role}</p>
                </div>
                <span className={cx("rounded-full px-3 py-2 text-xs font-semibold", member.badgeTone)}>
                  {member.badge}
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{member.route}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--foreground-soft)]">{member.note}</p>
                </div>
                <span className="rounded-full bg-[#f6f5ef] px-3 py-2 text-xs font-semibold text-[var(--foreground-soft)]">
                  {member.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]">
            <Share2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Shared now
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              What shared access includes
            </h3>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[18px] border border-black/6 bg-white px-4 py-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">Live ETA</p>
            <p className="mt-2 text-xs leading-6 text-[var(--foreground-soft)]">{mateHero.eta}</p>
          </div>
          <div className="rounded-[18px] border border-black/6 bg-white px-4 py-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">Boarding proof</p>
            <p className="mt-2 text-xs leading-6 text-[var(--foreground-soft)]">
              Shared when boarding or drop-off is confirmed.
            </p>
          </div>
          <div className="rounded-[18px] border border-black/6 bg-white px-4 py-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">Service alerts</p>
            <p className="mt-2 text-xs leading-6 text-[var(--foreground-soft)]">
              Delay and route updates stay visible in the same feed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
