import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const r = (p: string) => resolve(__dirname, p);

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    coverage: {
      reporter: ["text", "html", "lcov"],
      provider: "v8",
      reportsDirectory: "./coverage",
      include: [
        "components/**/*.tsx",
        "lib/**/*.ts",
        "hooks/**/*.ts",
        "context/**/*.tsx",
        "app/**/*.tsx",
        "**/*.test.{ts,tsx}",
        "tests/**/*.test.{ts,tsx}",
      ],
      exclude: [
        "**/*.stories.*",
        "app/layout.tsx", // optional
        "app/globals.css",
        "node_modules/**",
        "node_modules",
        ".next",
        "storybook-static",
        "coverage",
      ],
      // thresholds: {
      //   lines: 90,
      //   functions: 90,
      //   branches: 80,
      //   statements: 90,
      // },
    },
  },
  resolve: {
    alias: {
      "@": r("./"), // <-- penting: map alias '@' ke root
      "@/components": r("./components"),
      "@/context": r("./context"),
      "@/hooks": r("./hooks"),
      "@/lib": r("./lib"),
      "@/types": r("./types"),
      "@/app": r("./app"),
    },
  },
});
