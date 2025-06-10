/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/DDS' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/DDS/' : '',
  trailingSlash: true,
}

module.exports = nextConfig 