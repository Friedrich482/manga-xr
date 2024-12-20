/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
    minimumCacheTTL: 1800,
  },
    async headers() {
      return [
        {
          source: '/:path*{/}?',
          headers: [
            {
              key: 'X-Accel-Buffering',
              value: 'no',
            },
          ],
        },
      ]
    },
  
};

export default nextConfig;
