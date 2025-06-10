/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // This enables static HTML export
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: '/dds-website',
  assetPrefix: '/dds-website/',
};

module.exports = nextConfig; 