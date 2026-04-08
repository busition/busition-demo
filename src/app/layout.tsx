import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";

import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body-face",
});

const displayFont = Sora({
  subsets: ["latin"],
  variable: "--font-display-face",
});

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
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
