import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.100.17",
    "192.168.100.17:3000",
  ],
};

export default nextConfig;