import type { Metadata } from "next";

import { MateFamilyView } from "@/components/mate-app";

export const metadata: Metadata = {
  title: "Shared Access",
  description:
    "Manage shared ride visibility, boarding proof, and notification access in Busition Mate.",
};

export default function MateFamilyPage() {
  return <MateFamilyView />;
}
