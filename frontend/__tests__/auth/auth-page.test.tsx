import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import AuthPage from "@/app/(auth)/page";

// Mock next/navigation
const mockReplace = vi.fn();
vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn().mockReturnValue({
    get: vi.fn().mockReturnValue(null),
  }),
  useRouter: vi.fn().mockReturnValue({
    replace: (...args: unknown[]) => mockReplace(...args),
  }),
}));

// Mock the server actions
vi.mock("@/app/(auth)/signup/actions", () => ({
  signup: vi.fn(),
}));
vi.mock("@/app/(auth)/login/actions", () => ({
  login: vi.fn(),
}));

import { useSearchParams } from "next/navigation";

describe("AuthPage", () => {
  beforeEach(() => {
    vi.mocked(useSearchParams).mockReturnValue({
      get: vi.fn().mockReturnValue(null),
    } as ReturnType<typeof useSearchParams>);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders with Sign Up tab active by default", () => {
    render(<AuthPage />);

    expect(screen.getByText("Create an account")).toBeInTheDocument();
    expect(screen.getByText("Sign up to get started with Oparax")).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    // Submit button uses exact lowercase "Sign up" (vs tab's capitalized "Sign Up")
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });

  it("renders Sign In form when tab=signin", () => {
    vi.mocked(useSearchParams).mockReturnValue({
      get: vi.fn().mockImplementation((key: string) =>
        key === "tab" ? "signin" : null
      ),
    } as ReturnType<typeof useSearchParams>);

    render(<AuthPage />);

    expect(screen.getByText("Welcome back")).toBeInTheDocument();
    expect(screen.getByText("Sign in to your Oparax account")).toBeInTheDocument();
    // Submit button is type="submit", footer link is type="button" — target the submit
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("displays error from search params", () => {
    vi.mocked(useSearchParams).mockReturnValue({
      get: vi.fn().mockImplementation((key: string) => {
        if (key === "error") return "Invalid email or password.";
        if (key === "tab") return "signin";
        return null;
      }),
    } as ReturnType<typeof useSearchParams>);

    render(<AuthPage />);

    expect(screen.getByText("Invalid email or password.")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("has footer text to switch between tabs", () => {
    render(<AuthPage />);

    // On signup view, footer says "Already have an account?"
    expect(screen.getByText(/Already have an account/)).toBeInTheDocument();
    // Footer has a "Sign in" button (only one since the submit button says "Sign up" on this tab)
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("has both tab buttons visible", () => {
    render(<AuthPage />);

    // Tab bar has both "Sign Up" and "Sign In" buttons (capitalized)
    const buttons = screen.getAllByRole("button");
    const buttonTexts = buttons.map((b) => b.textContent);
    expect(buttonTexts).toContain("Sign Up");
    expect(buttonTexts).toContain("Sign In");
  });
});
