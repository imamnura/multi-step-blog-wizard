import { defineConfig } from "vitest/config";

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
});
