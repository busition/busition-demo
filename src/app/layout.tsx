import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Busition | Shuttle Operations, Rehearsed in Real Time",
  description:
    "Pre-launch interactive demo for Busition, the mobility operations platform that synchronizes drivers, riders, guardians, and live console teams.",
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
