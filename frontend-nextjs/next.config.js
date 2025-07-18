/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    domains: [
      'localhost', 
      ...(process.env.NEXT_PUBLIC_DIRECTUS_URL ? [new URL(process.env.NEXT_PUBLIC_DIRECTUS_URL).hostname] : []),
      ...(process.env.NEXT_PUBLIC_IMAGE_DOMAINS ? process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(',') : ['leonardsodablasting.com'])
    ].filter(Boolean),
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 354, 384],
    minimumCacheTTL: 31536000,
  },
  output: 'standalone',
  // Target modern browsers to reduce polyfills
  target: 'server',
  swcMinify: true,
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: [
      '@chakra-ui/react',
      '@emotion/react',
      '@emotion/styled',
      '@directus/sdk'
    ],
    // Use modern compilation target
    esmExternals: 'loose',
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Enable tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Optimize chunk splitting for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 50000, // 50KB max chunks
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            maxSize: 40000, // 40KB max for vendor chunks
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
            maxSize: 30000, // 30KB max for common chunks
          },
          chakra: {
            test: /[\\/]node_modules[\\/]@chakra-ui[\\/]/,
            name: 'chakra-ui',
            chunks: 'all',
            maxSize: 30000,
          }
        }
      };
    }
    return config;
  },
  env: {
    NEXT_PUBLIC_DIRECTUS_URL: process.env.NEXT_PUBLIC_DIRECTUS_URL,
    NEXT_PUBLIC_ADMIN_EMAIL: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
  },
}

module.exports = withBundleAnalyzer(nextConfig)