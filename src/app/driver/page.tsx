import type { Metadata } from "next";

import { DriverTodayView } from "@/components/driver-app";

export const metadata: Metadata = {
  title: "Trip Overview",
  description:
    "Live trip overview for Busition Driver with next stop, queue status, and route actions.",
};

export default function DriverPage() {
  return <DriverTodayView />;
}
