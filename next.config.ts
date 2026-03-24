import type { NextConfig } from "next";

/**
 * Next.js Configuration
 *
 * Supports dual build targets:
 * - Static export for GitHub Pages: BUILD_TARGET=static npm run build
 * - Full build for AWS Lambda (SST): npm run build
 *
 * Configuration options:
 * - output: 'export'   → Static site generation (only when BUILD_TARGET=static)
 * - trailingSlash      → Consistent URL handling for static hosting
 * - images.unoptimized → Image optimization disabled (static assets)
 */

const isStaticBuild = process.env.BUILD_TARGET === "static";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(isStaticBuild && { output: "export" }),
};

export default nextConfig;
