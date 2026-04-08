"use client";

import {
  startTransition,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import {
  ArrowRight,
  BrainCircuit,
  BusFront,
  Clock3,
  Monitor,
  Pause,
  Play,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
  UsersRound,
  Waypoints,
} from "lucide-react";

import {
  scenarios,
  stageLabels,
  stageOrder,
  type ScenarioId,
  type StageId,
  type Tone,
} from "@/lib/busition-demo-data";

function cx(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

const toneStyles: Record<Tone, string> = {
  stable:
    "border-[rgba(22,179,154,0.18)] bg-[rgba(22,179,154,0.1)] text-[var(--success)]",
  attention:
    "border-[rgba(255,155,26,0.22)] bg-[rgba(255,155,26,0.12)] text-[var(--accent-strong)]",
  critical:
    "border-[rgba(255,104,58,0.2)] bg-[rgba(255,104,58,0.1)] text-[#d4552a]",
  complete:
    "border-[rgba(79,141,251,0.2)] bg-[rgba(79,141,251,0.1)] text-[var(--sky)]",
};

type PlannerPriority = "trust" | "efficiency" | "coverage";

const priorityCopy: Record<
  PlannerPriority,
  {
    title: string;
    detail: string;
  }
> = {
  trust: {
    title: "Trust-first",
    detail: "Favor shorter wait windows, clearer stop ownership, and higher boarding confidence.",
  },
  efficiency: {
    title: "Efficiency-first",
    detail: "Compress stops and improve vehicle utilization while protecting the worst route edge cases.",
  },
  coverage: {
    title: "Coverage-first",
    detail: "Reach more riders with a wider stop mesh, even if the route gets slightly slower.",
  },
};

const modeCopy = {
  operations:
    "Play through a live route and watch Driver, Mate, and Console stay in sync from dispatch to trip close.",
  planner:
    "Model how Busition can turn rider demand, vehicle limits, and service priorities into a route proposal before launch.",
};

export function DemoLab() {
  const [mode, setMode] = useState<"operations" | "planner">("operations");
  const [scenarioId, setScenarioId] = useState<ScenarioId>("academy");
  const [stageIndex, setStageIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [priority, setPriority] = useState<PlannerPriority>("trust");
  const [riders, setRiders] = useState(scenarios.academy.plannerSeed.riders);
  const [vehicles, setVehicles] = useState(scenarios.academy.plannerSeed.vehicles);
  const [maxRideTime, setMaxRideTime] = useState(
    scenarios.academy.plannerSeed.maxRideTime,
  );

  const scenario = scenarios[scenarioId];
  const stageId = stageOrder[stageIndex];
  const stage = scenario.stages[stageId];

  const advanceStage = useEffectEvent(() => {
    setStageIndex((current) => (current + 1) % stageOrder.length);
  });

  useEffect(() => {
    if (!autoplay || mode !== "operations") {
      return;
    }

    const interval = window.setInterval(() => {
      advanceStage();
    }, 4200);

    return () => {
      window.clearInterval(interval);
    };
  }, [autoplay, mode]);

  const applyScenario = (nextScenarioId: ScenarioId) => {
    const seed = scenarios[nextScenarioId].plannerSeed;

    startTransition(() => {
      setScenarioId(nextScenarioId);
      setStageIndex(0);
      setRiders(seed.riders);
      setVehicles(seed.vehicles);
      setMaxRideTime(seed.maxRideTime);
    });
  };

  const stageTone = toneStyles[stage.statusTone];
  const capacityPerVehicle =
    scenarioId === "academy" ? 12 : scenarioId === "campus" ? 28 : 32;
  const seatSupply = vehicles * capacityPerVehicle;
  const seatUtilization = Math.max(
    42,
    Math.min(97, Math.round((riders / Math.max(seatSupply, 1)) * 100)),
  );
  const stopClusters = Math.max(
    4,
    Math.min(
      14,
      Math.round(
        riders / (priority === "coverage" ? 6.5 : priority === "efficiency" ? 9 : 7.5),
      ),
    ),
  );
  const modeledRideTime = Math.max(
    18,
    Math.min(
      maxRideTime + 10,
      Math.round(
        stopClusters * 2.7 +
          (priority === "coverage" ? 6 : priority === "efficiency" ? -4 : 0),
      ),
    ),
  );
  const boardingConfidence = Math.max(
    82,
    Math.min(
      98,
      88 +
        (priority === "trust" ? 6 : priority === "efficiency" ? 3 : 4) -
        (seatUtilization > 90 ? 4 : 0),
    ),
  );
  const adminTimeSaved = Math.max(
    18,
    Math.min(
      54,
      24 +
        Math.round(boardingConfidence / 5) +
        (priority === "efficiency" ? 6 : 0) -
        (priority === "coverage" ? 3 : 0),
    ),
  );
  const recommendedVehicles = Math.max(
    2,
    Math.min(vehicles + 1, Math.round(riders / (capacityPerVehicle * 0.86))),
  );

  const plannerRoutes = [
    {
      name: `${scenario.routeName} A`,
      riders: Math.round(riders * 0.37),
      stops: Math.max(3, Math.round(stopClusters * 0.34)),
      rideTime: Math.max(16, modeledRideTime - 4),
      focus: priority === "trust" ? "Dense stops" : "Primary corridor",
    },
    {
      name: `${scenario.routeName} B`,
      riders: Math.round(riders * 0.33),
      stops: Math.max(3, Math.round(stopClusters * 0.29)),
      rideTime: modeledRideTime,
      focus: priority === "coverage" ? "Outer coverage" : "Balanced core",
    },
    {
      name: `${scenario.routeName} C`,
      riders: riders - Math.round(riders * 0.37) - Math.round(riders * 0.33),
      stops: Math.max(2, Math.round(stopClusters * 0.22)),
      rideTime: Math.min(maxRideTime + 8, modeledRideTime + 3),
      focus: priority === "efficiency" ? "Overflow buffer" : "Low-pressure loop",
    },
  ];

  const plannerHighlights = [
    {
      label: "Recommended vehicles",
      value: `${recommendedVehicles}`,
      note: "Balance rider load with a reserve coach for disruption recovery.",
    },
    {
      label: "Seat utilization",
      value: `${seatUtilization}%`,
      note: "Higher than this starts to erode comfort and route resilience.",
    },
    {
      label: "Boarding confidence",
      value: `${boardingConfidence}%`,
      note: "Combines pre-status, live arrival, and manual correction coverage.",
    },
    {
      label: "Admin time saved",
      value: `${adminTimeSaved}%`,
      note: "Expected reduction in calls, manual follow-up, and exception chasing.",
    },
  ];

  const routeBaseClass =
    "rounded-[22px] border p-4 transition-colors duration-300";

  return (
    <div className="panel-surface rounded-[38px] p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-5 border-b border-[var(--border)] pb-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <div className="eyebrow">Interactive demo lab</div>
            <h3 className="mt-5 font-display text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-4xl">
              Try Busition before the product stack ships.
            </h3>
            <p className="mt-4 text-base leading-7 text-[var(--foreground-soft)] sm:text-lg">
              {modeCopy[mode]}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: "operations", label: "Operations sync" },
              { id: "planner", label: "Route planner" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMode(item.id as "operations" | "planner")}
                className={cx(
                  "rounded-full px-4 py-3 text-sm font-semibold transition-all",
                  mode === item.id
                    ? "bg-[linear-gradient(135deg,#ffb045_0%,#f0671b_100%)] text-white shadow-[0_14px_30px_rgba(240,104,29,0.2)]"
                    : "border border-[var(--border)] bg-white/72 text-[var(--foreground-soft)] hover:border-[rgba(255,155,26,0.26)] hover:text-[var(--foreground)]",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(Object.keys(scenarios) as ScenarioId[]).map((key) => {
            const item = scenarios[key];

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => applyScenario(item.id)}
                className={cx(
                  "rounded-full border px-4 py-3 text-left text-sm transition-all",
                  scenarioId === item.id
                    ? "border-transparent bg-[#18212f] text-white shadow-[0_16px_32px_rgba(17,24,39,0.18)]"
                    : "border-[var(--border)] bg-white/76 text-[var(--foreground-soft)] hover:border-[rgba(255,155,26,0.22)] hover:text-[var(--foreground)]",
                )}
              >
                <span className="block font-semibold">{item.label}</span>
                <span className="mt-1 block text-xs opacity-75">{item.segment}</span>
              </button>
            );
          })}
        </div>
      </div>

      {mode === "operations" ? (
        <div className="mt-6 space-y-6">
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6">
              <div className="rounded-[28px] border border-[var(--border)] bg-white/76 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                      Scenario brief
                    </p>
                    <h4 className="mt-3 font-display text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
                      {scenario.organization}
                    </h4>
                    <p className="mt-2 text-sm font-medium text-[var(--accent-strong)]">
                      {scenario.deployment}
                    </p>
                  </div>
                  <div className="rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.84)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    {scenario.segment}
                  </div>
                </div>

                <p className="mt-5 text-base leading-7 text-[var(--foreground-soft)]">
                  {scenario.summary}
                </p>

                <div className="mt-6 space-y-3">
                  {scenario.outcomes.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-[18px] bg-[rgba(255,155,26,0.08)] px-4 py-3"
                    >
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-strong)]" />
                      <p className="text-sm leading-6 text-[var(--foreground)]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                  {scenario.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-[20px] border border-[var(--border)] bg-white px-4 py-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                        {metric.label}
                      </p>
                      <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
                        {metric.value}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
                        {metric.hint}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-[var(--border)] bg-[#18212f] p-6 text-white">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">
                      Timeline control
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      Play each operating moment
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAutoplay((current) => !current)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-semibold text-white/88"
                  >
                    {autoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {autoplay ? "Pause autoplay" : "Resume autoplay"}
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {stageOrder.map((item, index) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setStageIndex(index)}
                      className={cx(
                        "rounded-full px-4 py-3 text-sm font-semibold transition-all",
                        stageId === item
                          ? "bg-white text-[#18212f]"
                          : "border border-white/10 bg-white/6 text-white/72 hover:bg-white/12 hover:text-white",
                      )}
                    >
                      {stageLabels[item as StageId]}
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-[24px] border border-white/10 bg-white/6 p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={cx(
                        "rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em]",
                        stageTone,
                      )}
                    >
                      {stage.statusLabel}
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
                      {stage.delayLabel}
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    {stage.eventLog.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[#ffb045]" />
                        <p className="text-sm leading-6 text-white/78">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                      Live signals in this moment
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {scenario.liveSignals.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs font-medium text-white/78"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel-dark relative overflow-hidden rounded-[30px] p-6 text-white sm:p-7">
              <div className="soft-grid absolute inset-0 opacity-15" />
              <div className="absolute inset-y-6 left-[-5rem] w-24 rotate-[16deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)] animate-scan-line opacity-60" />

              <div className="relative z-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                      Live route board
                    </p>
                    <h4 className="mt-3 font-display text-3xl font-semibold tracking-[-0.06em] text-white">
                      {scenario.routeName}
                    </h4>
                    <p className="mt-2 text-sm text-white/65">{scenario.strapline}</p>
                  </div>

                  <div className="grid gap-2 sm:text-right">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                      Vehicle
                    </p>
                    <p className="text-sm font-semibold text-white/82">
                      {scenario.vehicleName}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 xl:grid-cols-[1.18fr_0.82fr]">
                  <div className="rounded-[26px] border border-white/10 bg-white/7 p-5">
                    <div className="flex items-center justify-between text-sm text-white/68">
                      <span className="flex items-center gap-2">
                        <Waypoints className="h-4 w-4 text-[#ffb045]" />
                        Route progression
                      </span>
                      <span>{stage.progress}% complete</span>
                    </div>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#ffb045_0%,#f0671b_100%)] transition-all duration-700"
                        style={{ width: `${stage.progress}%` }}
                      />
                    </div>

                    <div className="relative mt-8 h-28">
                      <div className="route-track absolute left-4 right-4 top-10 h-2 rounded-full" />

                      {scenario.stops.map((stop, index) => {
                        const position =
                          (index / (scenario.stops.length - 1)) * 88 + 6;
                        const state =
                          index < stage.activeStopIndex
                            ? "done"
                            : index === stage.activeStopIndex
                              ? "active"
                              : "pending";

                        return (
                          <div
                            key={stop.name}
                            className="absolute top-4 -translate-x-1/2"
                            style={{ left: `${position}%` }}
                          >
                            <div
                              className={cx(
                                "mx-auto flex h-8 w-8 items-center justify-center rounded-full border text-[0.7rem] font-semibold transition-all duration-500",
                                state === "done" &&
                                  "border-transparent bg-[#ffb045] text-[#18212f]",
                                state === "active" &&
                                  "animate-pulse-signal border-transparent bg-white text-[#18212f]",
                                state === "pending" &&
                                  "border-white/18 bg-white/8 text-white/55",
                              )}
                            >
                              {index + 1}
                            </div>
                            <div className="mt-2 text-center">
                              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-white/48">
                                {stop.zone}
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      <div
                        className="absolute top-0 -translate-x-1/2 transition-all duration-700"
                        style={{ left: `${stage.busPosition}%` }}
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,#ffb045_0%,#f0671b_100%)] shadow-[0_20px_40px_rgba(255,155,26,0.22)]">
                          <BusFront className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      <div className="rounded-[20px] border border-white/10 bg-white/7 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                          Next stop
                        </p>
                        <p className="mt-2 text-lg font-semibold text-white">
                          {stage.nextStop}
                        </p>
                        <p className="mt-2 text-sm text-white/65">
                          ETA {stage.nextStopEta}
                        </p>
                      </div>
                      <div className="rounded-[20px] border border-white/10 bg-white/7 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                          Arrival ETA
                        </p>
                        <p className="mt-2 text-lg font-semibold text-white">
                          {stage.arrivalEta}
                        </p>
                        <p className="mt-2 text-sm text-white/65">
                          {stage.delayLabel}
                        </p>
                      </div>
                      <div className="rounded-[20px] border border-white/10 bg-white/7 p-4 sm:col-span-2 xl:col-span-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                          Seat signal
                        </p>
                        <p className="mt-2 text-lg font-semibold text-white">
                          {stage.seatsLeft}
                        </p>
                        <p className="mt-2 text-sm text-white/65">
                          {stage.utilizationLabel}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {scenario.stops.map((stop, index) => {
                      const state =
                        index < stage.activeStopIndex
                          ? "done"
                          : index === stage.activeStopIndex
                            ? "active"
                            : "pending";

                      return (
                        <div
                          key={stop.name}
                          className={cx(
                            routeBaseClass,
                            state === "done" &&
                              "border-transparent bg-[rgba(255,176,69,0.16)]",
                            state === "active" &&
                              "border-transparent bg-white text-[#18212f]",
                            state === "pending" &&
                              "border-white/10 bg-white/6",
                          )}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p
                                className={cx(
                                  "text-xs font-semibold uppercase tracking-[0.18em]",
                                  state === "active"
                                    ? "text-[var(--foreground-soft)]"
                                    : "text-white/42",
                                )}
                              >
                                {stop.zone}
                              </p>
                              <p
                                className={cx(
                                  "mt-2 text-base font-semibold",
                                  state === "active" ? "text-[#18212f]" : "text-white",
                                )}
                              >
                                {stop.name}
                              </p>
                            </div>
                            <span
                              className={cx(
                                "rounded-full px-3 py-1 text-xs font-semibold",
                                state === "done" &&
                                  "bg-[#18212f] text-white",
                                state === "active" &&
                                  "bg-[rgba(255,155,26,0.16)] text-[var(--accent-strong)]",
                                state === "pending" &&
                                  "bg-white/10 text-white/65",
                              )}
                            >
                              {stage.stopLoads[index]}
                            </span>
                          </div>
                          <p
                            className={cx(
                              "mt-3 text-sm",
                              state === "active"
                                ? "text-[var(--foreground-soft)]"
                                : "text-white/58",
                            )}
                          >
                            ETA {stage.stopEtas[index]}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[28px] border border-[var(--border)] bg-white/80 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(255,155,26,0.14)] text-[var(--accent-strong)]">
                  <BusFront className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    Driver view
                  </p>
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    Minimum input, maximum clarity
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-[24px] bg-[#fff4e7] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                  Primary action
                </p>
                <p className="mt-2 font-display text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
                  {stage.driverAction}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">
                  {stage.driverActionNote}
                </p>
              </div>

              <div className="mt-5 space-y-3">
                {stage.driverChecklist.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[18px] border border-[var(--border)] bg-white px-4 py-3"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                    <p className="text-sm leading-6 text-[var(--foreground)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-[var(--border)] bg-white/80 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(79,141,251,0.12)] text-[var(--sky)]">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    Mate view
                  </p>
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    ETA, proof, and shared visibility
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-[24px] bg-[rgba(79,141,251,0.08)] p-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--sky)]">
                  <Clock3 className="h-4 w-4" />
                  Live ETA
                </div>
                <p className="mt-3 font-display text-4xl font-semibold tracking-[-0.08em] text-[var(--foreground)]">
                  {stage.riderEta}
                </p>
                <p className="mt-2 text-sm font-medium text-[var(--foreground)]">
                  {stage.riderHeadline}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">
                  {stage.riderStatus}
                </p>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-[18px] border border-[var(--border)] bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    Notice
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">
                    {stage.riderNotice}
                  </p>
                </div>
                <div className="rounded-[18px] border border-[var(--border)] bg-white px-4 py-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    <UsersRound className="h-4 w-4 text-[var(--accent-strong)]" />
                    Sharing
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">
                    {stage.riderPermissions}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-[var(--border)] bg-[#18212f] p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8 text-[#ffb045]">
                  <Monitor className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Console view</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                    Operations and exception control
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-[24px] border border-white/10 bg-white/8 p-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb045]">
                  <TriangleAlert className="h-4 w-4" />
                  Current alert
                </div>
                <p className="mt-3 text-lg font-semibold text-white">
                  {stage.consoleAlert}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/72">
                  {stage.consoleDetail}
                </p>
              </div>

              <div className="mt-5 space-y-3">
                {scenario.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-3"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/68">
                      {metric.hint}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[18px] border border-[rgba(255,176,69,0.2)] bg-[rgba(255,176,69,0.12)] px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffcf86]">
                  Recommendation
                </p>
                <p className="mt-2 text-sm leading-6 text-white/84">
                  {stage.consoleRecommendation}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-[var(--border)] bg-white/80 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    Planning controls
                  </p>
                  <h4 className="mt-3 font-display text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
                    Model a pilot rollout
                  </h4>
                </div>
                <div className="rounded-full border border-[var(--border)] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                  Demo output
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <label className="block">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[var(--foreground)]">
                      Riders to cover
                    </span>
                    <span className="text-sm font-semibold text-[var(--accent-strong)]">
                      {riders}
                    </span>
                  </div>
                  <input
                    className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-[rgba(255,155,26,0.14)]"
                    type="range"
                    min={24}
                    max={240}
                    step={6}
                    value={riders}
                    onChange={(event) => setRiders(Number(event.target.value))}
                  />
                </label>

                <label className="block">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[var(--foreground)]">
                      Vehicles available
                    </span>
                    <span className="text-sm font-semibold text-[var(--accent-strong)]">
                      {vehicles}
                    </span>
                  </div>
                  <input
                    className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-[rgba(255,155,26,0.14)]"
                    type="range"
                    min={2}
                    max={8}
                    step={1}
                    value={vehicles}
                    onChange={(event) => setVehicles(Number(event.target.value))}
                  />
                </label>

                <label className="block">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[var(--foreground)]">
                      Max ride time
                    </span>
                    <span className="text-sm font-semibold text-[var(--accent-strong)]">
                      {maxRideTime} min
                    </span>
                  </div>
                  <input
                    className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-[rgba(255,155,26,0.14)]"
                    type="range"
                    min={20}
                    max={60}
                    step={5}
                    value={maxRideTime}
                    onChange={(event) => setMaxRideTime(Number(event.target.value))}
                  />
                </label>
              </div>
            </div>

            <div className="rounded-[28px] border border-[var(--border)] bg-[#18212f] p-6 text-white">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb045]">
                <BrainCircuit className="h-4 w-4" />
                Service priority
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {(Object.keys(priorityCopy) as PlannerPriority[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPriority(item)}
                    className={cx(
                      "rounded-full px-4 py-3 text-sm font-semibold transition-all",
                      priority === item
                        ? "bg-white text-[#18212f]"
                        : "border border-white/10 bg-white/8 text-white/72 hover:bg-white/12 hover:text-white",
                    )}
                  >
                    {priorityCopy[item].title}
                  </button>
                ))}
              </div>

              <div className="mt-5 rounded-[24px] border border-white/10 bg-white/8 p-5">
                <p className="text-lg font-semibold text-white">
                  {priorityCopy[priority].title}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/72">
                  {priorityCopy[priority].detail}
                </p>
              </div>

              <div className="mt-5 rounded-[24px] border border-white/10 bg-white/8 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                  What Busition does with this plan
                </p>
                <div className="mt-4 space-y-3 text-sm leading-6 text-white/76">
                  <p>Import roster data and address clusters from a spreadsheet.</p>
                  <p>Compare multiple route patterns under vehicle and ride-time limits.</p>
                  <p>Publish the chosen plan to Driver, Mate, and Console without re-entry.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[30px] border border-[var(--border)] bg-white/78 p-6 sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    Route proposal
                  </p>
                  <h4 className="mt-3 font-display text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
                    {scenario.routeName} planning set
                  </h4>
                  <p className="mt-2 text-base leading-7 text-[var(--foreground-soft)]">
                    Use Busition as an operator tool before launch, then publish the same plan into live service.
                  </p>
                </div>
                <div className="rounded-full border border-[var(--border)] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                  {scenario.organization}
                </div>
              </div>

              <div className="mt-6 grid gap-3 lg:grid-cols-3">
                {plannerRoutes.map((route) => (
                  <div
                    key={route.name}
                    className="rounded-[24px] border border-[var(--border)] bg-[#fff8f0] p-5"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                      {route.name}
                    </p>
                    <p className="mt-3 font-display text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
                      {route.riders}
                    </p>
                    <p className="text-sm text-[var(--foreground-soft)]">riders assigned</p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-[var(--foreground-soft)]">
                      <span className="rounded-full border border-[var(--border)] bg-white px-3 py-2">
                        {route.stops} stops
                      </span>
                      <span className="rounded-full border border-[var(--border)] bg-white px-3 py-2">
                        {route.rideTime} min
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-[var(--foreground)]">
                      Focus: {route.focus}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {plannerHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[22px] border border-[var(--border)] bg-white px-4 py-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                      {item.label}
                    </p>
                    <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.06fr_0.94fr]">
              <div className="rounded-[28px] border border-[var(--border)] bg-[#18212f] p-6 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb045]">
                  <Waypoints className="h-4 w-4" />
                  Operating trade-offs
                </div>
                <div className="mt-5 space-y-4">
                  {[
                    {
                      label: "Stop clusters",
                      value: `${stopClusters}`,
                      note: "How many pickup points the pilot will need to cover cleanly.",
                    },
                    {
                      label: "Modeled ride time",
                      value: `${modeledRideTime} min`,
                      note: "Projected average from first pickup to final drop-off.",
                    },
                    {
                      label: "Seat supply",
                      value: `${seatSupply}`,
                      note: "Available seats across the vehicles currently in the plan.",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[22px] border border-white/10 bg-white/8 px-4 py-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                        {item.label}
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-white">
                        {item.value}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/68">
                        {item.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-[var(--border)] bg-white/78 p-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                  <ArrowRight className="h-4 w-4 text-[var(--accent-strong)]" />
                  Publish path
                </div>
                <div className="mt-5 space-y-4">
                  {[
                    "Approve the recommended vehicle count and stop mesh.",
                    "Generate invitation links for riders, guardians, and staff.",
                    "Push route assignments directly into Driver and Mate.",
                    "Open Console with the same route, ETA, and seat model on day one.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-[18px] bg-[rgba(255,155,26,0.08)] px-4 py-3"
                    >
                      <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                      <p className="text-sm leading-6 text-[var(--foreground)]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
