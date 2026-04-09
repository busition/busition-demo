"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ChevronDown, LoaderCircle } from "lucide-react";
import { FormEvent, useState } from "react";

const DEMO_EMAIL = "contact@wookingwoo.com";
const DEMO_PASSWORD = "pilotconsole";

function getNextPath(rawNext: string | null) {
  if (!rawNext || !rawNext.startsWith("/")) {
    return "/console";
  }

  return rawNext;
}

export function OperatorLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberDevice, setRememberDevice] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDemoDetailsOpen, setIsDemoDetailsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextPath = getNextPath(searchParams.get("next"));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setErrorMessage("Enter your operator email and password to continue.");
      return;
    }

    if (normalizedEmail !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setErrorMessage("Those credentials do not match the preview workspace.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    if (rememberDevice) {
      window.sessionStorage.setItem("busition-demo-last-login", DEMO_EMAIL);
    } else {
      window.sessionStorage.removeItem("busition-demo-last-login");
    }

    await new Promise((resolve) => {
      window.setTimeout(resolve, 700);
    });

    router.push(nextPath);
  }

  function fillDemoCredentials() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setErrorMessage("");
  }

  return (
    <div className="rounded-[38px] border border-[rgba(35,35,35,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.97)_0%,rgba(248,248,244,0.98)_100%)] p-6 shadow-[0_30px_80px_rgba(26,26,26,0.12)] backdrop-blur sm:p-8">
      <div className="flex flex-col gap-6">
        <div className="max-w-[24rem]">
          <div>
            <p className="section-kicker">Console access</p>
            <h1 className="mt-5 font-display text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-4xl">
              Operator sign in
            </h1>
            <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
              Open the preview console to review routes, schedules, assignments, and live operations.
            </p>
          </div>
        </div>

        <div className="rounded-[24px] border border-[var(--line)] bg-white/84 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-[26rem]">
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Preview workspace
              </p>
              <p className="mt-1 text-sm leading-6 text-[var(--foreground-soft)]">
                Use the shared demo account when you want a quick look inside the preview console.
              </p>
            </div>

            <button
              type="button"
              onClick={fillDemoCredentials}
              className="outline-button inline-flex h-10 shrink-0 items-center justify-center rounded-full px-4 text-sm font-semibold transition-colors hover:text-[var(--accent-deep)]"
            >
              Autofill demo
            </button>
          </div>

          <button
            type="button"
            aria-expanded={isDemoDetailsOpen}
            aria-controls="demo-credentials-panel"
            onClick={() => setIsDemoDetailsOpen((current) => !current)}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground-soft)] transition-colors hover:text-[var(--foreground)]"
          >
            {isDemoDetailsOpen ? "Hide sample credentials" : "Show sample credentials"}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isDemoDetailsOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDemoDetailsOpen ? (
            <div
              id="demo-credentials-panel"
              className="mt-4 grid gap-2 border-t border-[var(--line)] pt-4 sm:grid-cols-2"
            >
              <div className="rounded-[16px] bg-[rgba(252,252,250,0.92)] px-4 py-3">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
                  Email
                </p>
                <p className="mt-2 break-all text-sm font-semibold text-[var(--foreground)]">
                  {DEMO_EMAIL}
                </p>
              </div>

              <div className="rounded-[16px] bg-[rgba(252,252,250,0.92)] px-4 py-3">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
                  Password
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
                  {DEMO_PASSWORD}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="operator-email"
              className="text-sm font-semibold text-[var(--foreground)]"
            >
              Work email
            </label>
            <input
              id="operator-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@company.com"
              className="w-full rounded-[20px] border border-[var(--line)] bg-[rgba(252,252,250,0.92)] px-4 py-4 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--foreground-soft)] focus:border-[rgba(255,154,31,0.42)] focus:bg-white focus-visible:ring-4 focus-visible:ring-[rgba(255,154,31,0.12)]"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="operator-password"
              className="text-sm font-semibold text-[var(--foreground)]"
            >
              Password
            </label>
            <input
              id="operator-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-[20px] border border-[var(--line)] bg-[rgba(252,252,250,0.92)] px-4 py-4 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--foreground-soft)] focus:border-[rgba(255,154,31,0.42)] focus:bg-white focus-visible:ring-4 focus-visible:ring-[rgba(255,154,31,0.12)]"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-3 rounded-[18px] border border-[var(--line)] bg-[rgba(252,252,250,0.92)] px-4 py-3 text-sm text-[var(--foreground)]">
              <input
                type="checkbox"
                checked={rememberDevice}
                onChange={(event) => setRememberDevice(event.target.checked)}
                className="h-4 w-4 rounded border-[var(--line)] text-[var(--accent)]"
              />
              <span className="font-medium">Remember this browser</span>
            </label>

            <p className="px-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              Preview access only
            </p>
          </div>

          {errorMessage ? (
            <div className="rounded-[18px] border border-[rgba(218,60,60,0.12)] bg-[rgba(218,60,60,0.06)] px-4 py-3 text-sm text-[#a63c3c]">
              {errorMessage}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="orange-button inline-flex w-full items-center justify-center gap-2 rounded-[22px] px-5 py-4 text-sm font-semibold transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-wait disabled:opacity-80"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Opening Console
              </>
            ) : (
              <>
                Open preview Console
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-[rgba(35,35,35,0.06)] pt-6 text-sm text-[var(--foreground-soft)]">
          <Link href="/policy/service" className="transition-colors hover:text-[var(--foreground)]">
            Terms
          </Link>
          <span className="hidden h-1 w-1 rounded-full bg-[rgba(35,35,35,0.18)] sm:block" />
          <Link href="/policy/privacy" className="transition-colors hover:text-[var(--foreground)]">
            Privacy
          </Link>
        </div>
      </div>
    </div>
  );
}
