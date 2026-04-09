import type { Metadata } from "next";

import { MateShell } from "@/components/mate-shell";

export const metadata: Metadata = {
  title: {
    default: "Busition Mate",
    template: "%s | Busition Mate",
  },
  description:
    "Busition Mate gives riders and guardians live ETA, boarding confirmation, route progress, and service alerts in one mobile experience.",
};

export default function MateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MateShell>{children}</MateShell>;
}
