import type { Metadata } from "next";

import { ConsoleDriversView } from "@/components/console-app";

export const metadata: Metadata = {
  title: "Driver Roster",
  description:
    "Search, review, and manage driver readiness, status, and next actions in Busition Console.",
};

export default function ConsoleDriversPage() {
  return <ConsoleDriversView />;
}
