/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    esmExternals: 'loose'
  },
  output: "export",
  
  images: {
    unoptimized: true ,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "us-central1-giznew-4a7d6.cloudfunctions.net",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
};

module.exports = nextConfig;
