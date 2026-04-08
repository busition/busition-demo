import {
  BellRing,
  BusFront,
  LocateFixed,
  Monitor,
  Route,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export function HeroVisual() {
  return (
    <div className="relative isolate">
      <div className="ambient-orb left-4 top-6 h-20 w-20 bg-[rgba(255,155,26,0.32)]" />
      <div className="ambient-orb bottom-10 right-10 h-24 w-24 bg-[rgba(79,141,251,0.22)]" />

      <div className="panel-surface relative overflow-hidden rounded-[34px] p-4 sm:p-6">
        <div className="map-grid absolute inset-0 opacity-30" />
        <div className="absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,155,26,0.45),transparent)]" />

        <div className="grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
          <div className="panel-dark relative overflow-hidden rounded-[30px] p-6 text-white sm:p-7">
            <div className="soft-grid absolute inset-0 opacity-15" />
            <div className="absolute inset-y-6 left-[-4rem] w-20 rotate-[18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)] animate-scan-line opacity-60" />

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
                  Live Command View
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.05em]">
                  One route. Three synced experiences.
                </h3>
              </div>
              <div className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold text-white/75">
                Real-time ETA
              </div>
            </div>

            <div className="relative z-10 mt-8 rounded-[26px] border border-white/10 bg-white/6 p-5">
              <div className="flex items-center justify-between text-sm text-white/65">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-[#ffb045]" />
                  Console watches every stop
                </div>
                <div className="rounded-full bg-emerald-400/14 px-3 py-1 text-xs font-semibold text-emerald-200">
                  No hardware required
                </div>
              </div>

              <div className="relative mt-8 h-24">
                <div className="route-track absolute left-2 right-2 top-10 h-2 rounded-full" />
                {[8, 32, 56, 78, 94].map((position, index) => (
                  <div
                    key={position}
                    className="absolute top-7 -translate-x-1/2 text-center"
                    style={{ left: `${position}%` }}
                  >
                    <div
                      className={`mx-auto h-6 w-6 rounded-full border ${
                        index < 3
                          ? "border-transparent bg-[#ffb045]"
                          : "border-white/20 bg-white/8"
                      }`}
                    />
                    <div className="mt-2 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white/45">
                      {["Depot", "Stop A", "Stop B", "Stop C", "Campus"][index]}
                    </div>
                  </div>
                ))}

                <div
                  className="absolute top-4 -translate-x-1/2"
                  style={{ left: "58%" }}
                >
                  <div className="animate-pulse-signal flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ffb045_0%,#f0671b_100%)] shadow-[0_16px_32px_rgba(255,155,26,0.24)]">
                    <BusFront className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    label: "Boarding proof",
                    value: "8 confirmed",
                  },
                  {
                    label: "ETA refresh",
                    value: "5 min to stop",
                  },
                  {
                    label: "Seat signal",
                    value: "4 seats left",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[20px] border border-white/10 bg-white/7 p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold tracking-[-0.04em] text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="animate-float-slow rounded-[28px] border border-[var(--border)] bg-[rgba(255,250,245,0.92)] p-5 shadow-[0_18px_48px_rgba(19,32,52,0.08)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(255,155,26,0.14)] text-[var(--accent-strong)]">
                    <BusFront className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      Driver
                    </p>
                    <p className="text-xs text-[var(--foreground-soft)]">
                      Next stop focus
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-[rgba(22,179,154,0.12)] px-3 py-1 text-xs font-semibold text-[var(--success)]">
                  Safe flow
                </span>
              </div>

              <div className="mt-5 rounded-[24px] bg-[#fff4e7] p-4">
                <div className="flex items-center justify-between text-sm font-semibold text-[var(--foreground)]">
                  <span>Morning East Loop</span>
                  <span className="text-[var(--foreground-soft)]">07:26</span>
                </div>
                <p className="mt-3 text-3xl font-display font-semibold tracking-[-0.06em] text-[var(--foreground)]">
                  Oakview Library
                </p>
                <div className="mt-4 flex gap-2 text-xs font-semibold text-[var(--foreground-soft)]">
                  <span className="rounded-full border border-[var(--border)] bg-white px-3 py-2">
                    4 seats left
                  </span>
                  <span className="rounded-full border border-[var(--border)] bg-white px-3 py-2">
                    1 correction queued
                  </span>
                </div>
              </div>
            </div>

            <div className="animate-float-mid rounded-[28px] border border-[var(--border)] bg-[rgba(255,255,255,0.84)] p-5 shadow-[0_18px_48px_rgba(19,32,52,0.08)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(79,141,251,0.12)] text-[var(--sky)]">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      Mate
                    </p>
                    <p className="text-xs text-[var(--foreground-soft)]">
                      ETA, alerts, sharing
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-[rgba(79,141,251,0.1)] px-3 py-1 text-xs font-semibold text-[var(--sky)]">
                  Shared
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-[22px] bg-[rgba(79,141,251,0.08)] p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--sky)]">
                    <LocateFixed className="h-4 w-4" />
                    Approaching now
                  </div>
                  <p className="mt-3 font-display text-4xl font-semibold tracking-[-0.08em] text-[var(--foreground)]">
                    5 min
                  </p>
                  <p className="mt-2 text-sm text-[var(--foreground-soft)]">
                    Guardians, riders, and staff share the same countdown and
                    boarding proof.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
                  {[
                    {
                      icon: BellRing,
                      label: "10 / 5 / soon alerts",
                    },
                    {
                      icon: ShieldCheck,
                      label: "Boarding confirmation",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[20px] border border-[var(--border)] bg-white px-4 py-3"
                    >
                      <item.icon className="h-4 w-4 text-[var(--accent-strong)]" />
                      <p className="mt-2 text-sm font-medium text-[var(--foreground)]">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-6 rounded-full border border-white/60 bg-white/72 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
          From position to decision
        </div>

        <div className="absolute right-6 top-6 hidden rounded-full border border-[rgba(255,155,26,0.22)] bg-white/78 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)] md:block">
          Launch Preview
        </div>
      </div>
    </div>
  );
}
