import type { Metadata } from "next";

import { ConsoleOrganizationsView } from "@/components/console-app";

export const metadata: Metadata = {
  title: "Organization Management",
};

export default function ConsoleOrganizationsPage() {
  return <ConsoleOrganizationsView />;
}
