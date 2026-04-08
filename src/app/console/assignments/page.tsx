import type { Metadata } from "next";

import { ConsoleAssignmentsView } from "@/components/console-app";

export const metadata: Metadata = {
  title: "Driver Assignment",
};

export default function ConsoleAssignmentsPage() {
  return <ConsoleAssignmentsView />;
}
