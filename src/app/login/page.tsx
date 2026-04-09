import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";

import { BusitionLogo } from "@/components/busition-logo";
import { OperatorLoginForm } from "@/components/operator-login-form";

export const metadata: Metadata = {
  title: "Console Access | Busition",
  description:
    "Access the Busition Console preview for route coverage, schedule control, and live shuttle operations.",
};

function LoginFormFallback() {
  return (
    <div className="rounded-[38px] border border-[rgba(35,35,35,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,248,244,0.98)_100%)] p-6 shadow-[0_30px_80px_rgba(26,26,26,0.12)] backdrop-blur sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="h-9 w-32 rounded-full bg-[#ece9e0]" />
        <div className="h-9 w-28 rounded-full bg-[#f3f1ea]" />
      </div>

      <div className="mt-6 h-4 w-24 rounded-full bg-[#ece9e0]" />
      <div className="mt-4 h-11 w-2/3 rounded-[18px] bg-[#f3f1ea]" />
      <div className="mt-3 h-5 w-full max-w-[24rem] rounded-full bg-[#f5f2ea]" />

      <div className="mt-8 rounded-[24px] border border-[rgba(35,35,35,0.06)] bg-[#fcfbf7] p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="h-4 w-32 rounded-full bg-[#ece9e0]" />
            <div className="mt-3 h-4 w-full max-w-[22rem] rounded-full bg-[#f3f1ea]" />
          </div>
          <div className="h-10 w-28 rounded-full bg-[#f3f1ea]" />
        </div>

        <div className="mt-4 h-4 w-40 rounded-full bg-[#ece9e0]" />
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="h-16 rounded-[16px] bg-[#f3f1ea]" />
          <div className="h-16 rounded-[16px] bg-[#f3f1ea]" />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="h-24 rounded-[20px] bg-[#f3f1ea]" />
        <div className="h-24 rounded-[20px] bg-[#f3f1ea]" />
        <div className="h-14 rounded-[18px] bg-[#f3f1ea]" />
        <div className="h-14 rounded-[20px] bg-[#ffe1ba]" />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fffefb_0%,#f7f5ef_50%,#edf2f7_100%)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[340px] bg-[radial-gradient(circle_at_top,rgba(255,194,88,0.28),transparent_58%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[22%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0)_72%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,214,151,0.34)_0%,rgba(255,214,151,0)_70%)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(186,219,255,0.28)_0%,rgba(186,219,255,0)_70%)] blur-3xl"
      />

      <div className="relative mx-auto flex min-h-screen max-w-[1120px] flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" aria-label="Busition home">
            <BusitionLogo compact />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/88 px-4 py-2 text-sm font-semibold text-[var(--foreground-soft)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to overview
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-10 sm:py-14 lg:py-16">
          <section className="w-full max-w-[560px]">
            <Suspense fallback={<LoginFormFallback />}>
              <OperatorLoginForm />
            </Suspense>
          </section>
        </div>
      </div>
    </main>
  );
}
