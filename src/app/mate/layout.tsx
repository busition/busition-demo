import type { Metadata } from "next";

import { MateShell } from "@/components/mate-shell";

export const metadata: Metadata = {
  title: {
    default: "Busition Mate",
    template: "%s | Busition Mate",
  },
  description:
    "Front-end rider and guardian mobile app for Busition with timetable, live route tracking, alerts, and shared family access.",
};

export default function MateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MateShell>{children}</MateShell>;
}
