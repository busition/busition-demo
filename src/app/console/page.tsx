import type { Metadata } from "next";

import { ConsoleDashboardView } from "@/components/console-app";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Operational home for the Busition Console service.",
};

export default function ConsolePage() {
  return <ConsoleDashboardView />;
}
