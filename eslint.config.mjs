import parser from "@typescript-eslint/parser";
import pluginNext from "@next/eslint-plugin-next";

export default [
  {
    name: "ESLint Config - nextjs",
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@next/next": pluginNext,
    },
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      "no-unused-vars": "error",
      "sort-imports": "error",
      "react-hooks/exhaustive-deps": "off",
    },
  },
];
