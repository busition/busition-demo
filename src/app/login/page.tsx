import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";

import { BusitionLogo } from "@/components/busition-logo";
import { OperatorLoginForm } from "@/components/operator-login-form";

export const metadata: Metadata = {
  title: "Operator Login | Busition",
  description:
    "Operator sign-in page for the Busition Console demo with credential validation and console redirect.",
};

function LoginFormFallback() {
  return (
    <div className="rounded-[34px] border border-[rgba(35,35,35,0.08)] bg-white/92 p-6 shadow-[0_24px_60px_rgba(26,26,26,0.08)] backdrop-blur sm:p-8">
      <div className="space-y-4">
        <div className="h-4 w-28 rounded-full bg-[#ece9e0]" />
        <div className="h-10 w-3/4 rounded-[18px] bg-[#f3f1ea]" />
        <div className="h-14 rounded-[18px] bg-[#f3f1ea]" />
        <div className="h-14 rounded-[18px] bg-[#f3f1ea]" />
        <div className="h-14 rounded-[20px] bg-[#ffe1ba]" />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,193,71,0.2),transparent_20%),linear-gradient(180deg,#fffdfa_0%,#f7f6f0_48%,#eef2f6_100%)]">
      <div className="mx-auto flex max-w-[1160px] flex-col px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24 lg:pt-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" aria-label="Busition home">
            <BusitionLogo compact />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/88 px-4 py-2 text-sm font-semibold text-[var(--foreground-soft)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <section className="rounded-[36px] border border-[rgba(35,35,35,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.88)_0%,rgba(248,248,243,0.96)_100%)] p-7 shadow-[0_24px_60px_rgba(24,24,24,0.08)] sm:p-8">
            <p className="section-kicker">Console access</p>
            <h2 className="mt-6 max-w-[12ch] font-display text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)] sm:text-5xl">
              Open the operator workspace.
            </h2>
            <p className="mt-5 max-w-[34rem] text-base leading-8 text-[var(--foreground-soft)]">
              Sign in with the demo account to review routes, assignments, schedules,
              and partner operations.
            </p>

            <div className="mt-8 grid gap-3">
              {[
                "One workspace for route readiness and exceptions.",
                "Assignment, schedule, and roster pages stay connected.",
                "Demo sign-in redirects straight to Console.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[20px] border border-[var(--line)] bg-white/88 px-4 py-4 text-sm font-semibold text-[var(--foreground)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section>
            <Suspense fallback={<LoginFormFallback />}>
              <OperatorLoginForm />
            </Suspense>
          </section>
        </div>
      </div>
    </main>
  );
}
