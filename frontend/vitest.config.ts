import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

const nodeModules = path.resolve(__dirname, "node_modules");

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [path.resolve(__dirname, "..")],
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["../tests/unit/frontend/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      next: path.join(nodeModules, "next"),
      react: path.join(nodeModules, "react"),
      "react-dom": path.join(nodeModules, "react-dom"),
      "@supabase": path.join(nodeModules, "@supabase"),
      "@testing-library": path.join(nodeModules, "@testing-library"),
    },
  },
});
