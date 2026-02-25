import { describe, it, expect, vi, beforeEach } from "vitest";
import { signup } from "../actions";

// Mock next/navigation
const mockRedirect = vi.fn();
vi.mock("next/navigation", () => ({
  redirect: (...args: unknown[]) => {
    mockRedirect(...args);
    throw new Error("NEXT_REDIRECT");
  },
}));

// Mock the Supabase server client
const mockSignUp = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      signUp: (...args: unknown[]) => mockSignUp(...args),
    },
  }),
}));

function createFormData(email: string, password: string): FormData {
  const formData = new FormData();
  formData.set("email", email);
  formData.set("password", password);
  return formData;
}

describe("signup action", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects to /signup/check-email on successful signup", async () => {
    mockSignUp.mockResolvedValue({
      data: { user: { id: "123", email: "testuser@oparax.com" }, session: null },
      error: null,
    });

    const formData = createFormData("testuser@oparax.com", "testPassword123");

    await expect(signup(formData)).rejects.toThrow("NEXT_REDIRECT");
    expect(mockSignUp).toHaveBeenCalledWith({
      email: "testuser@oparax.com",
      password: "testPassword123",
    });
    expect(mockRedirect).toHaveBeenCalledWith("/signup/check-email");
  });

  it("redirects with error on weak password", async () => {
    mockSignUp.mockResolvedValue({
      data: { user: null, session: null },
      error: {
        message: "Password should be at least 6 characters",
        code: "weak_password",
        status: 422,
      },
    });

    const formData = createFormData("testuser@oparax.com", "short");

    await expect(signup(formData)).rejects.toThrow("NEXT_REDIRECT");
    expect(mockRedirect).toHaveBeenCalledWith(
      "/signup?error=Password%20should%20be%20at%20least%206%20characters"
    );
  });

  it("redirects with error on invalid email format", async () => {
    mockSignUp.mockResolvedValue({
      data: { user: null, session: null },
      error: {
        message: "Unable to validate email address: invalid format",
        code: "validation_failed",
        status: 400,
      },
    });

    const formData = createFormData("not-an-email", "testPassword123");

    await expect(signup(formData)).rejects.toThrow("NEXT_REDIRECT");
    expect(mockRedirect).toHaveBeenCalledWith(
      expect.stringContaining("/signup?error=")
    );
  });

  it("redirects with error when rate limited", async () => {
    mockSignUp.mockResolvedValue({
      data: { user: null, session: null },
      error: {
        message: "For security purposes, you can only request this after 60 seconds.",
        code: "over_request_rate_limit",
        status: 429,
      },
    });

    const formData = createFormData("testuser@oparax.com", "testPassword123");

    await expect(signup(formData)).rejects.toThrow("NEXT_REDIRECT");
    expect(mockRedirect).toHaveBeenCalledWith(
      expect.stringContaining("/signup?error=")
    );
  });

  it("redirects with error on unexpected server failure", async () => {
    mockSignUp.mockResolvedValue({
      data: { user: null, session: null },
      error: {
        message: "An unexpected error occurred",
        code: "unexpected_failure",
        status: 500,
      },
    });

    const formData = createFormData("testuser@oparax.com", "testPassword123");

    await expect(signup(formData)).rejects.toThrow("NEXT_REDIRECT");
    expect(mockRedirect).toHaveBeenCalledWith(
      expect.stringContaining("/signup?error=")
    );
  });
});
