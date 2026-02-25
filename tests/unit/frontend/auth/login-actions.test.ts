import { describe, it, expect, vi, beforeEach } from "vitest";
import { login } from "@/app/(auth)/login/actions";

// Mock next/navigation
const mockRedirect = vi.fn();
vi.mock("next/navigation", () => ({
  redirect: (...args: unknown[]) => {
    mockRedirect(...args);
    throw new Error("NEXT_REDIRECT");
  },
}));

// Mock the Supabase server client
const mockSignInWithPassword = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      signInWithPassword: (...args: unknown[]) =>
        mockSignInWithPassword(...args),
    },
  }),
}));

function createFormData(email: string, password: string): FormData {
  const formData = new FormData();
  formData.set("email", email);
  formData.set("password", password);
  return formData;
}

describe("login action", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects to /dashboard on successful login", async () => {
    mockSignInWithPassword.mockResolvedValue({
      data: {
        user: { id: "123", email: "testuser@oparax.com" },
        session: { access_token: "token" },
      },
      error: null,
    });

    const formData = createFormData("testuser@oparax.com", "testPassword123");

    await expect(login(formData)).rejects.toThrow("NEXT_REDIRECT");
    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: "testuser@oparax.com",
      password: "testPassword123",
    });
    expect(mockRedirect).toHaveBeenCalledWith("/dashboard");
  });

  it("redirects with error on invalid credentials", async () => {
    mockSignInWithPassword.mockResolvedValue({
      data: { user: null, session: null },
      error: {
        message: "Invalid login credentials",
        status: 400,
      },
    });

    const formData = createFormData("testuser@oparax.com", "wrongPassword");

    await expect(login(formData)).rejects.toThrow("NEXT_REDIRECT");
    expect(mockRedirect).toHaveBeenCalledWith(
      "/?tab=signin&error=Invalid%20login%20credentials"
    );
  });

  it("redirects with error when email not confirmed", async () => {
    mockSignInWithPassword.mockResolvedValue({
      data: { user: null, session: null },
      error: {
        message: "Email not confirmed",
        status: 400,
      },
    });

    const formData = createFormData("testuser@oparax.com", "testPassword123");

    await expect(login(formData)).rejects.toThrow("NEXT_REDIRECT");
    expect(mockRedirect).toHaveBeenCalledWith(
      "/?tab=signin&error=Email%20not%20confirmed"
    );
  });

  it("redirects with error when rate limited", async () => {
    mockSignInWithPassword.mockResolvedValue({
      data: { user: null, session: null },
      error: {
        message: "For security purposes, you can only request this after 60 seconds.",
        status: 429,
      },
    });

    const formData = createFormData("testuser@oparax.com", "testPassword123");

    await expect(login(formData)).rejects.toThrow("NEXT_REDIRECT");
    expect(mockRedirect).toHaveBeenCalledWith(
      expect.stringContaining("/?tab=signin&error=")
    );
  });
});
