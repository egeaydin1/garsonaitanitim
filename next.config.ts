import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  
  // Railway deployment için optimizasyonlar
  poweredByHeader: false,
  compress: true,
  
  // Image optimization
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
  
  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
};

export default nextConfig;
