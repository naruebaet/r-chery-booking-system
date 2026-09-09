import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@archery/types", "@archery/store", "@archery/ui", "@archery/db"],
};

export default nextConfig;
