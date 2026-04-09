import type { Metadata } from "next";

import { DriverShell } from "@/components/driver-shell";

export const metadata: Metadata = {
  title: {
    default: "Busition Driver",
    template: "%s | Busition Driver",
  },
  description:
    "Busition Driver helps drivers stay focused on the next stop, rider exceptions, route progress, and support tools during service.",
};

export default function DriverLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DriverShell>{children}</DriverShell>;
}
