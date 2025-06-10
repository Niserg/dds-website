/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/dds-website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/dds-website/' : '',
  trailingSlash: true,
}

module.exports = nextConfig 
