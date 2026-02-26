// Form validation — checks email format and password length before sending to Supabase.
export interface ValidationResult {
  email: string;
  password: string;
}

export interface ValidationError {
  message: string;
}

export function validateAuthForm(
  formData: FormData
): ValidationResult | ValidationError {
  const rawEmail = formData.get("email");
  const rawPassword = formData.get("password");

  if (!rawEmail || typeof rawEmail !== "string") {
    return { message: "Email is required." };
  }
  if (!rawPassword || typeof rawPassword !== "string") {
    return { message: "Password is required." };
  }

  const email = rawEmail.trim();
  const password = rawPassword;

  if (email.length === 0) {
    return { message: "Email is required." };
  }
  if (!email.includes("@")) {
    return { message: "Please enter a valid email address." };
  }
  if (password.length < 6) {
    return { message: "Password must be at least 6 characters." };
  }

  return { email, password };
}

export function isValidationError(
  result: ValidationResult | ValidationError
): result is ValidationError {
  return "message" in result;
}
