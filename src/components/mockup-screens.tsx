import { Bell, BusFront, LocateFixed, Route } from "lucide-react";

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

export function OrbitRoleMap() {
  const roles = [
    {
      title: "Console",
      detail: "Routes, schedules, and operator control",
      className: "left-1/2 top-0 -translate-x-1/2",
      icon: <Route className="h-5 w-5 text-[var(--accent-deep)]" />,
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
    <div className="mx-auto w-full max-w-[860px]">
      <div className="relative overflow-hidden rounded-[34px] border border-[rgba(255,154,31,0.14)] bg-[linear-gradient(180deg,rgba(255,250,241,0.94)_0%,rgba(255,255,255,0.98)_100%)] px-4 py-8 sm:px-6 md:hidden">
        <div className="absolute inset-x-6 top-4 h-20 rounded-full bg-[radial-gradient(circle,rgba(255,194,88,0.28)_0%,rgba(255,194,88,0)_72%)] blur-3xl" />
        <div className="relative flex flex-col items-center text-center">
          <div className="relative flex h-[188px] w-[188px] items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-dashed border-[rgba(255,154,31,0.16)]" />
            <div className="absolute inset-[24px] rounded-full border border-dashed border-[rgba(255,154,31,0.28)]" />
            <div className="relative z-10 flex h-[136px] w-[136px] flex-col items-center justify-center rounded-full bg-[linear-gradient(135deg,#ffb02f_0%,#ff8a00_100%)] text-white shadow-[0_26px_48px_rgba(255,138,0,0.18)]">
              <LocateFixed className="h-7 w-7" />
              <p className="mt-3 text-lg font-bold">Busition</p>
              <p className="mt-1 max-w-[96px] text-[0.7rem] leading-5 text-white/84">
                One live system across every role
              </p>
            </div>
          </div>

          <div className="mt-6 grid w-full gap-3 sm:grid-cols-3">
            {roles.map((role) => (
              <div key={role.title} className="concept-card rounded-[24px] px-5 py-4 text-left">
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
        </div>
      </div>

      <div className="relative mx-auto hidden h-[360px] w-full md:block lg:h-[380px]">
        <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(255,154,31,0.3)] lg:h-[240px] lg:w-[240px]" />
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(255,154,31,0.18)] lg:h-[340px] lg:w-[340px]" />

        <div className="absolute left-1/2 top-1/2 z-10 flex h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[linear-gradient(135deg,#ffb02f_0%,#ff8a00_100%)] text-center text-white shadow-[0_26px_48px_rgba(255,138,0,0.18)] lg:h-[168px] lg:w-[168px]">
          <LocateFixed className="h-7 w-7" />
          <p className="mt-3 text-lg font-bold">Busition</p>
          <p className="mt-1 max-w-[110px] text-xs leading-5 text-white/84">
            One live system across every role
          </p>
        </div>

        {roles.map((role) => (
          <div
            key={role.title}
            className={`concept-card absolute w-[190px] rounded-[26px] px-5 py-4 lg:w-[220px] ${role.className}`}
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
    </div>
  );
}
