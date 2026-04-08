import type { Metadata } from "next";

import { ConsoleSchedulesView } from "@/components/console-app";

export const metadata: Metadata = {
  title: "Schedule Manager",
};

export default function ConsoleSchedulesPage() {
  return <ConsoleSchedulesView />;
}
