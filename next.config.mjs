/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['www.bsacet.org','encrypted-tbn0.gstatic.com','images.unsplash.com','plus.unsplash.com','media.istockphoto.com'],

    },
    eslint: {
      ignoreDuringBuilds: true,  // Ignore ESLint errors during build
    },
  };
  
  export default nextConfig;
  
