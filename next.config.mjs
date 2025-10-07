/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/home',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gist.ai',
      },
    ],
  },
};

export default nextConfig;
