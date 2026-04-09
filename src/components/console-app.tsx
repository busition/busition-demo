"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Building2,
  CalendarRange,
  CheckCheck,
  Clock3,
  Search,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import {
  consoleMetrics,
  dashboardAlerts,
  driverRoster,
  organizations,
  routeAssignments,
  scheduleRoutes,
  weekDays,
  type DriverRecord,
  type DriverStatus,
  type MapMarker,
  type MapSegment,
  type OrganizationRecord,
  type OrganizationStatus,
  type RouteAssignment,
  type RouteStatus,
  type ScheduleRoute,
  type WeekDay,
} from "@/lib/console-data";

function cx(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function surfaceClassName(className = "") {
  return cx(
    "rounded-[28px] border border-black/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(250,249,245,0.96)_100%)] shadow-[0_24px_60px_rgba(32,32,32,0.08)]",
    className,
  );
}

function routeStatusTone(status: RouteStatus) {
  switch (status) {
    case "Needs driver":
      return "border-[rgba(255,154,31,0.26)] bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]";
    case "Ready":
      return "border-[rgba(25,184,146,0.2)] bg-[rgba(25,184,146,0.1)] text-[var(--success)]";
    case "Live now":
      return "border-[rgba(255,132,0,0.28)] bg-[rgba(255,132,0,0.12)] text-[var(--accent-deep)]";
    case "Delayed":
      return "border-[rgba(245,91,78,0.18)] bg-[rgba(245,91,78,0.1)] text-[#d14e42]";
  }
}

function driverStatusTone(status: DriverStatus) {
  switch (status) {
    case "Available":
      return "border-[rgba(25,184,146,0.2)] bg-[rgba(25,184,146,0.1)] text-[var(--success)]";
    case "On trip":
      return "border-[rgba(255,132,0,0.22)] bg-[rgba(255,132,0,0.12)] text-[var(--accent-deep)]";
    case "Break":
      return "border-black/8 bg-[#f1f0ea] text-[var(--foreground-soft)]";
    case "Review":
      return "border-[rgba(245,91,78,0.18)] bg-[rgba(245,91,78,0.1)] text-[#d14e42]";
  }
}

function organizationTone(status: OrganizationStatus) {
  switch (status) {
    case "Pilot live":
      return "border-[rgba(25,184,146,0.2)] bg-[rgba(25,184,146,0.1)] text-[var(--success)]";
    case "Ready to onboard":
      return "border-[rgba(255,154,31,0.26)] bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]";
    case "Expansion":
      return "border-[rgba(255,132,0,0.22)] bg-[rgba(255,132,0,0.12)] text-[var(--accent-deep)]";
  }
}

function alertSeverityTone(severity: string) {
  switch (severity) {
    case "High":
      return "border-[rgba(245,91,78,0.18)] bg-[rgba(245,91,78,0.1)] text-[#d14e42]";
    case "Medium":
      return "border-[rgba(255,154,31,0.26)] bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]";
    default:
      return "border-black/8 bg-[#f1f0ea] text-[var(--foreground-soft)]";
  }
}

function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-[760px]">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.06em] text-[var(--foreground)] sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)] sm:text-base">
          {description}
        </p>
      </div>

      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}

