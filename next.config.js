/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/dds-website',
  assetPrefix: '/dds-website/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig 
