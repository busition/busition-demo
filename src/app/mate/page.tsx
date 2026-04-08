import type { Metadata } from "next";

import { MateTimetableView } from "@/components/mate-app";

export const metadata: Metadata = {
  title: "Timetable",
  description:
    "Operational timetable home for the Busition Mate mobile service.",
};

export default function MatePage() {
  return <MateTimetableView />;
}
