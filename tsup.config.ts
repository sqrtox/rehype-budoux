import { defineConfig } from "tsup";

export default defineConfig({
  target: "esnext",
  format: "esm",
  clean: true,
  dts: true,
  entry: ["src/**/*.ts", "!src/**/*.test.ts"],
});
