import type { Metadata } from "next";

import { DriverProfileView } from "@/components/driver-app";

export const metadata: Metadata = {
  title: "Driver Support",
  description:
    "Review shift readiness, support notices, and vehicle checks in Busition Driver.",
};

export default function DriverProfilePage() {
  return <DriverProfileView />;
}
