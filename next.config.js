/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  onDemandEntries: {
    // Disable Fast Refresh
    maxInactiveAge: 1000 * 60 * 60,
  },
};

module.exports = nextConfig; 