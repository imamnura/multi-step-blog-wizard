// This file has been automatically migrated to valid ESM format by Storybook.
import type { StorybookConfig } from "@storybook/react-vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(fileURLToPath(import.meta.url));
const r = (p: string) => resolve(__dirname, "..", p); // dari .storybook ke root

const config: StorybookConfig = {
  stories: [
    // cari semua stories di komponen & app
    "../components/**/*.stories.@(tsx|mdx)",
    "../app/**/*.stories.@(tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    // '@chromatic-com/storybook', // opsional: aktifkan kalau pakai Chromatic
    "@storybook/addon-vitest"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  // Pastikan alias sama dengan project (Next/Vitest)
  viteFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...(config.resolve ?? {}),
        alias: {
          ...(config.resolve?.alias ?? {}),
          "@": r("."),
          "@/components": r("components"),
          "@/context": r("context"),
          "@/hooks": r("hooks"),
          "@/lib": r("lib"),
          "@/types": r("types"),
          "@/app": r("app"),
        },
      },
    };
  },
};

export default config;
