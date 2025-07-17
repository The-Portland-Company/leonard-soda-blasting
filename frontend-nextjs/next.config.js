/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost', 
      ...(process.env.NEXT_PUBLIC_DIRECTUS_URL ? [new URL(process.env.NEXT_PUBLIC_DIRECTUS_URL).hostname] : []),
      ...(process.env.NEXT_PUBLIC_IMAGE_DOMAINS ? process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(',') : ['leonardsodablasting.com'])
    ].filter(Boolean),
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  env: {
    NEXT_PUBLIC_DIRECTUS_URL: process.env.NEXT_PUBLIC_DIRECTUS_URL,
    NEXT_PUBLIC_ADMIN_EMAIL: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
  },
}

module.exports = nextConfig