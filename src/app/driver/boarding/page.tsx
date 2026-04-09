import type { Metadata } from "next";

import { DriverBoardingView } from "@/components/driver-app";

export const metadata: Metadata = {
  title: "Boarding Control",
  description:
    "Confirm riders and resolve boarding exceptions in the Busition Driver boarding workflow.",
};

export default function DriverBoardingPage() {
  return <DriverBoardingView />;
}
