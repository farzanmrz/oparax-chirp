import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SignupPage from "../page";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn().mockReturnValue({
    get: vi.fn().mockReturnValue(null),
  }),
}));

// Mock the signup action (required because the form references it)
vi.mock("../actions", () => ({
  signup: vi.fn(),
}));

// Import the mock so we can override it per-test
import { useSearchParams } from "next/navigation";

describe("SignupPage", () => {
  it("renders the signup form with email and password inputs", () => {
    render(<SignupPage />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  it("displays error message from URL search params", () => {
    vi.mocked(useSearchParams).mockReturnValue({
      get: vi.fn().mockImplementation((key: string) =>
        key === "error" ? "Password should be at least 6 characters" : null
      ),
    } as ReturnType<typeof useSearchParams>);

    render(<SignupPage />);

    expect(
      screen.getByText("Password should be at least 6 characters")
    ).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("has a link to the login page", () => {
    vi.mocked(useSearchParams).mockReturnValue({
      get: vi.fn().mockReturnValue(null),
    } as ReturnType<typeof useSearchParams>);

    render(<SignupPage />);

    const loginLinks = screen.getAllByRole("link", { name: /log in/i });
    expect(loginLinks.length).toBeGreaterThanOrEqual(1);
    expect(loginLinks[0]).toHaveAttribute("href", "/login");
  });
});
