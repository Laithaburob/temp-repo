/** @type {import('next').NextConfig} */
const nextConfig = {
  // …your existing settings
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ←– disable next/font optimization so no __processed attrs get injected
  optimizeFonts: false,
};

module.exports = nextConfig;
