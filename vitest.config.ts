import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
// import { playwright } from "@vitest/browser/providers/playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const r = (p: string) => resolve(__dirname, p);

export default defineConfig({
  resolve: {
    alias: {
      "@": r("./"),
      "@/components": r("./components"),
      "@/context": r("./context"),
      "@/hooks": r("./hooks"),
      "@/lib": r("./lib"),
      "@/types": r("./types"),
      "@/app": r("./app"),
    },
  },

  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,

    include: ["**/*.test.{ts,tsx}", "tests/**/*.test.{ts,tsx}"],
    exclude: [
      "node_modules",
      ".next",
      "storybook-static",
      "coverage",
      "**/*.stories.*",
    ],

    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      include: [
        "components/**/*.tsx",
        "lib/**/*.ts",
        "hooks/**/*.ts",
        "context/**/*.tsx",
        "app/**/*.tsx",
        "**/*.test.{ts,tsx}",
      ],
      exclude: [
        "**/*.stories.*",
        "app/globals.css",
        "app/layout.tsx",
        "node_modules/**",
      ],
      // threshold (boleh dinaikkan nanti)
      // thresholds: {
      //   lines: 80,
      //   functions: 80,
      //   branches: 70,
      //   statements: 80,
      // },
    },

    // Project tambahan: jalankan test terhadap stories (opsional)
    projects: [
      {
        extends: true,
        plugins: [storybookTest({ configDir: r(".storybook") })],
        test: {
          name: "storybook",
          // browser: {
          //   enabled: true,
          //   headless: true,
          //   // provider: playwright({}),
          //   instances: [{ browser: "chromium" }],
          // },
          setupFiles: [".storybook/vitest.setup.ts"], // buat file ini jika perlu mock
        },
      },
    ],
  },
});
