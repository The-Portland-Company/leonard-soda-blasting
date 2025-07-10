/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'leonardsodablasting.com'],
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