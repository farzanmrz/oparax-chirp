import { describe, it, expect } from "vitest";
import { validateAuthForm, isValidationError } from "@/lib/validation";

function createFormData(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    fd.set(key, value);
  }
  return fd;
}

describe("validateAuthForm", () => {
  it("returns validated email and password for valid input", () => {
    const result = validateAuthForm(
      createFormData({ email: "test@example.com", password: "secure123" })
    );
    expect(isValidationError(result)).toBe(false);
    if (!isValidationError(result)) {
      expect(result.email).toBe("test@example.com");
      expect(result.password).toBe("secure123");
    }
  });

  it("trims whitespace from email", () => {
    const result = validateAuthForm(
      createFormData({ email: "  test@example.com  ", password: "secure123" })
    );
    expect(isValidationError(result)).toBe(false);
    if (!isValidationError(result)) {
      expect(result.email).toBe("test@example.com");
    }
  });

  it("returns error when email is missing", () => {
    const result = validateAuthForm(
      createFormData({ password: "secure123" })
    );
    expect(isValidationError(result)).toBe(true);
  });

  it("returns error when password is missing", () => {
    const result = validateAuthForm(
      createFormData({ email: "test@example.com" })
    );
    expect(isValidationError(result)).toBe(true);
  });

  it("returns error when email has no @", () => {
    const result = validateAuthForm(
      createFormData({ email: "notanemail", password: "secure123" })
    );
    expect(isValidationError(result)).toBe(true);
  });

  it("returns error when password is shorter than 6 characters", () => {
    const result = validateAuthForm(
      createFormData({ email: "test@example.com", password: "short" })
    );
    expect(isValidationError(result)).toBe(true);
  });

  it("returns error when email field is a File object", () => {
    const fd = new FormData();
    fd.set("email", new File(["content"], "hack.txt"));
    fd.set("password", "secure123");
    const result = validateAuthForm(fd);
    expect(isValidationError(result)).toBe(true);
  });
});
