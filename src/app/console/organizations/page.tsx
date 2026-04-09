import type { Metadata } from "next";

import { ConsoleOrganizationsView } from "@/components/console-app";

export const metadata: Metadata = {
  title: "Partner Organizations",
  description:
    "Review launch readiness, enabled services, and organization details in Busition Console.",
};

export default function ConsoleOrganizationsPage() {
  return <ConsoleOrganizationsView />;
}
