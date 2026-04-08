import type { Metadata } from "next";

import { MateFamilyView } from "@/components/mate-app";

export const metadata: Metadata = {
  title: "Family",
};

export default function MateFamilyPage() {
  return <MateFamilyView />;
}
