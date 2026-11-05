import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

/**
 * `eslint-config-next` still ships as an eslintrc-style config, so it is loaded
 * through FlatCompat. Flat config is the only format ESLint 9 supports, and
 * every rule the Next.js defaults enable is kept as-is.
 */
const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "public/**",
      "scripts/**",
      "tsconfig.tsbuildinfo",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // The site links to itself constantly; `next/link` is enforced by the
      // Next.js rules above, so the plain-anchor warning is noise.
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];

export default config;
