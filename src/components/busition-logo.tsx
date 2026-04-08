import Image from "next/image";

type BusitionLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BusitionLogo({
  compact = false,
  className = "",
}: BusitionLogoProps) {
  const imageClassName = compact ? "h-8 w-auto sm:h-9" : "h-10 w-auto sm:h-11";

  return (
    <div className={`flex min-w-0 ${className}`}>
      <div className="flex min-w-0 flex-col">
        <Image
          src="/brand/busition-logo-horizontal.png"
          alt="Busition"
          width={1067}
          height={331}
          sizes={compact ? "(max-width: 640px) 116px, 132px" : "(max-width: 640px) 142px, 170px"}
          className={imageClassName}
          priority={compact}
        />
        {!compact ? (
          <span className="pl-1 pt-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">
            Mobility Operations
          </span>
        ) : null}
      </div>
    </div>
  );
}
