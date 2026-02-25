const ERROR_MAP: Record<string, string> = {
  // Login errors
  "Invalid login credentials": "Invalid email or password.",
  "Email not confirmed": "Invalid email or password.",
  "Invalid Refresh Token: Refresh Token Not Found":
    "Your session has expired. Please sign in again.",

  // Signup errors
  "User already registered":
    "Unable to create account. Please try again or sign in.",
  "Password should be at least 6 characters":
    "Password must be at least 6 characters.",
  "Unable to validate email address: invalid format":
    "Please enter a valid email address.",

  // Rate limiting
  "For security purposes, you can only request this after 60 seconds.":
    "Too many attempts. Please wait a moment and try again.",
};

const DEFAULT_ERROR = "Something went wrong. Please try again.";

export function mapAuthError(rawMessage: string): string {
  return ERROR_MAP[rawMessage] ?? DEFAULT_ERROR;
}
