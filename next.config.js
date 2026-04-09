/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "1337" },
      { protocol: "http", hostname: "78.46.234.213", port: "1337" },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/strapi/:path*',
        destination: 'http://78.46.234.213:1337/:path*',
      },
    ];
  },
};

module.exports = nextConfig;