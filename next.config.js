/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/index.html', destination: '/' },
      { source: '/dashboard.html', destination: '/dashboard' },
      { source: '/countermeasures.html', destination: '/countermeasures' },
      { source: '/synopsis.html', destination: '/synopsis' },
    ];
  },
};

module.exports = nextConfig;
