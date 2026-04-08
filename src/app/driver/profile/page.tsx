import type { Metadata } from "next";

import { DriverProfileView } from "@/components/driver-app";

export const metadata: Metadata = {
  title: "Profile",
};

export default function DriverProfilePage() {
  return <DriverProfileView />;
}
