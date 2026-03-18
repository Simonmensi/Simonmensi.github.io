import type { NextConfig } from "next";

/**
 * GitHub Pages SSG Configuration
 *
 * - output: 'export'   → Generates a fully static site in the /out directory.
 * - basePath           → Must match the GitHub Pages deployment path.
 *                        For a user/org site (Simonmensi.github.io) this is empty "".
 *                        For a project site it would be "/<repo-name>".
 * - assetPrefix        → Ensures assets are loaded from the correct URL on GitHub Pages.
 * - trailingSlash      → Required for static hosting so /about resolves to /about/index.html.
 * - images.unoptimized → Next.js Image Optimization requires a Node.js server; disable for SSG.
 */
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",

  // For a GitHub user site (username.github.io), basePath is empty.
  // Change to "/<repo-name>" if deploying to a project repository.
  basePath: isProd ? "" : "",

  // assetPrefix mirrors basePath so CSS/JS/images resolve correctly.
  assetPrefix: isProd ? "" : "",

  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
