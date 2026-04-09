import type { Metadata } from "next";

import { ConsoleAssignmentsView } from "@/components/console-app";

export const metadata: Metadata = {
  title: "Coverage Desk",
  description:
    "Assign drivers to open routes and resolve coverage risk in the Busition Console coverage workflow.",
};

export default function ConsoleAssignmentsPage() {
  return <ConsoleAssignmentsView />;
}
