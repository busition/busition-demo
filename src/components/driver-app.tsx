"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BusFront,
  CheckCheck,
  CircleUserRound,
  Clock3,
  LocateFixed,
  ShieldCheck,
  TriangleAlert,
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
    "rounded-[28px] border border-black/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,248,246,0.96)_100%)] shadow-[0_20px_50px_rgba(24,24,24,0.08)]",
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

function RouteMap() {
  return (
    <div className="driver-map-grid relative h-[320px] overflow-hidden rounded-[28px] border border-black/6 bg-[#eef2f0]">
      <div className="absolute left-4 top-4 z-10 rounded-[20px] border border-white/70 bg-white/92 px-4 py-3 shadow-[0_12px_26px_rgba(0,0,0,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
          Live navigation
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
          <div className="mt-5 rounded-[16px] border border-white/70 bg-white/90 px-3 py-2 shadow-[0_12px_24px_rgba(0,0,0,0.07)]">
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
          ? "border-[rgba(255,154,31,0.24)] bg-[#fff8ef] shadow-[0_16px_28px_rgba(255,154,31,0.08)]"
          : "border-black/6 bg-white",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-base font-bold text-[var(--foreground)]">{rider.name}</p>
          <p className="mt-2 text-xs leading-6 text-[var(--foreground-soft)]">{rider.note}</p>
        </div>
        <span className={cx("rounded-full px-3 py-2 text-[0.68rem] font-semibold whitespace-nowrap", riderTone(rider.state))}>
          {rider.state}
        </span>
      </div>
    </button>
  );
}

export function DriverTodayView() {
  return (
    <div className="space-y-4">
      <section className="rounded-[30px] bg-[linear-gradient(135deg,#fff6e7_0%,#fff0d8_100%)] p-5 shadow-[0_22px_40px_rgba(255,154,31,0.14)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[var(--foreground-soft)]">Signed in</p>
            <h2 className="mt-2 text-[1.9rem] font-bold tracking-[-0.07em] text-[var(--foreground)]">
              {driverShift.driverName}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">
              {driverShift.routeName}
            </p>
          </div>
          <div className="rounded-[18px] bg-white px-4 py-3 text-right shadow-[0_12px_26px_rgba(255,154,31,0.1)]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Shift
            </p>
            <p className="mt-2 text-sm font-bold text-[var(--accent-deep)]">{driverShift.shiftWindow}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[22px] bg-white/84 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Next stop
            </p>
            <p className="mt-2 text-lg font-bold text-[var(--foreground)]">{driverShift.nextStop}</p>
            <p className="mt-2 text-sm text-[var(--foreground-soft)]">
              ETA {driverShift.nextStopEta}
            </p>
          </div>
          <div className="rounded-[22px] bg-white/84 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Vehicle
            </p>
            <p className="mt-2 text-lg font-bold text-[var(--foreground)]">{driverShift.vehicle}</p>
            <p className="mt-2 text-sm text-[var(--foreground-soft)]">{driverShift.seats}</p>
          </div>
        </div>
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]">
            <BusFront className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
              Trip summary
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Route-first driving surface
            </h3>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {[
            `Departure ${driverShift.startTime} from ${driverStops[0]?.name}`,
            `Current stop is ${driverShift.nextStop}`,
            `${driverShift.seats} currently synced with console`,
          ].map((item) => (
            <div
              key={item}
              className="rounded-[18px] border border-black/6 bg-white px-4 py-3 text-sm leading-7 text-[var(--foreground)]"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link
            href="/driver/route"
            className="orange-button rounded-[18px] px-4 py-3 text-center text-sm font-semibold"
          >
            Open route
          </Link>
          <Link
            href="/driver/boarding"
            className="rounded-[18px] border border-black/6 bg-white px-4 py-3 text-center text-sm font-semibold text-[var(--foreground)]"
          >
            Open boarding
          </Link>
        </div>
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]">
            <Clock3 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
              Quick actions
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              What drivers need most
            </h3>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          {driverQuickActions.map((item) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-[18px] border border-black/6 bg-white px-4 py-3"
            >
              <p className="text-sm font-semibold text-[var(--foreground)]">{item}</p>
              <ArrowRight className="h-4 w-4 text-[var(--accent-deep)]" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function DriverRouteView() {
  return (
    <div className="space-y-4">
      <section className={panelClassName("overflow-hidden p-4")}>
        <RouteMap />
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Stop sequence
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              {driverShift.routeName}
            </h3>
          </div>
          <div className="rounded-[18px] bg-[#f5f5f2] px-4 py-3 text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Status
            </p>
            <p className="mt-2 text-sm font-bold text-[var(--accent-deep)]">{driverShift.status}</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {driverStops.map((stop) => (
            <div
              key={stop.id}
              className="flex items-start gap-3 rounded-[20px] border border-black/6 bg-white px-4 py-4"
            >
              <div className={cx("mt-1 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold", stopTone(stop.state))}>
                {stop.state === "completed" ? "✓" : stop.state === "current" ? "•" : "○"}
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

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link
            href="/driver/boarding"
            className="orange-button rounded-[18px] px-4 py-3 text-center text-sm font-semibold"
          >
            Open boarding
          </Link>
          <button className="rounded-[18px] bg-[#ff5a4e] px-4 py-3 text-sm font-semibold text-white">
            End trip
          </button>
        </div>
      </section>
    </div>
  );
}

export function DriverBoardingView() {
  const [activeRiderId, setActiveRiderId] = useState(boardingRiders[0]?.id ?? "");
  const activeRider = boardingRiders.find((rider) => rider.id === activeRiderId) ?? boardingRiders[0];

  return (
    <div className="space-y-4">
      <section className="rounded-[30px] bg-[linear-gradient(135deg,#fff6e7_0%,#fff0d8_100%)] p-5 shadow-[0_22px_40px_rgba(255,154,31,0.14)]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
          Current stop
        </p>
        <h2 className="mt-3 text-[1.9rem] font-bold tracking-[-0.07em] text-[var(--foreground)]">
          {driverShift.nextStop}
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
          Confirm riders quickly, recover from scan failures, and keep guardian notifications accurate.
        </p>
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]">
            <UsersRound className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
              Rider roster
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Stop-side confirmation
            </h3>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {boardingRiders.map((rider) => (
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
      <section className={panelClassName("p-5")}>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]">
            <CircleUserRound className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
              Driver profile
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              {driverShift.driverName}
            </h2>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            { label: "Email", value: driverProfile.email },
            { label: "Company", value: driverProfile.company },
            { label: "Phone", value: driverProfile.phone },
            { label: "Vehicle code", value: driverShift.vehicleCode },
          ].map((item) => (
            <div key={item.label} className="rounded-[18px] bg-[#f6f5ef] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={panelClassName("p-5")}>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
              Daily readiness
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Vehicle and shift checks
            </h3>
          </div>
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
              Live notices
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Shift alerts and support
            </h3>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {driverNotices.map((notice) => (
            <div
              key={notice.id}
              className="rounded-[20px] border border-black/6 bg-white px-4 py-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-[var(--foreground)]">{notice.title}</p>
                <span className={cx("rounded-full px-3 py-2 text-[0.68rem] font-semibold", notice.tone)}>
                  Notice
                </span>
              </div>
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
    </div>
  );
}
