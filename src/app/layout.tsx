import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Busition | Real-Time Shuttle Operations",
  description:
    "Busition is the shuttle operations platform that keeps riders, guardians, drivers, and operators aligned on live ETA, boarding status, and service changes.",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
