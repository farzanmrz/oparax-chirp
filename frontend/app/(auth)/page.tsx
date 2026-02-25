"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signup } from "./signup/actions";
import { login } from "./login/actions";

function AuthPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams.get("tab") ?? "signup";
  const error = searchParams.get("error");
  const isSignIn = tab === "signin";

  function switchTab(newTab: string) {
    router.replace(`/?tab=${newTab}`, { scroll: false });
  }

  return (
    <>
      {/* Tab bar */}
      <div className="flex border-b border-border">
        <button
          type="button"
          onClick={() => switchTab("signup")}
          className={`flex-1 py-2 text-center text-sm font-medium transition-colors ${
            !isSignIn
              ? "border-b-2 border-primary text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sign Up
        </button>
        <button
          type="button"
          onClick={() => switchTab("signin")}
          className={`flex-1 py-2 text-center text-sm font-medium transition-colors ${
            isSignIn
              ? "border-b-2 border-primary text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sign In
        </button>
      </div>

      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">
          {isSignIn ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isSignIn
            ? "Sign in to your Oparax account"
            : "Sign up to get started with Oparax"}
        </p>
      </div>

      {/* Error alert */}
      {error && (
        <div
          role="alert"
          className="rounded-md bg-destructive-bg p-3 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      {/* Sign Up form */}
      {!isSignIn && (
        <form action={signup} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="signup-email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="signup-password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="At least 6 characters"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
          >
            Sign up
          </button>
        </form>
      )}

      {/* Sign In form */}
      {isSignIn && (
        <form action={login} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="signin-email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="signin-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="signin-password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="signin-password"
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="Your password"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
          >
            Sign in
          </button>
        </form>
      )}

      {/* Footer link */}
      <p className="text-center text-sm text-muted-foreground">
        {isSignIn ? (
          <>
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => switchTab("signup")}
              className="font-medium text-primary underline hover:text-primary-hover"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => switchTab("signin")}
              className="font-medium text-primary underline hover:text-primary-hover"
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </>
  );
}

function AuthPageFallback() {
  return (
    <>
      <div className="flex border-b border-border">
        <div className="flex-1 py-2 text-center text-sm font-medium border-b-2 border-primary text-foreground">
          Sign Up
        </div>
        <div className="flex-1 py-2 text-center text-sm font-medium text-muted-foreground">
          Sign In
        </div>
      </div>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Sign up to get started with Oparax
        </p>
      </div>
      <div className="space-y-4">
        <div className="h-[68px] animate-pulse rounded-md bg-muted" />
        <div className="h-[68px] animate-pulse rounded-md bg-muted" />
        <div className="h-10 animate-pulse rounded-md bg-muted" />
      </div>
    </>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<AuthPageFallback />}>
      <AuthPageContent />
    </Suspense>
  );
}
