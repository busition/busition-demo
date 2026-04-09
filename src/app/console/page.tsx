import type { Metadata } from "next";

import { ConsoleDashboardView } from "@/components/console-app";

export const metadata: Metadata = {
  title: "Operations Overview",
  description:
    "Live operations overview for Busition Console with route risk, alerts, and service health.",
};

export default function ConsolePage() {
  return <ConsoleDashboardView />;
}
