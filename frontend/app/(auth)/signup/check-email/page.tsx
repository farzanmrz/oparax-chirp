import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <div className="space-y-4 text-center">
      <h1 className="text-2xl font-bold">Check your email</h1>
      <p className="text-sm text-muted-foreground">
        We sent you a confirmation link. Please check your email and click the
        link to activate your account.
      </p>
      <Link
        href="/?tab=signin"
        className="inline-block text-sm font-medium text-primary underline hover:text-primary-hover"
      >
        Back to log in
      </Link>
    </div>
  );
}
