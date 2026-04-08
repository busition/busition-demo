import type { Metadata } from "next";

import { MateAlertsView } from "@/components/mate-app";

export const metadata: Metadata = {
  title: "Alerts",
};

export default function MateAlertsPage() {
  return <MateAlertsView />;
}
