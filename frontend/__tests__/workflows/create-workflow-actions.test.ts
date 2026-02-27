import { describe, it, expect, vi, beforeEach } from "vitest";
import { createWorkflow } from "@/app/dashboard/workflows/new/actions";

// Mock next/navigation
const mockRedirect = vi.fn();
vi.mock("next/navigation", () => ({
  redirect: (...args: unknown[]) => {
    mockRedirect(...args);
    throw new Error("NEXT_REDIRECT");
  },
}));

// Mock the Supabase server client
const mockGetUser = vi.fn();
const mockInsert = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: () => mockGetUser(),
    },
    from: () => ({
      insert: (data: unknown) => {
        mockInsert(data);
        return { error: mockInsert._error ?? null };
      },
    }),
  }),
}));

const validInput = {
  name: "",
  description: "Premier League transfer rumors",
  frequency: "30m",
  handles: ["FabrizioRomano"],
  styleRules: "",
  exampleTweet: "",
};

describe("createWorkflow action", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
    });
    mockInsert._error = null;
  });

  it("redirects to /dashboard on successful creation", async () => {
    await expect(createWorkflow(validInput)).rejects.toThrow("NEXT_REDIRECT");

    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: "user-123",
        description: "Premier League transfer rumors",
        frequency: "30m",
        handles: ["FabrizioRomano"],
        status: "active",
      })
    );
    expect(mockRedirect).toHaveBeenCalledWith("/dashboard");
  });

  it("uses provided name when given", async () => {
    await expect(
      createWorkflow({ ...validInput, name: "My Custom Name" })
    ).rejects.toThrow("NEXT_REDIRECT");

    const insertArg = mockInsert.mock.calls[0][0];
    expect(insertArg.name).toBe("My Custom Name");
  });

  it("saves style_rules and example_tweet when provided", async () => {
    await expect(
      createWorkflow({
        ...validInput,
        styleRules: "Always start with BREAKING:",
        exampleTweet: "BREAKING: Big transfer news here",
      })
    ).rejects.toThrow("NEXT_REDIRECT");

    const insertArg = mockInsert.mock.calls[0][0];
    expect(insertArg.style_rules).toBe("Always start with BREAKING:");
    expect(insertArg.example_tweet).toBe("BREAKING: Big transfer news here");
  });

  it("saves null for empty style_rules and example_tweet", async () => {
    await expect(createWorkflow(validInput)).rejects.toThrow("NEXT_REDIRECT");

    const insertArg = mockInsert.mock.calls[0][0];
    expect(insertArg.style_rules).toBeNull();
    expect(insertArg.example_tweet).toBeNull();
  });

  it("generates a name from description when name is empty", async () => {
    await expect(
      createWorkflow({
        ...validInput,
        name: "",
        description:
          "Premier League transfer rumors focusing on top 6 clubs and relegation",
        handles: [],
      })
    ).rejects.toThrow("NEXT_REDIRECT");

    const insertArg = mockInsert.mock.calls[0][0];
    expect(insertArg.name).toBeTruthy();
    expect(insertArg.name.length).toBeLessThanOrEqual(45);
    expect(insertArg.name.charAt(0)).toMatch(/[A-Z]/);
  });

  it("allows empty handles array", async () => {
    await expect(
      createWorkflow({ ...validInput, handles: [] })
    ).rejects.toThrow("NEXT_REDIRECT");

    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({ handles: [] })
    );
  });

  it("redirects to /login when user is not authenticated", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });

    await expect(createWorkflow(validInput)).rejects.toThrow("NEXT_REDIRECT");

    expect(mockRedirect).toHaveBeenCalledWith("/login");
    expect(mockInsert).not.toHaveBeenCalled();
  });

  // Validation — Supabase insert should NOT be called

  it("returns error when description is empty", async () => {
    const result = await createWorkflow({ ...validInput, description: "  " });

    expect(result).toEqual({ error: "Description is required." });
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("returns error when frequency is invalid", async () => {
    const result = await createWorkflow({ ...validInput, frequency: "5m" });

    expect(result).toEqual({ error: "Invalid frequency." });
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("returns error when more than 10 handles provided", async () => {
    const handles = Array.from({ length: 11 }, (_, i) => `handle${i}`);
    const result = await createWorkflow({ ...validInput, handles });

    expect(result).toEqual({ error: "Maximum 10 handles allowed." });
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("returns error when Supabase insert fails", async () => {
    mockInsert._error = { message: "DB error" };

    const result = await createWorkflow(validInput);

    expect(result).toEqual({
      error: "Failed to create workflow. Please try again.",
    });
  });
});
