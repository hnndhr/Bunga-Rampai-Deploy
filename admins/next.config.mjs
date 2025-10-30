// frontend/next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.builder.io",
      },
      {
        protocol: "https",
        hostname: "drive.google.com"
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      },
    ],
  },
};

export default nextConfig;
