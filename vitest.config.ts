import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
    },
    setupFiles: [
      "tests/setup.ts",
      "tests/app-router-context-provider-mock.tsx",
    ],
    deps: {
      optimizer: {
        web: {
          enabled: true,
          include: ["swr", "use-sync-external-store"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": "",
    },
  },
});
