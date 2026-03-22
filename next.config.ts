import type { NextConfig } from "next";

/**
 * Next.js SSR Configuration
 *
 * - trailingSlash      → Consistent URL handling.
 * - images.unoptimized → Image optimization disabled (static assets).
 */

const nextConfig: NextConfig = {
  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
