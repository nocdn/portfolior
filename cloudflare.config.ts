import { defineConfig } from "cf/config"

export default defineConfig(({ mode, isPreview }) => ({
  accountId: "623212ae94052c4c70c6a1775a69703f",
  worker: {
    name: mode === "staging" ? "portfolior-testing" : "portfolior",
    compatibilityDate: "2026-09-19",
    compatibilityFlags: ["nodejs_compat"],
    entrypoint: "@tanstack/react-start/server-entry",
    domains: mode === "production" && !isPreview ? ["bartoszbak.org", "www.bartoszbak.org"] : [],
    workersDev: true,
    observability: {
      enabled: true,
    },
  },
}))
