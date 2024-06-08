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
    ],
    minimumCacheTTL: 1800,
  },
};

export default nextConfig;
