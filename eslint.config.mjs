import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Flat config (required by ESLint 9, which is what Next.js 15 ships with
// by default). Using next/core-web-vitals + next/typescript matches what
// `create-next-app` generates — keeps linting consistent with Vercel's
// build environment so `next build` doesn't fail on a config mismatch.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
