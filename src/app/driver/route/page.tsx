import type { Metadata } from "next";

import { DriverRouteView } from "@/components/driver-app";

export const metadata: Metadata = {
  title: "Live Route",
  description:
    "Keep the current stop, next stop, and live route line visible in Busition Driver.",
};

export default function DriverRoutePage() {
  return <DriverRouteView />;
}
