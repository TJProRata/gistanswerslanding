/** @type {import('next').NextConfig} */
const nextConfig = {
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
