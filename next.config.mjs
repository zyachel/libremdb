/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return {
      afterFiles: [
        {
          source: '/',
          destination: '/find',
        },
      ],
      fallback: [
        {
          source: '/:path*',
          destination: '/404',
        },
      ],
    };
  },
  images: {
    domains: ['m.media-amazon.com'],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
    isrMemoryCacheSize: 20 * 1024 * 1024,
  },
  poweredByHeader: false,
};

export default nextConfig;
