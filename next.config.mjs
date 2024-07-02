/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
    minimumCacheTTL: 1800,
  },
};

export default nextConfig;
