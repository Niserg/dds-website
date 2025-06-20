// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',
//   images: {
//     unoptimized: true,
//   },
//   basePath: process.env.NODE_ENV === 'production' ? '/DDS' : '',
//   assetPrefix: process.env.NODE_ENV === 'production' ? '/DDS/' : '',
//   trailingSlash: true,
// }

// module.exports = nextConfig 

// above for local hosting
// below for github

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/dds-website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/dds-website/' : '',
  trailingSlash: true,
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
}

module.exports = nextConfig
