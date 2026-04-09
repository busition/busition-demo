"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BusFront,
  CircleUserRound,
  LocateFixed,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import {
  boardingRiders,
  driverMapMarkers,
  driverNotices,
  driverProfile,
  driverQuickActions,
  driverRoutePath,
  driverShift,
  driverStops,
  type DriverRider,
  type RiderBoardingState,
} from "@/lib/driver-data";

function cx(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function panelClassName(className = "") {
  return cx(
    "rounded-[28px] border border-black/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,248,246,0.96)_100%)] shadow-[0_16px_36px_rgba(24,24,24,0.06)]",
    className,
  );
}

function stopTone(state: "completed" | "current" | "upcoming") {
  switch (state) {
    case "completed":
      return "bg-[#eceef1] text-[var(--foreground-soft)]";
    case "current":
      return "bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]";
    case "upcoming":
      return "bg-[rgba(25,184,146,0.12)] text-[var(--success)]";
  }
}

function riderTone(state: RiderBoardingState) {
  switch (state) {
    case "Boarded":
      return "bg-[rgba(25,184,146,0.12)] text-[var(--success)]";
    case "Waiting":
      return "bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]";
    case "Manual check":
      return "bg-[#f1f0ea] text-[var(--foreground-soft)]";
    case "No show":
      return "bg-[rgba(245,91,78,0.1)] text-[#d14e42]";
  }
}

function getCurrentStop() {
  return driverStops.find((stop) => stop.state === "current") ?? driverStops[0];
}

function getNextStop() {
  return driverStops.find((stop) => stop.state === "upcoming") ?? driverStops.at(-1);
}

function getPriorityRiders() {
  const order: Record<RiderBoardingState, number> = {
    Waiting: 0,
    "Manual check": 1,
    "No show": 2,
    Boarded: 3,
  };

  return [...boardingRiders].sort((a, b) => order[a.state] - order[b.state]);
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

function RouteMap() {
  return (
    <div className="driver-map-grid relative h-[320px] overflow-hidden rounded-[28px] border border-black/6 bg-[#eef2f0]">
      <div className="absolute left-4 top-4 z-10 rounded-[20px] border border-white/70 bg-white/92 px-4 py-3 shadow-[0_10px_24px_rgba(0,0,0,0.06)]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
          Live route
        </p>
        <p className="mt-2 text-lg font-bold text-[var(--foreground)]">{driverShift.routeName}</p>
        <p className="mt-1 text-sm text-[var(--foreground-soft)]">
          Next stop in {driverShift.nextStopEta}
        </p>
      </div>

      {driverRoutePath.map((segment, index) => (
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

      {driverMapMarkers.map((marker) => (
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

function RiderRow({
  rider,
  selected,
  onClick,
}: {
  rider: DriverRider;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "w-full rounded-[22px] border px-4 py-4 text-left transition-all",
        selected
          ? "border-[rgba(255,154,31,0.24)] bg-[#fff8ef] shadow-[0_14px_26px_rgba(255,154,31,0.08)]"
          : "border-black/6 bg-white",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-base font-bold text-[var(--foreground)]">{rider.name}</p>
          <p className="mt-2 text-xs leading-6 text-[var(--foreground-soft)]">{rider.note}</p>
        </div>
        <span
          className={cx(
            "rounded-full px-3 py-2 text-[0.68rem] font-semibold whitespace-nowrap",
            riderTone(rider.state),
          )}
        >
          {rider.state}
        </span>
      </div>
    </button>
  );
}

export function DriverTodayView() {
  const currentStop = getCurrentStop();
  const nextStop = getNextStop();
  const waitingCount = boardingRiders.filter((rider) => rider.state === "Waiting").length;
  const manualCount = boardingRiders.filter((rider) => rider.state === "Manual check").length;
  const noShowCount = boardingRiders.filter((rider) => rider.state === "No show").length;
  const urgentNotice = driverNotices[0];

  return (
    <div className="space-y-4">
      <section className="rounded-[30px] bg-[linear-gradient(135deg,#fff6e7_0%,#fff0d8_100%)] p-5 shadow-[0_18px_34px_rgba(255,154,31,0.12)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Driving now
            </p>
            <h2 className="mt-3 text-[1.9rem] font-bold tracking-[-0.07em] text-[var(--foreground)]">
              {driverShift.nextStop}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">
              ETA {driverShift.nextStopEta} · {driverShift.routeName}
            </p>
          </div>
          <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-[var(--accent-deep)] shadow-[0_10px_20px_rgba(255,154,31,0.1)]">
            {driverShift.status}
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[22px] bg-white/88 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Current stop
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{currentStop?.name}</p>
            <p className="mt-2 text-xs text-[var(--foreground-soft)]">{currentStop?.boarding}</p>
          </div>
          <div className="rounded-[22px] bg-white/88 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Up next
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{nextStop?.name}</p>
            <p className="mt-2 text-xs text-[var(--foreground-soft)]">{driverShift.seats}</p>
          </div>
          <div className="rounded-[22px] bg-white/88 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Queue
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
              {waitingCount + manualCount + noShowCount} need attention
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <ActionLink href="/driver/boarding" label="Boarding" emphasis />
          <ActionLink href="/driver/route" label="Route" />
          <ActionLink href="/driver/profile" label="Support" />
        </div>
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]">
            <BusFront className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Focus now
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              What the driver needs next
            </h3>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[20px] border border-black/6 bg-white px-4 py-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">Open boarding fast</p>
            <p className="mt-2 text-xs leading-6 text-[var(--foreground-soft)]">
              Confirm waiting riders before leaving the stop.
            </p>
          </div>
          <div className="rounded-[20px] border border-black/6 bg-white px-4 py-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">Keep route visible</p>
            <p className="mt-2 text-xs leading-6 text-[var(--foreground-soft)]">
              Current stop and next stop stay readable while driving.
            </p>
          </div>
          <div className="rounded-[20px] border border-black/6 bg-white px-4 py-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">Check support only when needed</p>
            <p className="mt-2 text-xs leading-6 text-[var(--foreground-soft)]">
              Reach notices, contacts, and readiness without leaving the trip flow.
            </p>
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
              Attention queue
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Handle exceptions before they slow the route
            </h3>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[18px] border border-black/6 bg-white px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Waiting
            </p>
            <p className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              {waitingCount}
            </p>
          </div>
          <div className="rounded-[18px] border border-black/6 bg-white px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Manual check
            </p>
            <p className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              {manualCount}
            </p>
          </div>
          <div className="rounded-[18px] border border-black/6 bg-white px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              No show
            </p>
            <p className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              {noShowCount}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-[20px] border border-black/6 bg-white px-4 py-4">
          <p className="text-sm font-semibold text-[var(--foreground)]">{urgentNotice.title}</p>
          <p className="mt-2 text-sm leading-7 text-[var(--foreground-soft)]">{urgentNotice.detail}</p>
        </div>
      </section>
    </div>
  );
}

export function DriverRouteView() {
  const currentStop = getCurrentStop();
  const nextStop = getNextStop();

  return (
    <div className="space-y-4">
      <section className={panelClassName("p-5")}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Route focus
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              {driverShift.routeName}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
              Keep the current stop and next stop visible while the route stays active.
            </p>
          </div>
          <span className="rounded-[18px] bg-[#f5f5f2] px-4 py-3 text-sm font-bold text-[var(--accent-deep)]">
            {driverShift.status}
          </span>
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
              Up next
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{nextStop?.name}</p>
            <p className="mt-2 text-xs text-[var(--foreground-soft)]">ETA {driverShift.nextStopEta}</p>
          </div>
          <div className="rounded-[18px] border border-black/6 bg-white px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Vehicle
            </p>
            <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{driverShift.vehicle}</p>
            <p className="mt-2 text-xs text-[var(--foreground-soft)]">{driverShift.seats}</p>
          </div>
        </div>
      </section>

      <section className={panelClassName("overflow-hidden p-4")}>
        <RouteMap />
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Stops
            </p>
            <h3 className="mt-2 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Stay ahead of the next stop
            </h3>
          </div>
          <LocateFixed className="h-5 w-5 text-[var(--foreground-soft)]" />
        </div>

        <div className="mt-5 space-y-3">
          {driverStops.map((stop) => {
            const active = stop.state === "current";

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
                  {stop.state === "completed" ? "✓" : stop.state === "current" ? "•" : "○"}
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
                  <p className="mt-2 text-xs leading-6 text-[var(--foreground-soft)]">{stop.address}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <ActionLink href="/driver/boarding" label="Open boarding" emphasis />
          <ActionLink href="/driver/profile" label="Report issue" />
        </div>
      </section>
    </div>
  );
}

export function DriverBoardingView() {
  const priorityRiders = getPriorityRiders();
  const [filter, setFilter] = useState<"All" | RiderBoardingState>("All");
  const visibleRiders =
    filter === "All"
      ? priorityRiders
      : priorityRiders.filter((rider) => rider.state === filter);
  const defaultRider =
    visibleRiders[0] ??
    priorityRiders.find((rider) => rider.state !== "Boarded") ??
    priorityRiders[0];
  const [activeRiderId, setActiveRiderId] = useState(defaultRider?.id ?? "");
  const activeRider =
    visibleRiders.find((rider) => rider.id === activeRiderId) ??
    priorityRiders.find((rider) => rider.id === activeRiderId) ??
    defaultRider;

  const queueCounts = {
    Waiting: boardingRiders.filter((rider) => rider.state === "Waiting").length,
    "Manual check": boardingRiders.filter((rider) => rider.state === "Manual check").length,
    "No show": boardingRiders.filter((rider) => rider.state === "No show").length,
    Boarded: boardingRiders.filter((rider) => rider.state === "Boarded").length,
  };

  return (
    <div className="space-y-4">
      <section className="rounded-[30px] bg-[linear-gradient(135deg,#fff6e7_0%,#fff0d8_100%)] p-5 shadow-[0_18px_34px_rgba(255,154,31,0.12)]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
          Current stop
        </p>
        <h2 className="mt-3 text-[1.9rem] font-bold tracking-[-0.07em] text-[var(--foreground)]">
          {driverShift.nextStop}
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          {Object.entries(queueCounts).map(([label, value]) => (
            <div key={label} className="rounded-[22px] bg-white/88 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
                {label}
              </p>
              <p className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Queue
            </p>
            <h3 className="mt-2 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Work from the highest priority first
            </h3>
          </div>
          <UsersRound className="h-5 w-5 text-[var(--foreground-soft)]" />
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {(["All", "Waiting", "Manual check", "No show", "Boarded"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setFilter(item);
                const nextVisible =
                  item === "All"
                    ? priorityRiders
                    : priorityRiders.filter((rider) => rider.state === item);
                setActiveRiderId(nextVisible[0]?.id ?? "");
              }}
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

        <div className="mt-5 space-y-3">
          {visibleRiders.map((rider) => (
            <RiderRow
              key={rider.id}
              rider={rider}
              selected={activeRider?.id === rider.id}
              onClick={() => setActiveRiderId(rider.id)}
            />
          ))}
        </div>
      </section>

      {activeRider ? (
        <section className={panelClassName("p-5")}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
                Selected rider
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                {activeRider.name}
              </h3>
            </div>
            <span className={cx("rounded-full px-3 py-2 text-xs font-semibold", riderTone(activeRider.state))}>
              {activeRider.state}
            </span>
          </div>

          <div className="mt-5 rounded-[18px] bg-[#f6f5ef] px-4 py-4">
            <p className="text-sm leading-7 text-[var(--foreground)]">{activeRider.note}</p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button className="orange-button rounded-[18px] px-4 py-3 text-sm font-semibold">
              Confirm boarded
            </button>
            <button className="rounded-[18px] border border-black/6 bg-white px-4 py-3 text-sm font-semibold text-[var(--foreground)]">
              Manual check
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export function DriverProfileView() {
  return (
    <div className="space-y-4">
      <section className="rounded-[30px] bg-[linear-gradient(135deg,#fff6e7_0%,#fff0d8_100%)] p-5 shadow-[0_18px_34px_rgba(255,154,31,0.12)]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
          Support
        </p>
        <h2 className="mt-3 text-[1.9rem] font-bold tracking-[-0.07em] text-[var(--foreground)]">
          {driverShift.driverName}
        </h2>
        <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">
          {driverProfile.company} · {driverProfile.phone}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <ActionLink href="/driver/route" label="Back to route" />
          <ActionLink href="/driver" label="Today view" emphasis />
        </div>
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Readiness
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Vehicle and shift checks
            </h3>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            { label: "Email", value: driverProfile.email },
            { label: "Vehicle code", value: driverShift.vehicleCode },
            { label: "Vehicle", value: driverShift.vehicle },
            { label: "Plate", value: driverShift.plate },
          ].map((item) => (
            <div key={item.label} className="rounded-[18px] bg-[#f6f5ef] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          {driverProfile.checkItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-[18px] border border-black/6 bg-white px-4 py-3"
            >
              <p className="text-sm font-semibold text-[var(--foreground)]">{item.label}</p>
              <p className="text-xs font-semibold text-[var(--foreground-soft)]">{item.status}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Support notices
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              What may interrupt the trip
            </h3>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {driverNotices.map((notice) => (
            <div
              key={notice.id}
              className="rounded-[20px] border border-black/6 bg-white px-4 py-4"
            >
              <p className="text-sm font-bold text-[var(--foreground)]">{notice.title}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{notice.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex gap-2">
          <button className="orange-button flex-1 rounded-[18px] px-4 py-3 text-sm font-semibold">
            Contact support
          </button>
          <button className="rounded-[18px] border border-black/6 bg-white px-4 py-3 text-sm font-semibold text-[var(--foreground)]">
            Logout
          </button>
        </div>
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]">
            <CircleUserRound className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Certifications
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Route and support coverage
            </h3>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {driverProfile.certifications.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[rgba(255,154,31,0.18)] bg-[rgba(255,154,31,0.08)] px-3 py-2 text-xs font-semibold text-[var(--accent-deep)]"
            >
              {item}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
