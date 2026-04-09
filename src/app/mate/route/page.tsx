import type { Metadata } from "next";

import { MateRouteView } from "@/components/mate-app";

export const metadata: Metadata = {
  title: "Live Route",
  description:
    "Track the live Busition Mate route with current stop, next stop, and shared trip progress.",
};

export default function MateRoutePage() {
  return <MateRouteView />;
}
