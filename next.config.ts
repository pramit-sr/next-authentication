import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Add alias for mongoose to ensure correct version is used
    config.resolve.alias = {
      ...config.resolve.alias,
      mongoose: 'mongoose',
    };

    return config;
  },
};

export default nextConfig;
