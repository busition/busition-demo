import type { Metadata } from "next";

import { DriverBoardingView } from "@/components/driver-app";

export const metadata: Metadata = {
  title: "Boarding",
};

export default function DriverBoardingPage() {
  return <DriverBoardingView />;
}
