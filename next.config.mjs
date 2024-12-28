/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"]
  },
  env: {
    DEV_TO_API_KEY: process.env.DEV_TO_API_KEY
  },
  async rewrites() {
    return [
      {
        source: '/api/devto/:path*',
        destination: 'https://dev.to/api/:path*' // Proxy to Dev.to 
      }
    ]
  }
};

export default nextConfig;
