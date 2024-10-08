/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['www.bsacet.org'],
    },
    eslint: {
      ignoreDuringBuilds: true,  // Ignore ESLint errors during build
    },
  };
  
  export default nextConfig;
  
