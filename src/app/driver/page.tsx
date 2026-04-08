import type { Metadata } from "next";

import { DriverTodayView } from "@/components/driver-app";

export const metadata: Metadata = {
  title: "Today's Trip",
  description:
    "Operational home for the Busition Driver mobile service.",
};

export default function DriverPage() {
  return <DriverTodayView />;
}
