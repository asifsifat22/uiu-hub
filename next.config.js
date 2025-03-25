/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    domains: ['ktjrqnzyadgtuquolhvo.supabase.co'],
    unoptimized: true,
  },
}

module.exports = nextConfig
