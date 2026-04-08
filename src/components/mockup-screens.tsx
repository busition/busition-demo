import { Bell, BusFront, Check, ChevronDown, ChevronLeft, Clock3, LocateFixed, MapPin, MoreVertical, Route, UserRound } from "lucide-react";

function stopCardClass(active?: boolean) {
  if (active) {
    return "border-[rgba(255,154,31,0.28)] bg-[rgba(255,154,31,0.08)]";
  }

  return "border-[var(--line)] bg-white";
}

export function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`concept-phone-shadow relative mx-auto w-[290px] rounded-[42px] bg-[#1f2023] p-[9px] ${className}`}
    >
      <div className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
      <div className="overflow-hidden rounded-[34px] bg-white">{children}</div>
    </div>
  );
}

export function BrowserFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`browser-shadow overflow-hidden rounded-[34px] bg-white ${className}`}>
      <div className="flex items-center gap-3 border-b border-[var(--line)] bg-[#f6f6f3] px-5 py-4">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff7d67]" />
          <span className="h-3 w-3 rounded-full bg-[#ffcf45]" />
          <span className="h-3 w-3 rounded-full bg-[#68d17f]" />
        </div>
        <div className="mx-auto flex w-full max-w-[420px] items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-[var(--foreground-soft)]">
          busition
        </div>
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}

