import type { Metadata } from "next";

import { DriverShell } from "@/components/driver-shell";

export const metadata: Metadata = {
  title: {
    default: "Busition Driver",
    template: "%s | Busition Driver",
  },
  description:
    "Front-end driver mobile app for Busition with trip dashboard, live route navigation, boarding controls, and driver profile tools.",
};

export default function DriverLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DriverShell>{children}</DriverShell>;
}
