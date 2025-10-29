// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format

// eslint.config.ts
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import pluginImport from "eslint-plugin-import";

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  // Tambahkan block ini supaya alias TS (baseUrl/paths) dikenali oleh rule import/no-unresolved
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: { import: pluginImport },
    settings: {
      "import/resolver": {
        // Baca paths dari tsconfig.json (supports "baseUrl" & "paths")
        typescript: {
          // auto-detect tsconfig di root; set true agar pakai tsconfig.* yang ada
          project: true,
        },
      },
    },
    rules: {
      // Optional: kalau masih “berisik”, pastikan rule ini aktif normal (bukan off)
      // 'import/no-unresolved': 'error',
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
