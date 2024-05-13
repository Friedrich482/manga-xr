import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mangadex.org",
        port: "",
      },
    ],
  },
};

export default nextConfig;
