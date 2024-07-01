/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "temp.compsci88.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "scans.lastation.us",
        port: "",
      },
      {
        protocol: "https",
        hostname: "official.lowee.us",
        port: "",
      },
      {
        protocol: "https",
        hostname: "scans-hot.leanbox.us",
        port: "",
      },
    ],
    minimumCacheTTL: 1800,
  },
};

export default nextConfig;
