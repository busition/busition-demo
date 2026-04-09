import type { Metadata } from "next";

import { MateTimetableView } from "@/components/mate-app";

export const metadata: Metadata = {
  title: "Ride Overview",
  description:
    "Live ride overview for Busition Mate with ETA, boarding visibility, and important service updates.",
};

export default function MatePage() {
  return <MateTimetableView />;
}
