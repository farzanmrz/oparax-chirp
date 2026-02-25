import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // The monorepo root has a package-lock.json that confuses Turbopack's
    // workspace root detection. Pin the root to frontend/ so it resolves
    // dependencies (like tailwindcss) from the correct node_modules.
    root: process.cwd(),
  },
};

export default nextConfig;
