/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/dds-website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/dds-website/' : '',
  images: {
    unoptimized: false,
  },
  trailingSlash: true,
}

module.exports = nextConfig 
