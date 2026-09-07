import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@archery/types", "@archery/store", "@archery/ui"],
};

export default nextConfig;
