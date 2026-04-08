import type { Metadata } from "next";

import { MateRouteView } from "@/components/mate-app";

export const metadata: Metadata = {
  title: "Live Route",
};

export default function MateRoutePage() {
  return <MateRouteView />;
}
