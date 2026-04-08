import { BusFront, LocateFixed } from "lucide-react";

type BusitionLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BusitionLogo({
  compact = false,
  className = "",
}: BusitionLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#ffb045_0%,#f0671b_100%)] shadow-[0_12px_24px_rgba(240,104,29,0.28)]">
        <LocateFixed className="h-5 w-5 text-white/80" />
        <BusFront className="absolute h-4 w-4 text-white" />
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="font-display text-xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-2xl">
          Busition
        </span>
        {!compact ? (
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">
            Mobility Operations
          </span>
        ) : null}
      </div>
    </div>
  );
}
