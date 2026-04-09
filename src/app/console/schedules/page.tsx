import type { Metadata } from "next";

import { ConsoleSchedulesView } from "@/components/console-app";

export const metadata: Metadata = {
  title: "Schedule Planning",
  description:
    "Plan routes, departure windows, and publish impact from the Busition Console schedule workspace.",
};

export default function ConsoleSchedulesPage() {
  return <ConsoleSchedulesView />;
}
