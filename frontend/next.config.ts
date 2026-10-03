import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    "shop-eight-amber.vercel.app",
    "localhost:3000",
    "localhost:3001",
    "shop-znu8.vercel.app"
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
