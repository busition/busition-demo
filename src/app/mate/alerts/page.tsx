import type { Metadata } from "next";

import { MateAlertsView } from "@/components/mate-app";

export const metadata: Metadata = {
  title: "Service Alerts",
  description:
    "Review boarding, delay, and route updates in Busition Mate before they affect pickup or arrival.",
};

export default function MateAlertsPage() {
  return <MateAlertsView />;
}
