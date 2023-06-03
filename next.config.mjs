/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/find',
        permanent: true,
      },
    ];
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
