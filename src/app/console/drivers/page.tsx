import type { Metadata } from "next";

import { ConsoleDriversView } from "@/components/console-app";

export const metadata: Metadata = {
  title: "Driver Management",
};

export default function ConsoleDriversPage() {
  return <ConsoleDriversView />;
}
