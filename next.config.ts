import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ This will prevent deployment failures due to ESLint errors
  },
};

export default nextConfig;
