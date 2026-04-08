import type { Metadata } from "next";

import { DriverRouteView } from "@/components/driver-app";

export const metadata: Metadata = {
  title: "Live Route",
};

export default function DriverRoutePage() {
  return <DriverRouteView />;
}
