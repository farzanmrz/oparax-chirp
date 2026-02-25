import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Welcome to Oparax</h1>
      <Link
        href="/signup"
        className="rounded-md bg-foreground px-6 py-2 text-sm font-medium text-background hover:bg-foreground/90"
      >
        Sign up
      </Link>
    </div>
  );
}
