"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, LoaderCircle } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextPath = getNextPath(searchParams.get("next"));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setErrorMessage("Enter your operator email and password.");
      return;
    }

    if (normalizedEmail !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setErrorMessage("Invalid credentials. Use the demo account to continue.");
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
    <div className="rounded-[34px] border border-[rgba(35,35,35,0.08)] bg-white/92 p-6 shadow-[0_24px_60px_rgba(26,26,26,0.08)] backdrop-blur sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--foreground-soft)]">
            Operator access
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.05em] text-[var(--foreground)] sm:text-4xl">
            Sign in to Console
          </h1>
          <p className="mt-3 max-w-md text-sm leading-7 text-[var(--foreground-soft)]">
            Use the demo account to open the operator workspace.
          </p>
        </div>

        <button
          type="button"
          onClick={fillDemoCredentials}
          className="rounded-full border border-[rgba(255,154,31,0.24)] bg-[rgba(255,154,31,0.1)] px-4 py-2 text-xs font-semibold text-[var(--accent-deep)] transition-colors hover:bg-[rgba(255,154,31,0.16)]"
        >
          Use demo account
        </button>
      </div>

      <div className="mt-6 rounded-[20px] border border-[var(--line)] bg-[#fcfcfa] px-4 py-4 text-sm text-[var(--foreground-soft)]">
        Demo email: <span className="font-semibold text-[var(--foreground)]">{DEMO_EMAIL}</span>
      </div>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="operator-email" className="text-sm font-semibold text-[var(--foreground)]">
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
            className="w-full rounded-[18px] border border-[var(--line)] bg-[#fcfcfa] px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--foreground-soft)] focus:border-[rgba(255,154,31,0.42)]"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="operator-password" className="text-sm font-semibold text-[var(--foreground)]">
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
            className="w-full rounded-[18px] border border-[var(--line)] bg-[#fcfcfa] px-4 py-3.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--foreground-soft)] focus:border-[rgba(255,154,31,0.42)]"
          />
        </div>

        <label className="flex items-center gap-3 rounded-[18px] border border-[var(--line)] bg-[#fcfcfa] px-4 py-3 text-sm text-[var(--foreground)]">
          <input
            type="checkbox"
            checked={rememberDevice}
            onChange={(event) => setRememberDevice(event.target.checked)}
            className="h-4 w-4 rounded border-[var(--line)] text-[var(--accent)]"
          />
          Remember this device
        </label>

        {errorMessage ? (
          <div className="rounded-[18px] border border-[rgba(218,60,60,0.12)] bg-[rgba(218,60,60,0.06)] px-4 py-3 text-sm text-[#a63c3c]">
            {errorMessage}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="orange-button inline-flex w-full items-center justify-center gap-2 rounded-[20px] px-5 py-4 text-sm font-semibold transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-wait disabled:opacity-80"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Signing in
            </>
          ) : (
            <>
              Open Console
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between gap-4 text-sm text-[var(--foreground-soft)]">
        <Link href="/policy/service" className="transition-colors hover:text-[var(--foreground)]">
          Terms
        </Link>
        <Link href="/policy/privacy" className="transition-colors hover:text-[var(--foreground)]">
          Privacy
        </Link>
      </div>
    </div>
  );
}