export function MateTimetableScreen() {
  const cards = [
    {
      title: "North Station Shuttle",
      status: "2 stops away",
      detail: "Heading to East Hall",
      accent: "text-[var(--accent-deep)]",
    },
    {
      title: "North Station Shuttle",
      status: "Before departure",
      detail: "Leaves at 15:30",
      accent: "text-[var(--foreground)]",
    },
    {
      title: "South Loop Shuttle",
      status: "4 stops away",
      detail: "Heading to Main Gate",
      accent: "text-[var(--accent-deep)]",
    },
  ];

  return (
    <div className="bg-[#fbfaf6] px-5 pb-6 pt-7">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[var(--foreground)]">Timetable</h3>
        <span className="text-sm font-semibold text-[var(--foreground-soft)]">
          09:41
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {cards.map((card) => (
          <div
            key={`${card.title}-${card.status}`}
            className="rounded-[24px] border border-[var(--line)] bg-white p-4 shadow-[0_12px_28px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--foreground)]">
                {card.title}
              </p>
              <MoreVertical className="h-4 w-4 text-[var(--foreground-soft)]" />
            </div>

            <div className="mt-4 rounded-[20px] bg-[#fff5e7] px-4 py-5 text-center">
              <BusFront className="mx-auto h-8 w-8 text-[var(--accent)]" />
              <p className={`mt-4 text-3xl font-bold ${card.accent}`}>{card.status}</p>
              <p className="mt-1 text-sm text-[var(--foreground-soft)]">{card.detail}</p>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="rounded-full border border-[var(--line)] px-3 py-2 text-xs font-semibold text-[var(--foreground-soft)]">
                Open map
              </button>
              <button className="rounded-full border border-[var(--line)] px-3 py-2 text-xs font-semibold text-[var(--foreground-soft)]">
                Route detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MateRouteScreen() {
  const stops = [
    { name: "North Station Exit 1", eta: "12 / 12", active: false },
    { name: "Maple Avenue Stop 2", eta: "3 / 12", active: true },
    { name: "University Main Gate", eta: "0 / 12", active: false },
  ];

  return (
    <div className="bg-white">
      <div className="map-grid relative h-[360px] overflow-hidden bg-[#f3f1ec]">
        <div className="absolute left-5 top-6 flex items-center gap-3 rounded-[16px] border border-[var(--line)] bg-white px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
          <ChevronLeft className="h-4 w-4" />
          <span>North Station Loop</span>
          <ChevronDown className="h-4 w-4 text-[var(--foreground-soft)]" />
        </div>

        <div className="absolute left-[13%] top-[42%] h-3 w-3 rounded-full bg-[#ffb649] shadow-[0_0_0_6px_rgba(255,182,73,0.14)]" />
        <div className="absolute left-[48%] top-[18%] h-3 w-3 rounded-full bg-[#ffb649] shadow-[0_0_0_6px_rgba(255,182,73,0.14)]" />
        <div className="absolute left-[79%] top-[34%] h-3 w-3 rounded-full bg-[#ff8c1a] shadow-[0_0_0_6px_rgba(255,140,26,0.14)]" />

        <div className="route-line absolute left-[14%] top-[44%] h-[8px] w-[37%] rotate-[-18deg] rounded-full" />
        <div className="route-line absolute left-[50%] top-[30%] h-[8px] w-[28%] rotate-[32deg] rounded-full" />
        <div className="route-line absolute left-[66%] top-[48%] h-[8px] w-[18%] rotate-[90deg] rounded-full" />

        <div className="absolute left-[47%] top-[17%] flex h-8 w-8 items-center justify-center rounded-full bg-[#224b82] text-white">
          <Check className="h-4 w-4" />
        </div>
      </div>

      <div className="rounded-t-[28px] bg-white px-5 pb-6 pt-5">
        <h3 className="text-[1.1rem] font-bold text-[var(--foreground)]">
          North Station → University Main Gate
        </h3>
        <div className="mt-4 space-y-4">
          {stops.map((stop) => (
            <div key={stop.name} className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f3ef] text-[var(--accent-deep)]">
                <MapPin className="h-4 w-4" />
              </div>
              <div className={`flex-1 rounded-[18px] border px-4 py-3 ${stopCardClass(stop.active)}`}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {stop.name}
                    </p>
                    <p className="mt-1 text-xs text-[var(--foreground-soft)]">
                      248, Maple Avenue
                    </p>
                  </div>
                  <span className="rounded-full bg-[#f2f2ef] px-3 py-2 text-xs font-semibold text-[var(--foreground)]">
                    {stop.eta}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-5 w-full rounded-[18px] bg-[#ff5a4e] py-3 text-sm font-semibold text-white">
          End trip
        </button>
      </div>
    </div>
  );
}

export function DriverLoginPanel() {
  return (
    <div className="rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-[0_14px_34px_rgba(0,0,0,0.05)]">
      <p className="text-sm font-semibold text-[var(--foreground-soft)]">Driver sign-in</p>
      <div className="mt-5 space-y-3">
        <div className="rounded-[16px] border border-[var(--line)] px-4 py-3 text-sm text-[var(--foreground-soft)]">
          Email address
        </div>
        <div className="rounded-[16px] border border-[var(--line)] px-4 py-3 text-sm text-[var(--foreground-soft)]">
          Password
        </div>
      </div>
      <button className="orange-button mt-6 w-full rounded-[18px] py-3 text-sm font-semibold">
        Login
      </button>
    </div>
  );
}

export function DriverTripScreen() {
  const riders = [
    { name: "Mia Carter", status: "Boarded", tone: "bg-[rgba(25,184,146,0.12)] text-[var(--success)]" },
    { name: "Ethan Bell", status: "Late +3 min", tone: "bg-[rgba(255,154,31,0.12)] text-[var(--accent-deep)]" },
    { name: "Leah Kim", status: "Waiting", tone: "bg-[#f2f2ef] text-[var(--foreground-soft)]" },
  ];

  return (
    <div className="bg-[#fbfaf6] px-5 pb-6 pt-7">
      <div className="rounded-[24px] bg-[#fff3df] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[var(--foreground-soft)]">
              Today&apos;s route
            </p>
            <h3 className="mt-2 text-2xl font-bold text-[var(--foreground)]">
              North Station Loop
            </h3>
            <p className="mt-2 text-sm text-[var(--foreground-soft)]">
              Next stop in 5 min · 4 seats left
            </p>
          </div>
          <div className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-[var(--accent-deep)]">
            Live trip
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-[24px] border border-[var(--line)] bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[var(--foreground)]">Stop roster</p>
          <span className="text-xs font-semibold text-[var(--foreground-soft)]">
            Maple Avenue
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {riders.map((rider) => (
            <div
              key={rider.name}
              className="flex items-center justify-between rounded-[18px] bg-[#faf9f5] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
                  <UserRound className="h-4 w-4 text-[var(--foreground-soft)]" />
                </div>
                <span className="text-sm font-semibold text-[var(--foreground)]">
                  {rider.name}
                </span>
              </div>
              <span className={`rounded-full px-3 py-2 text-xs font-semibold ${rider.tone}`}>
                {rider.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button className="rounded-[18px] bg-[var(--accent)] py-3 text-sm font-semibold text-white">
          Confirm stop
        </button>
        <button className="rounded-[18px] border border-[var(--line)] bg-white py-3 text-sm font-semibold text-[var(--foreground)]">
          Open nav
        </button>
      </div>
    </div>
  );
}

export function ConsoleAssignmentScreen() {
  const routes = [
    "Hongdae → Gangnam 1",
    "Kookmin Univ → Bulgwang 1",
    "Kookmin Univ → Bulgwang 2",
    "Pangyo → Gangnam 1",
    "Pangyo → Gangnam 2",
    "Bangkok Test Route",
  ];

  return (
    <div className="grid min-h-[640px] grid-cols-[178px_1fr] bg-[#f5f7fb]">
      <aside className="bg-[#353535] px-5 py-7 text-white">
        <p className="text-3xl font-bold tracking-[-0.06em] text-[#2b86f3]">Busition</p>
        <p className="mt-3 text-sm text-white/68">Operator Console</p>

        <button className="mt-7 w-full rounded-[12px] bg-white/12 px-4 py-3 text-sm font-semibold text-white/88">
          Logout
        </button>

        <div className="mt-10 space-y-3 text-sm">
          {["Dashboard", "Driver assignment", "Driver management", "Organization"].map((item, index) => (
            <div
              key={item}
              className={`rounded-[12px] px-4 py-3 font-semibold ${
                index === 1 ? "bg-[#2b86f3] text-white" : "text-white/62"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </aside>

      <div className="px-6 py-6">
        <h3 className="text-2xl font-bold text-[var(--foreground)]">Driver assignment</h3>
        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          {routes.map((route) => (
            <div
              key={route}
              className="rounded-[20px] border border-[rgba(35,35,35,0.08)] bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.04)]"
            >
              <span className="rounded-full bg-[#f2f3f6] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--foreground-soft)]">
                Unassigned
              </span>
              <p className="mt-4 text-[1.45rem] font-bold tracking-[-0.04em] text-[var(--foreground)]">
                {route}
              </p>
              <div className="mt-4 space-y-2 text-sm text-[var(--foreground-soft)]">
                <p>Departure · Main transit hub</p>
                <p>Arrival · Gate 12</p>
              </div>
              <button className="mt-5 w-full rounded-[12px] bg-[var(--blue)] py-3 text-sm font-semibold text-white">
                Assign driver
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ConsoleScheduleScreen() {
  const routes = ["Northbridge → Bulgwang", "Northbridge → Hongdae", "Northbridge → Gangnam"];

  return (
    <div className="grid min-h-[620px] grid-cols-[240px_340px_1fr] bg-[#f8f8f5]">
      <div className="border-r border-[var(--line)] bg-white px-4 py-5">
        <div className="space-y-4">
          {routes.map((route, index) => (
            <div
              key={route}
              className={`rounded-[18px] border px-4 py-4 ${
                index === 0
                  ? "border-[rgba(255,154,31,0.3)] bg-[rgba(255,154,31,0.06)]"
                  : "border-[var(--line)] bg-white"
              }`}
            >
              <p className="text-sm font-bold text-[var(--foreground)]">{route}</p>
              <p className="mt-3 text-xs text-[var(--foreground-soft)]">
                Departure · Main transit hub
              </p>
              <p className="mt-1 text-xs text-[var(--foreground-soft)]">
                Arrival · Gate 12
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-r border-[var(--line)] bg-white px-5 py-5">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-[var(--foreground)]">Schedule set</p>
          <Clock3 className="h-4 w-4 text-[var(--foreground-soft)]" />
        </div>

        <div className="mt-5 flex gap-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
            <div
              key={day}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold ${
                index === 0
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--line)] bg-[#faf9f5] text-[var(--foreground-soft)]"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[20px] border border-[var(--line)] bg-[#faf9f5] p-4">
          <p className="text-sm font-semibold text-[var(--foreground-soft)]">Trip 1</p>
          <div className="mt-4 space-y-3">
            {["Northbridge Main Gate", "Cheongdeok Elementary", "Korea High School"].map((stop, index) => (
              <div
                key={stop}
                className="flex items-center justify-between rounded-[14px] bg-white px-4 py-3"
              >
                <span className="text-sm font-semibold text-[var(--foreground)]">
                  {index + 1}. {stop}
                </span>
                <span className="text-xs font-semibold text-[var(--foreground-soft)]">
                  09:00
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="rounded-[14px] bg-[var(--accent)] py-3 text-sm font-semibold text-white">
              Save
            </button>
            <button className="rounded-[14px] border border-[var(--line)] bg-white py-3 text-sm font-semibold text-[var(--foreground-soft)]">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="map-grid relative overflow-hidden bg-[#f3f1ec]">
        <div className="absolute left-[18%] top-[48%] h-[8px] w-[24%] rotate-[-22deg] rounded-full bg-[#855fff]" />
        <div className="absolute left-[37%] top-[51%] h-[8px] w-[30%] rotate-[11deg] rounded-full bg-[#5e8df3]" />
        <div className="absolute left-[58%] top-[37%] h-[8px] w-[24%] rotate-[69deg] rounded-full bg-[#61bf73]" />
        <div className="absolute left-[17%] top-[49%] h-4 w-4 rounded-full bg-[var(--accent)]" />
        <div className="absolute left-[42%] top-[54%] h-4 w-4 rounded-full bg-[var(--accent)]" />
        <div className="absolute left-[70%] top-[43%] h-4 w-4 rounded-full bg-[var(--accent)]" />
      </div>
    </div>
  );
}

export function OrbitRoleMap() {
  const roles = [
    {
      title: "Console",
      detail: "Routes, schedules, and operator control",
      className: "left-1/2 top-0 -translate-x-1/2",
      icon: <Route className="h-5 w-5 text-[var(--blue)]" />,
    },
    {
      title: "Driver",
      detail: "Trip focus, boarding check, and navigation",
      className: "left-0 top-1/2 -translate-y-1/2",
      icon: <BusFront className="h-5 w-5 text-[var(--accent-deep)]" />,
    },
    {
      title: "Mate",
      detail: "ETA, alerts, and shared visibility",
      className: "right-0 top-1/2 -translate-y-1/2",
      icon: <Bell className="h-5 w-5 text-[var(--accent-deep)]" />,
    },
  ];

  return (
    <div className="relative mx-auto h-[360px] w-full max-w-[860px]">
      <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(255,154,31,0.3)]" />
      <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(255,154,31,0.18)]" />

      <div className="absolute left-1/2 top-1/2 z-10 flex h-[168px] w-[168px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[linear-gradient(135deg,#ffb02f_0%,#ff8a00_100%)] text-center text-white shadow-[0_26px_48px_rgba(255,138,0,0.18)]">
        <LocateFixed className="h-7 w-7" />
        <p className="mt-3 text-lg font-bold">Busition</p>
        <p className="mt-1 max-w-[110px] text-xs leading-5 text-white/84">
          One live system across every role
        </p>
      </div>

      {roles.map((role) => (
        <div
          key={role.title}
          className={`concept-card absolute w-[220px] rounded-[26px] px-5 py-4 ${role.className}`}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,154,31,0.1)]">
            {role.icon}
          </div>
          <p className="mt-4 text-lg font-bold text-[var(--foreground)]">{role.title}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
            {role.detail}
          </p>
        </div>
      ))}
    </div>
  );
}
