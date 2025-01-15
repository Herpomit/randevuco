import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["sequelize", "@types/sequelize"],
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  /* config options here */
};

export default nextConfig;
