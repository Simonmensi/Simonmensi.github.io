import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: [resolve(__dirname, "tests/setup.ts")],
    setupFilesAfterEnv: [resolve(__dirname, "tests/setup-after-env.ts")],
    coverage: {
      provider: "v8",
      include: ["lib/**"],
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
});
