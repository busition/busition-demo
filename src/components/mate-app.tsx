"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, LocateFixed, UsersRound } from "lucide-react";

import {
  familyMembers,
  mateAlerts,
  mateHero,
  matePreferences,
  routeJourneys,
  timetableTrips,
  type AlertCategory,
  type AlertSeverity,
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
      return "bg-[#e9ecef] text-[var(--foreground-soft)]";
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

function TripCard({
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
    <div className={panelClassName("p-4")}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-base font-bold tracking-[-0.04em] text-[var(--foreground)]">
          {routeName}
        </p>
        <span className="rounded-full border border-black/6 px-3 py-1.5 text-[0.68rem] font-semibold text-[var(--foreground-soft)]">
          {state}
        </span>
      </div>

      <div className={`mt-4 rounded-[22px] px-4 py-5 ${accent}`}>
        <p className={`text-3xl font-bold tracking-[-0.06em] ${statusTone}`}>{headline}</p>
        <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">{detail}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          href="/mate/route"
          className="orange-button flex-1 rounded-[16px] px-4 py-3 text-center text-sm font-semibold"
        >
          {actionLabel}
        </Link>
        <Link
          href="/mate/alerts"
          className="rounded-[16px] border border-black/6 bg-white px-4 py-3 text-sm font-semibold text-[var(--foreground)]"
        >
          Alerts
        </Link>
      </div>
    </div>
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

export function MateTimetableView() {
  const primaryTrip = timetableTrips[0];
  const latestAlert = mateAlerts[0];

  return (
    <div className="space-y-4">
      <section className="rounded-[30px] bg-[linear-gradient(135deg,#fff6e5_0%,#fff0d8_100%)] p-5 shadow-[0_18px_34px_rgba(255,154,31,0.12)]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
          Today
        </p>
        <h2 className="mt-3 text-[1.9rem] font-bold tracking-[-0.07em] text-[var(--foreground)]">
          {mateHero.eta}
        </h2>
        <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">
          {mateHero.campus}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[22px] bg-white/86 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Live trip
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
              {primaryTrip.routeName}
            </p>
          </div>
          <div className="rounded-[22px] bg-white/86 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Latest alert
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
              {latestAlert.category}
            </p>
          </div>
          <div className="rounded-[22px] bg-white/86 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Shared access
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
              {familyMembers.length} linked people
            </p>
          </div>
        </div>
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Trips
            </p>
            <h3 className="mt-2 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              What matters next
            </h3>
          </div>
          <Link href="/mate/route" className="text-sm font-semibold text-[var(--accent-deep)]">
            Open route
          </Link>
        </div>

        <div className="mt-5 space-y-3">
          {timetableTrips.map((trip) => (
            <TripCard key={trip.id} {...trip} />
          ))}
        </div>
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]">
            <UsersRound className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Shared status
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Rider and guardian stay aligned
            </h3>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[18px] border border-black/6 bg-white px-4 py-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">
              {matePreferences[0]?.title}
            </p>
            <p className="mt-2 text-xs leading-6 text-[var(--foreground-soft)]">
              {matePreferences[0]?.detail}
            </p>
          </div>
          <div className="rounded-[18px] border border-black/6 bg-white px-4 py-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">
              {latestAlert.title}
            </p>
            <p className="mt-2 text-xs leading-6 text-[var(--foreground-soft)]">
              {latestAlert.detail}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export function MateRouteView() {
  const [activeJourneyId, setActiveJourneyId] = useState(routeJourneys[0]?.id ?? "");
  const journey = routeJourneys.find((item) => item.id === activeJourneyId) ?? routeJourneys[0];

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
              Active route
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
              Progress
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{journey.progress}</p>
          </div>
          <div className="rounded-[18px] border border-black/6 bg-white px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Stops
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
              {journey.stops.length} total
            </p>
          </div>
          <div className="rounded-[18px] border border-black/6 bg-white px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Status
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
              {journey.detailLabel}
            </p>
          </div>
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
              Stop-by-stop progress
            </h3>
          </div>
          <LocateFixed className="h-5 w-5 text-[var(--foreground-soft)]" />
        </div>

        <div className="mt-5 space-y-3">
          {journey.stops.map((stop) => (
            <div
              key={stop.id}
              className="flex items-start gap-3 rounded-[20px] border border-black/6 bg-white px-4 py-4"
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
          ))}
        </div>

        <div className="mt-5 flex gap-2">
          <button className="orange-button flex-1 rounded-[18px] px-4 py-3 text-sm font-semibold">
            Share ETA
          </button>
          <Link
            href="/mate/alerts"
            className="flex items-center justify-center rounded-[18px] border border-black/6 bg-white px-4 py-3 text-sm font-semibold text-[var(--foreground)]"
          >
            View alerts
          </Link>
        </div>
      </section>
    </div>
  );
}

export function MateAlertsView() {
  const [filter, setFilter] = useState<AlertCategory>("All");
  const filteredAlerts =
    filter === "All"
      ? mateAlerts
      : mateAlerts.filter((alert) => alert.category === filter);

  return (
    <div className="space-y-4">
      <section className={panelClassName("p-5")}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Alerts
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Keep the route state visible
            </h2>
          </div>
          <div className="rounded-full bg-[rgba(255,154,31,0.12)] px-3 py-2 text-xs font-semibold text-[var(--accent-deep)]">
            {mateAlerts.filter((alert) => alert.unread).length} unread
          </div>
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
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Preferences
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Notification settings
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
                {preference.enabled ? "On" : "Off"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function MateFamilyView() {
  return (
    <div className="space-y-4">
      <section className="rounded-[30px] bg-[linear-gradient(135deg,#fff6e7_0%,#fff0db_100%)] p-5 shadow-[0_18px_34px_rgba(255,154,31,0.12)]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
          Family
        </p>
        <h2 className="mt-3 text-[1.9rem] font-bold tracking-[-0.07em] text-[var(--foreground)]">
          Shared route access for {familyMembers.length} people
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
          Boarding, ETA, and route changes stay visible to the rider, guardian, and
          support contact.
        </p>
      </section>

      <section className="space-y-3">
        {familyMembers.map((member) => (
          <div key={member.id} className={panelClassName("p-5")}>
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

            <div className="mt-4 rounded-[20px] bg-[#f6f5ef] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
                Route or access
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{member.route}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{member.note}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
