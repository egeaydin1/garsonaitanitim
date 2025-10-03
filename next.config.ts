import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  
  // Railway deployment için optimizasyonlar
  poweredByHeader: false,
  compress: true,
  
  // ESLint sıkı derleme kurallarını esnet
  eslint: {
    // Build sırasında eslint hatalarını ignore et (warnings göster)
    ignoreDuringBuilds: false,
  },
  
  // TypeScript sıkı kontrol
  typescript: {
    // Build sırasında type hatalarını ignore etme (güvenlik için)
    ignoreBuildErrors: false,
  },
  
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
