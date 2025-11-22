import { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "**.us",
        port: "",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
      {
        protocol: "http",
        hostname: "caddy",
        port: "3003",
        pathname: "/image/**",
      },
    ],
    minimumCacheTTL: 1800,
  },
  async headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          {
            key: "X-Accel-Buffering",
            value: "no",
          },
        ],
      },
    ];
  },
  eslint: {
    dirs: [
      "app",
      "actions",
      "components",
      "data-access",
      "hooks",
      "tests",
      "utils",
      "zod-schema",
    ],
  },
};

export default nextConfig;
