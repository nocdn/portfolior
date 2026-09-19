import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,
  devIndicators: false,
  cacheComponents: true,
  experimental: {
    optimizePackageImports: ["shiki", "motion", "lucide-react"],
  },
}

export default nextConfig
