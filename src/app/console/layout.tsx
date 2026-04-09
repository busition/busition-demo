import type { Metadata } from "next";

import { ConsoleShell } from "@/components/console-shell";

export const metadata: Metadata = {
  title: {
    default: "Busition Console",
    template: "%s | Busition Console",
  },
  description:
    "Busition Console gives operators live coverage control, schedule planning, driver management, and partner operations in one workspace.",
};

export default function ConsoleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ConsoleShell>{children}</ConsoleShell>;
}
