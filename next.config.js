/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    domains: ['ktjrqnzyadgtuquolhvo.supabase.co'],
  },
}

module.exports = nextConfig
