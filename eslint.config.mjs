import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  rules: {
    'react/no-unescaped-entities': 0
  }
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier', 'plugin:@next/next/recommended'),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@react/no-unescaped-entities': 'off'
    }
  }
];

export default eslintConfig;
