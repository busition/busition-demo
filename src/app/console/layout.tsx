import type { Metadata } from "next";

import { ConsoleShell } from "@/components/console-shell";

export const metadata: Metadata = {
  title: {
    default: "Busition Console",
    template: "%s | Busition Console",
  },
  description:
    "Front-end operator console for Busition with route assignments, schedule planning, driver management, and organization controls.",
};

export default function ConsoleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ConsoleShell>{children}</ConsoleShell>;
}
