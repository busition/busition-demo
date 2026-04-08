"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bell,
  ChevronRight,
  Clock3,
  LocateFixed,
  MapPinned,
  ShieldCheck,
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
  type RouteJourney,
  type StopState,
} from "@/lib/mate-data";

function cx(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function panelClassName(className = "") {
  return cx(
    "rounded-[28px] border border-black/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,248,246,0.96)_100%)] shadow-[0_20px_50px_rgba(24,24,24,0.08)]",
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
        <button
          type="button"
          className="rounded-full border border-black/6 px-3 py-1.5 text-[0.68rem] font-semibold text-[var(--foreground-soft)]"
        >
          {state}
        </button>
      </div>

      <div className={`mt-4 rounded-[22px] px-4 py-6 text-center ${accent}`}>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_12px_22px_rgba(0,0,0,0.06)]">
          <LocateFixed className="h-6 w-6 text-[var(--accent)]" />
        </div>
        <p className={`mt-4 text-3xl font-bold tracking-[-0.06em] ${statusTone}`}>{headline}</p>
        <p className="mt-2 text-sm text-[var(--foreground-soft)]">{detail}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          href="/mate/route"
          className="flex-1 rounded-[16px] border border-black/6 bg-white px-4 py-3 text-center text-sm font-semibold text-[var(--foreground)]"
        >
          {actionLabel}
        </Link>
        <button
          type="button"
          className="rounded-[16px] border border-black/6 bg-white px-4 py-3 text-sm font-semibold text-[var(--foreground-soft)]"
        >
          Route detail
        </button>
      </div>
    </div>
  );
}

function RouteMap({
  journey,
}: {
  journey: RouteJourney;
}) {
  return (
    <div className="mate-map-grid relative h-[320px] overflow-hidden rounded-[28px] border border-black/6 bg-[#eef2f0]">
      <div className="absolute left-4 top-4 z-10 rounded-[20px] border border-white/60 bg-white/92 px-4 py-3 shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
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
          <div className="mt-5 rounded-[16px] border border-white/70 bg-white/90 px-3 py-2 shadow-[0_12px_24px_rgba(0,0,0,0.07)]">
            <p className="text-xs font-semibold text-[var(--foreground)]">{marker.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function MateTimetableView() {
  return (
    <div className="space-y-4">
      <section className="rounded-[30px] bg-[linear-gradient(135deg,#fff6e5_0%,#fff0d8_100%)] p-5 shadow-[0_22px_40px_rgba(255,154,31,0.14)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[var(--foreground-soft)]">Good morning</p>
            <h2 className="mt-2 text-[1.9rem] font-bold tracking-[-0.07em] text-[var(--foreground)]">
              {mateHero.rider}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">
              {mateHero.campus}
            </p>
          </div>
          <div className="rounded-[18px] bg-white px-4 py-3 text-right shadow-[0_12px_26px_rgba(255,154,31,0.1)]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Next ETA
            </p>
            <p className="mt-2 text-lg font-bold text-[var(--accent-deep)]">09:41</p>
          </div>
        </div>

        <div className="mt-5 rounded-[22px] bg-white/84 px-4 py-4">
          <p className="text-base font-semibold text-[var(--foreground)]">{mateHero.eta}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">{mateHero.detail}</p>
        </div>
      </section>

      <section className="space-y-4">
        {timetableTrips.map((trip) => (
          <TripCard key={trip.id} {...trip} />
        ))}
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]">
            <UsersRound className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
              Shared access
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Rider, guardian, and staff stay aligned
            </h3>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          {[
            "Guardian notifications are currently enabled.",
            "Campus coordinator receives delay and route-change notices.",
            "Boarding proof is shared from the same trip state.",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[18px] border border-black/6 bg-white px-4 py-3 text-sm leading-7 text-[var(--foreground)]"
            >
              {item}
            </div>
          ))}
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

      <section className={panelClassName("overflow-hidden p-4")}>
        <RouteMap journey={journey} />
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Route detail
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              {journey.direction}
            </h3>
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

        <div className="mt-5 space-y-3">
          {journey.stops.map((stop) => (
            <div
              key={stop.id}
              className="flex items-start gap-3 rounded-[20px] border border-black/6 bg-white px-4 py-4"
            >
              <div className={cx("mt-1 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold", stopTone(stop.state))}>
                {stop.state === "done" ? "✓" : stop.state === "active" ? "•" : "○"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[var(--foreground)]">{stop.name}</p>
                  <span className={cx("rounded-full px-3 py-1.5 text-[0.68rem] font-semibold", stopTone(stop.state))}>
                    {stop.boarding}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-6 text-[var(--foreground-soft)]">{stop.address}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex gap-2">
          <button className="orange-button flex-1 rounded-[18px] px-4 py-3 text-sm font-semibold">
            Share live ETA
          </button>
          <Link
            href="/mate/alerts"
            className="flex items-center justify-center rounded-[18px] border border-black/6 bg-white px-4 py-3 text-sm font-semibold text-[var(--foreground)]"
          >
            Alerts
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
              Notification center
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Keep everyone on the same route state
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
              <span className="text-xs font-semibold text-[var(--foreground-soft)]">{alert.timestamp}</span>
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
              Preferences
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Notification rhythm
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
                <p className="mt-2 text-xs leading-6 text-[var(--foreground-soft)]">{preference.detail}</p>
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
      <section className="rounded-[30px] bg-[linear-gradient(135deg,#fff6e7_0%,#fff0db_100%)] p-5 shadow-[0_22px_40px_rgba(255,154,31,0.14)]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
          Shared visibility
        </p>
        <h2 className="mt-3 text-[1.9rem] font-bold tracking-[-0.07em] text-[var(--foreground)]">
          One route view across rider, guardian, and staff
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
          Mate is not only a rider tool. It is the shared mobile surface that keeps the
          people waiting on the ride aligned to the same operating state.
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

      <section className={panelClassName("p-5")}>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
              Access tools
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              What guardians can do
            </h3>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {[
            "Open the same live route map the rider sees.",
            "Receive boarding proof without calling the driver.",
            "Share service issues with the campus-side operator contact.",
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-[18px] border border-black/6 bg-white px-4 py-3"
            >
              <ChevronRight className="mt-0.5 h-5 w-5 text-[var(--accent-deep)]" />
              <p className="text-sm leading-7 text-[var(--foreground)]">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