function StatusBadge({
  label,
  tone,
}: {
  label: string;
  tone: string;
}) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-2 text-xs font-semibold ${tone}`}>
      {label}
    </span>
  );
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className={surfaceClassName("p-5")}>
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
        {label}
      </p>
      <p className="mt-4 text-4xl font-bold tracking-[-0.08em] text-[var(--foreground)]">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">{detail}</p>
    </div>
  );
}

function SummaryStat({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="rounded-[20px] border border-black/6 bg-white px-4 py-4">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
        {value}
      </p>
      {detail ? (
        <p className="mt-2 text-xs leading-6 text-[var(--foreground-soft)]">{detail}</p>
      ) : null}
    </div>
  );
}

function MapCanvas({
  label,
  detail,
  segments,
  markers,
}: {
  label: string;
  detail: string;
  segments: MapSegment[];
  markers: MapMarker[];
}) {
  return (
    <div className="console-grid-map relative min-h-[380px] overflow-hidden rounded-[28px] border border-black/6 bg-[#eef2ed]">
      <div className="absolute left-4 top-4 z-10 rounded-[20px] bg-white/92 px-4 py-3 shadow-[0_14px_30px_rgba(0,0,0,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
          Live map
        </p>
        <p className="mt-2 text-lg font-bold text-[var(--foreground)]">{label}</p>
        <p className="mt-1 text-sm text-[var(--foreground-soft)]">{detail}</p>
      </div>

      {segments.map((segment, index) => (
        <div
          key={`${segment.left}-${segment.top}-${index}`}
          className="absolute h-[9px] rounded-full bg-[linear-gradient(90deg,#ffb348_0%,#ff8a00_100%)] opacity-90 shadow-[0_6px_16px_rgba(255,138,0,0.25)]"
          style={{
            left: segment.left,
            top: segment.top,
            width: segment.width,
            transform: `rotate(${segment.rotate})`,
            transformOrigin: "left center",
          }}
        />
      ))}

      {markers.map((marker) => (
        <div
          key={`${marker.label}-${marker.left}-${marker.top}`}
          className="absolute"
          style={{ left: marker.left, top: marker.top }}
        >
          <div
            className={cx(
              "absolute -left-2 -top-2 h-5 w-5 rounded-full border-4 border-white shadow-[0_8px_18px_rgba(0,0,0,0.12)]",
              marker.hub ? "bg-[var(--accent)]" : "bg-[#3e3f45]",
            )}
          />
          <div className="mt-5 min-w-[132px] rounded-[18px] border border-white/70 bg-white/92 px-3 py-2 shadow-[0_14px_30px_rgba(0,0,0,0.08)]">
            <p className="text-sm font-semibold text-[var(--foreground)]">{marker.label}</p>
            {marker.time ? (
              <p className="mt-1 text-xs font-semibold text-[var(--foreground-soft)]">
                {marker.time}
              </p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

function getCurrentDriver(route: RouteAssignment, assignments: Record<string, string | null>) {
  const assignedId = assignments[route.id];
  return driverRoster.find((driver) => driver.id === assignedId) ?? null;
}

function getDriverMatchScore(route: RouteAssignment, driver: DriverRecord) {
  let score = 0;

  if (driver.status === "Available") {
    score += 5;
  } else if (driver.status === "Break") {
    score += 2;
  } else if (driver.status === "Review") {
    score += 1;
  }

  if (driver.zone === route.zone) {
    score += 3;
  }

  if (driver.vehicle === route.vehicle) {
    score += 2;
  }

  if (driver.assignedRoute === "Standby coverage") {
    score += 1;
  }

  return score;
}

function getDriverMatchReason(route: RouteAssignment, driver: DriverRecord) {
  if (driver.zone === route.zone) {
    return "Same service zone";
  }

  if (driver.assignedRoute === "Standby coverage") {
    return "Standby coverage";
  }

  if (driver.status === "Available") {
    return "Available now";
  }

  if (driver.status === "Break") {
    return "Available soon";
  }

  return "Needs review";
}

function getScheduleRoute(routeId: string) {
  return scheduleRoutes.find((route) => route.id === routeId) ?? scheduleRoutes[0];
}

function getDaySchedules(route: ScheduleRoute, day: WeekDay) {
  const daySchedules = route.days[day];
  return daySchedules.length > 0 ? daySchedules : route.days.Mon;
}

function DriverListRow({
  driver,
  active,
  onClick,
}: {
  driver: DriverRecord;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "grid w-full gap-4 rounded-[22px] border px-4 py-4 text-left transition-all md:grid-cols-[1fr_0.65fr_0.45fr]",
        active
          ? "border-[rgba(255,154,31,0.26)] bg-[#fff8ef] shadow-[0_18px_34px_rgba(255,154,31,0.08)]"
          : "border-black/6 bg-white",
      )}
    >
      <div>
        <p className="text-lg font-bold text-[var(--foreground)]">{driver.name}</p>
        <p className="mt-1 text-sm text-[var(--foreground-soft)]">{driver.assignedRoute}</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
          Zone
        </p>
        <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{driver.zone}</p>
      </div>
      <div className="flex items-center md:justify-end">
        <StatusBadge label={driver.status} tone={driverStatusTone(driver.status)} />
      </div>
    </button>
  );
}

function OrganizationCard({
  organization,
  active,
  onClick,
}: {
  organization: OrganizationRecord;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "w-full rounded-[24px] border p-5 text-left transition-all",
        active
          ? "border-[rgba(255,154,31,0.26)] bg-[#fff8ef] shadow-[0_18px_36px_rgba(255,154,31,0.08)]"
          : "border-black/6 bg-white",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xl font-bold tracking-[-0.04em] text-[var(--foreground)]">
            {organization.name}
          </p>
          <p className="mt-2 text-sm text-[var(--foreground-soft)]">{organization.type}</p>
        </div>
        <StatusBadge
          label={organization.status}
          tone={organizationTone(organization.status)}
        />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <SummaryStat label="Code" value={organization.code} />
        <SummaryStat label="Routes" value={organization.routes.toString()} />
        <SummaryStat label="Riders" value={organization.riders} />
      </div>
    </button>
  );
}

export function ConsoleDashboardView() {
  const criticalRoutes = routeAssignments.filter(
    (route) => route.status === "Needs driver" || route.status === "Delayed",
  );
  const liveRoutes = routeAssignments.filter(
    (route) => route.status === "Live now" || route.status === "Ready",
  );
  const actionQueue = [
    "Reassign Hongik Univ to Gangnam 1 before 07:20",
    "Confirm the replacement vehicle for Pangyo to Gangnam 2",
    "Review overnight guardian groups added to Campus Connect",
    "Publish the latest boarding digest for Sunrise Academy",
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        eyebrow="Operations overview"
        title="See route risk, action queues, and live service health in one pass."
        description="Busition Console should surface the next operational decision without forcing the desk to scan every page."
        actions={
          <Link
            href="/console/assignments"
            className="orange-button rounded-[18px] px-5 py-3 text-sm font-semibold"
          >
            Open coverage desk
          </Link>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {consoleMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className={surfaceClassName("p-6")}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                Critical queue
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                Routes that need action first
              </h3>
            </div>
            <Link
              href="/console/assignments"
              className="text-sm font-semibold text-[var(--accent-deep)]"
            >
              Open coverage desk
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {criticalRoutes.map((route) => (
              <div
                key={route.id}
                className="rounded-[22px] border border-black/6 bg-white px-4 py-4"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge label={route.status} tone={routeStatusTone(route.status)} />
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
                    {route.departureTime}
                  </span>
                </div>
                <p className="mt-4 text-lg font-bold text-[var(--foreground)]">{route.name}</p>
                <p className="mt-2 text-sm text-[var(--foreground-soft)]">
                  {route.departure} {" -> "} {route.arrival}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <SummaryStat label="Driver" value={route.assignedDriverId ? "Assigned" : "Open"} />
                  <SummaryStat label="Load" value={route.load} />
                  <SummaryStat label="Risk" value={route.health} />
                </div>
                <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">{route.notes}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className={surfaceClassName("p-6")}>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[rgba(255,154,31,0.1)] text-[var(--accent-deep)]">
                  <CheckCheck className="h-6 w-6" />
                </div>
                <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                  Action queue
                </p>
                  <h3 className="mt-1 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                    What the desk should do next
                  </h3>
                </div>
              </div>

            <div className="mt-6 space-y-3">
              {actionQueue.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[20px] border border-black/6 bg-white px-4 py-3"
                >
                  <CheckCheck className="mt-0.5 h-5 w-5 text-[var(--accent-deep)]" />
                  <p className="text-sm leading-7 text-[var(--foreground)]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={surfaceClassName("p-6")}>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[rgba(255,154,31,0.1)] text-[var(--accent-deep)]">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                  Open alerts
                </p>
                <h3 className="mt-1 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                  Exceptions already in motion
                </h3>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {dashboardAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="rounded-[22px] border border-black/6 bg-white px-4 py-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <StatusBadge label={alert.severity} tone={alertSeverityTone(alert.severity)} />
                    <span className="text-xs font-semibold text-[var(--foreground-soft)]">
                      {alert.time}
                    </span>
                  </div>
                  <p className="mt-4 text-lg font-bold text-[var(--foreground)]">{alert.title}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--foreground-soft)]">
                    {alert.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={surfaceClassName("p-6")}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
              Live operations
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
              Routes currently stable
            </h3>
          </div>
          <Link href="/console/drivers" className="text-sm font-semibold text-[var(--accent-deep)]">
            View drivers
          </Link>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          {liveRoutes.map((route) => (
            <div
              key={route.id}
              className="rounded-[22px] border border-black/6 bg-white px-4 py-4"
            >
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge label={route.status} tone={routeStatusTone(route.status)} />
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
                  {route.departureTime}
                </span>
              </div>
              <p className="mt-4 text-lg font-bold text-[var(--foreground)]">{route.name}</p>
              <p className="mt-2 text-sm text-[var(--foreground-soft)]">
                {route.organization} · {route.load}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ConsoleAssignmentsView() {
  const initialAssignments = Object.fromEntries(
    routeAssignments.map((route) => [route.id, route.assignedDriverId]),
  ) as Record<string, string | null>;
  const [filter, setFilter] = useState<"All" | RouteStatus>("All");
  const [assignments, setAssignments] = useState<Record<string, string | null>>(initialAssignments);
  const [activeRouteId, setActiveRouteId] = useState(routeAssignments[0]?.id ?? "");
  const activeRoute =
    routeAssignments.find((route) => route.id === activeRouteId) ?? routeAssignments[0];
  const filteredRoutes =
    filter === "All" ? routeAssignments : routeAssignments.filter((route) => route.status === filter);
  const currentDriver = activeRoute ? getCurrentDriver(activeRoute, assignments) : null;
  const candidateDrivers = driverRoster
    .filter((driver) => driver.status !== "On trip")
    .sort((a, b) => getDriverMatchScore(activeRoute, b) - getDriverMatchScore(activeRoute, a));
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(
    currentDriver?.id ?? candidateDrivers[0]?.id ?? null,
  );
  const selectedDriver =
    candidateDrivers.find((driver) => driver.id === selectedDriverId) ?? candidateDrivers[0] ?? null;

  function handleRouteSelect(routeId: string) {
    const route = routeAssignments.find((item) => item.id === routeId) ?? routeAssignments[0];
    const nextCandidates = driverRoster
      .filter((driver) => driver.status !== "On trip")
      .sort((a, b) => getDriverMatchScore(route, b) - getDriverMatchScore(route, a));
    const assignedId = assignments[route.id];

    setActiveRouteId(route.id);
    setSelectedDriverId(assignedId ?? nextCandidates[0]?.id ?? null);
  }

  function handleAssign() {
    if (!activeRoute || !selectedDriverId) {
      return;
    }

    setAssignments((current) => ({
      ...current,
      [activeRoute.id]: selectedDriverId,
    }));
  }

  function handleUnassign() {
    if (!activeRoute) {
      return;
    }

    setAssignments((current) => ({
      ...current,
      [activeRoute.id]: null,
    }));
  }

  const openCount = routeAssignments.filter((route) => route.status === "Needs driver").length;
  const delayedCount = routeAssignments.filter((route) => route.status === "Delayed").length;
  const availableCount = driverRoster.filter((driver) => driver.status === "Available").length;

  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        eyebrow="Coverage desk"
        title="Move from route risk to confirmed coverage in one workflow."
        description="Route queue, recommended drivers, and assignment actions stay aligned on the same screen."
        actions={
          <button className="orange-button rounded-[18px] px-5 py-3 text-sm font-semibold">
            Publish coverage plan
          </button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryStat label="Open coverage gaps" value={openCount.toString()} detail="Needs assignment" />
        <SummaryStat label="Routes at risk" value={delayedCount.toString()} detail="Needs follow-up" />
        <SummaryStat label="Drivers available now" value={availableCount.toString()} detail="Immediately assignable" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.96fr]">
        <div className={surfaceClassName("p-6")}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                Route queue
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                Work the highest-risk routes first
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {(["All", "Needs driver", "Ready", "Live now", "Delayed"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={cx(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    filter === item
                      ? "bg-[var(--accent)] text-white"
                      : "border border-black/6 bg-white text-[var(--foreground-soft)]",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {filteredRoutes.map((route) => {
              const active = activeRoute?.id === route.id;
              const assignedDriver = getCurrentDriver(route, assignments);

              return (
                <button
                  key={route.id}
                  type="button"
                  onClick={() => handleRouteSelect(route.id)}
                  className={cx(
                    "w-full rounded-[24px] border p-5 text-left transition-all",
                    active
                      ? "border-[rgba(255,154,31,0.24)] bg-[#fff8ef] shadow-[0_20px_40px_rgba(255,154,31,0.1)]"
                      : "border-black/6 bg-white",
                  )}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge label={route.status} tone={routeStatusTone(route.status)} />
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
                      {route.departureTime}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
                      {route.zone}
                    </span>
                  </div>

                  <p className="mt-4 text-xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                    {route.name}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
                    {route.departure} {" -> "} {route.arrival}
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <SummaryStat label="Driver" value={assignedDriver?.name ?? "Unassigned"} />
                    <SummaryStat label="Load" value={route.load} />
                    <SummaryStat label="Risk" value={route.health} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {activeRoute ? (
          <div className="grid gap-6">
            <div className={surfaceClassName("p-6")}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    Selected route
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                    {activeRoute.name}
                  </h3>
                </div>
                <StatusBadge label={activeRoute.status} tone={routeStatusTone(activeRoute.status)} />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <SummaryStat label="Organization" value={activeRoute.organization} />
                <SummaryStat label="Departure" value={`${activeRoute.departureTime} · ${activeRoute.departure}`} />
                <SummaryStat label="Vehicle" value={activeRoute.vehicle} />
                <SummaryStat label="Punctuality" value={activeRoute.punctuality} />
              </div>

              <div className="mt-6 rounded-[22px] border border-black/6 bg-[#fff8ef] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
                  Operations note
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">{activeRoute.notes}</p>
              </div>
            </div>

            <div className={surfaceClassName("p-6")}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    Suggested coverage
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                    Choose the best next driver
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleUnassign}
                  className="text-sm font-semibold text-[var(--foreground-soft)]"
                >
                  Clear assignment
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {candidateDrivers.map((driver) => (
                  <button
                    key={driver.id}
                    type="button"
                    onClick={() => setSelectedDriverId(driver.id)}
                    className={cx(
                      "w-full rounded-[22px] border px-4 py-4 text-left transition-all",
                      selectedDriver?.id === driver.id
                        ? "border-[rgba(255,154,31,0.26)] bg-[#fff8ef]"
                        : "border-black/6 bg-white",
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-lg font-bold text-[var(--foreground)]">{driver.name}</p>
                        <p className="mt-1 text-sm text-[var(--foreground-soft)]">
                          {driver.vehicle} · {driver.zone}
                        </p>
                      </div>
                      <StatusBadge label={driver.status} tone={driverStatusTone(driver.status)} />
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#f4f3ed] px-3 py-2 text-xs font-semibold text-[var(--foreground-soft)]">
                        {getDriverMatchReason(activeRoute, driver)}
                      </span>
                      <span className="rounded-full bg-[#f4f3ed] px-3 py-2 text-xs font-semibold text-[var(--foreground-soft)]">
                        Score {getDriverMatchScore(activeRoute, driver)}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{driver.note}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleAssign}
                  className="orange-button rounded-[18px] px-5 py-3 text-sm font-semibold"
                >
                  {currentDriver ? "Reassign driver" : "Assign driver"}
                </button>
                <button className="outline-button rounded-[18px] px-5 py-3 text-sm font-semibold">
                  Reserve standby
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export function ConsoleSchedulesView() {
  const [activeRouteId, setActiveRouteId] = useState(scheduleRoutes[0]?.id ?? "");
  const [activeDay, setActiveDay] = useState<WeekDay>("Wed");
  const route = getScheduleRoute(activeRouteId);
  const schedules = getDaySchedules(route, activeDay);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>(schedules[0]?.id ?? "");
  const selectedSchedule =
    schedules.find((schedule) => schedule.id === selectedScheduleId) ?? schedules[0];

  function handleRouteChange(routeId: string) {
    const nextRoute = getScheduleRoute(routeId);
    const nextSchedules = getDaySchedules(nextRoute, activeDay);
    setActiveRouteId(nextRoute.id);
    setSelectedScheduleId(nextSchedules[0]?.id ?? "");
  }

  function handleDayChange(day: WeekDay) {
    const nextSchedules = getDaySchedules(route, day);
    setActiveDay(day);
    setSelectedScheduleId(nextSchedules[0]?.id ?? "");
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        eyebrow="Schedule planning"
        title="Plan departures and publish change impact together."
        description="Route selection, day changes, map context, and publish steps stay aligned in one planning surface."
        actions={
          <button className="orange-button rounded-[18px] px-5 py-3 text-sm font-semibold">
            Save schedules
          </button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryStat label="Selected route" value={route.name} />
        <SummaryStat label="Selected day" value={activeDay} />
        <SummaryStat label="Departures" value={schedules.length.toString()} />
      </section>

      <section className={surfaceClassName("overflow-hidden p-0")}>
        <div className="grid min-h-[760px] gap-px bg-black/6 xl:grid-cols-[260px_390px_1fr]">
          <div className="bg-[linear-gradient(180deg,#ffffff_0%,#fbfaf7_100%)] p-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                Route list
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                Route schedule sets
              </h3>
            </div>

            <div className="mt-6 space-y-3">
              {scheduleRoutes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleRouteChange(item.id)}
                  className={cx(
                    "w-full rounded-[24px] border px-4 py-4 text-left transition-all",
                    item.id === route.id
                      ? "border-[rgba(255,154,31,0.26)] bg-[#fff8ef] shadow-[0_20px_40px_rgba(255,154,31,0.1)]"
                      : "border-black/6 bg-white",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-lg font-bold text-[var(--foreground)]">{item.name}</p>
                    <StatusBadge label={item.status} tone={routeStatusTone(item.status)} />
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                    {item.departure} {" -> "} {item.arrival}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
                    {item.organization}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[linear-gradient(180deg,#ffffff_0%,#fbfaf7_100%)] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                  {route.name}
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                  Scheduled departures
                </h3>
              </div>
              <Clock3 className="h-5 w-5 text-[var(--foreground-soft)]" />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {weekDays.map((day) => {
                const active = day === activeDay;

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayChange(day)}
                    className={cx(
                      "flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                      active
                        ? "bg-[var(--accent)] text-white"
                        : "border border-black/6 bg-white text-[var(--foreground-soft)]",
                    )}
                  >
                    {day[0]}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 space-y-4">
              {schedules.length > 0 ? (
                schedules.map((schedule) => {
                  const active = selectedSchedule?.id === schedule.id;

                  return (
                    <button
                      key={schedule.id}
                      type="button"
                      onClick={() => setSelectedScheduleId(schedule.id)}
                      className={cx(
                        "w-full rounded-[24px] border p-4 text-left transition-all",
                        active
                          ? "border-[rgba(255,154,31,0.26)] bg-[#fff8ef]"
                          : "border-black/6 bg-white",
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xl font-bold text-[var(--foreground)]">
                            {schedule.name}
                          </p>
                          <p className="mt-1 text-sm text-[var(--foreground-soft)]">
                            {schedule.window}
                          </p>
                        </div>
                        <span className="rounded-full bg-[#f4f3ed] px-3 py-2 text-xs font-semibold text-[var(--foreground-soft)]">
                          {schedule.capacity}
                        </span>
                      </div>

                      <div className="mt-4 space-y-2">
                        {schedule.stops.map((stop, index) => (
                          <div
                            key={`${schedule.id}-${stop.name}`}
                            className="flex items-center justify-between rounded-[16px] bg-[#fbfaf7] px-4 py-3"
                          >
                            <p className="text-sm font-semibold text-[var(--foreground)]">
                              {index + 1}. {stop.name}
                            </p>
                            <p className="text-xs font-semibold text-[var(--foreground-soft)]">
                              {stop.time}
                            </p>
                          </div>
                        ))}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="rounded-[24px] border border-dashed border-black/10 bg-white px-4 py-8 text-center text-sm text-[var(--foreground-soft)]">
                  No departures are scheduled for {activeDay}.
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#f6f7f5] p-5">
            <MapCanvas
              label={route.mapLabel}
              detail={route.detail}
              segments={route.segments}
              markers={route.markers}
            />

            {selectedSchedule ? (
              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.92fr]">
                <div className={surfaceClassName("p-5")}>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    Selected departure
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                    {selectedSchedule.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                    {selectedSchedule.note}
                  </p>

                  <div className="mt-5 space-y-3">
                    {selectedSchedule.stops.map((stop, index) => (
                      <div
                        key={`${selectedSchedule.id}-${stop.name}`}
                        className="flex items-center justify-between rounded-[18px] border border-black/6 bg-white px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(255,154,31,0.1)] text-sm font-bold text-[var(--accent-deep)]">
                            {index + 1}
                          </span>
                          <p className="text-sm font-semibold text-[var(--foreground)]">
                            {stop.name}
                          </p>
                        </div>
                        <p className="text-xs font-semibold text-[var(--foreground-soft)]">
                          {stop.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={surfaceClassName("p-5")}>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    Publish impact
                  </p>
                  <div className="mt-5 space-y-3">
                    {[
                      "Update the route-day template",
                      "Review rider and guardian notification timing",
                      "Push schedule changes to Driver and Mate",
                      "Confirm departure windows before publish",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-[18px] border border-black/6 bg-white px-4 py-3"
                      >
                        <CalendarRange className="mt-0.5 h-5 w-5 text-[var(--accent-deep)]" />
                        <p className="text-sm leading-7 text-[var(--foreground)]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ConsoleDriversView() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [filter, setFilter] = useState<"All" | DriverStatus>("All");
  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const visibleDrivers = driverRoster.filter((driver) => {
    const matchesStatus = filter === "All" ? true : driver.status === filter;
    const matchesQuery =
      normalizedQuery.length === 0
        ? true
        : `${driver.name} ${driver.zone} ${driver.assignedRoute}`.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesQuery;
  });
  const [selectedDriverId, setSelectedDriverId] = useState(driverRoster[0]?.id ?? "");
  const selectedDriver =
    visibleDrivers.find((driver) => driver.id === selectedDriverId) ??
    driverRoster.find((driver) => driver.id === selectedDriverId) ??
    visibleDrivers[0] ??
    driverRoster[0];

  const statusCounts = {
    available: driverRoster.filter((driver) => driver.status === "Available").length,
    onTrip: driverRoster.filter((driver) => driver.status === "On trip").length,
    review: driverRoster.filter((driver) => driver.status === "Review").length,
    break: driverRoster.filter((driver) => driver.status === "Break").length,
  };

  const driverActions =
    selectedDriver?.status === "Available"
      ? [
          "Assign to an open route",
          "Review the latest shift summary",
          "Check route history before dispatch",
        ]
      : selectedDriver?.status === "Review"
        ? [
            "Confirm the vehicle handoff",
            "Review check-in documents",
            "Clear the driver for assignment",
          ]
        : [
            "Review current trip status",
            "Check boarding accuracy",
            "Prepare the next standby move",
          ];

  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        eyebrow="Driver roster"
        title="See who is ready, in service, or blocked without leaving the roster."
        description="Search and filter first, then move directly to the next operator action for the selected driver."
        actions={
          <button className="orange-button rounded-[18px] px-5 py-3 text-sm font-semibold">
            Invite driver
          </button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-4">
        <SummaryStat label="Available" value={statusCounts.available.toString()} />
        <SummaryStat label="On trip" value={statusCounts.onTrip.toString()} />
        <SummaryStat label="Review" value={statusCounts.review.toString()} />
        <SummaryStat label="Break" value={statusCounts.break.toString()} />
      </section>

      <section className={surfaceClassName("p-6")}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-[420px]">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--foreground-soft)]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search driver, route, or zone"
              className="w-full rounded-[18px] border border-black/6 bg-white px-12 py-3 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[rgba(255,154,31,0.3)]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {(["All", "Available", "On trip", "Break", "Review"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={cx(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  filter === item
                    ? "bg-[var(--accent)] text-white"
                    : "border border-black/6 bg-white text-[var(--foreground-soft)]",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.06fr_0.94fr]">
        <div className={surfaceClassName("p-6")}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                Roster
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                {visibleDrivers.length} drivers in view
              </h3>
            </div>
            <span className="rounded-full border border-black/6 bg-[#f4f3ed] px-3 py-2 text-xs font-semibold text-[var(--foreground-soft)]">
              Updated 2 min ago
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {visibleDrivers.map((driver) => (
              <DriverListRow
                key={driver.id}
                driver={driver}
                active={selectedDriver?.id === driver.id}
                onClick={() => setSelectedDriverId(driver.id)}
              />
            ))}
          </div>
        </div>

        {selectedDriver ? (
          <div className="grid gap-6">
            <div className={surfaceClassName("p-6")}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    Driver detail
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                    {selectedDriver.name}
                  </h3>
                </div>
                <StatusBadge
                  label={selectedDriver.status}
                  tone={driverStatusTone(selectedDriver.status)}
                />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <SummaryStat label="Assigned route" value={selectedDriver.assignedRoute} />
                <SummaryStat label="Vehicle" value={selectedDriver.vehicle} />
                <SummaryStat label="Check in" value={selectedDriver.checkIn} />
                <SummaryStat label="Hours left" value={selectedDriver.hoursLeft} />
              </div>

              <div className="mt-6 rounded-[22px] border border-black/6 bg-white px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
                  Certifications
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedDriver.certifications.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[rgba(255,154,31,0.18)] bg-[rgba(255,154,31,0.08)] px-3 py-2 text-xs font-semibold text-[var(--accent-deep)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-[22px] border border-black/6 bg-[#fff8ef] px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
                  Operations note
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                  {selectedDriver.note}
                </p>
              </div>
            </div>

            <div className={surfaceClassName("p-6")}>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[rgba(255,154,31,0.1)] text-[var(--accent-deep)]">
                  <UsersRound className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    Next actions
                  </p>
                  <h3 className="mt-1 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                    What the desk can do next
                  </h3>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {driverActions.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[18px] border border-black/6 bg-white px-4 py-3"
                  >
                    <ArrowUpRight className="mt-0.5 h-5 w-5 text-[var(--accent-deep)]" />
                    <p className="text-sm leading-7 text-[var(--foreground)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export function ConsoleOrganizationsView() {
  const [selectedOrganizationId, setSelectedOrganizationId] = useState(organizations[0]?.id ?? "");
  const selectedOrganization =
    organizations.find((organization) => organization.id === selectedOrganizationId) ??
    organizations[0];
  const counts = {
    live: organizations.filter((organization) => organization.status === "Pilot live").length,
    ready: organizations.filter((organization) => organization.status === "Ready to onboard").length,
    expansion: organizations.filter((organization) => organization.status === "Expansion").length,
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <PageHeader
        eyebrow="Partner organizations"
        title="Review partner readiness, access, and enabled services in one place."
        description="The organization view should show who is live, who is preparing launch, and what each partner can use today."
        actions={
          <button className="orange-button rounded-[18px] px-5 py-3 text-sm font-semibold">
            Add organization
          </button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryStat label="Pilot live" value={counts.live.toString()} />
        <SummaryStat label="Ready to onboard" value={counts.ready.toString()} />
        <SummaryStat label="Expansion" value={counts.expansion.toString()} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.96fr]">
        <div className="grid gap-4">
          {organizations.map((organization) => (
            <OrganizationCard
              key={organization.id}
              organization={organization}
              active={selectedOrganization?.id === organization.id}
              onClick={() => setSelectedOrganizationId(organization.id)}
            />
          ))}
        </div>

        {selectedOrganization ? (
          <div className="grid gap-6">
            <div className={surfaceClassName("p-6")}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    Selected partner
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                    {selectedOrganization.name}
                  </h3>
                </div>
                <StatusBadge
                  label={selectedOrganization.status}
                  tone={organizationTone(selectedOrganization.status)}
                />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <SummaryStat label="Service level" value={selectedOrganization.serviceLevel} />
                <SummaryStat label="Coordinator" value={selectedOrganization.coordinator} />
                <SummaryStat label="Coordinator email" value={selectedOrganization.coordinatorEmail} />
                <SummaryStat label="Campuses" value={`${selectedOrganization.campuses} connected`} />
              </div>

              <div className="mt-6 rounded-[22px] border border-black/6 bg-[#fff8ef] px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
                  Launch note
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                  {selectedOrganization.notes}
                </p>
              </div>
            </div>

            <div className={surfaceClassName("p-6")}>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[rgba(255,154,31,0.1)] text-[var(--accent-deep)]">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    Services and hubs
                  </p>
                  <h3 className="mt-1 text-2xl font-bold tracking-[-0.05em] text-[var(--foreground)]">
                    What is connected today
                  </h3>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
                    Enabled services
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedOrganization.services.map((service) => (
                      <span
                        key={service}
                        className="rounded-full border border-[rgba(255,154,31,0.18)] bg-[rgba(255,154,31,0.08)] px-3 py-2 text-xs font-semibold text-[var(--accent-deep)]"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
                    Connected locations
                  </p>
                  <div className="mt-3 space-y-2">
                    {selectedOrganization.locations.map((location) => (
                      <div
                        key={location}
                        className="rounded-[18px] border border-black/6 bg-white px-4 py-3 text-sm font-semibold text-[var(--foreground)]"
                      >
                        {location}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
