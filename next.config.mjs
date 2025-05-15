/** @type {import('next').NextConfig} */
const nextConfig = {    
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
