/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mangadex.org",
        port: "",
      },
      {
        protocol: "https",
        hostname: "uploads.mangadex.org",
        port: "",
      },
      {
        protocol: "https",
        hostname: "temp.compsci88.com",
        port: "",
      },
    ],
    minimumCacheTTL: 1800,
  },
};

export default nextConfig;
