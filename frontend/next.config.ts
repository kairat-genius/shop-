import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    "shop-eight-amber.vercel.app",
  ],
  output: "standalone",
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
