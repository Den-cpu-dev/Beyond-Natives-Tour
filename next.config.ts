import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Keep remote placeholder photography HTTPS-direct. This avoids a server-side
    // proxy dependency while still using next/image for sizing and layout safety.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
