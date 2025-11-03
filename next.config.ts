import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  devIndicators: {
    position: 'bottom-right',
  },
  experimental: {
  },
  allowedDevOrigins: [
    'https://6000-firebase-studio-1762114371714.cluster-c36dgv2kibakqwbbbsgmia3fny.cloudworkstations.dev',
    'https://9000-firebase-studio-1762114371714.cluster-c36dgv2kibakqwbbbsgmia3fny.cloudworkstations.dev',
  ],
};

export default nextConfig;
