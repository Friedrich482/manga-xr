import withPlaiceholder from "@plaiceholder/next";
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
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
    minimumCacheTTL: 1800,
  },
};

export default withPlaiceholder(nextConfig);
